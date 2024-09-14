import React from "react";
import { LuLampDesk } from "react-icons/lu";
import { BiGridAlt } from "react-icons/bi";
import { BiHelpCircle } from "react-icons/bi";
export const SidebarData = [
    {
        title: "Sản Phẩm",
        path: "/products/0",
        icon: <LuLampDesk />,
        cName: "nav-text"
    },
    {
        title: "Bộ Sưu Tập",
        path: "/collections",
        icon: <BiGridAlt />,
        cName: "nav-text"
    },
    {
        title: "Dự Án",
        path: "/projects",
        icon: <BiGridAlt />,
        cName: "nav-text"
    },
    {
        title: "Về Chúng tôi",
        path: "/about-us",
        icon: <BiHelpCircle />,
        cName: "nav-text"
    }
]