import { Router } from "express";

import {
    toggleLike,
    getLikesCount,
    isLiked,
} from '../controllers/likes.controller.js'

const router = Router();

// Endpoint para dar like
router.post("/toggle", toggleLike);

// Endpoint para contar likes
router.get("/count-likes/:bookId", getLikesCount);

// Endpoint para verificar si se ha dado like
router.get("/check-liked", isLiked);

export default router;