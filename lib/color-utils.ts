/**
 * Color utility class
 * @public
 */
export class ColorUtil {
  /**
   * converts RGB to sRGB values
   * @param R - Red value for the color
   * @param G - Green value for the color
   * @param B - Blue value for the color
   * @returns [R/255, G/255, B/255]
   */
  sRGB(R: number, G: number, B: number): number[] {
    if (
      typeof R !== 'number' ||
      typeof G !== 'number' ||
      typeof B !== 'number'
    ) {
      throw new Error('Invalid value provided in sRGG method');
    }
    return [R / 255.0, G / 255.0, B / 255.0];
  }

  /**
   * Give the chroma of the color M-m
   * @param R - Red Value of the color
   * @param G - Green value of the color
   * @param B - Blue value of the color
   * @returns M-m where m = min(r, g, b) and M = max(r, g, b)
   */
  chroma(R: number, G: number, B: number) {
    const [sR, sG, sB] = this.sRGB(R, G, B);
    return Math.max(sR, sG, sB) - Math.min(sR, sG, sB);
  }

  /**
   * Gives the of the color Hdash
   * @param R - Red Value of the color
   * @param G - Green value of the color
   * @param B - Blue value of the color
   * @returns
   */
  hDash(R: number, G: number, B: number) {
    const C = this.chroma(R, G, B);

    if (!C) {
      return 0;
    }

    const [sR, sG, sB] = this.sRGB(R, G, B);
    const M = Math.max(sR, sG, sB);

    switch (M) {
      case sR:
        return ((sG - sB) / C) % 6;
      case sG:
        return (sB - sR) / C + 2;
      case sB:
        return (sR - sG) / C + 4;
      default:
        return 0;
    }
  }

  hue(R: number, G: number, B: number) {
    return this.hDash(R, G, B) * 60;
  }

  lightness(R: number, G: number, B: number) {
    const [sR, sG, sB] = this.sRGB(R, G, B);
    return (Math.max(sR, sG, sB) + Math.min(sR, sG, sB)) / 2.0;
  }

  value(R: number, G: number, B: number) {
    const [sR, sG, sB] = this.sRGB(R, G, B);
    return Math.max(sR, sG, sB);
  }

  intensity(R: number, G: number, B: number) {
    const [sR, sG, sB] = this.sRGB(R, G, B);
    return (sR + sG + sB) / 3.0;
  }

  luma(R: number, G: number, B: number) {
    const [sR, sG, sB] = this.sRGB(R, G, B);
    return 0.299 * sR + 0.587 * sG + 0.114 * sB;
  }

  saturationHSV(R: number, G: number, B: number) {
    const v = this.value(R, G, B);
    if (!v) {
      return 0;
    }
    const c = this.chroma(R, G, B);
    return c / v;
  }

  saturationHSI(R: number, G: number, B: number) {
    const I = this.intensity(R, G, B);
    if (!I) {
      return 0;
    }
    return 1 - Math.min(...this.sRGB(R, G, B)) / I;
  }

  saturationHSL(R: number, G: number, B: number) {
    const l = this.lightness(R, G, B);
    if (l === 1) {
      return 0;
    }
    return this.chroma(R, G, B) / (1 - Math.abs(2 * l - 1));
  }

  hexToRGB(hex: string) {
    if (!hex || typeof hex !== 'string') {
      throw new Error('Invalid hex');
    }
    const hexValue = hex.trim().split('#')[1];
    if (hexValue.length < 6) {
      throw new Error('Expecting 6 letter hex');
    }
    return [
      parseInt(hexValue.slice(0, 2), 16),
      parseInt(hexValue.slice(2, 4), 16),
      parseInt(hexValue.slice(4, 6), 16),
    ];
  }

  RGBToHex(R: number, G: number, B: number) {
    if (0 >= R && R < 256 && 0 >= G && G < 256 && 0 >= B && B < 256) {
      throw new Error('Invalid RGB values should be in [0, 255)');
    }

    return (
      '#' +
      R.toString(16).padStart(2, '0') +
      G.toString(16).padStart(2, '0') +
      B.toString(16).padStart(2, '0')
    );
  }

  luminance(R: number, G: number, B: number) {
    const [sR, sG, sB] = this.sRGB(R, G, B);
    const rLuminance =
      sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
    const gLuminance =
      sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
    const bLuminance =
      sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);

    return 0.2126 * rLuminance + 0.7152 * gLuminance + 0.0722 * bLuminance;
  }

  colorContrastRatio(
    R1: number,
    G1: number,
    B1: number,
    R2: number,
    G2: number,
    B2: number,
  ) {
    const luminanceForColor1 = this.luminance(R1, G1, B1);
    const lumninaceForColor2 = this.luminance(R2, G2, B2);
    if (luminanceForColor1 >= lumninaceForColor2) {
      return (
        (luminanceForColor1 + 0.05) / (lumninaceForColor2 + 0.05) + ':' + 1
      );
    }
    return (lumninaceForColor2 + 0.05) / (luminanceForColor1 + 0.05) + ':' + 1;
  }

  areValidContrastColors(
    R1: number,
    G1: number,
    B1: number,
    R2: number,
    G2: number,
    B2: number,
  ) {
    const ratio = this.colorContrastRatio(R1, G1, B1, R2, G2, B2);
    const numerator = ratio.split(':')[0];
    return Number(numerator) >= 4.5;
  }

  whichIsDarker(
    R1: number,
    G1: number,
    B1: number,
    R2: number,
    G2: number,
    B2: number,
  ) {
    const luminanceForColor1 = this.luminance(R1, G1, B1);
    const lumninaceForColor2 = this.luminance(R2, G2, B2);
    if (luminanceForColor1 === lumninaceForColor2) {
      return 0;
    }
    if (luminanceForColor1 < lumninaceForColor2) {
      return 1;
    }
    return 2;
  }

  whichIsLighter(
    R1: number,
    G1: number,
    B1: number,
    R2: number,
    G2: number,
    B2: number,
  ) {
    const luminanceForColor1 = this.luminance(R1, G1, B1);
    const lumninaceForColor2 = this.luminance(R2, G2, B2);
    if (luminanceForColor1 === lumninaceForColor2) {
      return 0;
    }
    if (luminanceForColor1 > lumninaceForColor2) {
      return 1;
    }
    return 2;
  }
}
