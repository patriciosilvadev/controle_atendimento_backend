FROM node:alpine

# make the src folder available in the docker image
ADD / /src
WORKDIR /src

# install the production dependencies from the package.json file
ENV db_url=172.17.0.1
ENV NODE_ENV=production
ENV DEBUG=-myapp:*


#app port to listen  
ENV PORT=80 

RUN npm install --only=production

# make port 80 available outside of the image
EXPOSE $PORT


# start node with the index.js file of our hello-world application
CMD ["node", "app.js"]