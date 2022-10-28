const Koa = require("koa");
const app = new Koa();

const { darkRouter } = require("./routers/dark");
const { allowCors } = require("./middlewares/cors");
const { useTimeLogger } = require("./middlewares/log");

/* 允许跨域 */
app.use(allowCors);
/* logger */
app.use(useTimeLogger);

/* 路由 */
app.use(darkRouter.routes()).use(darkRouter.allowedMethods());

const PORT = 8001;

app.listen(PORT, () => {
  console.log(`【koa】已在 ${PORT} 端口启动`);
});
