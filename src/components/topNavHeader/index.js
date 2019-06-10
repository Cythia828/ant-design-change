import React from 'react';
import { Icon, Dropdown, Menu, Layout } from 'antd';
import { Link } from 'react-router';
import './style.less';
// import '../../assets/css/global.less'
const {  Header } = Layout;
const { SubMenu } = Menu;
const data = [
  {
    "checked":true,
    "children":[],
    "code":"M_SEARCH",
    "icon":"fa fa-search",
    "id":503,
    "name":"搜索",
    "pid":0,
    "type":0,
    "url":"/easylog.html#/search"
  },
  {
    "checked":true,
    "children":[],
    "code":"M_APP",
    "icon":"fa fa-cubes",
    "id":500,
    "name":"仪表盘",
    "pid":0,
    "type":0,
    "url":"/easylog.html#/application"
  },
  {
    "checked":true,
    "children":[
      {
        "checked":true,
        "children":[],
        "code":"M_ALERT_HTY",
        "icon":"iconfont icon-gaojinglishi",
        "id":507,
        "name":"告警历史",
        "pid":506,
        "type":0,
        "url":"/easylog.html#/alert/history"
      },
      {
        "checked":true,
        "children":[],
        "code":"M_ALERT_RULE",
        "icon":"iconfont icon-guize",
        "id":509,
        "name":"告警规则",
        "pid":506,
        "type":0,
        "url":"/easylog.html#/alert/rulelist"
      },
      {
        "checked":true,
        "children":[],
        "code":"M_RCV_SET",
        "icon":"iconfont icon-jieshoupeizhi",
        "id":513,
        "name":"接收设置",
        "pid":506,
        "type":0,
        "url":"/easylog.html#/alert/grouplist"
      }
    ],
    "code":"M_ALERT",
    "icon":"fa fa-bell",
    "id":506,
    "name":"告警",
    "pid":0,
    "type":0,
    "url":"/easylog.html#/alert"
  },
  {
    "checked":true,
    "children":[
      {
        "checked":true,
        "children":[],
        "code":"M_AGENT_ADD_LOG",
        "icon":"iconfont icon-linghuojieru",
        "id":597,
        "name":"日志接入",
        "pid":599,
        "type":0,
        "url":"/easylog.html#/collect/access"
      },
      {
        "checked":true,
        "children":[],
        "code":"M_UPLOAD_TYPE",
        "icon":"iconfont icon-xitongbushu",
        "id":524,
        "name":"agent安装部署",
        "pid":599,
        "type":0,
        "url":"/easylog.html#/collect/deploy"
      }
    ],
    "code":"M_DATA_UPLOAD",
    "icon":"",
    "id":599,
    "name":"数据采集",
    "pid":0,
    "type":0,
    "url":"/easylog.html#/collect"
  },
  {
    "checked":true,
    "children":[
      {
        "checked":true,
        "children":[
          {
            "checked":true,
            "children":[],
            "code":"M_AGENT_MGMT",
            "icon":"iconfont icon-yunying",
            "id":528,
            "name":"agent管控",
            "pid":523,
            "type":0,
            "url":"/easylog.html#/agent"
          },
          {
            "checked":true,
            "children":[],
            "code":"M_AGENT_MGMT",
            "icon":"iconfont icon-yunying",
            "id":5281,
            "name":"驱动管理",
            "pid":523,
            "type":0,
            "url":"/easylog.html#/drive"
          },
          {
            "checked":true,
            "children":[],
            "code":"M_AGENT_MGMT",
            "icon":"iconfont icon-yunying",
            "id":5282,
            "name":"任务管理",
            "pid":523,
            "type":0,
            "url":"/easylog.html#/task"
          },
          {
            "checked":true,
            "children":[],
            "code":"M_AGENT_MGMT",
            "icon":"iconfont icon-yunying",
            "id":5283 ,
            "name":"转发器管理",
            "pid":523,
            "type":0,
            "url":"/easylog.html#/transponder"
          }
        ],
        "code":"M_UPLOAD",
        "icon":"iconfont icon-shangchuan",
        "id":523,
        "name":"agent",
        "pid":522,
        "type":0
      },
      {
        "checked":true,
        "children":[
          {
            "checked":true,
            "children":[],
            "code":"M_DATA_AGENT_FILE",
            "icon":"iconfont icon-filelist",
            "id":578,
            "name":"文件列表",
            "pid":588,
            "type":0,
            "url":"/easylog.html#/data/list"
          },
          {
            "checked":true,
            "children":[],
            "code":"M_CPCT_AGENT",
            "icon":"iconfont icon-rongliang",
            "id":544,
            "name":"保存周期",
            "pid":588,
            "type":0,
            "url":"/easylog.html#/data/capacitymanage"
          }
        ],
        "code":"M_DATASOURCE",
        "icon":"iconfont icon-wechaticon07",
        "id":588,
        "name":"数据",
        "pid":522,
        "type":0
      },
      {
        "checked":true,
        "children":[
          {
            "checked":true,
            "children":[],
            "code":"M_USER_AGENT",
            "icon":"iconfont icon-people",
            "id":551,
            "name":"用户管理",
            "pid":550,
            "type":0,
            "url":"/easylog.html#/author/userlist"
          },
          {
            "checked":true,
            "children":[],
            "code":"M_FUN_PERMS",
            "icon":"iconfont icon-gongneng",
            "id":555,
            "name":"功能权限",
            "pid":550,
            "type":0,
            "url":"/easylog.html#/author/funclist"
          },
          {
            "checked":true,
            "children":[],
            "code":"M_DATA_PERMS",
            "icon":"iconfont icon-wechaticon07",
            "id":559,
            "name":"数据权限",
            "pid":550,
            "type":0,
            "url":"/easylog.html#/author/datalist"
          }
        ],
        "code":"M_PERMS_AGENT",
        "icon":"iconfont icon-quanxianguanli",
        "id":550,
        "name":"权限",
        "pid":522,
        "type":0
      }
    ],
    "code":"MENU_SETTING",
    "icon":"fa fa-cog",
    "id":522,
    "name":"管理",
    "pid":0,
    "type":0
  },
  {
    "checked":true,
    "children":[
      {
        "checked":true,
        "children":[],
        "code":"M_PARSER",
        "icon":"iconfont icon-xinghao",
        "id":534,
        "name":"解析规则",
        "pid":598,
        "type":0,
        "url":"/easylog.html#/process/parser"
      },
      {
        "checked":true,
        "children":[
          {
            "checked":true,
            "children":[],
            "code":"M_FILTER_OVERVIEW",
            "icon":"iconfont icon-gaikuang",
            "id":568,
            "name":"脱敏概况",
            "pid":540,
            "type":0,
            "url":"/easylog.html#/process/filter/resume"
          },
          {
            "checked":true,
            "children":[],
            "code":"M_FILTER_RULE_LIST",
            "icon":"iconfont icon-liebiao",
            "id":567,
            "name":"规则列表",
            "pid":540,
            "type":0,
            "url":"/easylog.html#/process/filter"
          }
        ],
        "code":"M_FILTER",
        "icon":"iconfont icon-shaixuan",
        "id":540,
        "name":"数据脱敏",
        "pid":598,
        "type":0
      },
      {
        "checked":true,
        "children":[
          {
            "checked":true,
            "children":[],
            "code":"M_ODPS",
            "icon":"iconfont icon-odpsaliyun",
            "id":589,
            "name":"Odps",
            "pid":571,
            "type":0,
            "url":"/easylog.html#/process/odps"
          }
        ],
        "code":"M_DATA_DELIVER",
        "icon":"iconfont icon-odps",
        "id":571,
        "name":"系统对接",
        "pid":598,
        "type":0
      }
    ],
    "code":"M_DATA_MGMT",
    "icon":"",
    "id":598,
    "name":"数据处理",
    "pid":0,
    "type":0,
    "url":"/easylog.html#/process"
  }
];

