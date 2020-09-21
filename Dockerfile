FROM node:lts
COPY . /app
RUN cd /app && \
    npm install && \
    npm run build
WORKDIR /app
EXPOSE 3000
CMD ["npm", "start"]
