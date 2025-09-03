# Build stage
FROM node:18 AS build
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build production files
RUN npm run build

# Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 (nginx default)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]