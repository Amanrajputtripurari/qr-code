'use client';

import { useQRStore } from '@/store/useQRStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RotateCcw } from 'lucide-react';
import { ShapeTab } from './design-tabs/ShapeTab';
import { FrameTab } from './design-tabs/FrameTab';
import { LogoTab } from './design-tabs/LogoTab';
import { LevelTab } from './design-tabs/LevelTab';

export function QRForm() {
    const { text, setText, reset, qrType } = useQRStore();

    const getPlaceholder = () => {
        switch (qrType) {
            case 'website':
                return 'E.g. https://www.myweb.com/';
            case 'text':
                return 'Enter your text here';
            case 'pdf':
                return 'Upload or link to PDF';
            case 'images':
                return 'Upload or link to images';
            case 'vcard':
                return 'Enter contact information';
            case 'video':
                return 'Enter video URL';
            default:
                return 'Enter content';
        }
    };

    const getLabel = () => {
        switch (qrType) {
            case 'website':
                return 'Enter your Website';
            case 'text':
                return 'Enter your Text';
            case 'pdf':
                return 'Enter PDF URL';
            case 'images':
                return 'Enter Image URL';
            case 'vcard':
                return 'Enter Contact Info';
            case 'video':
                return 'Enter Video URL';
            default:
                return 'Enter Content';
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold text-sm">
                        1
                    </div>
                    <CardTitle className="text-xl">Complete the content</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="content">{getLabel()}</Label>
                    <Input
                        id="content"
                        type="text"
                        placeholder={getPlaceholder()}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className={!text ? 'border-red-300' : ''}
                    />
                    {!text && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                            <span className="inline-block w-3 h-3 border border-red-500 rounded-full flex items-center justify-center text-[8px]">!</span>
                            Required field
                        </p>
                    )}
                </div>
            </CardContent>

            <CardHeader className="pt-8">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold text-sm">
                        2
                    </div>
                    <CardTitle className="text-xl">Design your QR</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <Tabs defaultValue="frame" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 mb-6">
                        <TabsTrigger value="frame">Frame</TabsTrigger>
                        <TabsTrigger value="shape">Shape</TabsTrigger>
                        <TabsTrigger value="logo">Logo</TabsTrigger>
                        <TabsTrigger value="level">Level</TabsTrigger>
                    </TabsList>

                    <TabsContent value="frame" className="mt-0">
                        <FrameTab />
                    </TabsContent>

                    <TabsContent value="shape" className="mt-0">
                        <ShapeTab />
                    </TabsContent>

                    <TabsContent value="logo" className="mt-0">
                        <LogoTab />
                    </TabsContent>

                    <TabsContent value="level" className="mt-0">
                        <LevelTab />
                    </TabsContent>
                </Tabs>

                <Button
                    onClick={reset}
                    variant="outline"
                    className="w-full"
                    size="lg"
                >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset to Defaults
                </Button>
            </CardContent>
        </Card>
    );
}
