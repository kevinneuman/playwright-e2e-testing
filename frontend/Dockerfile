FROM node:20-alpine as builder

ENV NEXT_PUBLIC_API_URL=http://localhost:8000

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN npm prune --production


FROM node:20-alpine

ENV BACKEND_URL=http://backend:8000

WORKDIR /app

COPY --from=builder /app/package.json ./

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/.next ./.next

COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["yarn", "start"]
