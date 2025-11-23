'use client';

import { useQRStore, FrameStyle } from '@/store/useQRStore';
import { Mail, FileText, Hand, Smartphone, Bike, Coffee, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { frames } from '@/lib/frames';

export function FrameTab() {
    const {
        frameStyle,
        frameText,
        frameTextColor,
        frameColor,
        bgColor,
        setFrameStyle,
        setFrameText,
        setFrameTextColor,
        setFrameColor,
        setBgColor,
    } = useQRStore();

    return (
        <div className="space-y-6">
            {/* Frame Selection */}
            <div className="space-y-3">
                <Label className="text-base font-semibold">Select Frame Style</Label>
                <div className="flex flex-nowrap items-center gap-3 max-h-[160px] overflow-x-auto overflow-y-hidden smooth-scroll pb-2">
                    {frames.map((frame) => (
                        <button
                            key={frame.id}
                            onClick={() => setFrameStyle(frame.id)}
                            className={cn(
                                'flex flex-col items-center gap-2 p-2 rounded-lg border-2 transition-all duration-200 ease-in-out flex-shrink-0',
                                frameStyle === frame.id
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-600 shadow-md scale-[1.02]'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 hover:shadow-sm text-slate-600 hover:scale-[1.01]'
                            )}
                        >
                            <div className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded overflow-hidden p-1.5">
                                {frame.id === 'none' ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <svg
                                        viewBox={frame.viewBox}
                                        className="w-full h-full text-current transition-transform duration-200"
                                        dangerouslySetInnerHTML={{ __html: frame.svgContent }}
                                    />
                                )}
                            </div>
                            {/* <span className="text-[8px] font-medium text-center leading-tight">{frame.label}</span> */}
                        </button>
                    ))}
                </div>
            </div>

            {/* Frame Text */}
            {frameStyle !== 'none' && (
                <>
                    <div className="space-y-2">
                        <Label htmlFor="frameText">Frame Text</Label>
                        <Input
                            id="frameText"
                            type="text"
                            placeholder="Scan me!"
                            value={frameText}
                            onChange={(e) => {
                                const newText = e.target.value;
                                if (newText.length <= 15) {
                                    setFrameText(newText);
                                }
                            }}
                        />
                        <div className="flex justify-between text-xs">
                            <span className={cn(frameText.length >= 15 ? "text-red-500 font-medium" : "text-slate-500")}>
                                {frameText.length >= 15 ? "Max character limit reached!" : ""}
                            </span>
                            <span className="text-slate-400">{frameText.length}/15</span>
                        </div>
                    </div>

                    {/* Frame Colors */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="frameTextColor">Text Color</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="frameTextColor"
                                    type="color"
                                    value={frameTextColor}
                                    onChange={(e) => setFrameTextColor(e.target.value)}
                                    className="h-10 w-16 cursor-pointer"
                                />
                                <Input
                                    type="text"
                                    value={frameTextColor}
                                    onChange={(e) => setFrameTextColor(e.target.value)}
                                    placeholder="#FFFFFF"
                                    className="flex-1 font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="frameColor">Frame Color</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="frameColor"
                                    type="color"
                                    value={frameColor}
                                    onChange={(e) => setFrameColor(e.target.value)}
                                    className="h-10 w-16 cursor-pointer"
                                />
                                <Input
                                    type="text"
                                    value={frameColor}
                                    onChange={(e) => setFrameColor(e.target.value)}
                                    placeholder="#000000"
                                    className="flex-1 font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="frameBgColor">Background Color</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="frameBgColor"
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
                    </div>
                </>
            )}
        </div>
    );
}
