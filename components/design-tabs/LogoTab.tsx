'use client';

import { useQRStore, PreMadeLogo } from '@/store/useQRStore';
import { MessageCircle, Link, MapPin, Wifi, Mail, QrCode, Image as ImageIcon, Instagram, Facebook, Twitter, X, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent, useRef } from 'react';

const preMadeLogos: { value: PreMadeLogo; label: string; icon: React.ReactNode; color: string }[] = [
    { value: 'none', label: 'No Logo', icon: <X className="w-6 h-6" />, color: 'text-slate-400' },
    { value: 'whatsapp', label: 'WhatsApp', icon: <MessageCircle className="w-6 h-6" />, color: 'text-green-500' },
    { value: 'link', label: 'Link', icon: <Link className="w-6 h-6" />, color: 'text-purple-500' },
    { value: 'location', label: 'Location', icon: <MapPin className="w-6 h-6" />, color: 'text-red-500' },
    { value: 'wifi', label: 'Wi-Fi', icon: <Wifi className="w-6 h-6" />, color: 'text-cyan-500' },
    { value: 'email', label: 'Email', icon: <Mail className="w-6 h-6" />, color: 'text-yellow-500' },
    { value: 'qr-scan', label: 'QR Scan', icon: <QrCode className="w-6 h-6" />, color: 'text-pink-500' },
    { value: 'image', label: 'Image', icon: <ImageIcon className="w-6 h-6" />, color: 'text-green-600' },
    { value: 'instagram', label: 'Instagram', icon: <Instagram className="w-6 h-6" />, color: 'text-pink-600' },
    { value: 'facebook', label: 'Facebook', icon: <Facebook className="w-6 h-6" />, color: 'text-blue-600' },
    { value: 'twitter', label: 'Twitter', icon: <Twitter className="w-6 h-6" />, color: 'text-sky-500' },
];

export function LogoTab() {
    const { preMadeLogo, logoImage, setPreMadeLogo, setLogoImage } = useQRStore();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size (2MB max)
            if (file.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2MB');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoImage(reader.result as string);
                setPreMadeLogo('none');
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePreMadeLogoClick = (logo: PreMadeLogo) => {
        setPreMadeLogo(logo);
        if (logo !== 'none') {
            setLogoImage(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <Label className="text-base font-semibold">Select a logo</Label>
                <div className="grid grid-cols-6 gap-3">
                    {preMadeLogos.map((logo) => (
                        <button
                            key={logo.value}
                            onClick={() => handlePreMadeLogoClick(logo.value)}
                            className={cn(
                                'aspect-square flex items-center justify-center rounded-full border-2 transition-all',
                                preMadeLogo === logo.value && !logoImage
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300',
                                logo.color
                            )}
                            title={logo.label}
                        >
                            {logo.icon}
                        </button>
                    ))}
                </div>
            </div>

            {/* Upload Custom Logo */}
            <div className="space-y-3">
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all"
                >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Drag and drop or click to upload a logo
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                        (JPG, JPEG, or PNG / 2MB max)
                    </p>
                </div>
                <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                />
            </div>

            {/* Show uploaded logo preview */}
            {logoImage && (
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <img
                        src={logoImage}
                        alt="Custom logo"
                        className="w-12 h-12 object-contain rounded"
                    />
                    <div className="flex-1">
                        <p className="text-sm font-medium">Custom logo uploaded</p>
                        <p className="text-xs text-slate-500">Click to change</p>
                    </div>
                    <button
                        onClick={() => setLogoImage(null)}
                        className="text-slate-400 hover:text-red-500"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
