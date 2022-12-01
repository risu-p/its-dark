import qrcode from "@/public/images/its-dark/qrcode.png";
import wxMiniProgram from "@/public/images/its-dark/wxMiniProgram.png";
import { darkStore } from "@/stores/dark";
import { downloadImg } from "@/utils/image";
import { observer } from "mobx-react";

import Image from "next/image";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import Modal from "../components/Modal";
import styles from "./index.module.scss";

type IProps = {
  visible: boolean;
  onClose: () => void;
};

/**
 * 分享 弹窗
 */
const ShareModal: FC<IProps> = observer(({ visible, onClose }) => {
  const {
    frontStore: { setIsLoading },
  } = darkStore;

  const saveQrcode = useCallback(() => {
    downloadImg(qrcode.src, "一片黑暗啊表情包生成器");
  }, []);

  return (
    <Modal visible={visible} onClose={onClose}>
      <div className={styles.wrap}>
        <div className={styles.title}>扫描下方二维码，快速打开页面</div>
        <Image
          src={qrcode}
          alt="logo"
          className={styles.qrcode}
          width={190}
          height={190}
        />
        <div className={styles.save} onClick={saveQrcode}>
          <Image
            src={wxMiniProgram}
            alt="save"
            width={11}
            height={11}
            className={styles.saveIcon}
          />
          <div className={styles.saveText}>保存二维码</div>
        </div>
      </div>
    </Modal>
  );
});

export default ShareModal;
