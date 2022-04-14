ARG BASE_IMAGE=node:16-buster
FROM $BASE_IMAGE
RUN apt update && apt-get install sqlite3
RUN mkdir -p /harmony
COPY ./package.json package-lock.json lerna.json /harmony/
WORKDIR /harmony
RUN npm install
COPY . /harmony/
RUN rm -f config/services.yml
# build the sqlite dabase
RUN ./bin/create-database development
RUN chown -R node /harmony
USER node
ENTRYPOINT [ "npm", "run", "start" ]