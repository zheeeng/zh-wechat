FROM node:12
WORKDIR /app
ADD package.json /app/package.json
ADD dist /app/dist
RUN yarn add
CMD ["yarn", "run", "start:prod"]
