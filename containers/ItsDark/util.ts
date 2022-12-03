/**
 * 通过canvas，将带 orientation 信息的图片，转成竖直方向
 */
export const changeImgOrientation = (
  file: File,
  orientation?: number
): Promise<File> => {
  return new Promise((resolve, reject) => {
    console.log("【图片文件】file", file);

    /* 1. 读图片 */
    const fileReader = new FileReader();
    fileReader.onload = () => {
      // readAsDataURL()调用后的result一定是string类型
      const fileUrl = fileReader.result as string;

      /* 2. Image加载图片，得到宽高 */
      const image = new Image();
      image.onload = () => {
        const width = image.width;
        const height = image.height;
        console.log("【图片宽高】", width, "*", height);

        // 正常情况，canvas宽高和图片宽高相同，不需要旋转
        let canvasWidth = width;
        let canvasHeight = height;

        /**
         * 2022.12.3 本来想的根据orientation旋转canvas
         * 但发现不管什么方向的图片，绘制到 canvas 上后，都是正向的！canvas的宽高、角度，都不需要处理
         * 相当于图片走了一遍canvas后，都是正向的了
         */
        // if (orientation === 6 || orientation === 8) {
        //   // 要把横的图片转为竖的，最终宽高与图片宽高需要交换
        //   canvasWidth = height;
        //   canvasHeight = width;
        // }
        const canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(image, 0, 0, width, height);
          /* 对画布进行旋转 */
          //   if (orientation === 6) {
          //     ctx.rotate((90 * Math.PI) / 180);
          //     // 将图片画在画布上（按旋转前的位置画。注意，并不是在0,0画）
          //     ctx.drawImage(image, 0, -height, width, height);
          //   } else if (orientation === 8) {
          //     ctx.rotate((270 * Math.PI) / 180);
          //     ctx.drawImage(image, -width, 0, width, height);
          //   } else if (orientation === 3) {
          //     ctx.rotate((180 * Math.PI) / 180);
          //     ctx.drawImage(image, -width, -height, width, height);
          //   } else {
          //     ctx.drawImage(image, 0, 0, width, height);
          //   }
        }
        canvas.toBlob((blob) => {
          console.log("【处理完成】Blob", blob);
          if (blob) {
            const resFile = new File([blob], file.name);
            console.log("处理完成【File】", resFile);
            resolve(resFile);
          }
        });
      };
      image.src = fileUrl;
    };
    fileReader.readAsDataURL(file);
  });
};
