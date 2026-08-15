# Base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose Vite port
EXPOSE 5173

# Start Vite development server
CMD ["sh", "-c", "npm run build && npm run preview -- --host 0.0.0.0 --port $PORT"]