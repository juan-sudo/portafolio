FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Las variables VITE_ se incrustan al compilar. Rutas relativas: nginx las reenvía a los backends.
ARG VITE_CHAT_API_URL=/api/chat
ARG VITE_LEARN_CHAT_API_URL=/api/learn-chat
ENV VITE_CHAT_API_URL=$VITE_CHAT_API_URL \
    VITE_LEARN_CHAT_API_URL=$VITE_LEARN_CHAT_API_URL
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
