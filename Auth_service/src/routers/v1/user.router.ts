import express from 'express';
import { validateRequestBody } from '../../validators';
import { registerSchema } from '../../validators/user.validator';
import { profileHandler, registerHandler } from '../../controllers/user.handler';
import { loginSchema } from '../../validators/user.validator';
import { loginUserHandler } from '../../controllers/user.handler';
import { authenticate } from '../../middlewares/auth.middleware';
import { refreshTokenHandler } from '../../controllers/user.handler';
import { logoutHandler } from '../../controllers/user.handler';

const userRouter = express.Router();

userRouter.post('/register', validateRequestBody(registerSchema), registerHandler);
userRouter.post('/login', validateRequestBody(loginSchema), loginUserHandler);
userRouter.post("/refresh", refreshTokenHandler);
userRouter.get("/profile", authenticate, profileHandler);
userRouter.post("/logout", authenticate, logoutHandler);

export default userRouter;