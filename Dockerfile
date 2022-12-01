# 基于node:16环境，构建生产环境运行的最小集合

# 只将生产环境运行需要的最小文件，拷贝到最终镜像中
FROM node:16 AS runner
# 工作目录
WORKDIR /app
ENV NODE_ENV production
# 不向next官方发布运行时信息
ENV NEXT_TELEMETRY_DISABLED 1
# 自己的 next.config.js 需要拷贝过来
COPY ./next.config.js ./
# 静态文件需要拷贝过来
COPY ./public ./public
# 构建的最小输出拷贝过来，解压、使用、删除
COPY ./dist.tar  ./
# 因为之前已经把完整的 /public 拷贝过来了，故需删除 /standalone/publc
RUN tar -xvf dist.tar && \
    rm -rf ./dist/standalone/public && \
    mv ./dist/standalone/* ./ && \
    mv ./dist/standalone/.next ./ && \
    mv ./dist/static ./.next/static && \
    rm -rf ./dist && \
    rm dist.tar
EXPOSE 9010
ENV PORT 9010

CMD ["node", "server.js"]
