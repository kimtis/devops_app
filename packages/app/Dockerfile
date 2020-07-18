# Build stage
FROM node:lts-alpine as builder

RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production stage
FROM node:lts-alpine

RUN mkdir -p /skt/app
WORKDIR /skt/app

# Just copy app and its dependencies into docker image.
COPY --from=builder /app/build        build
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/app.yaml     /etc/application/app.yaml

EXPOSE 8080
ENV NODE_ENV production
ENV CONFIG_FILE /etc/application/app.yaml
CMD node build/bin/www.js
