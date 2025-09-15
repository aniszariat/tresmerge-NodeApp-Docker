FROM node:16 as base

FROM base as production
WORKDIR /nodeApp
COPY package.json .
RUN npm install --only=production
COPY . .
EXPOSE 4000
CMD [ "npm","start" ]

FROM base as development
WORKDIR /nodeApp
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm","run","start-dev" ]