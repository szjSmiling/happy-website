import React from "react";
import { Link } from "react-router-dom";
import { Button, Breadcrumb, Avatar } from "antd";


import Config from "@components/Layout/Config";
import Logo from '@/assets/images/szjsmiling.jpg'


export default function Header() {
  const user = {
    name: 'szjSmiling',
    avatar: Logo
  }
  const navigations = [
    { href: "Home", title: "Home" },
    // { href: "Index", title: "Index" },
  ];

  return (
    <div className="szj-header">
      <div className="szj-header-info">
        <Breadcrumb style={{fontSize: 20}}>
          {navigations.map((navigator, idx) => (
            <Breadcrumb.Item key={idx}>
              <Link to={navigator.href}>{navigator.title}</Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      <div className="szj-header-user">
        <Config />
        <Avatar shape="square" src={user.avatar} style={{marginLeft: 16, cursor: 'pointer'}} />
        {/* <span className="szj-user-name">{user.name}</span> */}
      </div>
    </div>
  );
}
