import { CenterPopup, DotLoading } from "antd-mobile";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import styles from "./index.module.scss";
type IProps = {
  visible: boolean;
};

/**
 * 全局Loading，其实也是一个弹窗
 */
const GlobalLoading: FC<IProps> = memo(({ visible }) => {
  return (
    <CenterPopup className={styles.wrap} visible={visible}>
      <div className={styles.panel}>
        <DotLoading color="rgba(255,255,255,0.9)" className={styles.panelLoading} />
      </div>
    </CenterPopup>
  );
});

export default GlobalLoading;
