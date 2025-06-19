import { FiBookOpen } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { LuClipboardPenLine } from "react-icons/lu";
import type { MenuItem } from "../types/menuItems";
import Button from "./Button";

const MainMenu = () => {
  const menuItems: MenuItem[] = [
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
