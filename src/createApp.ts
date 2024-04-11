import express, {Express} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import router from "./routes/main-router";

import ErrorMiddleware from "./middlewares/error-middleware";


export default (): Express => {

    const app = express();
    const API_PREFIX: string = '/api/v1/';

    // making server trust to proxy
    app.set('trust proxy', true);

    // middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(cookieParser());
    app.use(passport.initialize());

    // routes
    app.use(API_PREFIX, router);
    app.use(ErrorMiddleware);

    return app;
}



