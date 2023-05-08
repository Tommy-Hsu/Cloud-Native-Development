FROM node:18.16.0-alpine

# Sets the working directory as "/app"
WORKDIR /app

# Copies the package.json file into "/app" and runs npm install
COPY package.json .
RUN npm i

# Copies the source code into "/app"
COPY public ./public
COPY src ./src

# Specifies the port the node app will be running on
EXPOSE 3000

CMD ["npm", "start"]