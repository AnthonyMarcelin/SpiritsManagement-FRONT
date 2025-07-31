# Étape 1 : Build Angular
FROM node:20.19.0 AS build

WORKDIR /app

# Copie package.json et package-lock.json
COPY package*.json ./

# Install deps
RUN npm ci

# Copie le reste
COPY . .

# Build Angular
RUN npm run build --prod

# Étape 2 : Serveur statique
FROM nginx:stable-alpine

# Supprime les fichiers par défaut de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copie les fichiers Angular compilés
COPY --from=build /app/dist/ /usr/share/nginx/html/

# Expose le port 80
EXPOSE 80

# Lance Nginx
CMD ["nginx", "-g", "daemon off;"]
