import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      queuedCookies: any[];
    }
  }
}

