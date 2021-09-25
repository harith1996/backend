FROM node:16
WORKDIR /app
COPY . /app
EXPOSE 8080
RUN npm install
CMD [ "npm", "start" ]