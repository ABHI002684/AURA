import express from 'express';
import { askToAssistant, getCurrentUser,updateAssistant } from '../controllers/user.controllers.js';
import isAuth from '../middlewares/isAuth.js';
import upload from '../middlewares/multer.js';
const router=express.Router();

router.get('/current',isAuth,getCurrentUser);
router.post('/update',isAuth,upload.single('avtar'),updateAssistant);
router.post('/ask',isAuth,askToAssistant);  
export default router;
