/**
 * 下载图片
 */
export const downloadImg = (imgUrl: string, fileName: string) => {
  const a = document.createElement("a");
  a.href = imgUrl;
  a.download = fileName; //fileName保存提示中用作预先填写的文件名
  a.click();
};
