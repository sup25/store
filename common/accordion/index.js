import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";

const Accordion = ({ icon, title, items, onItemClick, isExpanded }) => {
  const [active, setActive] = useState(false);

  const handleMenuClick = () => {
    setActive(!active);
  };

  const handleMenuItemClick = (item) => {
    setActive(false);
    onItemClick(item);
  };

  return (
    <Menu>
      <MenuButton
        className="flex items-center px-2 gap-2 justify-between w-full py-2 rounded hover:bg-secondary transtion duration-300 ease-in"
        onClick={handleMenuClick}
      >
        <div className="flex items-center gap-2">
          {icon}
          {isExpanded && <p className="text-base font-bold">{title}</p>}
        </div>
        <FaChevronUp
          className={`transition-transform ${
            active ? "transform rotate-180" : ""
          }`}
        />
      </MenuButton>
      <Transition
        enter="transition ease-out duration-200 transform origin-top"
        enterFrom="opacity-0 translate-y-1 scale-y-0"
        enterTo="opacity-100 translate-y-0 scale-y-100"
        leave="transition ease-in duration-150 transform origin-top"
        leaveFrom="opacity-100 translate-y-0 scale-y-100"
        leaveTo="opacity-0 translate-y-1 scale-y-0"
      >
        <MenuItems className="w-[var(--button-width)] [--anchor-gap:4px] sm:[--anchor-gap:4px] text-sm">
          {items.map((item, index) => (
            <MenuItem
              key={index}
              as="div"
              onClick={() => handleMenuItemClick(item)}
              className="block data-[focus]:bg-blue-100 px-2 py-2 bg-white hover:bg-slate-200 transition duration-300 cursor-pointer"
            >
              {isExpanded && <span>{item.text}</span>}
            </MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default Accordion;
