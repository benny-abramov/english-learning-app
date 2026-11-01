# Stage 1: Build the React + Vite application
FROM node:20-alpine AS build
WORKDIR /app

# Copy package descriptors
COPY package*.json bun.lock* ./
RUN npm ci || npm install

# Copy application source code
COPY . .

# Build production bundle
RUN npm run build

# Stage 2: Serve with lightweight Nginx (Google Cloud Run compatible)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Google Cloud Run listens on port 8080 by default (set by PORT env var)
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