class TopNav extends React.Component {

  toggle = () => {
    const { collapsed, changeCollapsed } = this.props;
    changeCollapsed(!collapsed);
  }

  renderMenuNodes = (data) => {
    return data.map(item => {
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu title={item.name} key={item.id}>
            {this.renderMenuNodes(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.id}>
          <a href={item.url}>{item.name}</a>
        </Menu.Item>
      );
    })

  }

  render() {
    const { collapsed, userInfo ,layout ,navTheme ,fixedHeader } = this.props;
    const { username } = userInfo;
    const menu = (
      <Menu>
          <Menu.Item>个人信息</Menu.Item>
          <Menu.Item>退出</Menu.Item>
      </Menu>
    );
    const leftMenu = (
      <div>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
        />
        <div className="f-fr">
          <Dropdown 
            overlay={menu} 
          >
            <a href="javascript:;" className="logout">{username}&nbsp;<Icon type="user" /></a>
          </Dropdown>
        </div>
      </div>
    );
    const topMenu = (
      <div className="top-menu-wrapper">
          <div className="logo" id="logo">
            <Link to="/search">
              <img src={LOGAPICONF.COMPANYLOGO} alt="logo" /> 
              { !collapsed && <h1>云日志</h1>}
            </Link>
          </div>
          <Menu 
            theme={navTheme}
            className="top-menu"
            mode="horizontal"
          >
            {this.renderMenuNodes(data)}
          </Menu>
          <div className="userinfo">
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className="f-fr">
              <Dropdown 
                overlay={menu} 
              >
                <a href="javascript:;" className="logout">{username}&nbsp;<Icon type="user" /></a>
              </Dropdown>
            </div>
          </div>
      </div>
    );

    
    return (
      <Header className={layout == 'topmenu'?(navTheme === 'dark'?'top-header-dark':'top-header-light'):'yux-header'}
       style={fixedHeader?{position: 'fixed', zIndex: 1, width: '100%'}:{}}>
        {
          layout == 'topmenu'
          ?
          topMenu
          :
          leftMenu
        } 
      </Header>
    );
  }
}

export default TopNav;
