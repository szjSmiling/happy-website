import React from "react";
import { Navigate } from "react-router-dom";
import {
  HomeOutlined,
  DesktopOutlined,
  TableOutlined,
} from "@ant-design/icons";

import Home from "@pages/home";
import NotFund from "@pages/NotFund";
// import Maps from "@pages/maps";
import MapsCurrent from "@pages/maps/current";
import MapsHomeTown from "@pages/maps/hometown";

{
  /* 路由表 */
}

export default [
  { path: "/", element: <Home />, title: '首页', icon: <HomeOutlined /> },
  {
    path: "/maps",
    // element: <Maps />,
    title: '百度地图',
    icon: <TableOutlined />,
    children: [
      { path: "current", element: <MapsCurrent />, title: '当前位置', icon: <DesktopOutlined /> },
      { path: "hometown", element: <MapsHomeTown />, title: '家乡位置', icon: <DesktopOutlined /> },
    ],
  },
  { path: "/404", element: <NotFund />, hidden: true },
  { path: "*", element: <Navigate to="/" />, hidden: true }, // 重定向到404
];
