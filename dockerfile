#Descarga la imagen node para instalar angular
FROM node:lts-alpine3.13

WORKDIR /usr/src/app

RUN apk add --update nodejs nodejs-npm &&\
    npm install -g @angular/cli@11.2.0

COPY package*.json ./

# CMD mkdir ./node_modules; npm install; npm start;
CMD npm i -g npm-check-updates &&\
    ncu -u &&\
    npm install --legacy-peer-deps &&\
    npm start;

EXPOSE 4200
