import logo_l from "@/public/images/logo_l.png";

import Image from "next/image";
import React, { FC, memo, useCallback, useEffect, useState } from "react";
import Modal from "../components/Modal";
import styles from "./index.module.scss";

type IProps = {
  visible: boolean;
  onClose: () => void;
};

/**
 * 关于我们 弹窗
 */
const AboutModal: FC<IProps> = memo(({ visible, onClose }) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      <div className={styles.wrap}>
        <Image src={logo_l} alt="logo" className={styles.logo} />
        <div className={styles.title}>关于我们</div>
        <div className={styles.desc}>
          <div className={styles.descText}>
            我们是一个特别厉害的团队，每个产品都是这么棒棒的，还不快来使用我们！
          </div>
          <div className={styles.descText}>研发：花栗鼠</div>
          <div className={styles.descText}>设计：皮蛋瘦肉粥</div>
          <div className={styles.descText}>合作联系：risup0812@163.com</div>
        </div>
      </div>
    </Modal>
  );
});

export default AboutModal;
