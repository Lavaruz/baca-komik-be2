import { Request, Response } from "express";
import Chapter from "../models/Chapter";
import Comic from "../models/Comic";
import { validationResult } from "express-validator";
import r2 from "../config/vendor/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3"
import sharp from "sharp";
import { Op } from "sequelize";

export const GetAllChapter = async (req: Request, res: Response) => {
  try {
    const CHAPTERS = await Chapter.findAll();

    return res.status(200).json(CHAPTERS);
  } catch (error) {
    console.error('Error in GetAllChapter:', error);
    return res.status(500).json({
      message: "Terjadi kesalahan server",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const GetChapterBySlug = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Cari chapter berdasarkan slug dan comicId
    const chapter = await Chapter.findByPk(id,{
      include: [{
        model: Comic,
        as: 'comic',
      }]
    });

    if (!chapter) {
      return res.status(404).json({ message: "Chapter tidak ditemukan" });
    }

    const prevChapter = await Chapter.findOne({
      where: {
        comicId: chapter.comicId,
        chapterNumber: {
          [Op.lt]: chapter.chapterNumber
        }
      },
      order: [['chapterNumber', 'DESC']]
    });

    // Ambil chapter selanjutnya (chapterNumber lebih besar, urutkan asc, ambil satu)
    const nextChapter = await Chapter.findOne({
      where: {
        comicId: chapter.comicId,
        chapterNumber: {
          [Op.gt]: chapter.chapterNumber
        }
      },
      order: [['chapterNumber', 'ASC']]
    });

    return res.status(200).json({
      ...chapter.toJSON(),
      prevChapter: prevChapter ? prevChapter.toJSON() : null,
      nextChapter: nextChapter ? nextChapter.toJSON() : null
    });
  } catch (error) {
    console.error('Error in GetChapterBySlug:', error);
    return res.status(500).json({
      message: "Terjadi kesalahan server",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const AddChapter = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { comicSlug } = req.params;
  const { title } = req.body;
  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "Tidak ada gambar yang diupload" });
  }

  try {
    const comic = await Comic.findOne({ where: { slug: comicSlug } });

    if (!comic) {
      return res.status(404).json({ message: "Komik tidak ditemukan" });
    }

    const extractNumber = (filename: string): number => {
      const match = filename.match(/\d+/g);
      return match ? parseInt(match[0]) : 0;
    };

    const sortedFiles = [...files].sort((a, b) => {
      return extractNumber(a.originalname) - extractNumber(b.originalname);
    });

    const uploadedUrls: string[] = [];

    const chapterNumber = (await comic.countChapters()) + 1;

    for (const file of sortedFiles) {
      // Konversi ke WebP menggunakan sharp
      const webpBuffer = await sharp(file.buffer)
        .webp({ quality: 80 })
        .toBuffer();

      // Ganti ekstensi jadi .webp
      const baseName = file.originalname.replace(/\.[^/.]+$/, "");
      const filename = `${Date.now()}-${baseName}.webp`;

      const key = `${comicSlug}/chapters-${chapterNumber}/${filename}`;

      const params = {
        Bucket: "gatedoujin",
        Key: key,
        Body: webpBuffer,
        ContentType: "image/webp",
      };

      await r2.send(new PutObjectCommand(params));
      uploadedUrls.push(key);
    }

    const newChapter = await Chapter.create({
      comicId: comic.id,
      title,
      slug: comicSlug,
      pages: uploadedUrls,
      releaseDate: new Date(),
      chapterNumber
    });

    return res.status(201).json({
      message: "Chapter berhasil ditambahkan",
      data: newChapter
    });

  } catch (error) {
    console.error('Error in AddChapter:', error);
    return res.status(500).json({
      message: "Terjadi kesalahan server",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};



function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')      // hapus karakter selain huruf, angka, spasi, dan strip
    .replace(/[\s_]+/g, '-')       // ganti spasi atau underscore dengan strip
    .replace(/-+/g, '-')           // hapus duplikat strip
    .trim();                       // hapus spasi di awal/akhir
}