FROM node:20-alpine

WORKDIR /usr/app

COPY ./ /usr/app

RUN npm install

COPY . /app

RUN npm run start:dev

EXPOSE 3001

CMD [ "npm", "run", "start:dev" ]