import React from "react";
import { BackTop, Layout } from "antd";

import Header from '@components/Layout/Header'
import Footer from '@components/Layout/Footer'
import SiderBar from '@components/Layout/SiderBar'
import { NavLink, useRoutes } from "react-router-dom";
import routes from './routes'

const { Content } = Layout;

export default (props) => {
  const element = useRoutes(routes)

  return (
    <Layout>
      <SiderBar />
      <Layout>
        <Header />
        <Content style={{ margin: "24px 16px 0" }}>
          <div className="szj-content" >
            {/* 注册路由 */}
            {element}
          </div>
        </Content>
        <BackTop visibilityHeight={200} />
        <Footer />
      </Layout>
    </Layout>
  );
};
