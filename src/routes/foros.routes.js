import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createForoSquema } from "../schemas/foro.schema.js"
import { 
    getForos, 
    getYourForos, 
    searchForos,
    getForo, 
    createForo, 
    deleteForo, 
    updateForo,
} from "../controllers/foros.controller.js"

const router = Router();

router.get('/foros', authRequired, getForos);
router.get('/mis-foros', authRequired, getYourForos);
router.get('/foros/:id', authRequired, getForo);
router.get('/search-foros', authRequired, searchForos);
router.post('/foros', authRequired, validateSchema(createForoSquema), createForo);
router.delete('/foros/:id', authRequired, deleteForo);
router.put('/foros/:id', authRequired, updateForo);

export default router;