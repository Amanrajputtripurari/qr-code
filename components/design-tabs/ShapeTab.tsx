'use client';

import { useQRStore, ShapeStyle, BorderStyle, CenterStyle } from '@/store/useQRStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

// Only include patterns that qr-code-styling actually supports
const shapeStyles: { value: ShapeStyle; label: string }[] = [
    { value: 'square', label: 'Square' },
    { value: 'dots', label: 'Dots' },
    { value: 'rounded', label: 'Rounded' },
    { value: 'extra-rounded', label: 'Extra Rounded' },
    { value: 'classy', label: 'Classy' },
    { value: 'classy-rounded', label: 'Classy Rounded' },
];

const borderStyles: { value: BorderStyle; label: string }[] = [
    { value: 'square', label: 'Square' },
    { value: 'dot', label: 'Dot' },
    { value: 'extra-rounded', label: 'Rounded' },
];

const centerStyles: { value: CenterStyle; label: string }[] = [
    { value: 'square', label: 'Square' },
    { value: 'dot', label: 'Dot' },
];

export function ShapeTab() {
    const {
        shapeStyle,
        borderStyle,
        centerStyle,
        dotsColor,
        cornerSquareColor,
        cornerDotColor,
        bgColor,
        setShapeStyle,
        setBorderStyle,
        setCenterStyle,
        setDotsColor,
        setCornerSquareColor,
        setCornerDotColor,
        setBgColor,
        invertColors,
    } = useQRStore();

    return (
        <div className="space-y-6">
            {/* QR Dots Style */}
            <div className="space-y-3">
                <Label className="text-base font-semibold">QR Dots Style</Label>
                <p className="text-xs text-muted-foreground">Choose the pattern for the main QR code dots</p>
                <div className="grid grid-cols-3 gap-2">
                    {shapeStyles.map((style) => (
                        <button
                            key={style.value}
                            onClick={() => setShapeStyle(style.value)}
                            className={cn(
                                'p-3 rounded-lg border-2 transition-all text-sm font-medium',
                                shapeStyle === style.value
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                            )}
                        >
                            {style.label}
                        </button>
                    ))}
                </div>

                {/* QR Dots Color */}
                <div className="space-y-2 pt-2">
                    <Label htmlFor="dotsColor" className="text-sm">QR Dots Color</Label>
                    <div className="flex gap-2">
                        <Input
                            id="dotsColor"
                            type="color"
                            value={dotsColor}
                            onChange={(e) => setDotsColor(e.target.value)}
                            className="h-10 w-16 cursor-pointer"
                        />
                        <Input
                            type="text"
                            value={dotsColor}
                            onChange={(e) => setDotsColor(e.target.value)}
                            placeholder="#000000"
                            className="flex-1 font-mono text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Corner Squares Style */}
            <div className="space-y-3">
                <Label className="text-base font-semibold">Corner Squares Style</Label>
                <p className="text-xs text-muted-foreground">Customize the three large corner squares</p>
                <div className="grid grid-cols-3 gap-2">
                    {borderStyles.map((style) => (
                        <button
                            key={style.value}
                            onClick={() => setBorderStyle(style.value)}
                            className={cn(
                                'p-3 rounded-lg border-2 transition-all text-sm font-medium',
                                borderStyle === style.value
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                            )}
                        >
                            {style.label}
                        </button>
                    ))}
                </div>

                {/* Corner Squares Color */}
                <div className="space-y-2 pt-2">
                    <Label htmlFor="cornerSquareColor" className="text-sm">Corner Squares Color</Label>
                    <div className="flex gap-2">
                        <Input
                            id="cornerSquareColor"
                            type="color"
                            value={cornerSquareColor}
                            onChange={(e) => setCornerSquareColor(e.target.value)}
                            className="h-10 w-16 cursor-pointer"
                        />
                        <Input
                            type="text"
                            value={cornerSquareColor}
                            onChange={(e) => setCornerSquareColor(e.target.value)}
                            placeholder="#000000"
                            className="flex-1 font-mono text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Center Dots Style */}
            <div className="space-y-3">
                <Label className="text-base font-semibold">Center Dots Style</Label>
                <p className="text-xs text-muted-foreground">Customize the center dots inside corner squares</p>
                <div className="grid grid-cols-2 gap-2">
                    {centerStyles.map((style) => (
                        <button
                            key={style.value}
                            onClick={() => setCenterStyle(style.value)}
                            className={cn(
                                'p-3 rounded-lg border-2 transition-all text-sm font-medium',
                                centerStyle === style.value
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                            )}
                        >
                            {style.label}
                        </button>
                    ))}
                </div>

                {/* Center Dots Color */}
                <div className="space-y-2 pt-2">
                    <Label htmlFor="cornerDotColor" className="text-sm">Center Dots Color</Label>
                    <div className="flex gap-2">
                        <Input
                            id="cornerDotColor"
                            type="color"
                            value={cornerDotColor}
                            onChange={(e) => setCornerDotColor(e.target.value)}
                            className="h-10 w-16 cursor-pointer"
                        />
                        <Input
                            type="text"
                            value={cornerDotColor}
                            onChange={(e) => setCornerDotColor(e.target.value)}
                            placeholder="#000000"
                            className="flex-1 font-mono text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Background Color */}
            <div className="space-y-2">
                <Label htmlFor="bgColor" className="text-sm font-semibold">Background Color</Label>
                <div className="flex gap-2">
                    <Input
                        id="bgColor"
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-10 w-16 cursor-pointer"
                    />
                    <Input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        placeholder="#FFFFFF"
                        className="flex-1 font-mono text-sm"
                    />
                </div>
            </div>

            <Button
                variant="ghost"
                size="sm"
                onClick={invertColors}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
                <RefreshCw className="w-4 h-4 mr-2" />
                Invert Colors
            </Button>
        </div>
    );
}
