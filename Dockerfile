FROM node:20.10.0

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "node", "server" ]