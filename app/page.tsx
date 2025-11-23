import { QRForm } from '@/components/QRForm';
import { QRPreview } from '@/components/QRPreview';
import { QRTypeSelector } from '@/components/QRTypeSelector';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Free QR Code Generator - Create & Build QR Codes Online
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Create custom QR codes instantly with our free online generator. Build professional QR codes with custom colors, logos, and frames. Generate QR codes for URLs, text, emails, and more - 100% free, no sign-up required.
          </p>
        </header>

        {/* QR Type Selector */}
        {/* <div className="mb-6 max-w-7xl mx-auto">
          <QRTypeSelector />
        </div> */}

        {/* Main Content */}
        <main>
          <section className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto items-start">
            <article className="w-full lg:w-1/2 order-2 lg:order-1">
              <QRForm />
            </article>
            <aside className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="lg:sticky lg:top-8 transition-all duration-300">
                <QRPreview />
              </div>
            </aside>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}
