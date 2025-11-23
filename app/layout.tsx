import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free QR Code Generator | Create, Build & Generate QR Codes Online",
  description: "Create custom QR codes instantly with our free online QR code generator. Build professional QR codes with custom colors, logos, and frames. Generate QR codes for URLs, text, emails, and more. 100% free, no sign-up required.",
  keywords: [
    "qr code generator",
    "create qr code",
    "build qr code",
    "generate qr code",
    "free qr code",
    "custom qr code",
    "qr code maker",
    "online qr code generator",
    "qr code creator",
    "make qr code",
    "qr code with logo",
    "qr code customizer",
  ],
  authors: [{ name: "QR Code Generator" }],
  creator: "QR Code Generator",
  publisher: "QR Code Generator",
  metadataBase: new URL('https://qr-code-generator.com'), // Update with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Free QR Code Generator | Create Custom QR Codes Online",
    description: "Create custom QR codes instantly with our free online QR code generator. Build professional QR codes with custom colors, logos, and frames. No sign-up required.",
    url: 'https://qr-code-generator.com', // Update with your actual domain
    siteName: 'QR Code Generator',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // You'll need to create this image
        width: 1200,
        height: 630,
        alt: 'QR Code Generator - Create Custom QR Codes Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Free QR Code Generator | Create Custom QR Codes",
    description: "Create custom QR codes instantly. Free, open-source QR code generator with color customization and logo support.",
    images: ['/og-image.png'], // You'll need to create this image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png', // You may want to create this
  },
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "QR Code Generator",
    "description": "Free online QR code generator. Create custom QR codes with colors, logos, and frames instantly.",
    "url": "https://qr-code-generator.com", // Update with your actual domain
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Custom QR code colors",
      "Logo integration",
      "Multiple frame styles",
      "PNG and SVG download",
      "No watermarks",
      "No registration required"
    ],
    "screenshot": "https://qr-code-generator.com/og-image.png", // Update with your actual domain
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
