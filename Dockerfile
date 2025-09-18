FROM node:16 as base
WORKDIR /nodeApp
ARG NODE_ENV
RUN if [$NODE_ENV="development"]; \
    then npm install; \
    else npm install --only="production"; \
    fi;
COPY . .
ENV PORT 4000
EXPOSE $PORT
CMD [ "npm","run","start-dev" ]

# FROM base as production
# WORKDIR /nodeApp
# COPY package.json .
# RUN npm install --only=production
# COPY . .
# EXPOSE 4000
# CMD [ "npm","start" ]

# FROM base as development
# WORKDIR /nodeApp
# COPY package.json .
# RUN npm install
# COPY . .
# EXPOSE 4000
# CMD [ "npm","run","start-dev" ]