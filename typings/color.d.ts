/**
 * Color class
 * @public
 */
export declare class Color {
  private rgbValues;
  private hexValue;
  private colorUtil;
  private HSV;
  private HSI;
  private HSL;
  private H;
  private v;
  private I;
  private l;
  private sHSV;
  private sHSI;
  private sHSL;
  private sR;
  private sG;
  private sB;
  private H2;
  private C;
  private C2;
  private yDash;
  private M;
  private m;
  private HDash;
  private alpha;
  private beta;
  constructor(R: number, G: number, B: number);
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
  private _generateColorParameters;
  getColorParameters(): {} & this;
}
