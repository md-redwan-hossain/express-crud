FROM node:lts
LABEL maintainer="Md. Redwan Hossain"
RUN bash -c "yarn global add dbmate"
USER node
WORKDIR /node-app
COPY --chown=node:node package.json yarn.lock ./
RUN bash -c "yarn install"
COPY --chown=node:node . .
RUN bash -c "yarn run build"
RUN bash -c "python3 migrator.py"
EXPOSE 8000
