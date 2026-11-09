// Íconos de línea propios (sin dependencias). Todos heredan el color del texto.
import type { SVGProps } from "react";
import type { LabAreaIcon } from "@/lib/catalog/types";

type P = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const Bolt = (p: P) => (
  <svg viewBox="0 0 22 30" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M13.5 0 2 17h7.2L5.5 30 20 11.5h-7.6L13.5 0Z" />
  </svg>
);

export const Search = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const Menu = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const ArrowRight = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Check = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12.5 2.6 2.5L16 9.5" />
  </svg>
);

export const Receipt = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
    <path d="M9 8h6M9 12h6" />
  </svg>
);

export const Shield = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3 5 6v5c0 4.4 3 8.3 7 10 4-1.7 7-5.6 7-10V6l-7-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Truck = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" />
    <circle cx="7" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
  </svg>
);

export const Book = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 4h10a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z" />
    <path d="M5 17a3 3 0 0 1 3-3h10" />
  </svg>
);

export const WhatsApp = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.3-.6-.5-1-1.1-1.3-1.7-.1-.2 0-.4.1-.5l.4-.5.3-.4v-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.6.6-.9 1.4-.9 2.2.1 1 .4 1.9 1 2.7 1.1 1.6 2.5 2.9 4.3 3.7.5.2 1 .4 1.5.5.6.2 1.2.2 1.8.1.6-.1 1.3-.6 1.6-1.1.2-.4.2-.9.1-1.3l-.7-.1Z" />
  </svg>
);

// Íconos de las áreas del laboratorio
const areaIcons: Record<LabAreaIcon, (p: P) => React.JSX.Element> = {
  gpu: (p) => (
    <svg {...base} {...p}>
      <rect x="2" y="6" width="18" height="11" rx="1.5" />
      <circle cx="8" cy="11.5" r="2.6" />
      <circle cx="14.5" cy="11.5" r="2.6" />
      <path d="M20 9h2M5 17v2M9 17v2M13 17v2" />
    </svg>
  ),
  memory: (p) => (
    <svg {...base} {...p}>
      <rect x="2" y="7" width="20" height="9" rx="1" />
      <path d="M6 10v3M10 10v3M14 10v3M18 10v3M4 16v2M20 16v2M11 16v2" />
    </svg>
  ),
  board: (p) => (
    <svg {...base} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <rect x="8" y="8" width="8" height="8" rx="1" />
      <path d="M8 3v2M12 3v2M16 3v2M8 19v2M12 19v2M16 19v2M3 12h2M19 12h2" />
    </svg>
  ),
  monitor: (p) => (
    <svg {...base} {...p}>
      <rect x="2" y="4" width="20" height="13" rx="1.5" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  peripherals: (p) => (
    <svg {...base} {...p}>
      <rect x="2" y="12" width="13" height="7" rx="1.5" />
      <path d="M5 15h1M8 15h1M11 15h1M6 17h5" />
      <rect x="17" y="8" width="5" height="9" rx="2.5" />
      <path d="M19.5 8V5.5a2 2 0 0 0-2-2H12" />
    </svg>
  ),
  build: (p) => (
    <svg {...base} {...p}>
      <rect x="6" y="2" width="12" height="20" rx="1.5" />
      <circle cx="12" cy="9" r="3" />
      <path d="M9 16h6M9 18.5h6" />
    </svg>
  ),
};

export function AreaIcon({ name, ...p }: { name: LabAreaIcon } & P) {
  const Icon = areaIcons[name];
  return <Icon {...p} />;
}
