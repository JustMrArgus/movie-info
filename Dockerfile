# Етап 1: Збірка React frontend
FROM node:20-alpine AS build
WORKDIR /app/frontend

# Копіюємо файли package.json та встановлюємо залежності
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Копіюємо решту коду frontend
COPY frontend/ ./

# Збираємо frontend для production
RUN npm run build

# Етап 2: Налаштування Node.js backend та обслуговування frontend
FROM node:20-alpine
WORKDIR /app

# Копіюємо файли package.json backend та встановлюємо production залежності
COPY backend/package.json backend/package-lock.json ./
RUN npm install --omit=dev

# Копіюємо решту коду backend
COPY backend/ ./

# Копіюємо зібраний frontend з етапу 'build'
COPY --from=build /app/frontend/dist ./public

# Відкриваємо порт
EXPOSE 8050

# Змінні оточення
ENV JWT_SECRET=secret-key
ENV JWT_EXPIRES_IN=7d

# Команда для запуску додатку
CMD ["npm", "start"]