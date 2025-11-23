'use client';

import { useQRStore, QRType } from '@/store/useQRStore';
import { Globe, FileText, FileType, Image, CreditCard, Video, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const qrTypes: { type: QRType; label: string; icon: React.ReactNode }[] = [
    { type: 'website', label: 'Website', icon: <Globe className="w-5 h-5" /> },
    { type: 'text', label: 'Text', icon: <FileText className="w-5 h-5" /> },
    { type: 'pdf', label: 'PDF', icon: <FileType className="w-5 h-5" /> },
    { type: 'images', label: 'Images', icon: <Image className="w-5 h-5" /> },
    { type: 'vcard', label: 'vCard Plus', icon: <CreditCard className="w-5 h-5" /> },
    { type: 'video', label: 'Video', icon: <Video className="w-5 h-5" /> },
];

export function QRTypeSelector() {
    const { qrType, setQRType } = useQRStore();

    return (
        <div className="bg-white dark:bg-slate-900 rounded-lg border shadow-sm p-2">
            <div className="flex items-center gap-2 overflow-x-auto">
                {qrTypes.map((item) => (
                    <button
                        key={item.type}
                        onClick={() => setQRType(item.type)}
                        className={cn(
                            'flex items-center gap-2 px-4 py-2.5 rounded-md transition-all whitespace-nowrap',
                            'hover:bg-slate-50 dark:hover:bg-slate-800',
                            qrType === item.type
                                ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                                : 'text-slate-600 dark:text-slate-400'
                        )}
                    >
                        {item.icon}
                        <span className="font-medium text-sm">{item.label}</span>
                    </button>
                ))}
                <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-md transition-all text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
