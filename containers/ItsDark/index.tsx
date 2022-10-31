import default_processed from "@/public/images/its-dark/default_processed.png";
import logo from "@/public/images/logo.png";

import React, {
  FC,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import html2canvas from "html2canvas";
import { useHtmlBgColorInit } from "@/hooks/dom";
import { DarkApi } from "@/services/its-dark";

type IProps = {};

/* 默认图片 */
const DEFAULT_IMG = default_processed.src;

/**
 * “一片黑暗啊” 生成器 页面
 * （html2canvas 不支持滤镜、不支持 3d，故失败了）
 */
const ItsDark: FC<IProps> = memo(({}) => {
  /* 海报节点（用于生成图片） */
  const posterRef = useRef<null | HTMLDivElement>(null);

  /* 选择的图片file（用于上传） */
  // const [imgFile, setImgFile] = useState<null | File>(null);
  /* 选择的图片url */
  // const [imgDataUrl, setImgDataUrl] = useState<undefined | string>(undefined);
  /* 生成的图片url */
  const [resultImgUrl, setResultImgUrl] = useState<undefined | string>(
    undefined
  );

  /* 页面背景颜色 */
  useHtmlBgColorInit("#eee");

  /**
   * 初始化
   */
  useLayoutEffect(() => {}, []);

  /*  读取选择的图片文件 */
  // const readImgFile = useCallback((file: File) => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const dataUrl = reader.result as string;
  //     setImgDataUrl(dataUrl);
  //   };
  //   reader.readAsDataURL(file);
  // }, []);

  /* 生成图片 */
  const generatePic = useCallback(async (file: File) => {
    if (file !== null) {
      // 构建formData对象，来存储要上传的文件
      const formData = new FormData();
      formData.append("file", file);
      // 调接口
      const res = await DarkApi.uploadImg(formData);
      if (res.status) {
        setResultImgUrl(res.data);
      }
    }
  }, []);

  /* 选择图片文件回调 */
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (file) {
        // 选择了一张图片，上传给服务器处理
        generatePic(file);
        // setImgFile(file);
        // readImgFile(file);
      }
    },
    [generatePic]
  );

  /* 清空选择的图片 */
  const deleteSelectImg = useCallback(() => {
    setResultImgUrl("");
  }, []);

  /* 渲染展示区域（老的，纯dom结构，现在没用的） */
  // const renderPoster = useCallback(() => {
  //   return (
  //     <div className={styles.posterWrap}>
  //       {/* 用于生成图片的海报 */}
  //       <div className={styles.poster} ref={posterRef}>
  //         {/* 图片 */}
  //         <div
  //           className={styles.posterImg}
  //           style={{
  //             backgroundImage: `url(${DEFAULT_IMG})`,
  //           }}
  //         />
  //         {/* 蒙层 */}
  //         <div className={styles.posterMask}></div>
  //         {/* 文本 */}
  //         <div className={styles.posterDesc}>
  //           <div className={styles.posterDescText}>前途一片黑暗啊！</div>
  //           <div className={styles.posterDescText}>（絕望）</div>
  //         </div>
  //         {/* 光照 */}
  //         <div className={styles.posterLight}>
  //           <div className={styles.posterLightItem}></div>
  //           <div className={classNames(styles.posterLightItem, "is-1")}></div>
  //           <div className={classNames(styles.posterLightItem, "is-2")}></div>
  //           <div className={classNames(styles.posterLightItem, "is-3")}></div>
  //           <div className={classNames(styles.posterLightItem, "is-4")}></div>
  //         </div>
  //       </div>
  //       {/* {!!imgDataUrl ? (
  //         <div className={styles.delete} onClick={deleteSelectImg}>
  //           <div className={styles.deleteText}>清空</div>
  //         </div>
  //       ) : null} */}
  //     </div>
  //   );
  // }, []);

  return (
    <div className={styles.wrap}>
      {/* logo */}
      <div className={styles.logo}>
        <img src={logo.src} className={styles.logoImg} />
        <div className={styles.logoText}>关于我们</div>
      </div>

      {/* 标题 */}
      <div className={styles.title}>“一片黑暗啊”表情包生成</div>

      {/* 表单部分 */}
      <div className={styles.form}>
        {/* 选择图片按钮 */}
        {!resultImgUrl ? (
          <div className={styles.selectImgBtn}>
            <div className={styles.selectImgBtnShown}>
              <div className={styles.selectImgBtnShownText}>请选择一张图片</div>
            </div>
            <input
              className={styles.selectImgBtnInput}
              type={"file"}
              accept="image/*"
              onChange={onFileChange}
            />
          </div>
        ) : (
          <div className={styles.reselect}>
            <div className={styles.reselectLeft}>
              <div className={styles.reselectLeftShown}>
                <div className={styles.reselectLeftShownText}>重新选择</div>
              </div>
              <input
                className={styles.reselectLeftInput}
                type={"file"}
                accept="image/*"
                onChange={onFileChange}
              />
            </div>
            <div className={styles.reselectRight} onClick={deleteSelectImg}>
              <div className={styles.reselectRightText}>清空</div>
            </div>
          </div>
        )}
      </div>

      {/* 展示区域 */}
      {/* {renderPoster()} */}

      {/* 生成按钮 */}
      {/* <div className={styles.generateBtn} onClick={generatePic}>
        <div className={styles.generateBtnText}>生成图片</div>
      </div> */}

      {/* 结果图 */}
      <div className={styles.result}>
        <img src={resultImgUrl || DEFAULT_IMG} className={styles.resultImg} />
        <div className={styles.resultComment}>长按或右键保存</div>
      </div>
    </div>
  );
});

export default ItsDark;
