import api from "../api";

const BASE_URL = "//localhost:8001";

/**
 * “一片黑暗” api
 */
export class DarkApi {
  /* 上传并处理图片 */
  static uploadImg = (param: FormData) => {
    return api.post(`${BASE_URL}/dark/upload-img`, param, {
      headers: {
        // 表示上传的是文件，而非普通的表单数据
        "Content-Type": "multipart/form-data",
      },
    });
  };
}
