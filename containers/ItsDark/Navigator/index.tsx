import Image from "next/image";
import logo from "@/public/images/logo.png";
import share from "@/public/images/its-dark/share.png";

import React, { FC, memo, useCallback, useEffect, useState } from "react";
import styles from "./index.module.scss";

type IProps = {
  openAboutModal: () => void;
  openShareModal: () => void;
};

/**
 * 顶部导航栏
 */
const Navigator: FC<IProps> = memo(({ openAboutModal, openShareModal }) => {
  return (
    <div className={styles.wrap}>
      {/* logo */}
      <div className={styles.logo} onClick={openAboutModal}>
        <Image src={logo} className={styles.logoImg} alt="logo" />
        <div className={styles.logoText}>关于我们</div>
      </div>
      {/* 分享 */}
      <div className={styles.share} onClick={openShareModal}>
        <Image src={share} className={styles.shareImg} alt="share" />
      </div>
    </div>
  );
});

export default Navigator;
