FROM node:22.1.0
WORKDIR /usr/elasticsearch-example
ENV MONGO_URI=mongodb://elasticsearch-mongodb:27017
ENV ELASTICSEARCH_URI=http://host.docker.internal:9200
COPY . .
RUN npm install
EXPOSE 5001
CMD ["npm", "run","dev"]