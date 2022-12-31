// eslint-disable-next-line no-unused-vars
import session from "express-session";

declare module "express-session" {
  export interface SessionData {
    userId: string;
  }
}
