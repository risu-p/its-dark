export interface IServerRes<T> {
  status: boolean;
  description: string;
  data: T;
}

/**
 * 图片处理接口的返回
 */
export type IDarkImageRes = IServerRes<string>;
