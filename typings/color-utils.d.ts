/**
 * Color utility class
 * @public
 */
export declare class ColorUtil {
  constructor();
  /**
   * converts RGB to sRGB values
   * @param R - Red value for the color
   * @param G - Green value for the color
   * @param B - Blue value for the color
   * @returns [R/255, G/255, B/255]
   */
  sRGB(R: number, G: number, B: number): number[];
  /**
   * Give the chroma of the color M-m
   * @param R - Red Value of the color
   * @param G - Green value of the color
   * @param B - Blue value of the color
   * @returns M-m where m = min(r, g, b) and M = max(r, g, b)
   */
  chroma(R: number, G: number, B: number): number;
  /**
   * Gives the of the color Hdash
   * @param R - Red Value of the color
   * @param G - Green value of the color
   * @param B - Blue value of the color
   * @returns
   */
  hDash(R: number, G: number, B: number): number;
  hue(R: number, G: number, B: number): number;
  lightness(R: number, G: number, B: number): number;
  value(R: number, G: number, B: number): number;
  intensity(R: number, G: number, B: number): number;
  luma(R: number, G: number, B: number): number;
  saturationHSV(R: number, G: number, B: number): number;
  saturationHSI(R: number, G: number, B: number): number;
  saturationHSL(R: number, G: number, B: number): number;
  hexToRGB(hex: string): number[];
  RGBToHex(R: number, G: number, B: number): string;
  luminance(R: number, G: number, B: number): number;
  colorContrastRatio(
    R1: number,
    G1: number,
    B1: number,
    R2: number,
    G2: number,
    B2: number,
  ): string;
  areValidContrastColors(
    R1: number,
    G1: number,
    B1: number,
    R2: number,
    G2: number,
    B2: number,
  ): boolean;
  whichIsDarker(
    R1: number,
    G1: number,
    B1: number,
    R2: number,
    G2: number,
    B2: number,
  ): 1 | 0 | 2;
  whichIsLighter(
    R1: number,
    G1: number,
    B1: number,
    R2: number,
    G2: number,
    B2: number,
  ): 1 | 0 | 2;
}
