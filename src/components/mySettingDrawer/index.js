import React, { Component } from 'react';
import { Select, message, Drawer, List, Switch, Divider, Icon, Button, Alert, Tooltip } from 'antd';
const { Option } = Select;
import { formatMessage } from 'umi-plugin-react/locale';
// import {settingAction} from '../../models/setting'
// import { connect } from 'react-redux';
import { connect } from 'dva';
import styles from './index.less';
import BlockCheckbox from './BlockCheckbox';
import ThemeColor from './ThemeColor';

const Body = ({ children, title, style }) => (
  <div
    style={{
      ...style,
      marginBottom: 24,
    }}
  >
    <h3 className={styles.title}>{title}</h3>
    {children}
  </div>
);
// const mapStateToProps = (state) => {
//   return {
//     setting: state.setting
//   }
// }

// const mapDispatchToProps = dispatch => ({

// });

// @connect(mapStateToProps, mapDispatchToProps)
@connect(({ setting}) => ({setting}))
class MySettingDrawer extends Component{
    state = {
      collapse:true
    }

    togglerContent = () => {
      const { collapse } = this.state;
      this.setState({ collapse: !collapse });
    };

    changeSetting = (key, value) => {
      const { setting } = this.props;
      const nextState = { ...setting };
      nextState[key] = value;
      if (key === 'layout') {
        nextState.contentWidth = value === 'topmenu' ? 'Fixed' : 'Fluid';
      } else if (key === 'fixedHeader' && !value) {
        nextState.autoHideHeader = false;
      }
      this.setState(nextState, () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'setting/changeSetting',
          payload: nextState,
        });
      });
    };

    render(){
      // const { setting} = this.props;
      // console.log(setting,'setting')
      const { navTheme, primaryColor, layout, colorWeak } = this.props;
      const { collapse } = this.state;
        return(
            <Drawer
            visible={collapse}
            width={300}
            onClose={this.togglerContent}
            placement="right"
            handler={
              <div className={styles.handle} onClick={this.togglerContent}>
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
              <div className={styles.content}>
                <Body title={"整体风格设置"}>
                  <BlockCheckbox
                    list={[
                      {
                        key: 'dark',
                        url: 'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',
                        title: "",
                      },
                      {
                        key: 'light',
                        url: 'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',
                        title:"",
                      },
                    ]}
                    value={navTheme}
                    onChange={value => this.changeSetting('navTheme', value)}
                  />
                </Body>
                <ThemeColor
                title={formatMessage({ id: 'app.setting.themecolor' })}
                value={primaryColor}
                onChange={color => this.changeSetting('primaryColor', color)}
              />

              <Divider />
              </div>
                
            </Drawer>
        )
    }
}
export default MySettingDrawer;