import { useCallback, useState } from "react";

/**
 * 使用一个简单弹窗
 * 返回弹窗状态、打开、关闭方法
 */
export const useModal = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const openModal = useCallback(() => {
    console.log("open");
    setModalVisible(true);
  }, [setModalVisible]);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  return {
    modalVisible,
    openModal,
    closeModal,
  };
};
