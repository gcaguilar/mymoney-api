FROM oven/bun:slim as base
RUN apt-get update && apt-get install libssl-dev ca-certificates -y
WORKDIR /api

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY package.json bun.lockb ./

FROM base as build
RUN bun install


COPY tsconfig.json .
COPY dist ./dist/
COPY prisma ./prisma/
RUN bun run build

FROM base AS prod-build

RUN bun install --production
COPY prisma ./prisma/
RUN cp -R node_modules prod_node_modules

FROM base AS prod

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 express

COPY --from=prod-build /app/prod_node_modules /app/node_modules
RUN chown express:nodejs -R /app/node_modules

USER express

COPY --from=build /app/prisma /app/prisma

CMD [ "bun", "run", "start" ]