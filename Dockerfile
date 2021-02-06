FROM node:12
WORKDIR /app
ADD package.json /app/package.json
RUN yarn install
ADD . /app
CMD ["yarn", "run", "start"]
