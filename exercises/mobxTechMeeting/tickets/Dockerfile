FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
EXPOSE 3002
RUN npm -g install create-fastify-app
CMD [ "npm", "run", "dev" ]