# select your base image to start with
FROM node:12.20.0-alpine

# Create app directory
# this is the location where you will be inside the container
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# copying packages first helps take advantage of docker layers
COPY package*.json ./
COPY . .

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source

# Make this port accessible from outside the container
# Necessary for your browser to send HTTP requests to your Node app
EXPOSE 8080

# Command to run when the container is ready
# Separate arguments as separate values in the array
CMD [ "npm", "run", "start:dev"]
