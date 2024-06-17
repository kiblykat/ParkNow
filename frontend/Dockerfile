FROM node:18-alpine
WORKDIR /parknow
COPY public /parknow/public
COPY src /parknow/src
COPY package.json package-lock.json /parknow/
RUN npm install
CMD ["npm", "start"]



# # Use a lightweight Node.js image as the base
# FROM node:18-alpine AS builder

# # Set the working directory inside the container
# WORKDIR /app

# # Copy the application code from the current directory
# COPY . .

# # Install dependencies
# RUN npm ci

# # Build the React app for production
# RUN npm run build

# # Use a separate image for serving the built app (nginx)
# FROM nginx:alpine

# # Copy the built app from the builder stage
# COPY --from=builder /app/build /usr/share/nginx/html

# # Replace the default Nginx configuration (optional)
# # COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Expose the port where the app is served (usually 80)
# EXPOSE 80

# # Start the Nginx server
# CMD ["nginx", "-g", "daemon off;"]
