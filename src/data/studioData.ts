import heroStudioElbe from '../assets/images/hero_studio_elbe_1794923288427.jpg';
import projectNordKaffee from '../assets/images/project_nord_kaffee_1794923288372.jpg';
import projectAlsterMobilitaet from '../assets/images/project_alster_mobilitat_1794923291562.jpg';
import projectHanseFinanz from '../assets/images/project_hanse_finanz_1794923289789.jpg';

export type ProjectCategory = 'Alle' | 'Webdesign' | 'Plattformen';

export interface StudioProject {
  id: string;
  title: string;
  client: string;
  category: Exclude<ProjectCategory, 'Alle'>;
  year: string;
  summary: string;
  metric: string;
  metricContext: string;
  image: string;
  imageAlt: string;
  deliverables: string[];
  challenge: string;
  solution: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
  outcome: string;
  span: 'wide' | 'normal';
}

export const HERO_IMAGE = {
  src: heroStudioElbe,
  alt: 'Heller Besprechungsraum im Atelier Elbe in Hamburg mit Eichentisch und hohen Industriefenstern',
};

export const SERVICES: ServiceItem[] = [
  {
    number: '01.',
    title: 'Webdesign & Markenauftritt',
    description:
      'Klare Informationsarchitektur, eigenständige Typografie und ruhige visuelle Systeme, die Vertrauen schaffen und Produkte ohne Umwege erklären.',
    outcome: 'Durchschnittlich 38 % längere Verweildauer nach Relaunch',
    span: 'wide',
  },
  {
    number: '02.',
    title: 'Frontend-Entwicklung',
    description:
      'Barrierefreie React- und TypeScript-Anwendungen mit minimalen Ladezeiten, sauberem Markup und stabiler Performance auf Desktop und Mobilgeräten.',
    outcome: 'Ladezeiten unter 0,9 Sekunden im Standard-Mobilnetz',
    span: 'normal',
  },
  {
    number: '03.',
    title: 'Digitale Produkt-Interfaces',
    description:
      'Strukturierte Kundenportale, Konfiguratoren und Buchungsstrecken mit klaren Formularen und nachvollziehbaren Arbeitsabläufen.',
    outcome: 'Reduzierte Abbruchraten in mehrstufigen Prozessen',
    span: 'normal',
  },
  {
    number: '04.',
    title: 'Designsysteme & Dokumentation',
    description:
      'Wiederverwendbare Komponenten-Bibliotheken und verbindliche Gestaltungsregeln für Teams, die langfristig eigenständig weiterentwickeln.',
    outcome: 'Halbierte Entwicklungszeit für neue Unterseiten',
    span: 'wide',
  },
];

export const PROJECTS: StudioProject[] = [
  {
    id: 'nord-kaffee',
    title: 'Nordkaffee Rösterei',
    client: 'Nordkaffee GmbH, Bremen',
    category: 'Webdesign',
    year: '2026',
    summary:
      'Neugestaltung des Direktvertriebs mit klarem Abo-Rechner und reduzierter Produktpräsentation.',
    metric: '+42 % Konversion',
    metricContext: 'in den ersten 4 Monaten nach Launch',
    image: projectNordKaffee,
    imageAlt: 'Minimalistische weiße und kobaltblaue Kaffeebeutel auf hellem Kalkstein',
    deliverables: ['Markendesign', 'Shop-Architektur', 'Abo-Konfigurator'],
    challenge:
      'Der bisherige Online-Shop wirkte überladen und führte bei Neukunden häufig zu Abbrüchen vor der Sortenwahl.',
    solution:
      'Wir haben die Auswahl auf drei klare Röstprofile reduziert und einen dreistufigen Abo-Assistenten direkt auf der Produktseite integriert.',
  },
  {
    id: 'alster-mobilitaet',
    title: 'Alster Urban Mobility',
    client: 'Alster Radwerke AG, Hamburg',
    category: 'Plattformen',
    year: '2025',
    summary:
      'Interaktive Flotten- und Probefahrtbuchung für gewerbliche Dienstrad-Leasingkunden.',
    metric: '0,8 s Ladezeit',
    metricContext: 'bei 1.400 monatlichen Probefahrt-Anfragen',
    image: projectAlsterMobilitaet,
    imageAlt: 'Dunkelgraues elektrisches Stadtfahrrad in einem modernen Beton-Pavillon',
    deliverables: ['Buchungsplattform', 'Standort-Suche', 'Designsystem'],
    challenge:
      'Unternehmenskunden mussten Probefahrten telefonisch abstimmen, was zu langen Wartezeiten führte.',
    solution:
      'Eine durchgängige Online-Reservierung mit Echtzeit-Verfügbarkeit der Hamburger Teststationen senkte den Abstimmungsaufwand deutlich.',
  },
  {
    id: 'hanse-beratung',
    title: 'Hanse Werkberatung',
    client: 'Hanse Werkberatung PartG',
    category: 'Webdesign',
    year: '2025',
    summary:
      'Ruhiger redaktioneller Webauftritt inklusive Dokumenten-Archiv und Mandanten-Anfrage.',
    metric: '+64 % qualifizierte Anfragen',
    metricContext: 'über das strukturierte Erstgespräch-Formular',
    image: projectHanseFinanz,
    imageAlt: 'Aufgeräumter Arbeitsplatz mit Laptop und gedrucktem Gestaltungsraster',
    deliverables: ['Informationsarchitektur', 'Redaktionelles Layout', 'Barrierefreiheit'],
    challenge:
      'Komplexe Beratungsleistungen waren in langen Fließtexten verborgen und auf Mobilgeräten schwer erfassbar.',
    solution:
      'Durch klare Fallbeispiele und eine strukturierte Themen-Navigation finden Entscheider binnen Sekunden den passenden Ansprechpartner.',
  },
];

export const STUDIO_METRICS = [
  { value: '48', label: 'umgesetzte Webprojekte seit 2019' },
  { value: '0,8 s', label: 'durchschnittliche Seitenladezeit' },
  { value: '14 Tage', label: 'vom ersten Entwurf zum klickbaren Prototyp' },
  { value: '100 %', label: 'barrierefreie Kontrastwerte nach WCAG AA' },
];
