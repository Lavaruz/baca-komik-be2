import express from "express";
import { decrypt } from "../config/crypto";    
import { 
  GetAllComics, 
  GetComicChapterById,
  UpdateComic,
  DeleteComic,
  AddComic,
  GetComicById,
  GetRandomComics,
  GetAllGenres,
  GetAllAuthors
} from "../controllers/comic.controller";

const comicRouter = express.Router();

comicRouter.get("/", GetAllComics)
comicRouter.get("/random", GetRandomComics)
comicRouter.get("/genres", GetAllGenres)
comicRouter.get("/authors", GetAllAuthors)
comicRouter.get("/:id", GetComicById)
comicRouter.get("/:id/chapters", GetComicChapterById)

comicRouter.post("/", AddComic)
comicRouter.put("/:slug", UpdateComic)
comicRouter.delete("/:slug", DeleteComic)

function decodeMiddleware(req, res, next){
    req.body = decrypt(req.body.d)
    if(req.body[0] == "{" || req.body[0] == "["){
        req.body = JSON.parse(req.body)
    }
    next()
}
    
export default comicRouter;