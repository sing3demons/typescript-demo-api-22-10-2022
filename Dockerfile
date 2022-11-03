# FROM node:14-alpine as build
# WORKDIR /usr/src/app
# COPY package.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM node:14-alpine
# ENV NODE_ENV=production
# WORKDIR /
# COPY --from=build /usr/src/app /app
# RUN npm i pm2 -g
# EXPOSE 3000
# CMD ["pm2-runtime", "dist/index.js"]
FROM node:14-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
# copy source code to /app/src folder
COPY src /app/src


RUN npm install
RUN npm run build
RUN rm -rf src

EXPOSE 3000

CMD [ "node", "./dist/index.js" ]