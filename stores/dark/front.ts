import { action, makeObservable, observable } from "mobx";
import { DarkStore } from ".";

/**
 * 前端数据
 */
export class FrontStore {
  darkStore;

  constructor(darkStore: DarkStore) {
    makeObservable(this);
    this.darkStore = darkStore;
  }

  /**
   * 数据
   */
  /* 显示全局的loading，目前一个变量能满足 */
  @observable isLoading: boolean = false;

  @action setIsLoading = (nextVal: boolean) => {
    this.isLoading = nextVal;
  };
}
