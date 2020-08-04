FROM node:lts
COPY . /app
RUN cd /app && \
    npm install && \
    npm run build
EXPOSE 3030
CMD cd /app && npm start
