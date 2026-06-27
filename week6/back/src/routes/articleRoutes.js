import { Router } from "express";
import { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle , getArticlesByJournalist} from "../controllers/articleController.js";

const articleRouter = Router();
articleRouter.get("/:id", getArticleById);
articleRouter.get("/", getAllArticles);
articleRouter.post("/", createArticle);
articleRouter.put("/:id", updateArticle);
articleRouter.delete("/:id", deleteArticle);
export default articleRouter;
