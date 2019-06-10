import { message } from 'antd';
import defaultSettings from '../defaultSettings';
import mirror from "mirror-creator";
// import {generate} from '@/ant-design/colors';
import client from 'webpack-theme-color-replacer/client';
import less from 'less';
import themeColorClient from '../components/mySettingDrawer/ThemeColorClient'
const updateColorWeak = colorWeak => {
  document.body.className = colorWeak ? 'colorWeak' : '';
};

const updateTheme = newPrimaryColor => {
  const hideMessage = message.loading('正在切换主题！', 0)
  themeColorClient.changeColor(newPrimaryColor)
    .finally(() => hideMessage())
}

/**
 * constants
 */
const actionType =  mirror([
  'GET_SETTING',
  'CHNAGE_SETTING',
], {prefix: 'setting'});

/**
 * 初始化 state
 */
const initState = defaultSettings;

/**
 * action
 */
export const settingAction = {

  getSetting (payload) {
    return async (dispatch) => {
      const setting = {};
      const urlParams = new URL(window.location.href);
      Object.keys(state).forEach(key => {
        if (urlParams.searchParams.has(key)) {
          const value = urlParams.searchParams.get(key);
          setting[key] = value === '1' ? true : value;
        }
      });
      const { primaryColor, colorWeak } = setting;
      if (state.primaryColor !== primaryColor) {
        updateTheme(primaryColor);
      }
      updateColorWeak(colorWeak);
      // return {
      //   ...state,
      //   ...setting,
      // };
      dispatch({
        type: actionType.GET_SETTING,
        payload: {
          ...state,
          ...setting,
        }
      })
    }
  },
  changeSetting(payload) {
   return async(dispatch)=>{
    const urlParams = new URL(window.location.href);
    console.log(payload,'payload')
    Object.keys(defaultSettings).forEach(key => {
      if (urlParams.searchParams.has(key)) {
        urlParams.searchParams.delete(key);
      }
    });
    Object.keys(payload).forEach(key => {
      if (key === 'collapse') {
        return;
      }
      let value = payload[key];
      if (value === true) {
        value = 1;
      }
      if (defaultSettings[key] !== value) {
        urlParams.searchParams.set(key, value);
      }
    });
    const { primaryColor, colorWeak, contentWidth } = payload;
    if (initState.primaryColor !== primaryColor) {
      updateTheme(primaryColor);
    }
    if (initState.contentWidth !== contentWidth && window.dispatchEvent) {
      window.dispatchEvent(new Event('resize'));
    }
    updateColorWeak(colorWeak);
    window.history.replaceState(null, 'setting', urlParams.href);

    dispatch({
      type: actionType.CHNAGE_SETTING,
      payload:{
        ...payload
      }
    })
   }
  },
}

// export default {
//   namespace: 'setting',
//   state: defaultSettings,
//   reducers: {
//     getSetting(state) {
//       const setting = {};
//       const urlParams = new URL(window.location.href);
//       Object.keys(state).forEach(key => {
//         if (urlParams.searchParams.has(key)) {
//           const value = urlParams.searchParams.get(key);
//           setting[key] = value === '1' ? true : value;
//         }
//       });
//       const { primaryColor, colorWeak } = setting;
//       if (state.primaryColor !== primaryColor) {
//         updateTheme(primaryColor);
//       }
//       updateColorWeak(colorWeak);
//       return {
//         ...state,
//         ...setting,
//       };
//     },
//     changeSetting(state, { payload }) {
//       const urlParams = new URL(window.location.href);
//       console.log(urlParams,'urlParams')
//       Object.keys(defaultSettings).forEach(key => {
//         if (urlParams.searchParams.has(key)) {
//           urlParams.searchParams.delete(key);
//         }
//       });
//       Object.keys(payload).forEach(key => {
//         if (key === 'collapse') {
//           return;
//         }
//         let value = payload[key];
//         if (value === true) {
//           value = 1;
//         }
//         if (defaultSettings[key] !== value) {
//           urlParams.searchParams.set(key, value);
//         }
//       });
//       const { primaryColor, colorWeak, contentWidth } = payload;
//       if (state.primaryColor !== primaryColor) {
//         updateTheme(primaryColor);
//       }
//       if (state.contentWidth !== contentWidth && window.dispatchEvent) {
//         window.dispatchEvent(new Event('resize'));
//       }
//       updateColorWeak(colorWeak);
//       window.history.replaceState(null, 'setting', urlParams.href);
//       return {
//         ...state,
//         ...payload,
//       };
//     },
//   },
// };
/**
 * reducer
 * @param {*} state 
 * @param {*} action 
 */
export const settingReducer = (state=initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionType.GET_SETTING: {
      return {
        ...state,
        payload: payload,
      };
    }
    case actionType.CHNAGE_SETTING: {
      console.log(payload,'payload')
      return {
        ...state,
        ...payload
      };
    }
    default:
        return {
          ...state,
        };
  }
}