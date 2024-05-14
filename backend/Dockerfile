FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

ENV NODE_ENV=development

RUN yarn build

RUN npm prune --production


FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/dist /app/dist

COPY --from=builder /app/prisma /app/prisma

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production && \
    yarn cache clean

EXPOSE 8000

CMD ["yarn", "serve"]
