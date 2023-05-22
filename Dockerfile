# Base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose a port (if your application requires it)
EXPOSE 5173

# Command to run when the container starts
CMD [ "npm", "run", "dev" ]

