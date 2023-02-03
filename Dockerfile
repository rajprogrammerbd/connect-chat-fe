FROM node:19.6-buster
WORKDIR /app
COPY . /app/
RUN yarn install
CMD ["yarn", "run", "test:nowatch"]
