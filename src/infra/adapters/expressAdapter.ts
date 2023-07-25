import { NextFunction, Request, Response } from 'express';

export default class ExpressAdapter {
	static execute(requestHandler: any) {
		return async function (req: Request, res: Response, next: NextFunction) {
			try {
				const authenticationPayload = res.locals.payload;
				if (authenticationPayload) {
					req.params.userId = authenticationPayload.userId;
				}
				const result = await requestHandler(req.params, req.body);
				res.json(result);
			} catch (err) {
				next(err);
			}
		};
	}
}
