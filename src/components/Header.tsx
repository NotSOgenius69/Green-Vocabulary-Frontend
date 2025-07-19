import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [LoggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const updateLoginbtn = ()=> setLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener('authChanged',updateLoginbtn);
    return ()=> window.removeEventListener('authChanged',updateLoginbtn);
  }, []);

  const handleLogout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event('authChanged'));
    setLoggedIn(false);
  };
  return (
    <div className="flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-gray-50">
      <Link to="/">
      <h1 className="font-sometype text-3xl font-bold tracking-tight text-center text-[#2e7d32]">
        Green Vocabulary
      </h1>
      </Link>
      <div>
        {LoggedIn ? (
          <button 
          onClick={handleLogout}
          className="mr-3 px-4 py-2 rounded border border-[#2e7d32] text-[#2e7d32] bg-white hover:bg-[#e8f5e9] transition-colors">
            Logout
          </button>
        ) : (
          <Link to="/auth/login">
            <button className="mr-3 px-4 py-2 rounded border border-[#2e7d32] text-[#2e7d32] bg-white hover:bg-[#e8f5e9] transition-colors">
              Login
            </button>
          </Link>
        )}
        <Link to="/auth/signup">
          <button className="px-4 py-2 rounded border border-[#2e7d32] text-white bg-[#2e7d32] hover:bg-[#256029] transition-colors">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
