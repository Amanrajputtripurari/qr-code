'use client';

import { useRef, useEffect, useState } from 'react';
import { useQRStore } from '@/store/useQRStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { frames } from '@/lib/frames';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function QRPreview() {
    const {
        text,
        dotsColor,
        cornerSquareColor,
        cornerDotColor,
        bgColor,
        size,
        shapeStyle,
        borderStyle,
        centerStyle,
        errorCorrectionLevel,
        preMadeLogo,
        logoImage,
        frameStyle,
        frameColor,
        frameText,
    } = useQRStore();

    const qrRef = useRef<HTMLDivElement>(null);
    const [qrCode, setQrCode] = useState<any>(null);

    // Find selected frame
    const selectedFrame = frames.find(f => f.id === frameStyle) || frames[0];
    const isFrameSelected = selectedFrame.id !== 'none';

    // Calculate dimensions
    // If frame is selected, the "size" prop controls the width of the FRAME.
    // The QR code size is calculated relative to the frame.
    // If no frame, "size" is the QR code size.

    // Parse viewBox
    const viewBox = selectedFrame.viewBox.split(' ').map(Number);
    const viewBoxWidth = viewBox[2] || 100;
    const viewBoxHeight = viewBox[3] || 100;
    const aspectRatio = viewBoxHeight / viewBoxWidth;

    const displaySize = size; // Width of the container
    const displayHeight = isFrameSelected ? displaySize * aspectRatio : displaySize;

    // QR Code position and size (in pixels relative to displaySize)
    const qrX = isFrameSelected ? (selectedFrame.qrRect.x / viewBoxWidth) * displaySize : 0;
    const qrY = isFrameSelected ? (selectedFrame.qrRect.y / viewBoxHeight) * displayHeight : 0;
    const qrSize = isFrameSelected ? (selectedFrame.qrRect.width / viewBoxWidth) * displaySize : displaySize;


    // Map our style types to qr-code-styling options
    const getDotsType = () => {
        const mapping: Record<string, any> = {
            'square': 'square',
            'dots': 'dots',
            'rounded': 'rounded',
            'extra-rounded': 'extra-rounded',
            'classy': 'classy',
            'classy-rounded': 'classy-rounded',
            'lines': 'square',
            'mosaic': 'square',
        };
        return mapping[shapeStyle] || 'square';
    };

    const getCornersSquareType = () => {
        const mapping: Record<string, any> = {
            'square': 'square',
            'dot': 'dot',
            'rounded-square': 'extra-rounded',
            'extra-rounded': 'extra-rounded',
        };
        return mapping[borderStyle] || 'square';
    };

    const getCornersDotType = () => {
        const mapping: Record<string, any> = {
            'square': 'square',
            'dot': 'dot',
        };
        return mapping[centerStyle] || 'square';
    };

    // Map pre-made logos to their file paths
    const getLogoUrl = () => {
        if (logoImage) return logoImage;
        if (!preMadeLogo || preMadeLogo === 'none') return undefined;
        return `/logos/${preMadeLogo}.svg`;
    };

    // Initialize QR code with dynamic import
    useEffect(() => {
        const initQRCode = async () => {
            if (!qrRef.current) return;

            const QRCodeStyling = (await import('qr-code-styling')).default;

            const qrCodeInstance = new QRCodeStyling({
                width: qrSize,
                height: qrSize,
                type: 'svg',
                data: text || 'https://example.com',
                image: getLogoUrl(),
                margin: 0,
                qrOptions: {
                    typeNumber: 0,
                    mode: 'Byte',
                    errorCorrectionLevel: errorCorrectionLevel,
                },
                imageOptions: {
                    hideBackgroundDots: true,
                    imageSize: 0.4,
                    margin: 0,
                },
                dotsOptions: {
                    type: getDotsType(),
                    color: dotsColor,
                },
                backgroundOptions: {
                    color: bgColor,
                },
                cornersSquareOptions: {
                    type: getCornersSquareType(),
                    color: cornerSquareColor,
                },
                cornersDotOptions: {
                    type: getCornersDotType(),
                    color: cornerDotColor,
                },
            });

            qrRef.current.innerHTML = '';
            qrCodeInstance.append(qrRef.current);
            setQrCode(qrCodeInstance);
        };

        initQRCode();
    }, []);

    // Update QR code when settings change
    useEffect(() => {
        if (qrCode) {
            qrCode.update({
                width: qrSize,
                height: qrSize,
                data: text || 'https://example.com',
                qrOptions: {
                    errorCorrectionLevel: errorCorrectionLevel,
                },
                image: getLogoUrl(),
                dotsOptions: {
                    type: getDotsType(),
                    color: dotsColor,
                },
                backgroundOptions: {
                    color: bgColor,
                },
                cornersSquareOptions: {
                    type: getCornersSquareType(),
                    color: cornerSquareColor,
                },
                cornersDotOptions: {
                    type: getCornersDotType(),
                    color: cornerDotColor,
                },
            });
        }
    }, [qrCode, text, dotsColor, cornerSquareColor, cornerDotColor, bgColor, size, shapeStyle, borderStyle, centerStyle, errorCorrectionLevel, logoImage, preMadeLogo, qrSize]);

    const [downloadFormat, setDownloadFormat] = useState<'png' | 'svg' | 'transparent_png'>('png');

    // ... (keep existing code)

    const getCombinedSVG = (transparent: boolean = false) => {
        if (!qrRef.current) return null;
        const qrSvg = qrRef.current.querySelector('svg');
        if (!qrSvg) return null;

        if (!isFrameSelected) {
            return new XMLSerializer().serializeToString(qrSvg);
        }

        let frameContent = selectedFrame.svgContent;
        if (transparent) {
            // Attempt to make the frame background transparent
            // This is a heuristic: replace white fills with none
            frameContent = frameContent
                .replace(/fill:\s*rgb\(255,\s*255,\s*255\);/gi, 'fill: none;')
                .replace(/fill="white"/gi, 'fill="none"')
                .replace(/fill="#ffffff"/gi, 'fill="none"');
        }

        // Replace placeholder text with user text
        // The default text in the SVGs is "¡Escaneame!"
        if (frameText) {
            frameContent = frameContent.replace(/¡Escaneame!/g, frameText);
        } else {
            // If no text is provided, we might want to clear it or keep default.
            // For now, let's clear it if the user explicitly cleared the input, 
            // but the store might have a default.
            // If frameText is empty string, replace with empty string.
            frameContent = frameContent.replace(/¡Escaneame!/g, '');
        }

        // Construct combined SVG
        // We nest the QR code SVG inside the frame SVG
        return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="${selectedFrame.viewBox}" width="${size}" height="${displayHeight}">
                <g style="color: ${frameColor}">${frameContent}</g>
                <svg x="${selectedFrame.qrRect.x}" y="${selectedFrame.qrRect.y}" width="${selectedFrame.qrRect.width}" height="${selectedFrame.qrRect.height}" viewBox="0 0 ${qrSize} ${qrSize}">
                    ${qrSvg.innerHTML}
                </svg>
            </svg>
        `;
    };

    const handleDownload = async () => {
        if (!qrCode) return;

        const isTransparent = downloadFormat === 'transparent_png';
        const originalBgColor = bgColor;

        // If transparent, temporarily update QR code background
        if (isTransparent) {
            await qrCode.update({
                backgroundOptions: {
                    color: 'transparent',
                },
            });
        }

        if (downloadFormat === 'svg') {
            const svgContent = getCombinedSVG(false);
            if (svgContent) {
                const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'qrcode.svg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }
        } else {
            // PNG or Transparent PNG
            const svgContent = getCombinedSVG(isTransparent);
            if (svgContent) {
                const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const img = new Image();

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    // Use a higher scale for better quality
                    const scale = 2;
                    canvas.width = size * scale;
                    canvas.height = displayHeight * scale;
                    const ctx = canvas.getContext('2d');
                    if (!ctx) return;

                    ctx.scale(scale, scale);
                    ctx.drawImage(img, 0, 0, size, displayHeight);

                    const pngUrl = canvas.toDataURL('image/png');
                    const link = document.createElement('a');
                    link.href = pngUrl;
                    link.download = 'qrcode.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                };

                img.src = url;
            }
        }

        // Restore background if it was changed
        if (isTransparent) {
            await qrCode.update({
                backgroundOptions: {
                    color: originalBgColor,
                },
            });
        }
    };

    return (
        <Card className="w-full shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold text-sm">
                        3
                    </div>
                    <CardTitle className="text-xl">Download your QR</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
                <div className="relative flex items-center justify-center p-6 bg-white rounded-lg shadow-inner overflow-hidden">
                    <div
                        style={{
                            width: displaySize,
                            height: displayHeight,
                            position: 'relative'
                        }}
                    >
                        {isFrameSelected && (
                            <svg
                                viewBox={selectedFrame.viewBox}
                                className="absolute inset-0 w-full h-full"
                                style={{ color: frameColor }}
                                dangerouslySetInnerHTML={{
                                    __html: selectedFrame.svgContent.replace(/¡Escaneame!/g, frameText || '')
                                }}
                            />
                        )}
                        <div
                            ref={qrRef}
                            style={{
                                position: 'absolute',
                                left: qrX,
                                top: qrY,
                                width: qrSize,
                                height: qrSize,
                            }}
                        />
                    </div>
                </div>

                <div className="flex gap-3 w-full">
                    <Select value={downloadFormat} onValueChange={(val: any) => setDownloadFormat(val)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="png">PNG</SelectItem>
                            <SelectItem value="svg">SVG</SelectItem>
                            <SelectItem value="transparent_png">Transparent PNG</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        onClick={handleDownload}
                        className="flex-1"
                        size="lg"
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
