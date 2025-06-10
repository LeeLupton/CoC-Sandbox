FROM node:20-alpine
WORKDIR /app
# install dependencies for api
COPY api/package.json ./api/package.json
RUN cd api && npm install --production
# copy source
COPY . .
WORKDIR /app/api
EXPOSE 3000
CMD ["node", "src/index.js"]
