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
import Navigator from "./Navigator";
import SelectImgBtn from "./components/SelectImgBtn";
import ResultModule from "./Result";

type IProps = {};

/**
 * “一片黑暗啊” 生成器 页面
 * (使用媒体查询，支持 pc、移动端 访问)
 */
const ItsDark: FC<IProps> = memo(({}) => {
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
      }
    },
    [generatePic]
  );

  /* 清空选择的图片 */
  const deleteSelectImg = useCallback(() => {
    setResultImgUrl("");
  }, []);

  return (
    <div className={styles.page}>
      {/* 内容区域，pc端访问时有最大宽度限制 */}
      <div className={styles.content}>
        {/* 顶部横条 */}
        <Navigator />

        {/* 标题 */}
        <div className={styles.title}>“一片黑暗啊”表情包生成</div>

        {/* 表单部分 */}
        <div className={styles.form}>
          {/* 选择图片按钮 */}
          {!resultImgUrl ? (
            <div className={styles.select}>
              <SelectImgBtn text="请选择一张图片" onChange={onFileChange} />
            </div>
          ) : (
            <div className={styles.reselect}>
              <div className={styles.reselectLeft}>
                <SelectImgBtn
                  text="重新选择"
                  onChange={onFileChange}
                  theme={{
                    btn: styles.reselectImgBtn,
                  }}
                />
              </div>
              <div className={styles.reselectRight} onClick={deleteSelectImg}>
                <div className={styles.reselectRightText}>清空</div>
              </div>
            </div>
          )}
        </div>

        {/* 结果模块 */}
        <ResultModule resultImgUrl={resultImgUrl} />
      </div>
    </div>
  );
});

export default ItsDark;
