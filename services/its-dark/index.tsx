import api from "../api";
import { IDarkImageRes } from "./interface";

/**
 * “一片黑暗” api
 */
export class DarkApi {
  /* 上传并处理图片 */
  static uploadImg = async (param: FormData) => {
    const { API_HOST } = await import("@/dynamicModules/services/api");
    const res = (await api.post(`${API_HOST}/dark/upload-img`, param, {
      headers: {
        // 表示上传的是文件，而非普通的表单数据
        "Content-Type": "multipart/form-data",
      },
    })) as IDarkImageRes;
    return res;
  };
}
