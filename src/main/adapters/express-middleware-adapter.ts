import { Middleware } from './../../presentation/protocols'
import { Request, Response, NextFunction } from 'express'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.headers?.['token'],
      ...(req.headers || {}),
      ...(req.body || {}),
      ...(req.query || {}),
      ...(req.params || {})
    }
    const httpResponse = await middleware.handle(request)
    if (httpResponse.statusCode === 200) {
      Object.assign(req.headers, httpResponse.body)
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
