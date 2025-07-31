# Étape 1 : Build Angular
FROM node:20.19.0 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build --prod

# Étape 2 : Serveur Nginx
FROM nginx:stable-alpine

# Supprime les fichiers HTML par défaut
RUN rm -rf /usr/share/nginx/html/*

# Copie les fichiers Angular générés
COPY --from=build /app/dist/spirits-management-front /usr/share/nginx/html

# Copie la config Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
