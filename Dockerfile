FROM node:lts-slim
LABEL maintainer="Md. Redwan Hossain"
USER node
WORKDIR /node-app
COPY --chown=node:node package.json yarn.lock ./
RUN bash -c "yarn install"
COPY --chown=node:node . .
RUN bash -c "yarn run build"
RUN bash -c "npx drizzle-kit push:sqlite"
EXPOSE 8000
