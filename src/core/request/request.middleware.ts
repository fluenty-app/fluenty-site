export function requestMiddleware(cls, req: any, res: any) {
  cls.set('request', req);
}
