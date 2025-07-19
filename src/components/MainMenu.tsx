import { FiBookOpen } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { LuClipboardPenLine } from "react-icons/lu";
import type { MenuItem } from "../types/menuItems";
import Button from "./Button";
import { useEffect, useState } from "react";

const MainMenu = () => {
  const [user , setUser] = useState(
    ()=>{
      const userString = localStorage.getItem("user");
      return userString ? JSON.parse(userString) : {};
    }
  );
  useEffect(()=>{
    const updateUser = ()=>{
      const userString = localStorage.getItem("user");
      setUser(userString ? JSON.parse(userString) : {});
    };
    window.addEventListener('authChanged',updateUser);
    return ()=>window.removeEventListener('authChanged',updateUser);
  },[]);
  const isAdmin = user.isAdmin === true;
  const menuItems: MenuItem[] = 
  isAdmin?
  [
    {
      link: "/add-new",
      icon: <IoAdd size={15} />,
      label: "Add new vocabulary",
    },
    {
      link: "/learn",
      icon: <FiBookOpen size={15} />,
      label: "Learn new vocabulary",
    },
    {
      link: "/test",
      icon: <LuClipboardPenLine size={15} />,
      label: "test your learning",
    },
  ]:
  [
    {
      link: "/learn",
      icon: <FiBookOpen size={15} />,
      label: "Learn new vocabulary",
    },
    {
      link: "/test",
      icon: <LuClipboardPenLine size={15} />,
      label: "test your learning",
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 p-4">
      {menuItems.map((item) => (
        <Button key={item.link} item={item} />
      ))}
    </div>
  );
};

export default MainMenu;
