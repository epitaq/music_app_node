FROM --platform=linux/x86_64 node:18

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

EXPOSE 3000
CMD ["npm", "run", "start"]

