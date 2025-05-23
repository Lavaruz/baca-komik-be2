import express from "express";
import path from "path";
import multer from 'multer';
import cors from "cors"
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const storage = multer.memoryStorage();

// Router import
import { connectToDatabase } from "./models";
import comicRouter from "./router/comic.router";
import chapterRouter from "./router/chapter.router";
app.use(cors({
  origin: "*"
}))
app.use(multer({ storage, /* limits: { fileSize: 2 * 1024 * 1024 } */ }).any());
app.use(express.json());
app.enable("trust proxy");
app.use(wwwRedirect);


// konfigurasi static item dalam public folder
app.use("/files", express.static(path.join(__dirname, '../public/files')));
app.use(express.static(path.join(__dirname, '../public/app')));


// konfigurasi sequelize dengan option alter
let PORT = process.env.PORT || 8091;
connectToDatabase()
  .then(() => {
    // set router
    const VERSION_API = "v1";
    app.use(`/api/${VERSION_API}/comics`, comicRouter);
    app.use(`/api/${VERSION_API}/chapters`, chapterRouter);
    // app.get('/*', (req, res) => {res.sendFile(path.join(__dirname, '../public/app/index.html'));});
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Koneksi database gagal:", error);
  }
);

function wwwRedirect(req, res, next) {
  if (req.headers.host.slice(0, 4) === 'www.') {
      var newHost = req.headers.host.slice(4);
      return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
  }
  next();
};
