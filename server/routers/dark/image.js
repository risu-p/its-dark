const gm = require("gm");

/**
 * 提供异步的gm处理函数
 * 处理图片
 */
const asyncDarkGm = (buf) => {
  return new Promise((resolve, reject) => {
    // 最终生成的图片宽高（正方形）
    const CANVAS_WIDTH = 300;

    const gmObj = gm(buf);
    gmObj.size((err, size) => {
      if (err) {
        reject(err);
      } else {
        /* 实现 background-size: cover 的效果 */
        // 图片本身宽高
        const imgWidth = size.width;
        const imgHeight = size.height;
        // 计算一边刚好铺满的缩放比
        const xScale = CANVAS_WIDTH / size.width;
        const yScale = CANVAS_WIDTH / size.height;
        const maxScale = Math.max(xScale, yScale);
        // 缩放后的图片宽高
        const scaleWidth = imgWidth * maxScale;
        const scaleHeight = imgHeight * maxScale;

        gmObj
          .resize(scaleWidth, scaleHeight) // 重新设置图片宽高
          .gravity("Center")
          .background("#fff")
          .extent(CANVAS_WIDTH, CANVAS_WIDTH) // 居中画在画布上
          .colorspace("GRAY") // 灰度
          .contrast(-2) // 对比度
          .modulate(80) // 调节（亮度，基础是100）
          /* 文本 */
          .encoding("Unicode")
          .font("./static/fonts/NotoSansSC-Bold.otf")
          .fill('#fff')
          .fontSize(30)
          .drawText(0, 95, "前途一片黑暗啊！\n（絕望）", "Center")
          .blur(0.8,0.8) // 模糊
          .toBuffer("PNG", function (err, buffer) {
            if (err) {
              reject(err);
            } else {
              // done！
              let base64 = buffer.toString("base64");
              base64 = `data:image/png;base64,${base64}`;
              resolve(base64);
            }
          });
      }
    });
  });
};

module.exports = {
  asyncDarkGm,
};
