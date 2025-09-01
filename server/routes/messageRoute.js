import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { 
  getMessages, 
  getUsersForSidebar,   // fixed spelling
  markMessageAsSeen,    // fixed spelling
  sendMessage 
} from "../controllers/messageController.js"; // added .js

const messageRouter = express.Router();

// Routes
messageRouter.get("/users", protectRoute, getUsersForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("/mark/:id", protectRoute, markMessageAsSeen); // fixed typo
messageRouter.post("/send/:id", protectRoute, sendMessage); // fixed id
export default messageRouter;
