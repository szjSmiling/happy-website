import React, { useEffect } from "react";
import { Layout, Menu } from "antd";

import { useNavigate, NavLink } from "react-router-dom";
import routes from '@/routes'

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function SiderBar() {
  const navigate = useNavigate();
  const menuList = routes.filter(route => !route.hidden);
  const menuDom = (list, key) => {
    return list.map((menu, idx) => {
      const menuKey = key ? `${key}-${idx}` : idx;
      const menuTo = key ? `${menuList[key].path}/${menu.path}` : menu.path;
      return menu?.children && menu.children.length > 0 ? (
        <SubMenu key={idx} title={menu.title} icon={menu.icon}>
          {menuDom(menu.children, idx)}
        </SubMenu>
      ) : (
        <Menu.Item key={menuKey} icon={menu.icon}>
          <NavLink to={menuTo}>{menu.title}</NavLink>
        </Menu.Item>
      )
    });
  };
  const goHomeHandle = () => {
    navigate('/')
  }
  return (
    <Sider
      width={260}
      theme="dark"
      breakpoint="lg"
      collapsedWidth="0"
      zeroWidthTriggerStyle={{
        top: "unset",
        bottom: 10,
      }}
      collapsible={true}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="szj-header-logo" onClick={goHomeHandle}>
        SzjSmiling
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["0"]}
      >
        {menuDom(menuList)}
      </Menu>
    </Sider>
  );
}
