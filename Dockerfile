FROM node:16-alpine
RUN mkdir /app
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

RUN yarn build
ENTRYPOINT [ "yarn", "start:prod" ]
