# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package and package-lock files
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /app

# Build the production version of the frontend
RUN npm run build
ENV PORT=3000
EXPOSE 3000
CMD ["npm" , "start"]
