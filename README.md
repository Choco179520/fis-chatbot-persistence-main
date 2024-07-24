# fis-chatbot-persistence
Chatbot data persistence repository

# Crear .env
# DATABASE_URL='mysql://admin:chatbotEPN2024@database-2.c92sico0mmpy.us-east-1.rds.amazonaws.com:3306/CHATBOT'
DATABASE_URL='mysql://admin:chatbotEpn2024@database-chatbot-epn.cxmuqgq08wc4.us-east-2.rds.amazonaws.com:3306/CHATBOT'

# Pasos para levantar 
1 Correr los comandos para syncronizar la base de datos (por primera vez)
```
npx prisma migrate dev
npm run start
```

2 Ingresar al directorio de update_db_script y correr el comando de 
```
python2 main.py
```
