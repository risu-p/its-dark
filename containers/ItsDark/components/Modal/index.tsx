import close from "@/public/images/its-dark/close.png";
import classNames from "classnames";
import Image from "next/image";

import { CenterPopup } from "antd-mobile";

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
  return (
    <CenterPopup
      className={styles.wrap}
      visible={visible}
      onMaskClick={() => {
        onClose();
      }}
    >
      <div className={styles.panel}>
        <div className={styles.panelBody}>{children}</div>
        <div className={styles.panelFooter} onClick={onClose}>
          <Image src={close} alt="close" className={styles.panelFooterIcon} />
          <div className={styles.panelFooterText}>关闭</div>
        </div>
      </div>
    </CenterPopup>
  );
});

export default Modal;
