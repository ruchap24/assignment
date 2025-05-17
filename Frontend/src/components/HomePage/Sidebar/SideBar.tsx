import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiSidebar } from "react-icons/fi";
import { CiBellOn } from "react-icons/ci";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  function sidebarHanlder() {
    console.log("in sidebar")
    setIsSidebarOpen(!isSidebarOpen);
  }
  return (
    <div
      className={`h-screen w-72 p-2 transition-transform duration-500 ${isSidebarOpen ? "-translate-x-0 bg-[#FCFAF8]" : "-translate-x-52 bg-[white]"} `}
    >
      <header className="flex items-center justify-between text-lg">
        <div className="flex items-center justify-center gap-2 hover:bg-gray-100">
          <img
            src="my_picture.jpeg"
            className="h-10 w-10 rounded-full"
            alt=""
          />
          <h3>name</h3>
          <RiArrowDropDownLine className="h-8 w-8" />
        </div>

        <div className="icons flex justify-center gap-2">
          <button>
            <CiBellOn className="h-6 w-6" />
          </button>
          <button onClick={sidebarHanlder} className="p-1 hover:bg-[#EFECE6]">
            <FiSidebar className="h-6 w-6" />
          </button>
        </div>
      </header>
      <main className="w-full px-2 py-6">
        <nav className="flex flex-col gap-2">
          <div className="add-task rounded-lg px-2 py-1 hover:bg-[#fef1e5]">
            <button className="flex items-center gap-2 hover:text-[#DC4C3E]">
              <FaPlusCircle />
              Add task
            </button>
          </div>
          <div className="add-task rounded-lg px-2 py-1 hover:bg-[#fef1e5]">
            <button className="flex items-center gap-2 hover:text-[#DC4C3E]">
              Notes
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
}

export default SideBar;
