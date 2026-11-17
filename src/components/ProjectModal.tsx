import { useEffect } from 'react';
import { X, ArrowRight } from 'lucide-react';
import type { StudioProject } from '../data/studioData';
import { ResilientImage } from './ResilientImage';

interface ProjectModalProps {
  project: StudioProject | null;
  onClose: () => void;
  onInquire: (projectTitle: string) => void;
}

export function ProjectModal({ project, onClose, onInquire }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px] p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-[16/9] w-full bg-slate-100 overflow-hidden">
          <ResilientImage
            src={project.image}
            alt={project.imageAlt}
            fallbackTitle={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{project.category}</span>
                <span aria-hidden="true">·</span>
                <span>{project.client}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{project.year}</span>
              </div>
              <h3
                id="project-modal-title"
                className="mt-2 text-2xl font-semibold tracking-tight text-slate-900"
              >
                {project.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Projektansicht schließen"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF] shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium text-slate-500">Ausgangslage</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                {project.challenge}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Umsetzung</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-lg font-semibold text-slate-900 font-mono tabular-nums">
                {project.metric}
              </p>
              <p className="text-xs text-slate-500">{project.metricContext}</p>
            </div>

            <button
              type="button"
              onClick={() => onInquire(project.title)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#1E40AF] hover:bg-[#1E3A8A] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
            >
              <span>Ähnliches Projekt anfragen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-500">
            Leistungsbausteine: {project.deliverables.join(' · ')}
          </div>
        </div>
      </div>
    </div>
  );
}
