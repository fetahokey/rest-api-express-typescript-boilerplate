import { Request, Response } from "express";
import { omit } from "lodash";
import log from "../logger";
import { createUser } from "../service/user.service";

export async function createUserHandler(req: Request, res: Response) {
    try {
        const user = await createUser(req.body);
        log.info(`USER CREATED:  ${user}`);
        return res.send(omit(user.toJSON(), "password"));
    } catch (error) {
        if (error instanceof Error) {
            return res.status(409).send(error.message);
        }
        else throw new Error(error as string);
    }
}