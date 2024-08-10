FROM node:18.20.4
RUN mkdir /app
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY .env.example .env
COPY . .

ENTRYPOINT [ "yarn", "start" ]
