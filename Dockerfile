# Étape 1 : Build Angular
FROM node:20.19.0 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build --prod

# Étape 2 : Serveur Nginx
FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/spirits-management-front/browser /usr/share/nginx/html
RUN find /usr/share/nginx/html -type d -exec chmod o+rx {} \; && chmod -R o+r /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080


CMD ["nginx", "-g", "daemon off;"]
