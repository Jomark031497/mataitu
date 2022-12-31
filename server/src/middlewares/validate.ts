import type { NextFunction, Request, Response } from "express";
import { type AnyZodObject, ZodError } from "zod";

const validate =
  (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const mappedErrors = error.issues.reduce((prev, curr) => {
          const key = curr.path[1];
          const value = curr.message;

          return { ...prev, [key]: value };
        }, {});

        return res.status(400).json(mappedErrors);
      }

      return res.status(400).json(error);
    }
  };

export default validate;
