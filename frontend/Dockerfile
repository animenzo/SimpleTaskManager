#build stage
FROM node:22-alpine AS build

WORKDIR /tasks


COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

#production stage
FROM node:22-alpine

WORKDIR /tasks

RUN npm i --g serve
COPY --from=build /tasks/dist ./dist

EXPOSE 3000

CMD ["serve","-s","dist","-l","3000"]

