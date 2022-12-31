import pino from "pino";
import { format } from "date-fns";

const logger = pino({
  base: {
    pid: false,
  },
  transport: {
    level: "info",
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },

  timestamp: () =>
    `,"time":"${format(new Date(), "hh:mm:ss aa | yyyy-mm-ss")}"`,
});

export default logger;
