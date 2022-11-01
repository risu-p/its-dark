import { IScss } from "@/constants/scss/interface";
import { mergeStyles } from "@/constants/scss/util";
import classNames from "classnames";
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./index.module.scss";

type IProps = {
  text: string; // 按钮内容
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  theme?: IScss;
};

/**
 * 选择图片按钮
 * （dom盖在input上）
 */
const SelectImgBtn: FC<IProps> = memo(({ onChange, text, theme }) => {
  const mergedStyles = useMemo(() => {
    return mergeStyles(styles, theme);
  }, [theme]);

  return (
    <div className={mergedStyles.btn}>
      {/* 按钮显示的样式 */}
      <div className={mergedStyles.btnShown}>
        <div className={mergedStyles.btnShownText}>{text}</div>
      </div>
      {/* 藏在下面的input */}
      <input
        className={mergedStyles.btnInput}
        type={"file"}
        accept="image/*"
        onChange={onChange}
      />
    </div>
  );
});

export default SelectImgBtn;
