import { makeObservable, observable } from "mobx";
import { ApiStore } from "./api";
import { FrontStore } from "./front";

/**
 * "一片黑暗页"的store
 */
export class DarkStore {
  frontStore;
  apiStore;

  constructor() {
    this.apiStore = new ApiStore(this);
    this.frontStore = new FrontStore(this);
  }
}

export const darkStore = new DarkStore();
