import tinycolor from 'tinycolor2';
export default{
    hueStep:2,
    saturationStep: 16,
    saturationStep2:5,
    brightnessStep1:5,
    brightnessStep2:15,
    lightColorCount:5,
    darkColorCount:4,
    getHue(hsv, i, isLight) {
        var hue;
        if (hsv.h >= 60 && hsv.h <= 240) {
          hue = isLight ? hsv.h - this.hueStep * i : hsv.h + this.hueStep * i;
        } else {
          hue = isLight ? hsv.h + this.hueStep * i : hsv.h - this.hueStep * i;
        }
        if (hue < 0) {
          hue += 360;
        } else if (hue >= 360) {
          hue -= 360;
        }
        return Math.round(hue);
      },
      getSaturation(hsv, i, isLight) {
        var saturation;
        if (isLight) {
          saturation = Math.round(hsv.s * 100) - this.saturationStep * i;
        } else if (i == this.darkColorCount) {
          saturation = Math.round(hsv.s * 100) + this.saturationStep;
        } else {
          saturation = Math.round(hsv.s * 100) + this.saturationStep2 * i;
        }
        if (saturation > 100) {
          saturation = 100;
        }
        if (isLight && i === this.lightColorCount && saturation > 10) {
          saturation = 10;
        }
        if (saturation < 6) {
          saturation = 6;
        }
        return Math.round(saturation);
      },
      getValue (hsv, i, isLight) {
        if (isLight) {
          return Math.round(hsv.v * 100) + this.brightnessStep1 * i;
        }
        return Math.round(hsv.v * 100) - this.brightnessStep2 * i;
      },
      changeColor (color, index) {
        var isLight = index <= 6;
        var hsv = tinycolor(color).toHsv();
        var i = isLight ? this.lightColorCount + 1 - index : index - this.lightColorCount - 1;
        return tinycolor({
          h: this.getHue(hsv, i, isLight),
          s: this.getSaturation(hsv, i, isLight),
          v: this.getValue(hsv, i, isLight),
        }).toHexString();
      } 
    
}