import close from "@/public/images/its-dark/close.png";
import classNames from "classnames";
import Image from "next/image";

import React, {
  FC,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./index.module.scss";

type IProps = {
  children: ReactNode;
  visible: boolean;
  onClose: () => void;
};

/**
 * 弹窗组件
 */
const Modal: FC<IProps> = memo(({ children, visible, onClose }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.panel}>
        <div className={styles.panelBody}>{children}</div>
        <div className={styles.panelFooter} onClick={onClose}>
          <div className={styles.panelFooterIcon}>
            <Image src={close} alt="close" />
          </div>
          <div className={styles.panelFooterText}>关闭</div>
        </div>
      </div>
    </div>
  );
});

export default Modal;
