FROM node:24-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY publisher.mjs server.mjs ./
ENV HOST=0.0.0.0 PORT=4335 NODE_ENV=production
USER node
EXPOSE 4335
CMD ["node", "server.mjs"]
