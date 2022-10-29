
FROM node:14-alpine as build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app .
RUN npm i pm2 -g
EXPOSE 3000
CMD ["pm2-runtime", "dist/index.js"]