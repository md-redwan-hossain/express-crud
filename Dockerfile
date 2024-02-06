FROM node:lts
LABEL maintainer="Md. Redwan Hossain"
RUN bash -c "npm install -g dbmate"
USER node
WORKDIR /node-app
COPY --chown=node:node package*.json .
RUN bash -c "npm install"
COPY --chown=node:node . .
RUN bash -c "npm run build"
RUN bash -c "python3 migrator.py"
EXPOSE 3020