FROM node:alpine

WORKDIR /app

COPY package.json ./  

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; then \
        npm install; \
    else \
        npm install --only=production; \
    fi


COPY ./ ./

ENV PORT=5000

EXPOSE $PORT

CMD ["npm", "run", "dev"]