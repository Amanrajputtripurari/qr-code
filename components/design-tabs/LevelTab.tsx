'use client';

import { useQRStore, ErrorCorrectionLevel } from '@/store/useQRStore';
import { cn } from '@/lib/utils';

const errorLevels: { value: ErrorCorrectionLevel; label: string; recovery: string; description: string }[] = [
    { value: 'Q', label: 'Level Q', recovery: '25%', description: 'Recommended for most uses' },
    { value: 'H', label: 'Level H', recovery: '30%', description: 'Best error correction' },
    { value: 'M', label: 'Level M', recovery: '15%', description: 'Medium error correction' },
    { value: 'L', label: 'Level L', recovery: '7%', description: 'Lowest error correction' },
];

export function LevelTab() {
    const { errorCorrectionLevel, setErrorCorrectionLevel } = useQRStore();

    return (
        <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
                Select a level of error correction. Higher levels allow the QR code to be read even if partially damaged.
            </p>

            <div className="grid grid-cols-2 gap-4">
                {errorLevels.map((level) => (
                    <button
                        key={level.value}
                        onClick={() => setErrorCorrectionLevel(level.value)}
                        className={cn(
                            'flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all text-left',
                            errorCorrectionLevel === level.value
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                        )}
                    >
                        {/* QR Code Preview Placeholder */}
                        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
                            <div className="w-20 h-20 grid grid-cols-5 gap-0.5">
                                {Array.from({ length: 25 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            'rounded-sm',
                                            Math.random() > 0.5 ? 'bg-slate-800 dark:bg-slate-200' : 'bg-slate-200 dark:bg-slate-700'
                                        )}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="flex items-center justify-between mb-1">
                                <span className={cn(
                                    'font-semibold',
                                    errorCorrectionLevel === level.value ? 'text-blue-600' : 'text-slate-900 dark:text-slate-100'
                                )}>
                                    {level.label}
                                </span>
                                <span className={cn(
                                    'text-sm font-medium px-2 py-0.5 rounded',
                                    errorCorrectionLevel === level.value
                                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                )}>
                                    {level.recovery}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {level.description}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
