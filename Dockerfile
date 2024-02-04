FROM node
WORKDIR /app
COPY . /app
RUN npm install
ENTRYPOINT ["npm","run","dev"]