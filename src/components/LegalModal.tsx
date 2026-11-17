import { useEffect } from 'react';
import { X } from 'lucide-react';

export type LegalTopic = 'impressum' | 'datenschutz' | null;

interface LegalModalProps {
  topic: LegalTopic;
  onClose: () => void;
}

export function LegalModal({ topic, onClose }: LegalModalProps) {
  useEffect(() => {
    if (!topic) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [topic, onClose]);

  if (!topic) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px] p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div
        className="w-full max-w-lg bg-white border border-slate-200 rounded-xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <h3
            id="legal-modal-title"
            className="text-xl font-semibold text-slate-900"
          >
            {topic === 'impressum' ? 'Impressum (Muster)' : 'Datenschutzhinweis (Muster)'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fenster schließen"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {topic === 'impressum' ? (
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600">
            <p className="font-medium text-slate-900">Atelier Elbe GmbH (Testwebsite)</p>
            <p>Am Sandtorkai 42, 20457 Hamburg</p>
            <p>Telefon: +49 40 123 456 00 · E-Mail: hallo@atelier-elbe.example</p>
            <p className="pt-2 text-xs text-slate-500">
              Hinweis: Dies ist eine zu Testzwecken erstellte Beispielseite mit fiktiven Kontaktdaten.
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600">
            <p>
              Diese Testwebsite verarbeitet eingegebene Formulardaten ausschließlich lokal im Browser, um das Kontaktformular zu demonstrieren. Es findet keine Übermittlung an externe Server oder Tracking-Dienste statt.
            </p>
            <p className="text-xs text-slate-500">
              Für einen produktiven Einsatz lassen sich hier die vollständigen Angaben gemäß DSGVO hinterlegen.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
