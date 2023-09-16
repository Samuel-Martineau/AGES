FROM node:20-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

COPY ./patches ./patches
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY ./ ./

RUN pnpm build

ENV PORT=80
EXPOSE 80

CMD [ "node", "build" ]
