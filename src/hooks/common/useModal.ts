import { useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen((prev: boolean) => !prev);
    }
  };

  return { isOpen, handleClick, setIsOpen };
};

export default useModal;
