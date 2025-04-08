import { useModal } from "../../hooks";
import { LoginModal } from "../";

function Footer() {
  const { isOpen, handleClick } = useModal();

  return (
    <>
      <div className="flex mt-30 h-30 w-full items-center justify-center bg-black text-white">
        <div>ⓒ 2025. Herb Corp. All rights reserved.</div>
        <img
          className="cursor-pointer"
          src="/images/user_icon.png"
          onClick={handleClick}
        />
      </div>

      {isOpen ? (
        <div
          className="flex mt-20 fixed inset-0 items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleClick}
        >
          <LoginModal />
        </div>
      ) : null}
    </>
  );
}

export default Footer;
