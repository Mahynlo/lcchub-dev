FROM node:21.7-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 62213
CMD ["npm", "start"]
