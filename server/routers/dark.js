const Router = require("koa-router");

const darkRouter = new Router();

/**
 * its-dark 页面用到的接口
 */
darkRouter.get("/dark", async (ctx) => {
    ctx.body = 'hello'
});

module.exports = {
  darkRouter,
};
