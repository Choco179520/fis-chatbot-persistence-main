const path = require("path");

module.exports = {
  apps: [
    {
      name: "fis-chatbot-persistence",
      script: "src/index.ts", // Ruta a tu archivo principal
      interpreter: path.resolve(__dirname, "node_modules/.bin/ts-node"), // Usa ts-node como intérprete
      instances: "max",
      autorestart: true,
      watch: false, // Opcional: habilita si quieres que PM2 reinicie la aplicación al detectar cambios
      env_production: {
        NODE_ENV: "production",
        DATABASE_URL:
          "mysql://admin:chatbotEpn2024@database-chatbot-epn.cxmuqgq08wc4.us-east-2.rds.amazonaws.com:3306/CHATBOT",
      },
    },
  ],
};
