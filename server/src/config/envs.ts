import "dotenv/config";

const envs = {
  PORT: process.env.PORT || 8080,
  SECRET: process.env.SECRET,
  COOKIE_NAME: process.env.COOKIE_NAME,
  CLIENT_URL: process.env.CLIENT_URL,
};

export default envs;
