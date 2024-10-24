import { NextFunction, Request, Response } from "express";
import { CustomError } from "../helpers/customError";

export const errorMiddleware = (
    err: Error & CustomError, 
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (err instanceof CustomError) {
        return res.status(err.status).json({
            data: null,
            error: err.message
        });
    }

    console.log(err);
    if(process.env.DEVMODE === 'true') console.log("DevMOde Error Log::\n", err);

    return res.status(500).json({data: null, error: 'Internal server error'});
}