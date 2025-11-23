export const downloadSVG = (svgElement: SVGSVGElement, filename: string = 'qrcode.svg') => {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

export const downloadPNG = async (
    svgElement: SVGSVGElement,
    filename: string = 'qrcode.png',
    scale: number = 2
) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const img = new Image();

    return new Promise<void>((resolve, reject) => {
        img.onload = () => {
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            ctx.scale(scale, scale);
            ctx.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error('Failed to create blob'));
                    return;
                }

                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                resolve();
            }, 'image/png');
        };

        img.onerror = reject;
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    });
};
