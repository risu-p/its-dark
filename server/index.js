const { darkRouter } = require("./routers/dark");
const { allowCors } = require("./middlewares/cors");
const { useTimeLogger } = require("./middlewares/log");

const Koa = require("koa");
const app = new Koa();

/* 允许跨域 */
app.use(allowCors);
/* logger */
app.use(useTimeLogger);

/* 路由 */
app.use(darkRouter.routes()).use(darkRouter.allowedMethods());

const PORT = 9011;

app.listen(PORT, () => {
  console.log(`【koa】已在 ${PORT} 端口启动`);
});
