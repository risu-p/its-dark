import { makeObservable, observable } from "mobx";
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
  @observable empty: null = null;
}
