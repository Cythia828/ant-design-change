import React,{ Suspense } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import { connect } from 'react-redux';
import { globalAction } from '../models/global';
import classNames from 'classnames';
import SiderMenu from '../components/siderMenu';
import TopNavHeader from '../components/topNavHeader';
import GlobalFooter from './globalFooter';
import MySettingDrawer from '../components/mySettingDrawer'
import './style.less';
import '../assets/css/global.less'
// import MySettingDrawer from '@/components/mySettingDrawer';
// lazy load SettingDrawer
// const MySettingDrawer = React.lazy(() => import('../components/mySettingDrawer'));

const { Content } = Layout;

const TITLE = '云日志';

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

const mapStateToProps = state => {
  return {
    navigation: state.global.navigation,
    collapsed: state.global.collapsed,
    userList: state.global.userList,
    userInfo: state.global.userInfo,
    layout: state.setting.layout,
    navTheme: state.setting.navTheme,
    contentWidth:state.setting.contentWidth,
    fixedHeader:state.setting.fixedHeader,
    autoHideHeader:state.setting.autoHideHeader,
    fixSiderbar:state.setting.fixSiderbar
    // menuData: state.menuModel.menuData,
    // breadcrumbNameMap: state.menuModel.breadcrumbNameMap,
    // ...setting,
  }
};

const mapDispatchToProps = dispatch => ({
  getUsers(params) {
    dispatch(globalAction.fetchUsers(params))
  },
  getNavigation(params) {
    dispatch(globalAction.getNavigation(params))
  },
  currentUser(params) {
    dispatch(globalAction.fetchCurrentUser(params))
  },
  changeCollapsed(params) {
    dispatch(globalAction.changeCollapsed(params))
  },
});

@connect(mapStateToProps, mapDispatchToProps)
class BaseLayout extends React.Component {
  state = {
    hasError:false
  }
  static propTypes = {
    navigation: PropTypes.array,
    collapsed: PropTypes.bool,
    userList: PropTypes.array,
    userInfo: PropTypes.object,
    // layout:PropTypes.string,
    
  };
  

  componentDidMount() {
    const { getNavigation, currentUser, getUsers,autoHideHeader} = this.props;
    getNavigation();
    getUsers();
    currentUser();
  }

  // 从error中接收错误并设置 state
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  renderSettingDrawer = () => {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
    if (
      process.env.NODE_ENV === 'production' &&
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION !== 'site'
    ) {
      return null;
    }
    return <MySettingDrawer></MySettingDrawer>;
  };

  getCurrentStyle = ()=> {
    const { contentWidth } = this.props;
    if(contentWidth == 'Fluid'){
      let obj = {minHeight: '100vh',width:"100%"};
      return obj;
    }else{
      let obj = {minHeight: '100vh',maxWidth:"1200px"}
      return obj;
    }
  }
  
  render() {
    const {
      navTheme,
      layout,
      children,
      location: { pathname },
      isMobile,
      menuData,
      breadcrumbNameMap,
      fixedHeader,
      autoHideHeader,
      contentWidth,
      fixSiderbar
    } = this.props;

    // const isTop = PropsLayout === 'topmenu';
    console.log(navTheme,'navTheme')
    const leftLayout = (
      <Layout theme={navTheme} className="yux-layout has-sider">
        <SiderMenu {...this.props}/>
        <Layout className="yux-layout" style={fixSiderbar?{minHeight: '100vh',marginLeft:'200px'}:{minHeight: '100vh'}}>
          <TopNavHeader {...this.props}/>
          <Content className={"yux-content"} style={fixedHeader?{marginTop:'84px'}:{}}>{children}</Content>
          <GlobalFooter />
        </Layout>
      </Layout>
    );
    const topLayout = (
      <Layout className="yux-layout">
        <TopNavHeader {...this.props}/>
        <Layout className="yux-layout">
          <Content className={contentWidth=='Fluid'?"yux-content-fluid":"yux-content"} style={fixedHeader?{marginTop:'84px'}:{}}>{children}</Content>
          <GlobalFooter />
        </Layout>
      </Layout>
    );
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return (
      
      <React.Fragment>
          <DocumentTitle title={TITLE}>
            <ContainerQuery query={query}>
              {params => (
                  <div className={classNames(params)}>{
                    layout=='topmenu'
                    ?
                    topLayout
                    :
                    leftLayout
                  }</div>
              )}
            </ContainerQuery>
          </DocumentTitle>
          {/* <MySettingDrawer/> */}
          <Suspense fallback={null}>{this.renderSettingDrawer()}</Suspense>
        </React.Fragment>
    );
  }
}

export default BaseLayout;
