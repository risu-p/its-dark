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
import dark_default from "@/public/images/its-dark/dark_default.png";
import classNames from "classnames";
import html2canvas from "html2canvas";
import { useHtmlBgColorInit } from "@/hooks/dom";
import { DarkApi } from "@/services/its-dark";

type IProps = {};

/**
 * “一片黑暗啊” 生成器 页面
 * （html2canvas 不支持滤镜、不支持 3d，故失败了）
 */
const ItsDark: FC<IProps> = memo(({}) => {
  /* 海报节点（用于生成图片） */
  const posterRef = useRef<null | HTMLDivElement>(null);

  /* 选择的图片url */
  const [imgDataUrl, setImgDataUrl] = useState<undefined | string>(undefined);
  /* 生成的图片url */
  const [resultImgUrl, setResultImgUrl] = useState<undefined | string>(
    undefined
  );

  /* 页面背景颜色 */
  useHtmlBgColorInit("#eee");

  /**
   * 初始化
   */
  useLayoutEffect(() => {
    // 测试一下调接口
    DarkApi.test();
  }, []);

  /*  读取选择的图片文件 */
  const readImgFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setImgDataUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  }, []);

  /* 选择图片文件回调 */
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (file) {
        // 如果选了一张图片
        readImgFile(file);
      }
    },
    [readImgFile]
  );

  /* 清空选择的图片 */
  const deleteSelectImg = useCallback(() => {
    setImgDataUrl("");
  }, []);

  /* 生成图片 */
  const generatePic = useCallback(async () => {
    if (posterRef.current) {
      const canvas = await html2canvas(posterRef.current);
      const dataUrl = canvas.toDataURL("image/png");
      setResultImgUrl(dataUrl);
    }
  }, []);

  return (
    <div className={styles.wrap}>
      {/* 标题 */}
      <div className={styles.title}>一片黑暗啊</div>

      {/* 表单部分 */}
      <div className={styles.form}>
        {/* 选择图片按钮 */}
        <div className={styles.selectImgBtn}>
          <div className={styles.selectImgBtnShown}>
            <div className={styles.selectImgBtnShownText}>选择一张图片</div>
          </div>
          <input
            className={styles.selectImgBtnInput}
            type={"file"}
            accept="image/*"
            onChange={onFileChange}
          />
        </div>
      </div>

      {/* 展示区域 */}
      <div className={styles.posterWrap}>
        {/* 用于生成图片的海报 */}
        <div className={styles.poster} ref={posterRef}>
          {/* 图片 */}
          <div
            className={styles.posterImg}
            style={{
              backgroundImage: `url(${imgDataUrl || dark_default.src})`,
            }}
          />
          {/* 蒙层 */}
          <div className={styles.posterMask}></div>
          {/* 文本 */}
          <div className={styles.posterDesc}>
            <div className={styles.posterDescText}>前途一片黑暗啊！</div>
            <div className={styles.posterDescText}>（絕望）</div>
          </div>
          {/* 光照 */}
          <div className={styles.posterLight}>
            <div className={styles.posterLightItem}></div>
            <div className={classNames(styles.posterLightItem, "is-1")}></div>
            <div className={classNames(styles.posterLightItem, "is-2")}></div>
            <div className={classNames(styles.posterLightItem, "is-3")}></div>
            <div className={classNames(styles.posterLightItem, "is-4")}></div>
          </div>
        </div>

        {/* 删除按钮 */}
        {!!imgDataUrl ? (
          <div className={styles.delete} onClick={deleteSelectImg}>
            <div className={styles.deleteText}>清空</div>
          </div>
        ) : null}
      </div>

      {/* 生成 */}
      <div className={styles.generateBtn} onClick={generatePic}>
        <div className={styles.generateBtnText}>生成图片</div>
      </div>

      {/* 结果图 */}
      <div className={styles.result}>
        {resultImgUrl ? (
          <img src={resultImgUrl} className={styles.resultImg} />
        ) : null}
      </div>
    </div>
  );
});

export default ItsDark;
