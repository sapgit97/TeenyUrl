FROM node:lts
WORKDIR /home/nodejs/app
COPY . .
RUN npm install --production
CMD node index.js
EXPOSE 9000