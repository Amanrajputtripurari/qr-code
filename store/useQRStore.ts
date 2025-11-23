import { create } from 'zustand';

// QR Code Types
export type QRType = 'website' | 'text' | 'pdf' | 'images' | 'vcard' | 'video';

// Shape/Pattern Styles
export type ShapeStyle = 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded' | 'lines' | 'mosaic';

// Border (Corner) Styles
export type BorderStyle = 'square' | 'dot' | 'rounded-square' | 'extra-rounded' | 'left-leaf' | 'right-leaf' | 'left-right-leaf' | 'top-leaf' | 'bottom-leaf' | 'top-bottom-leaf' | 'all-leaf' | 'square-dot' | 'rounded-dot';

// Center (Dot) Styles
export type CenterStyle = 'square' | 'dot' | 'rounded-square' | 'extra-rounded' | 'left-diamond' | 'right-diamond' | 'left-right-diamond' | 'top-diamond' | 'bottom-diamond' | 'flower' | 'star' | 'diamond' | 'plus' | 'cross';

// Frame Styles
export type FrameStyle = string;

// Error Correction Levels
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

// Pre-made Logo Icons
export type PreMadeLogo = 'none' | 'whatsapp' | 'link' | 'location' | 'wifi' | 'email' | 'qr-scan' | 'image' | 'instagram' | 'facebook' | 'twitter';

export interface QRState {
  // QR Type
  qrType: QRType;

  // Content based on type
  text: string;

  // Design - Shape
  shapeStyle: ShapeStyle;
  borderStyle: BorderStyle;
  centerStyle: CenterStyle;
  dotsColor: string;        // Main QR dots color
  cornerSquareColor: string; // Corner squares color
  cornerDotColor: string;    // Corner center dots color
  bgColor: string;

  // Design - Frame
  frameStyle: FrameStyle;
  frameText: string;         // Text to display on frame
  frameTextColor: string;    // Frame text color
  frameColor: string;        // Frame background color

  // Design - Logo
  preMadeLogo: PreMadeLogo;
  logoImage: string | null;

  // Design - Level
  errorCorrectionLevel: ErrorCorrectionLevel;

  // Size
  size: number;

  // Actions
  setQRType: (type: QRType) => void;
  setText: (text: string) => void;
  setShapeStyle: (style: ShapeStyle) => void;
  setBorderStyle: (style: BorderStyle) => void;
  setCenterStyle: (style: CenterStyle) => void;
  setDotsColor: (color: string) => void;
  setCornerSquareColor: (color: string) => void;
  setCornerDotColor: (color: string) => void;
  setBgColor: (color: string) => void;
  invertColors: () => void;
  setFrameStyle: (style: FrameStyle) => void;
  setFrameText: (text: string) => void;
  setFrameTextColor: (color: string) => void;
  setFrameColor: (color: string) => void;
  setPreMadeLogo: (logo: PreMadeLogo) => void;
  setLogoImage: (image: string | null) => void;
  setErrorCorrectionLevel: (level: ErrorCorrectionLevel) => void;
  setSize: (size: number) => void;
  reset: () => void;
}

const defaultState = {
  qrType: 'website' as QRType,
  text: 'https://example.com',
  shapeStyle: 'square' as ShapeStyle,
  borderStyle: 'square' as BorderStyle,
  centerStyle: 'square' as CenterStyle,
  dotsColor: '#000000',
  cornerSquareColor: '#000000',
  cornerDotColor: '#000000',
  bgColor: '#ffffff',
  frameStyle: 'none' as FrameStyle,
  frameText: 'Scan me!',
  frameTextColor: '#ffffff',
  frameColor: '#000000',
  preMadeLogo: 'none' as PreMadeLogo,
  logoImage: null,
  errorCorrectionLevel: 'H' as ErrorCorrectionLevel,
  size: 300,
};

export const useQRStore = create<QRState>((set, get) => ({
  ...defaultState,

  setQRType: (qrType) => set({ qrType }),
  setText: (text) => set({ text }),
  setShapeStyle: (shapeStyle) => set({ shapeStyle }),
  setBorderStyle: (borderStyle) => set({ borderStyle }),
  setCenterStyle: (centerStyle) => set({ centerStyle }),
  setDotsColor: (dotsColor) => set({ dotsColor }),
  setCornerSquareColor: (cornerSquareColor) => set({ cornerSquareColor }),
  setCornerDotColor: (cornerDotColor) => set({ cornerDotColor }),
  setBgColor: (bgColor) => set({ bgColor }),

  invertColors: () => {
    const { dotsColor, bgColor } = get();
    set({ dotsColor: bgColor, bgColor: dotsColor });
  },

  setFrameStyle: (frameStyle) => set({ frameStyle }),
  setFrameText: (frameText) => set({ frameText }),
  setFrameTextColor: (frameTextColor) => set({ frameTextColor }),
  setFrameColor: (frameColor) => set({ frameColor }),
  setPreMadeLogo: (preMadeLogo) => set({ preMadeLogo }),
  setLogoImage: (logoImage) => set({ logoImage }),
  setErrorCorrectionLevel: (errorCorrectionLevel) => set({ errorCorrectionLevel }),
  setSize: (size) => set({ size }),

  reset: () => set(defaultState),
}));
