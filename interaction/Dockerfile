FROM node

WORKDIR /app/interaction

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8003

CMD ["npm", "run", "dev"]