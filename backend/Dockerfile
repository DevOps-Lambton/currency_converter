FROM node:18

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (adjust as needed)
EXPOSE ${PORT}

# Default command to run the app
CMD ["npm", "start"]
