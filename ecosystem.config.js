module.exports = {
    apps: [
      {
        name: 'fis-chatbot-persistence',
        script: 'src/app.ts', // Ruta a tu archivo principal
        interpreter: 'ts-node', // Usa ts-node como intérprete
        instances: 'max',
        autorestart: true,
        watch: false, // Opcional: habilita si quieres que PM2 reinicie la aplicación al detectar cambios
        env: {
          NODE_ENV: 'development', // Configura variables de entorno si es necesario
          DATABASE_URL:'mysql://admin:chatbotEpn2024@database-chatbot-epn.cxmuqgq08wc4.us-east-2.rds.amazonaws.com:3306/CHATBOT'
        },
        env_production: {
          NODE_ENV: 'production',
          DATABASE_URL:'mysql://admin:chatbotEpn2024@database-chatbot-epn.cxmuqgq08wc4.us-east-2.rds.amazonaws.com:3306/CHATBOT'
        },
      },
    ],
  };
  