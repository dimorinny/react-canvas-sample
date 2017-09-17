FROM kkarczmarczyk/node-yarn:latest

WORKDIR /web

# Install dependencies
ADD package.json package.json
RUN yarn install

# Build bundle
ARG base
ENV NODE_ENV production
ENV BASE $base

RUN echo $BASE

ADD . .
RUN $(npm bin)/webpack

# Cleanup
RUN rm -rf node_modules

VOLUME /web/dist
