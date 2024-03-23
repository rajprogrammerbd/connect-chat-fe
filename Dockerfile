FROM node:21-alpine3.18
WORKDIR /app
COPY / .
ENV VITE_WEBSOCKET_URL=http://localhost:4000
RUN yarn install
EXPOSE 8000
CMD ["yarn", "run", "dev"]