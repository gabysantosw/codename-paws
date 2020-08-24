FROM node:alpine

RUN npm install -g nodemon

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install

ADD bin ./bin

# --legacy-watch needed for auto-reload on windows
CMD ["nodemon", "--legacy-watch"]