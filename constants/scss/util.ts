import classNames from "classnames";
import { IScss } from "./interface";

/**
 * 公共组件支持样式覆盖时使用
 * 将外部传入的 theme 参数与组件 styles 合并（以styles的key为准）
 */
export const mergeStyles = (styles: IScss, theme?: IScss): IScss => {
  const mergedStyles: IScss = { ...styles };
  if (theme) {
    /* 有自定义样式，则以styles的key为准进行合并 */
    for (let key in styles) {
      mergedStyles[key] = classNames(styles[key], theme?.[key]);
    }
  }

  return mergedStyles;
};
