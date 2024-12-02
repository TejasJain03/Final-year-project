# Use a base image for Node.js
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./

RUN npm install

# Copy project files
COPY . .

# Expose the server port
EXPOSE 8081

# Start the application using nodemon
CMD ["npm", "run","start"]
