FROM node:buster
WORKDIR /app
COPY . /app/
RUN yarn install
CMD ["yarn", "run", "dev"]
