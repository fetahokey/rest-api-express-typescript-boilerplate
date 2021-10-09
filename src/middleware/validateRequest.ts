import { AnySchema, ValidationError } from 'yup';
import { Request, Response, NextFunction } from 'express';
import log from '../logger';

const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (error: any) {
        if (error instanceof ValidationError) {
            log.error(error);
            return res.status(400).send(error.errors);
        }
        throw new Error(error);

    }
}

export default validate;