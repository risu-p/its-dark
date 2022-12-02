import { systemStore } from "@/stores/system";
import { downloadImg } from "@/utils/image";
import classNames from "classnames";
import { observer } from "mobx-react";
import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_IMG } from "../const";
import styles from "./index.module.scss";

type IProps = {
  resultImgUrl?: string; // 处理后的图片url
};

/**
 * 结果区域
 */
const ResultModule: FC<IProps> = observer(({ resultImgUrl }) => {
  const { isMobile } = systemStore;

  /* 当前显示的图片 */
  const currImg = useMemo(() => {
    return resultImgUrl || DEFAULT_IMG;
  }, [resultImgUrl]);

  /* js保存 */
  const onSaveClick = useCallback(() => {
    downloadImg(currImg, "一片黑暗啊");
  }, [currImg]);

  return (
    <div className={styles.result}>
      {/* 宽高自适应正方形的图 */}
      <div className={styles.resultPic}>
        <img
          src={resultImgUrl || DEFAULT_IMG}
          className={styles.resultPicImg}
        />
      </div>
      <div className={styles.resultComment}>
        {isMobile === undefined || isMobile ? "长按" : "右键"}图片可保存至相册
      </div>
      <div
        className={classNames(styles.resultBtn, {
          //   ["is-disable"]: !resultImgUrl,
        })}
        onClick={onSaveClick}
      >
        <div className={styles.resultBtnText}>保存表情</div>
      </div>
    </div>
  );
});

export default ResultModule;
