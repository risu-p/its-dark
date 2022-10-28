import { makeObservable, observable } from "mobx";
import { DarkStore } from ".";

/**
 * 接口数据
 */
export class ApiStore {
  darkStore;

  constructor(darkStore: DarkStore) {
    makeObservable(this);
    this.darkStore = darkStore;
  }

  /**
   * 数据
   */
  @observable empty: null = null;
}
