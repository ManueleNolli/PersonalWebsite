FROM node:22.8.0-bullseye

# Create app directory
WORKDIR /src

# Install app dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Bundle app source
COPY . .

# Expose port and start application
EXPOSE 3000

# Build and start the application
CMD ["next", "build", "&&", "next", "start"]
