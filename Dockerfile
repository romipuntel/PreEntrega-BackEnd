FROM node
COPY . .
RUN npm install
EXPOSE 4000
CMD ["node","src/index.js"]

