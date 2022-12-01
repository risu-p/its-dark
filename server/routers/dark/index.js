const Router = require("koa-router");
const koaBody = require("koa-body");
const fs = require("fs");

const { asyncDarkGm } = require("./image");

const darkRouter = new Router();

/**
 * its-dark 页面用到的接口
 */
darkRouter.post(
  "/dark/upload-img",
  koaBody({
    multipart: true, // 也解析文件类型
    formidable: {
      multiples: false,
      maxFieldsSize: 10 * 1024 * 1024, // 最大10m（其实该字段不会限制住body中的file大小）
    },
  }),
  async (ctx) => {
    /* files 中的 key 就是上传文件时 formData 中设的key */
    const files = ctx.request.files;
    const imgFile = files.file;
    const buf = fs.readFileSync(imgFile.filepath);
    try {
      let base64 = await asyncDarkGm(buf);
      ctx.body = {
        status: true,
        data: base64,
      };
    } catch (err) {
      ctx.body = {
        status: false,
        description: `${err.message}`,
      };
    }
  }
);

module.exports = {
  darkRouter,
};
