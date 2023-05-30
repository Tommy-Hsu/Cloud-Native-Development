FROM node:18.16.0-alpine

# Sets the working directory as "/server"
WORKDIR /server

# Copies the package.json file into "/server" and runs npm install
COPY package.json .
RUN npm i

# Copies the source code into "/server"
COPY ../dp-endpoints-erver/models ./models
COPY ../dp-endpoints-erver/routes ./routes
COPY .env .
COPY app.js .

# Specifies the port the mongodb will be running on
EXPOSE 5000

CMD ["node", "app.js"]