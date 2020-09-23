FROM node:alpine as BUILDER

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install

ADD .browserslistrc .prettierrc .eslintrc.js babel.config.js vue.config.js .env.production ./
ADD public ./public
ADD src ./src

RUN npm run build

FROM node:alpine

WORKDIR /app 

RUN npm i -g serve 

COPY --from=BUILDER /app/dist ./ 

CMD serve -l $PORT

