import express from "express";
import { decrypt } from "../config/crypto";    
import { GetChapterBySlug, AddChapter, GetAllChapter } from "../controllers/chapter.controller";

const chapterRouter = express.Router();

chapterRouter.get("/", GetAllChapter);
chapterRouter.get("/:id", GetChapterBySlug);
chapterRouter.post("/:comicSlug", AddChapter);

// POST /api/chapters/one-piece
// Content-Type: application/json

// {
//   "title": "Chapter 1: Romance Dawn",
//   "slug": "chapter-1",
//   "pages": [
//     "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
//     "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
//   ]
// }

function decodeMiddleware(req, res, next){
    req.body = decrypt(req.body.d)
    if(req.body[0] == "{" || req.body[0] == "["){
        req.body = JSON.parse(req.body)
    }
    next()
}
    
export default chapterRouter;