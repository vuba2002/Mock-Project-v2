# === Build stage ===
FROM node:18-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy trước package.json để cache được npm install
COPY package*.json ./

# Cài dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Truyền biến môi trường build-time (được gán bởi --build-arg)
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Build React app với biến môi trường
RUN npm run build

# === Serve stage ===
FROM nginx:alpine

# Copy build output vào thư mục public của nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expose cổng mặc định
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
