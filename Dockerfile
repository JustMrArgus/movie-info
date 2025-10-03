FROM node:20-alpine AS build
WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

COPY frontend/ ./

RUN npm run build

FROM node:20-alpine
WORKDIR /app

COPY backend/package.json backend/package-lock.json ./
RUN npm install --omit=dev

COPY backend/ ./

COPY --from=build /app/frontend/dist ./public

EXPOSE 8050

ENV JWT_SECRET=secret-key
ENV JWT_EXPIRES_IN=7d

CMD ["npm", "start"]