# 基于node:16环境，构建生产环境运行的最小集合
FROM node:16 AS runner

WORKDIR /app
# 把当前目录全部拷贝进来即可
COPY ./ ./
# apt-get安装gm的依赖（需要先换源）
ADD ./docker/source.list /etc/apt
RUN apt-get update && \
    apt-get install -y graphicsmagick imagemagick
# npm安装项目依赖（需要先换源）
RUN npm config set registry https://registry.npm.taobao.org/ && \
    npm install
# 即可运行
EXPOSE 9011

CMD ["npm", "run", "dev"]