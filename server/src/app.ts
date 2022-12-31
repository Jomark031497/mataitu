import express from "express";
import expressSession from "express-session";
import envs from "./config/envs";
import prisma from "./utils/client";
import logger from "./utils/logger";
import userRoutes from "./features/user/user.routes";
import walletRoutes from "./features/wallet/wallet.routes";
import categoryRoutes from "./features/category/category.routes";
import transactionRoutes from "./features/transaction/transaction.routes";
import errorHandler from "./middlewares/errorHandler";
import { COOKIE_NAME } from "./constants";
import cors from "cors";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";

const main = async () => {
  const app = express();

  // app.set("trust proxy", 1);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: envs.CLIENT_URL,
      credentials: true,
    })
  );
  app.use(
    expressSession({
      name: COOKIE_NAME,
      secret: <string>envs.SECRET,
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      },
    })
  );

  app.use("/api/user", userRoutes);
  app.use("/api/wallet", walletRoutes);
  app.use("/api/category", categoryRoutes);
  app.use("/api/transaction", transactionRoutes);

  app.use(errorHandler);

  app.listen(envs.PORT, () => logger.info(`listening at http://localhost:${envs.PORT}`));
};

main().catch((err) => {
  prisma.$disconnect();
  logger.error(err);
});
