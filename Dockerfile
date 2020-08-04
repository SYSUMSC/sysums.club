FROM node:lts
COPY . /app
RUN cd /app && \
    npm install && \
    npm run build
CMD cd /app && npm start
