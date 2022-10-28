/**
 * 处理完成后，打印处理耗时
 */
const useTimeLogger = async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
};

module.exports = {
    useTimeLogger
}