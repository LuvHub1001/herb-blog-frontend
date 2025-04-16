import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navibar } from "..";

function Header() {
  const navigate = useNavigate();
  const locate = useLocation();
  const [isAdmin, setIsAdmin] = useState<boolean>(true);

  return (
    <>
      <Navibar />
      <div className="bg-header flex h-40 items-center justify-center text-white text-left">
        {isAdmin && locate.pathname !== "/admin" ? (
          <button className="cursor-pointer" onClick={() => navigate("/admin")}>
            관리자
          </button>
        ) : null}
      </div>
    </>
  );
}

export default Header;
