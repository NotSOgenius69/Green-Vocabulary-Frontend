import { Link } from "react-router-dom";
import type { MenuItem } from "../types/menuItems";

const Button = ({ item }: { item: MenuItem }) => {
  return (
    <Link to={item.link}>
      <button
        className="
    flex items-center justify-center gap-2 
    px-4 py-2 rounded-md 
    border border-neutral-300 
    bg-[#ecf39e] text-neutral-500 text-sm 
    hover:-translate-y-1 transform transition duration-200 hover:shadow-md
    w-[300px]          // ← Fixed width for mobile (column)
    sm:w-auto          // ← Auto width for desktop (row)
    min-w-[200px]      // ← Fallback width
    flex-shrink-0      // ← Prevent shrinking
    whitespace-nowrap  // ← Prevent text wrapping
  "
      >
        {item.icon}
        <span className="font-medium font-mono">{item.label}</span>
      </button>
    </Link>
  );
};
export default Button;
