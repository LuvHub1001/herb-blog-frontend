import { useModal } from "@/hooks";
import { LoginModal } from "@/components";

function Footer() {
  const { isOpen, handleClick, setIsOpen } = useModal();

  return (
    <>
      <footer className="border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto flex items-center justify-center h-16 px-5 gap-3">
          <span className="text-sm text-slate-400">
            © 2025 Herb Corp.
          </span>
          <span className="text-slate-200">|</span>
          <button
            className="text-sm text-slate-400 hover:text-indigo-500 transition-colors cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            Admin
          </button>
        </div>
      </footer>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-[1100]"
          onClick={handleClick}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <LoginModal />
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
