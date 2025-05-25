FROM node:18-alpine

WORKDIR /app

# Копирование package.json и установка зависимостей
COPY package*.json ./
RUN npm install

# Копирование исходного кода
COPY . .

# Сборка TypeScript в JavaScript
RUN npm run build

# Порт, указанный в .env
EXPOSE ${PORT}

# Запуск приложения
CMD ["npm", "start"]
