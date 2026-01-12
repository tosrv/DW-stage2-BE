import cors, { CorsOptions } from "cors";

const whitelist = ["http://localhost:5501", "http://127.0.0.1:5501"];

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback) => {
    // allow server-to-server / Postman / curl
    if (!origin) {
      return callback(null, true);
    }

    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

export const allowedOrigins = cors(corsOptions);
