import { useRef, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
} from 'lucide-react';
import {
  HERO_IMAGE,
  PROJECTS,
  SERVICES,
  STUDIO_METRICS,
  type ProjectCategory,
  type StudioProject,
} from './data/studioData';
import { ResilientImage } from './components/ResilientImage';
import { ProjectModal } from './components/ProjectModal';
import { LegalModal, type LegalTopic } from './components/LegalModal';

interface ContactErrors {
  name?: string;
  email?: string;
  message?: string;
}

const FILTER_OPTIONS: ProjectCategory[] = ['Alle', 'Webdesign', 'Plattformen'];

export default function App() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('Alle');
  const [selectedProject, setSelectedProject] = useState<StudioProject | null>(null);
  const [legalTopic, setLegalTopic] = useState<LegalTopic>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Unternehmenswebsite');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    projectType: string;
  } | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);

  const filteredProjects =
    activeFilter === 'Alle'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeFilter);

  const scrollToContact = (prefillSubject?: string) => {
    setMobileMenuOpen(false);
    setSelectedProject(null);
    if (prefillSubject) {
      setMessage(
        `Wir interessieren uns für ein ähnliches Konzept wie bei „${prefillSubject}“ und freuen uns über ein kurzes Erstgespräch.`
      );
      setSubmittedData(null);
    }
    const contactEl = document.getElementById('kontakt');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
    window.setTimeout(() => {
      nameInputRef.current?.focus();
    }, 350);
  };

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: ContactErrors = {};

    if (!name.trim()) {
      nextErrors.name = 'Bitte geben Sie Ihren Namen an.';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
    }
    if (message.trim().length < 12) {
      nextErrors.message = 'Bitte beschreiben Sie Ihr Vorhaben in mindestens 12 Zeichen.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmittedData({
      name: name.trim(),
      email: email.trim(),
      projectType,
    });
  };

  const handleResetForm = () => {
    setName('');
    setEmail('');
    setProjectType('Unternehmenswebsite');
    setMessage('');
    setErrors({});
    setSubmittedData(null);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900">
      {/* Top Bar: strict 3-zone contract */}
      <header className="sticky top-0 z-40 bg-[#FAFAFA]/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
          >
            Atelier Elbe
          </a>

          <nav
            aria-label="Hauptnavigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            <a
              href="#leistungen"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Leistungen
            </a>
            <a
              href="#projekte"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Projekte
            </a>
            <a
              href="#ueber-uns"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Über uns
            </a>
            <a
              href="#kontakt"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Kontakt
            </a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollToContact()}
              className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#1E40AF] hover:bg-[#1E3A8A] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
            >
              Gespräch buchen
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-2">
            <button
              type="button"
              onClick={() => handleNavClick('leistungen')}
              className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Leistungen
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('projekte')}
              className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Projekte
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('ueber-uns')}
              className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Über uns
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('kontakt')}
              className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              Kontakt
            </button>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => scrollToContact()}
                className="w-full py-2.5 px-4 text-sm font-medium text-white bg-[#1E40AF] hover:bg-[#1E3A8A] rounded-lg transition-colors"
              >
                Gespräch buchen
              </button>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="max-w-[1200px] mx-auto px-6 pt-12 pb-16 lg:pt-20 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Designstudio <span aria-hidden="true">·</span> Hamburg <span aria-hidden="true">·</span> Seit 2019
                </p>

                <h1 className="mt-5 font-display font-bold tracking-tight text-slate-900 text-balance leading-[1.08] text-[clamp(2.25rem,4vw,3.5rem)]">
                  Klare digitale Produkte für anspruchsvolle Marken.
                </h1>

                <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 max-w-xl">
                  Wir gestalten und entwickeln schnelle Unternehmenswebsites, Buchungsplattformen und präzise Designsysteme – ohne unnötigen Ballast und direkt einsatzbereit.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={() => scrollToContact()}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#1E40AF] hover:bg-[#1E3A8A] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
                >
                  <span>Projekt anfragen</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#projekte"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Ausgewählte Projekte ansehen</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-full min-h-[280px] sm:min-h-[360px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <ResilientImage
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  fallbackTitle="Atelier Elbe Studioansicht"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* 4-column proof strip below the hero split */}
          <div className="mt-12 pt-10 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STUDIO_METRICS.map((metric) => (
              <div key={metric.label}>
                <p className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 tabular-nums">
                  {metric.value}
                </p>
                <p className="mt-1.5 text-sm text-slate-600 leading-snug">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Capabilities / Leistungen Section */}
        <section
          id="leistungen"
          className="border-t border-slate-200 bg-white py-16 lg:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="max-w-2xl">
              <p className="text-sm text-slate-500">Leistungsübersicht</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-balance">
                Von der ersten Struktur bis zum laufenden Produktivsystem.
              </h2>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {SERVICES.map((service) => (
                <article
                  key={service.number}
                  className={`p-6 sm:p-8 rounded-xl border border-slate-200 bg-[#FAFAFA] flex flex-col justify-between ${
                    service.span === 'wide' ? 'md:col-span-2' : 'md:col-span-1'
                  }`}
                >
                  <div>
                    <p className="font-mono text-sm font-medium text-[#1E40AF] tabular-nums">
                      {service.number}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-semibold text-slate-900">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 max-w-2xl">
                      {service.description}
                    </p>
                  </div>
                  <p className="mt-6 pt-4 border-t border-slate-200 text-xs sm:text-sm font-medium text-slate-700">
                    {service.outcome}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Projects / Case Studies Section */}
        <section id="projekte" className="border-t border-slate-200 py-16 lg:py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="max-w-xl">
                <p className="text-sm text-slate-500">Fallbeispiele</p>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-balance">
                  Ausgewählte Arbeiten mit messbarem Ergebnis.
                </h2>
              </div>

              {/* Interactive segmented filter control */}
              <div
                className="inline-flex items-center gap-1 p-1 bg-slate-100 border border-slate-200 rounded-lg self-start sm:self-auto"
                role="group"
                aria-label="Projekte filtern"
              >
                {FILTER_OPTIONS.map((option) => {
                  const isActive = activeFilter === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setActiveFilter(option)}
                      aria-pressed={isActive}
                      className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF] ${
                        isActive
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="group text-left bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors flex flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
                >
                  <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                    <ResilientImage
                      src={project.image}
                      alt={project.imageAlt}
                      fallbackTitle={project.title}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between w-full">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">{project.year}</span>
                      </div>

                      <h3 className="mt-2 font-display text-xl font-semibold text-slate-900 group-hover:text-[#1E40AF] transition-colors">
                        {project.title}
                      </h3>

                      <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                        {project.summary}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-4 w-full">
                      <span className="text-sm font-semibold text-slate-900 font-mono tabular-nums">
                        {project.metric}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1E40AF] whitespace-nowrap shrink-0">
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* About & Testimonial / Proof Section */}
        <section
          id="ueber-uns"
          className="border-t border-slate-200 bg-white py-16 lg:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-6">
              <p className="text-sm text-slate-500">Arbeitsweise</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-balance">
                Kleine Teams, kurze Wege und direkte Verantwortung.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600">
                Statt langer Abstimmungsschleifen arbeiten bei uns Design und Entwicklung von Tag eins an gemeinsam am selben Browser-Prototyp. So sehen Sie bereits in der zweiten Woche eine echte, klickbare Website statt statischer Folien.
              </p>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-8 rounded-xl border border-slate-200 bg-[#FAFAFA]">
              <blockquote className="text-base sm:text-lg leading-relaxed text-slate-800">
                „Mit der neuen Bestellstrecke konnten wir die Abbruchrate im Abo-Prozess innerhalb von vier Monaten spürbar senken. Besonders schätzen wir die ruhige Zusammenarbeit auf Augenhöhe.“
              </blockquote>
              <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Henrik Lindemann</p>
                  <p className="text-xs text-slate-500">
                    Geschäftsführer, Nordkaffee GmbH
                  </p>
                </div>
                <p className="text-xs font-mono text-slate-500 tabular-nums">
                  +42 % Konversion · 2026
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact / Interactive Lead Capture Section */}
        <section id="kontakt" className="border-t border-slate-200 py-16 lg:py-24">
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-sm text-slate-500">Kontakt</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 text-balance">
                Starten wir ein kurzes Erstgespräch.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Schildern Sie uns kurz Ihr Vorhaben. Diese Testseite prüft alle Formularfelder direkt im Browser und zeigt anschließend eine Bestätigung an.
              </p>

              <div className="mt-8 pt-6 border-t border-slate-200 space-y-2 text-sm text-slate-600">
                <p className="font-medium text-slate-900">Atelier Elbe Hamburg</p>
                <p>Am Sandtorkai 42, 20457 Hamburg</p>
                <p>hallo@atelier-elbe.example</p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
                {submittedData ? (
                  <div className="py-6 space-y-4">
                    <div className="inline-flex items-center gap-2 text-emerald-700 font-medium text-sm">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>Anfrage erfolgreich erfasst</span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-slate-900">
                      Vielen Dank, {submittedData.name}.
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                      Wir haben Ihre Anfrage zum Thema{' '}
                      <span className="font-medium text-slate-900">
                        {submittedData.projectType}
                      </span>{' '}
                      entgegengenommen. Eine Kopie würde im Produktivbetrieb an{' '}
                      <span className="font-medium text-slate-900">
                        {submittedData.email}
                      </span>{' '}
                      gesendet.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
                      >
                        Weitere Nachricht testen
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-sm font-medium text-slate-800"
                        >
                          Name
                        </label>
                        <input
                          ref={nameInputRef}
                          id="contact-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Max Mustermann"
                          aria-invalid={Boolean(errors.name)}
                          className="mt-1.5 w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/15"
                        />
                        {errors.name && (
                          <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-red-700">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.name}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-sm font-medium text-slate-800"
                        >
                          E-Mail-Adresse
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@unternehmen.de"
                          aria-invalid={Boolean(errors.email)}
                          className="mt-1.5 w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/15"
                        />
                        {errors.email && (
                          <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-red-700">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-type"
                        className="block text-sm font-medium text-slate-800"
                      >
                        Projektbereich
                      </label>
                      <select
                        id="contact-type"
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="mt-1.5 w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/15"
                      >
                        <option value="Unternehmenswebsite">Unternehmenswebsite</option>
                        <option value="Digitale Buchungsplattform">
                          Digitale Buchungsplattform
                        </option>
                        <option value="Designsystem & UI-Audit">
                          Designsystem & UI-Audit
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-sm font-medium text-slate-800"
                      >
                        Kurze Beschreibung
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Worum geht es bei Ihrem Vorhaben und bis wann planen Sie den Start?"
                        aria-invalid={Boolean(errors.message)}
                        className="mt-1.5 w-full px-3.5 py-2.5 text-sm text-slate-900 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/15"
                      />
                      {errors.message && (
                        <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-red-700">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <p className="text-xs text-slate-500">
                        Lokale Test-Validierung ohne Serverversand.
                      </p>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-[#1E40AF] hover:bg-[#1E3A8A] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
                      >
                        <span>Anfrage absenden</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="font-display font-semibold text-slate-900">
              Atelier Elbe
            </span>
            <span aria-hidden="true">·</span>
            <span>Hamburg</span>
            <span aria-hidden="true">·</span>
            <span>© 2026</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
            <a href="#leistungen" className="hover:text-slate-900 transition-colors">
              Leistungen
            </a>
            <a href="#projekte" className="hover:text-slate-900 transition-colors">
              Projekte
            </a>
            <button
              type="button"
              onClick={() => setLegalTopic('impressum')}
              className="hover:text-slate-900 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
            >
              Impressum
            </button>
            <button
              type="button"
              onClick={() => setLegalTopic('datenschutz')}
              className="hover:text-slate-900 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
            >
              Datenschutz
            </button>
          </div>
        </div>
      </footer>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={(title) => scrollToContact(title)}
      />

      <LegalModal topic={legalTopic} onClose={() => setLegalTopic(null)} />
    </div>
  );
}
