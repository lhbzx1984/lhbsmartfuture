FROM node:20-alpine

WORKDIR /app

# 复制依赖文件
COPY package.json package-lock.json ./

# 安装依赖
RUN npm ci --production

# 复制构建产物
COPY dist ./dist

# 复制环境变量模板（实际部署时需要设置）
COPY .env.example ./.env.example

# 设置端口
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

# 启动服务
CMD ["node", "dist/server.cjs"]