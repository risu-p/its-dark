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
import Image from "next/image";
import title from "@/public/images/its-dark/title.png";
import AboutModal from "./AboutModal";
import { useModal } from "./components/Modal/hooks";
import { MAX_FILE_SIZE } from "./const";
import { Toast } from "antd-mobile";
import ShareModal from "./ShareModal";
import GlobalLoading from "@/components/GlobalLoading";
import { observer } from "mobx-react";
import { darkStore } from "@/stores/dark";
import EXIF from "exif-js";
import { changeImgOrientation } from "./util";

type IProps = {};

/**
 * “一片黑暗啊” 生成器 页面
 * (使用媒体查询，支持 pc、移动端 访问)
 */
const ItsDark: FC<IProps> = observer(({}) => {
  const {
    frontStore: { isLoading, setIsLoading },
  } = darkStore;

  const selectInputRef = useRef<HTMLInputElement | null>(null);
  const reselectInputRef = useRef<HTMLInputElement | null>(null);

  /* 生成的图片url */
  const [resultImgUrl, setResultImgUrl] = useState<undefined | string>(
    undefined
  );

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
        setIsLoading(false);
      } else {
        setIsLoading(false);
        Toast.show({
          content: `图片处理失败：${res.description}`,
        });
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  /* 选择图片文件回调 */
  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setIsLoading(true);
      const file = event.target.files?.[0];

      /* 选择图片时，限制文件大小 */
      if (file?.size && file.size > MAX_FILE_SIZE * 1024 * 1024) {
        Toast.show({
          content: `请上传小于${MAX_FILE_SIZE}M的图片`,
        });
        // 清空input值
        selectInputRef.current && (selectInputRef.current.value = "");
        reselectInputRef.current && (reselectInputRef.current.value = "");
        setIsLoading(false);
        return;
      }

      /* 选择了一张图片 */
      if (file) {
        // 解析exif信息，得到图片的旋转信息（就是要用到 ts-ignore，exif可以直接接受 File、Img 类型）
        // @ts-ignore
        EXIF.getData(file, function () {
          // getData执行完后，图像会多一个exifdata属性。可通过该属性获取exif信息
          // orientation: 图像方向（如果exif属性被消除了，会是undefined）
          // @ts-ignore
          const orientation = EXIF.getTag(this, "Orientation") as
            | undefined
            | number;
          console.log("【图片信息】Orientation", orientation);
          /**
           * Orientation
           * 1：ios顶部在左时，横排。正常方向。不需处理
           * 6：ios竖直拍摄时。需要顺时针转90度
           * 3：ios顶部在右时，横拍。需顺时针转180度
           * 8：ios倒着竖直拍时。需顺时针转270度
           * undefined：图片被消除了exif信息。不需处理
           * 2、4、5、7：出现在相机设置了镜像模式时，通常不会设置，故暂不做处理
           */
          changeImgOrientation(file, orientation).then((resFile) => {
            // 上传给服务器处理
            generatePic(resFile);
          });
        });
      } else {
        setIsLoading(false);
      }
    },
    [generatePic]
  );

  /* 清空选择的图片 */
  const deleteSelectImg = useCallback(() => {
    setResultImgUrl("");
  }, []);

  /* 关于弹窗 */
  const {
    modalVisible: aboutModalVisible,
    openModal: openAboutModal,
    closeModal: closeAboutModal,
  } = useModal();

  /* 分享弹窗 */
  const {
    modalVisible: shareModalVisible,
    openModal: openShareModal,
    closeModal: closeShareModal,
  } = useModal();

  return (
    <div className={styles.page}>
      {/* 内容区域，pc端访问时有最大宽度限制 */}
      <div className={styles.content}>
        {/* 顶部横条 */}
        <Navigator
          openAboutModal={openAboutModal}
          openShareModal={openShareModal}
        />

        {/* 标题 */}
        <div className={styles.title}>
          <Image src={title} alt="title" className={styles.titleImg} />
        </div>

        {/* 表单部分 */}
        <div className={styles.form}>
          {/* 选择图片按钮 */}
          {!resultImgUrl ? (
            <div className={styles.select}>
              <SelectImgBtn
                text="请选择一张图片"
                onChange={onFileChange}
                ref={selectInputRef}
              />
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
                  ref={reselectInputRef}
                />
              </div>
              <div className={styles.reselectRight} onClick={deleteSelectImg}>
                <div className={styles.reselectRightText}>清空</div>
              </div>
            </div>
          )}
        </div>

        {/* 广告位 */}
        <div className={styles.ad}>
          <div>广告位招租（这里是无敌帅气的广告）</div>
        </div>

        {/* 结果模块 */}
        <ResultModule resultImgUrl={resultImgUrl} />

        {/* 底部：友情链接 */}
        {/* <div className={styles.footer}>
          <div className={styles.footerLabel}>友情链接</div>
          <div className={styles.footerList}>
            <a href="https://www.risu-p.com" target="_blank">
              博客
            </a>
            <a href="https://wiki.risu-p.com" target="_blank">
              wiki
            </a>
          </div>
        </div> */}

        {/* 关于弹窗 */}
        <AboutModal visible={aboutModalVisible} onClose={closeAboutModal} />
        {/* 分享弹窗 */}
        <ShareModal visible={shareModalVisible} onClose={closeShareModal} />
        {/* Loading */}
        <GlobalLoading visible={isLoading} />
      </div>
    </div>
  );
});

export default ItsDark;
