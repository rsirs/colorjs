import { ColorUtil } from './color-utils';
/**
 * Color class
 * @public
 */
export class Color {
  private rgbValues: number[];
  private hexValue: string;
  private colorUtil: ColorUtil;
  private HSV: Array<string | number>;
  private HSI: Array<string | number>;
  private HSL: Array<string | number>;
  private H: number;
  private v: number;
  private I: number;
  private l: number;
  private sHSV: number;
  private sHSI: number;
  private sHSL: number;
  private sR: number;
  private sG: number;
  private sB: number;
  private H2: number;
  private C: number;
  private C2: number;
  private yDash: number;
  private M: number;
  private m: number;
  private HDash: number;
  private alpha: number;
  private beta: number;

  constructor(R: number, G: number, B: number) {
    // r 0-255, g 0-255, b 0-255,
    this.colorUtil = new ColorUtil();
    if (typeof R != 'number' || typeof G != 'number' || typeof B != 'number') {
      this.rgbValues = [255, 255, 255];
      this.hexValue = '#ffffff';
    } else {
      this.rgbValues = [R, G, B];
      this.hexValue = this.colorUtil.RGBToHex(R, G, B);
    }
    this._generateColorParameters(...this.rgbValues);
    this.HSV = [this.H + '%', this.sHSV, this.v];
    this.HSI = [this.H + '%', this.sHSI, this.I];
    this.HSL = [this.H + '%', this.sHSL, this.l];
  }

  /**
   * @description generate all the color parameters
   * sRGB: sR, sG, sG, [0,1]
   * Hue: H, H2, [0deg, 360deg)
   * chroma:C, C2, [0, 1]
   * value: V, [0, 1]
   * Lightness: L, [0, 1]
   * Intensity: I, [0, 1]
   * Luma: Y [0, 1]
   * Scaled HSV, HSI, HSL [0, 1]
   */

  private _generateColorParameters(R?: number, G?: number, B?: number) {
    if (typeof R != 'number' || typeof G != 'number' || typeof B != 'number') {
      throw new Error('Invalid RGB values provided');
    }
    [this.sR, this.sG, this.sB] = this.colorUtil.sRGB(R, G, B);
    this.M = Math.round(Math.max(this.sR, this.sG, this.sB));
    this.m = Math.round(Math.min(this.sR, this.sG, this.sB));
    this.C = Math.round(this.colorUtil.chroma(R, G, B));
    this.HDash = Math.round(this.colorUtil.hDash(R, G, B));
    this.H = Math.round(this.HDash * 60);
    this.alpha = 0.5 * (2 * this.sR - this.sG - this.sB);
    this.beta = (Math.sqrt(3) / 2) * (this.sG - this.sB);
    this.H2 = (Math.atan2(this.beta, this.alpha) * 180) / Math.PI;
    this.C2 = Math.sqrt(this.beta * this.beta + this.alpha * this.alpha);
    this.v = this.M;
    this.I = this.colorUtil.intensity(R, G, B);
    this.l = this.colorUtil.lightness(R, G, B);
    this.yDash = this.colorUtil.luma(R, G, B);
    this.sHSV = this.colorUtil.saturationHSV(R, G, B);
    this.sHSL = this.colorUtil.saturationHSL(R, G, B);
    this.sHSI = this.colorUtil.saturationHSI(R, G, B);
  }

  getColorParameters() {
    const parameters = Object.assign({}, this);
    delete parameters.colorUtil;
    return parameters;
  }
}
