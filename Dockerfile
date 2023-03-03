FROM node:18.14.2-alpine3.17
WORKDIR /app
COPY . /app/
RUN yarn install
CMD ["yarn", "run", "dev"]
