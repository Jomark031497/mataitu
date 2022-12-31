import envs from "./config/envs";

export const __prod__ = process.env.NODE_ENV === "production";
export const COOKIE_NAME = envs.COOKIE_NAME;
