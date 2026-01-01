#Build Stage Image
FROM node:22-alpine As build

#Working directry to make a new dir
WORKDIR /app

#coping file in current dir that we make name /app
COPY package*.json ./

RUN npm install

COPY  . .

RUN npm run build

#Production Stage Image
FROM node:22-alpine

WORKDIR /app

RUN npm install -g serve
ENV PATH="/usr/local/bin:$PATH"
COPY --from=build  /app/dist ./dist

EXPOSE 3000

CMD [ "serve" ,"-s","dist","-l","3000" ]