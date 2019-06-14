import React, { Component } from 'react';
import { Select, message, Drawer, List, Switch, Divider, Icon, Button, Alert, Tooltip } from 'antd';
const { Option } = Select;
// import { formatMessage } from 'umi-plugin-react/locale';
// import { FormattedMessage } from 'react-intl'
import copy from 'copy-to-clipboard';
// import {settingAction} from '../../models/setting'
// import { connect } from 'react-redux';
import { connect } from 'dva';
import styles from './index.less';
import '../../assets/css/global.less';
import BlockCheckbox from './BlockCheckbox';
import ThemeColor from './ThemeColor';

import { settingAction } from '../../models/setting';

const Body = ({ children, title, style }) => (
  <div
    style={{
      ...style,
      marginBottom: 24,
    }}
  >
    <h3 className="title">{title}</h3>
    {children}
  </div>
);
const mapStateToProps = (state) => {
  return {
    setting:state.setting
  }
}

const mapDispatchToProps = dispatch => ({
  changeSetting(params) {
    console.log(params,'params')
    dispatch(settingAction.changeSetting(params))
  },
});

@connect(mapStateToProps,mapDispatchToProps)
export default class MySettingDrawer extends Component{
    state = {
      collapse:false
    }

    togglerContent = () => {
      const { collapse } = this.state;
      this.setState({ collapse: !collapse });
    };

    getLayoutSetting = () => {
      const {
        setting: { contentWidth, fixedHeader, layout, autoHideHeader, fixSiderbar },
      } = this.props;
      return [
        {
          title: '内容区域宽度',
          action: (
            <Select
              value={contentWidth}
              size="small"
              onSelect={value => this.changeSetting('contentWidth', value)}
              style={{ width: 80 }}
            >
              {layout === 'sidemenu' ? null : (
                <Option value="Fixed">
                  定宽
                </Option>
              )}
              <Option value="Fluid">
                流式
              </Option>
            </Select>
          ),
        },
        {
          title: '固定Header',
          action: (
            <Switch
              size="small"
              checked={!!fixedHeader}
              onChange={checked => this.changeSetting('fixedHeader', checked)}
            />
          ),
        },
        {
          title: '下滑隐藏Header',
          disabled: !fixedHeader,
          disabledReason: "固定Header时可配置",
          action: (
            <Switch
              size="small"
              checked={!!autoHideHeader}
              onChange={checked => this.changeSetting('autoHideHeader', checked)}
            />
          ),
        },
        {
          title: '固定侧边菜单',
          disabled: layout === 'topmenu',
          disabledReason: "侧边菜单布局时可配置",
          action: (
            <Switch
              size="small"
              checked={!!fixSiderbar}
              onChange={checked => this.changeSetting('fixSiderbar', checked)}
            />
          ),
        },
      ];
    };
  renderLayoutSettingItem = item => {
    const action = React.cloneElement(item.action, {
      disabled: item.disabled,
    });
    return (
      <Tooltip title={item.disabled ? item.disabledReason : ''} placement="left">
        <List.Item actions={[action]}>
          <span style={{ opacity: item.disabled ? '0.5' : '' }}>{item.title}</span>
        </List.Item>
      </Tooltip>
    );
  };

    changeSetting = (key, value) => {
      console.log(key,value,'click')
      const { setting } = this.props;
      // console.log(navTheme,layout,this.props,'navTheme')
      const nextState = {...setting};
      nextState[key] = value;
      if (key === 'layout') {
        nextState.contentWidth = value === 'topmenu' ? 'Fixed' : 'Fluid';
      } else if (key === 'fixedHeader' && !value) {
        nextState.autoHideHeader = false;
      }
      console.log(nextState,'click')
      this.setState(nextState, () => {
        const { changeSetting } = this.props;
        changeSetting(nextState);
      });
    };

    handleCopy = () => {
      const { setting } = this.props;
      copy(JSON.stringify(setting));
      message.success("拷贝成功，请到src/defaultSettings.js中替换默认设置");
    }

    render(){
      // const { setting} = this.props;
      // console.log(setting,'setting')
      const { setting } = this.props;
      const {navTheme, primaryColor, layout, colorWeak} = setting;
      const { collapse } = this.state;
        return(
            <Drawer
            visible={collapse}
            width={300}
            onClose={this.togglerContent}
            placement="right"
            handler={
              <div className="handle" onClick={this.togglerContent}>
                <Icon
                  type={collapse ? 'close' : 'setting'}
                  style={{
                    color: '#fff',
                    fontSize: 20,
                  }}
                />
              </div>
            }
            style={{
              zIndex: 999,
          }}
            >
              <div className="content">
                <Body title={"整体风格设置"}>
                  <BlockCheckbox
                    list={[
                      {
                        key: 'dark',
                        url: 'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',
                        title: "暗色菜单风格",
                      },
                      {
                        key: 'light',
                        url: 'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',
                        title:"亮色菜单风格",
                      },
                    ]}
                    value={navTheme}
                    onChange={value => this.changeSetting('navTheme', value)}
                  />
                </Body>
                <ThemeColor
                title={"主题色"}
                value={primaryColor}
                onChange={color => this.changeSetting('primaryColor', color)}
              />

              <Divider />
              <Button type="primary">点击</Button>
              <Body title={"导航模式"}>
                <BlockCheckbox
                  list={[
                    {
                      key: 'sidemenu',
                      url: 'https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg',
                      title: "侧边菜单布局",
                    },
                    {
                      key: 'topmenu',
                      url: 'https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg',
                      title: "顶部菜单布局",
                    },
                  ]}
                  value={layout}
                  onChange={value => this.changeSetting('layout', value)}
                />
              </Body>
              <List
                split={false}
                dataSource={this.getLayoutSetting()}
                renderItem={this.renderLayoutSettingItem}
              />
              <Divider />
              <Button type="normal" onClick={()=>this.handleCopy()}>
                <Icon type="copy"/>
                拷贝设置
              </Button>
              </div>
                
            </Drawer>
        )
    }
}
// export default connect(({ settings }: ConnectState) => ({
//   theme: settings.navTheme,
//   layout: settings.layout,
// }))(MySettingDrawer);