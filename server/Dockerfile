# 基于node:16环境，构建生产环境运行的最小集合
FROM node:16 AS runner

WORKDIR /app
# 把当前目录全部拷贝进来即可
COPY ./ ./
# 安装依赖
RUN apt-get update && \
    apt-get install -y graphicsmagick imagemagick
RUN npm install
# 即可运行
EXPOSE 9011

CMD ["npm", "run", "dev"]