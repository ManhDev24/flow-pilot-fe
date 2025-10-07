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


# Optional: Add custom nginx config if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 6868

# Run NGINX
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "6868"]