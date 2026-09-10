import React, { useEffect, useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallButton: React.FC<{ variant?: 'nav' | 'hero' | 'mobile' }> = ({ variant = 'nav' }) => {
  const { language } = useApp();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [showIOSGuide, setShowIOSGuide] = useState<boolean>(false);

  useEffect(() => {
    // Detect standalone mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(isStandalone);

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }
    if (!deferredPrompt) {
      // If already installed or browser hasn't prompted yet, provide friendly toast or open instructions
      alert(language === 'bn' ? 'ব্রাউজার মেনু (তিন ডট) থেকে "Add to Home Screen" বা "Install App" চাপুন।' : 'Please use your browser menu and tap "Add to Home Screen" or "Install App".');
      return;
    }
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setDeferredPrompt(null);
    }
  };

  if (isInstalled) {
    return null;
  }

  const label = language === 'bn' ? 'অ্যাপ ইনস্টল' : 'Install App';

  return (
    <>
      <button
        id="btn-pwa-install"
        onClick={handleInstallClick}
        aria-label={label}
        className={
          variant === 'mobile'
            ? 'flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:from-sky-500 hover:to-blue-500 transition-all'
            : variant === 'hero'
            ? 'inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all shadow-sm'
            : 'hidden md:inline-flex items-center gap-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 px-3 py-1.5 text-xs font-semibold text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/60 transition-all'
        }
      >
        <Download className="w-3.5 h-3.5" />
        <span>{label}</span>
      </button>

      {/* iOS Safari Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fade-in">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setShowIOSGuide(false)}
              className="absolute right-4 top-4 p-1 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-900 dark:text-sky-300">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {language === 'bn' ? 'আইফোনে ইনস্টল করুন' : 'Install on iPhone / iPad'}
                </h3>
                <p className="text-xs text-slate-500">JOYPURHAT 5900 G.P.O</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {language === 'bn' ? (
                <>
                  ১. Safari ব্রাউজারের নিচে <strong>Share</strong> (শেয়ার) বাটনে চাপ দিন।<br />
                  ২. একটু নিচে স্ক্রোল করে <strong>"Add to Home Screen"</strong> নির্বাচন করুন।
                </>
              ) : (
                <>
                  1. Tap the <strong>Share</strong> icon in Safari toolbar.<br />
                  2. Scroll down and choose <strong>"Add to Home Screen"</strong>.
                </>
              )}
            </p>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full rounded-xl bg-slate-900 dark:bg-slate-100 py-2 text-sm font-semibold text-white dark:text-slate-900 hover:opacity-90"
            >
              {language === 'bn' ? 'বুঝেছি' : 'Got it'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
