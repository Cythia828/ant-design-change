const client = require('webpack-theme-color-replacer/client')
import defaultSettings from '../../defaultSettings.js';
import colorPlatte from './colorPlatte';
import { generate, presetPalettes } from '@ant-design/colors';
export default {
  primaryColor: '#1890ff',
  getAntdSerials(color){
    let arr = [];
    for(let i = 1;i<10;i++){
      arr.push(colorPlatte.changeColor(color,i));
    }
    arr.push(color);
    return arr;
  },
 
  changeColor (newColor) {
    const lastColor = this.lastColor || this.primaryColor
    // console.log(this.getAntdSerials("#1890FF"),'newColor || this.primaryColor')
    // console.log(generate("#1890FF"),'generate("#1890FF")')
    const options = {
      // cssUrl:  'css/theme-colors-[contenthash:8].css', // hash模式下用相对路径
      oldColors: this.getAntdSerials(lastColor), // current colors array. The same as `matchColors`
      newColors: this.getAntdSerials(newColor || this.primaryColor) // new colors array, one-to-one corresponde with `oldColors`
    }
    const promise = client.changer.changeColor(options)
    this.lastColor = lastColor
    return promise
  }
}


  // getAntdSerials (color) {
  //   // 淡化（即less的tint）
  //   const lightens = new Array(9).fill().map((t, i) => {
  //     return client.varyColor.lighten(color, i / 10)
  //   })
  //   // 此处为了简化，采用了darken。实际按color.less需求可以引入tinycolor, colorPalette变换得到颜色值
  //   const darkens = new Array(6).fill().map((t, i) => {
  //     return client.varyColor.darken(color, i / 10)
  //   })
  //   console.log(lightens.concat(darkens),'lightens.concat(darkens)')
  //   return lightens.concat(darkens)
  // },