import { Express, Request, Response } from "express";
import { createUserHandler } from './controller/user.controller';
import { createUserSchema, createUserSessionSchema } from "./schema/user.schema";
import { validateRequest } from './middleware';

export default (app: Express) => {
    app.get('/ping', (req: Request, res: Response) => res.sendStatus(200));

    // Register User
    // POST /api/user 
    app.post('/api/users', validateRequest(createUserSchema), createUserHandler);

    // Login
    // POST /api/sessions
    //app.post('/api/sessions', validateRequest(createUserSessionSchema), createUserSessionHandler);

    // GET the user's sessions
    // GET /api/sessions

    // Logout
    // DELETE /api/sessions

}
