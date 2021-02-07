FROM node:12
WORKDIR /app
ADD package.json /app/package.json
ADD dist /app/dist
RUN yarn install
CMD ["yarn", "run", "start:prod"]
