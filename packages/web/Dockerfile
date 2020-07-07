# Build stage
FROM node:lts-alpine as builder

RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production stage
FROM nginx:stable-alpine

RUN mkdir -p /skt/log/nginx
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
