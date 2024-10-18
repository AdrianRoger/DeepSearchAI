import { Router } from 'express';
import UserController from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/login', (req, res) => userController.login(req, res));
userRouter.post('/user', (req, res) => userController.createUser(req, res));
userRouter.post('/user/recovery-pass', (req, res) => userController.sendRecoveryEmail(req, res));
userRouter.put('/user/reset-pass', (req, res) => userController.resetPassword(req, res));
// userRouter.use(authMiddleware);
userRouter.post('/user/:id/themes', (req, res) => userController.saveThemeSuggestions(req, res));
userRouter.get('/user/:id/suggestions', (req, res) => userController.getUsersSuggestions(req, res));
userRouter.get('/themes', (req, res) => userController.getThemes(req, res));
userRouter.get('/user/:id/pages/suggestions', (req, res) => userController.getUsersPagesSuggetions(req, res));

export default userRouter;