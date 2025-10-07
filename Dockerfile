# Step 1: Build the Vite frontend
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install -f

# Copy source code
COPY . .


# Build for production
RUN npm run build

# Step 2: Serve the built app using NGINX
FROM nginx:1.23-alpine

# Remove default static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: Add custom nginx config if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Run NGINX
CMD ["nginx", "-g", "daemon off;"]