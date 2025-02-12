import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createActivitySquema } from "../schemas/activity.schema.js"
import { createLiveSquema } from "../schemas/live.schema.js";
import { createCommentSquema } from "../schemas/comment.schema.js";

import { createActivity, getActivitiesByForo, deleteActivity } from "../controllers/activity.controller.js";
import { createLive, getLiveByForo, deleteLive, editLive } from "../controllers/live.controller.js";
import { postComment, getCommentsByForo } from "../controllers/comments.controller.js";

const router = Router();

router.get('/home', authRequired);
router.get('/actividad/:foroId', authRequired, getActivitiesByForo);
router.post('/actividad/:foroId', authRequired, validateSchema(createActivitySquema), createActivity);
router.delete('/actividad/:activityId', authRequired, deleteActivity);

router.post('/live/:foroId', authRequired, validateSchema(createLiveSquema), createLive);
router.get('/live/:foroId', authRequired, getLiveByForo);
router.delete('/live/:foroId', authRequired, deleteLive);
router.put('/live/:foroId', authRequired, editLive);

router.post('/comment/:foroId', authRequired, validateSchema(createCommentSquema), postComment);
router.get('/comment/:foroId', authRequired, getCommentsByForo);

export default router;