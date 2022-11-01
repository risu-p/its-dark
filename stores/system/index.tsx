import { action, makeObservable, observable } from "mobx";

/**
 * 整个应用的store（例如 时间信息、设备信息）
 */
export class SystemStore {
  constructor() {
    makeObservable(this);
  }

  /**
   * 数据
   */
  /* 是否为移动端设备 */
  @observable isMobile: boolean | undefined = undefined;

  /**
   * action
   */
  @action setIsMobile = (nextVal: boolean) => {
    this.isMobile = nextVal;
  };
}

export const systemStore = new SystemStore();
