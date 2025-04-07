FROM node:18-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app

EXPOSE 3500

CMD ["npm", "start", "--port", "3500"]
