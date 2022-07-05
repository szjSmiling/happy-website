// 主题, 语言 等全局公共配置
import React, { useState } from "react";
import { ConfigProvider, Drawer, Button, Radio, Divider } from "antd";
import { SettingOutlined } from "@ant-design/icons";

import 'antd/dist/antd.variable.less';
import withLang from "../common/withLang";

export default withLang(function Config(props) {
  const { t , i18n } = props;
  const langList = ['zh', 'en'];
  const themeList = ['#1890ff', '#f00', '#0f0', '#25b864', '#456122', '#f65432'];
  const [themeValue, setThemeValue] = useState(themeList[0]);
  const [visible, setVisible] = useState(false);
  
  const configHandle = (visible) => {
    return () => {
      setVisible(visible);
    };
  };
  const themeItem = (theme) => ({
    display: 'inline-block',
    width: '100px',
    height: '50px',
    backgroundColor: theme
  })
  const themeHandle = ({target: {value}}) => {
    setThemeValue(value)
    ConfigProvider.config({
      theme: {
        primaryColor: value
      }
    });
  }
  const langHandle = ({target: {value}}) => {
    i18n.changeLanguage(value)
  }
  return (
    <>
      <Button
        className="szj-config-btn"
        icon={<SettingOutlined style={{ fontSize: 24 }} />}
        title="网站主题, 语言等设置"
        onClick={configHandle(true)}
      ></Button>
      <Drawer
        title={<h3 style={{fontWeight: 900}}>网站设置</h3>}
        visible={visible}
        closable={false}
        maskClosable={true}
        forceRender={true}
        onClose={configHandle(false)}
      >
        <div>
          <Divider style={{borderColor: '#999'}}>{t('title')}</Divider>
          <Radio.Group name="radiogroup" defaultValue="zh" onChange={langHandle}>
            {
              langList.map((lang, idx) => (
                <Radio key={idx} value={lang}>{lang}</Radio>
              ))
            }
          </Radio.Group>
        </div>
        <div>
          <Divider style={{borderColor: '#999'}}>主题设置</Divider>
          <Radio.Group value={themeValue} onChange={themeHandle}>
            {
              themeList.map((theme, idx) => (
                <Radio key={idx} value={theme}><span style={themeItem(theme)}></span></Radio>
              ))
            }
          </Radio.Group>
        </div>
      </Drawer>
    </>
  );
})
