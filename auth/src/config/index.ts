const config = {
  MONGO_USER: process.env.MONGO_USER as string,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD as string,
  MONGO_IP: process.env.MONGO_IP || "auth-mongo",
  MONGO_PORT: process.env.MONGO_PORT ? Number(process.env.MONGO_PORT) : 27017,
};

export default config;
