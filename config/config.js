import dotenv from "dotenv";
dotenv.config();

const getConfigs = () => {
  return {
    morgan: {
      logStyle: "dev",
    },
    cors: {
      origin: [
        "http://localhost:3000",
        "http://localhost:3000/admin-akod",
        "https://www.akodscaffolding.com",
        "https://www.akodscaffolding.com/admin-akod",
      ],
      credentials: true,
    },
    server: {
      name: "Akod Scaffolding",
      port: process.env.PORT || 2001,
      baseURl: "/",
      APP_URL: process.env.APP_URL,
      serverId: "1",
      version: "V1",
      appBaseUrl: "/auth",
    },
    mongo: {
      url: process.env.MONGO_URL,
    },
    jwt: {
      accessSecret: process.env.ACCESS_TOKEN_SECRET,
      accessOptions: {
        expiresIn: process.env.JWT_EXPIRES,
      },
    },
    salt: {
      salt: process.env.SALT,
    },
    cookie: {
      cookie_expire: process.env.COOKIE_EXPIRE,
    },
  };
};

export default getConfigs;
