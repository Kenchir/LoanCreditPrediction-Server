FROM node:12

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./

RUN npm install

# Copying source files
COPY . .

EXPOSE 8080
# Building app
RUN npm run build --if-present

RUN npm install -g pm2
# Running the app
CMD [ "pm2", "app.js" ]