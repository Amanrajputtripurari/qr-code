# 🎨 Free QR Code Generator

A modern, fully-featured QR code generator built with Next.js that allows you to create beautiful, customizable QR codes with frames, logos, and custom styling - completely free and open source!

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

### 🎯 QR Code Types
- **Website/URL** - Generate QR codes for any website or link
- **Plain Text** - Create QR codes containing any text
- **Email** - Generate email QR codes
- **vCard** - Create digital business cards (coming soon)
- **PDF/Images/Video** - Support for various file types (coming soon)

### 🎨 Design Customization

#### **Shape Styles**
Choose from 8 different dot patterns for your QR code:
- Square (Classic)
- Dots (Circular)
- Rounded
- Extra Rounded
- Classy
- Classy Rounded
- Lines
- Mosaic

#### **Corner Styles**
Customize both the corner squares and center dots with 13+ styles:
- **Border Styles**: Square, Dot, Rounded, Extra Rounded, Leaf variations, etc.
- **Center Styles**: Square, Dot, Diamond, Flower, Star, Plus, Cross, etc.

#### **Colors**
Full color customization:
- QR code dots color
- Corner square color
- Corner dot color
- Background color
- Frame color
- Frame text color
- Quick color invert feature

#### **Frames**
31+ beautiful SVG frames to choose from:
- Bike
- Clipboard
- Coffee
- Document
- Email
- Hand
- Phone
- Globe
- Scan Me
- And many more!

Each frame supports:
- Custom text (e.g., "Scan me!")
- Custom colors
- Transparent backgrounds

#### **Logos**
Add logos to your QR codes:
- **Pre-made icons**: WhatsApp, Link, Location, WiFi, Email, QR Scan, Image, Instagram, Facebook, Twitter
- **Custom logo upload**: Upload your own logo image
- Automatic logo positioning in QR code center

### 📊 Error Correction Levels
Choose from 4 error correction levels:
- **L (Low)**: ~7% correction
- **M (Medium)**: ~15% correction
- **Q (Quartile)**: ~25% correction
- **H (High)**: ~30% correction (recommended for logos)

### 💾 Export Options
Download your QR code in multiple formats:
- **PNG** - High-quality raster image (300-2000px)
- **SVG** - Scalable vector graphics
- **Transparent background** support for both formats

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **QR Code Generation**: [qr-code-styling](https://github.com/kozakdenys/qr-code-styling), [qrcode](https://github.com/soldair/node-qrcode)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Image Export**: [html-to-image](https://github.com/bubkoo/html-to-image)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/qr-code.git
cd qr-code
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
qr-code/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Main page component
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── QRForm.tsx          # QR code input form
│   ├── QRPreview.tsx       # Live QR code preview
│   ├── QRTypeSelector.tsx  # QR type selection
│   ├── design-tabs/        # Design customization tabs
│   │   ├── FrameTab.tsx    # Frame selection
│   │   ├── LevelTab.tsx    # Error correction level
│   │   ├── LogoTab.tsx     # Logo customization
│   │   └── ShapeTab.tsx    # Shape and color customization
│   └── ui/                 # shadcn/ui components
├── lib/                     # Utility functions
│   ├── frames.ts           # Frame definitions (31 SVG frames)
│   ├── download.ts         # Download utilities
│   └── utils.ts            # General utilities
├── store/                   # State management
│   └── useQRStore.ts       # Zustand store for QR settings
├── public/                  # Static assets
│   ├── *.svg               # Frame SVG files
│   ├── logos/              # Pre-made logo icons
│   ├── manifest.json       # PWA manifest
│   ├── robots.txt          # SEO robots file
│   └── sitemap.xml         # SEO sitemap
└── package.json            # Project dependencies
```

## 🎯 Key Features Explained

### State Management (Zustand)

The application uses Zustand for efficient state management. All QR code settings are stored in a single store:

```typescript
// store/useQRStore.ts
{
  qrType: 'website',
  text: 'https://example.com',
  shapeStyle: 'square',
  borderStyle: 'square',
  centerStyle: 'square',
  dotsColor: '#000000',
  bgColor: '#ffffff',
  frameStyle: 'none',
  frameText: 'Scan me!',
  preMadeLogo: 'none',
  errorCorrectionLevel: 'H',
  size: 300,
  // ... and many more settings
}
```

### Frame System

31 custom-designed SVG frames are pre-loaded in `lib/frames.ts`. Each frame includes:
- **viewBox**: SVG viewport dimensions
- **qrRect**: Precise coordinates for QR code placement
- **svgContent**: The frame's SVG markup with placeholders for text and colors

### Live Preview

The QR code preview updates in real-time as you change any setting, thanks to React's useEffect hooks and Zustand's efficient state updates.

### Download System

The download feature combines:
1. QR code generation using qr-code-styling
2. SVG frame overlay with custom text and colors
3. Export to PNG using html-to-image or SVG using native browser APIs

## 🎨 Design Philosophy

- **Modern UI/UX**: Clean, gradient backgrounds with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Accessibility**: Proper semantic HTML and ARIA labels
- **SEO Optimized**: Meta tags, sitemap, robots.txt for search engines
- **Performance**: Code splitting, lazy loading, and optimized assets

## 🔧 Configuration

### Tailwind CSS

This project uses Tailwind CSS v4 with custom configuration in `postcss.config.mjs`.

### shadcn/ui Components

UI components are configured via `components.json` and can be customized using Tailwind classes.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) - Powerful QR code generation library
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Lucide](https://lucide.dev/) - Icon library
- All the contributors and users of this project

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/qr-code/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/qr-code/discussions)

---

**Made with ❤️ using Next.js, TypeScript, and Tailwind CSS**
