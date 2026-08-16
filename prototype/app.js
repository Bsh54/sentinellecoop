/* SentinelleCoop — moteur partagé du prototype
   Définit le thème Tailwind + injecte la barre latérale et l'en-tête sur chaque page. */

tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-background": "#0d1c2f", "status-offline": "#64748B", "inverse-on-surface": "#ebf1ff",
        "on-secondary": "#ffffff", "primary": "#091426", "secondary-container": "#e0e3e5",
        "surface-container": "#e6eeff", "on-tertiary-fixed-variant": "#564427", "surface-dim": "#ccdbf4",
        "background": "#f8f9ff", "inverse-primary": "#bcc7de", "secondary-fixed": "#e0e3e5",
        "outline-variant": "#c5c6cd", "on-tertiary-fixed": "#271902", "error-container": "#ffdad6",
        "surface-tint": "#545f73", "warning": "#D97706", "on-primary-fixed": "#111c2d",
        "inverse-surface": "#233144", "surface-container-high": "#dde9ff", "on-error": "#ffffff",
        "surface-bright": "#f8f9ff", "secondary-fixed-dim": "#c4c7c9", "on-secondary-fixed": "#191c1e",
        "surface-container-highest": "#d5e3fd", "on-tertiary-container": "#a38c6a",
        "on-secondary-fixed-variant": "#444749", "on-primary-container": "#8590a6",
        "primary-fixed-dim": "#bcc7de", "on-surface": "#0d1c2f", "surface": "#f8f9ff",
        "on-error-container": "#93000a", "on-primary": "#ffffff", "on-tertiary": "#ffffff",
        "border-default": "#E2E8F0", "primary-fixed": "#d8e3fb", "primary-container": "#1e293b",
        "danger": "#DC2626", "success": "#059669", "on-secondary-container": "#626567",
        "outline": "#75777d", "error": "#ba1a1a", "secondary": "#5c5f61", "surface-header": "#FFFFFF",
        "on-primary-fixed-variant": "#3c475a", "tertiary": "#1e1200", "tertiary-fixed": "#fadfb8",
        "tertiary-container": "#35260c", "tertiary-fixed-dim": "#ddc39d", "on-surface-variant": "#45474c",
        "surface-container-low": "#eff4ff", "surface-container-lowest": "#ffffff", "surface-variant": "#d5e3fd"
      },
      borderRadius: { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" },
      spacing: { "header-height": "56px", "gutter": "16px", "sidebar-width": "260px",
        "cell-padding-h": "12px", "container-gap": "24px", "cell-padding-v": "8px" },
      fontFamily: { "body-sm": ["Inter"], "data-table": ["Inter"], "headline-md": ["Inter"],
        "label-caps": ["Inter"], "display": ["Inter"], "caption": ["Inter"] },
      fontSize: {
        "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
        "data-table": ["13px", { "lineHeight": "18px", "fontWeight": "400" }],
        "headline-md": ["18px", { "lineHeight": "24px", "fontWeight": "600" }],
        "label-caps": ["11px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "700" }],
        "display": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.02em", "fontWeight": "600" }],
        "caption": ["12px", { "lineHeight": "16px", "fontWeight": "500" }]
      }
    }
  }
};

const NAV_ITEMS = [
  { id: "dashboard",  href: "dashboard.html",       icon: "dashboard",           label: "Tableau de bord" },
  { id: "filtrage",   href: "filtrage.html",         icon: "filter_alt",          label: "Filtrage" },
  { id: "fiche",      href: "fiche-client.html",     icon: "person_search",       label: "Fiche Client" },
  { id: "alertes",    href: "alertes.html",          icon: "notifications_active", label: "Alertes", badge: "12" },
  { id: "listes",     href: "listes.html",           icon: "list_alt",            label: "Gestion des listes" },
  { id: "sync",       href: "synchronisation.html",  icon: "sync",                label: "Synchronisation" },
  { id: "audit",      href: "audit.html",            icon: "history_edu",         label: "Journal d'audit" }
];

function renderChrome(active, title) {
  const items = NAV_ITEMS.map(it => {
    const on = it.id === active;
    const base = "flex items-center justify-between gap-3 px-4 py-2.5 rounded transition-colors duration-200 cursor-pointer";
    const state = on
      ? "bg-primary-container text-on-primary-container font-semibold"
      : "text-on-primary-container opacity-80 hover:bg-on-primary-fixed-variant";
    const badge = it.badge
      ? `<span class="bg-danger text-on-error font-caption text-[10px] px-1.5 py-0.5 rounded-full">${it.badge}</span>` : "";
    return `<li><a class="${base} ${state}" href="${it.href}">
        <span class="flex items-center gap-3">
          <span class="material-symbols-outlined"${on ? " style=\"font-variation-settings:'FILL' 1;\"" : ""}>${it.icon}</span>
          <span class="font-body-sm text-body-sm">${it.label}</span>
        </span>${badge}
      </a></li>`;
  }).join("");

  const sidebar = document.getElementById("sidebar");
  if (sidebar) {
    sidebar.className = "bg-primary fixed left-0 top-0 h-screen w-[260px] flex flex-col overflow-y-auto z-20";
    sidebar.innerHTML = `
      <div class="p-4 border-b border-outline-variant/20 flex flex-col items-center justify-center pt-6 pb-6">
        <div class="w-14 h-14 rounded-full bg-surface-container-high mb-3 flex items-center justify-center">
          <span class="material-symbols-outlined text-3xl text-primary" style="font-variation-settings:'FILL' 1;">shield_person</span>
        </div>
        <h1 class="font-headline-md text-headline-md font-bold text-on-primary text-center">SentinelleCoop</h1>
        <p class="font-caption text-caption text-primary-fixed-dim text-center opacity-80 mt-1">Portail Compliance</p>
      </div>
      <div class="flex-1 py-4"><ul class="space-y-1 px-3">${items}</ul></div>
      <div class="p-4 border-t border-outline-variant/20"><ul class="space-y-1 px-1">
        <li><a class="flex items-center gap-3 px-4 py-2.5 rounded text-on-primary-container opacity-80 hover:bg-on-primary-fixed-variant transition-colors" href="#">
          <span class="material-symbols-outlined">settings</span><span class="font-body-sm text-body-sm">Paramètres</span></a></li>
        <li><a class="flex items-center gap-3 px-4 py-2.5 rounded text-on-primary-container opacity-80 hover:bg-on-primary-fixed-variant transition-colors" href="index.html">
          <span class="material-symbols-outlined">logout</span><span class="font-body-sm text-body-sm">Déconnexion</span></a></li>
      </ul></div>`;
  }

  const topbar = document.getElementById("topbar");
  if (topbar) {
    topbar.className = "bg-surface-header fixed top-0 right-0 h-[56px] w-[calc(100%-260px)] border-b border-outline-variant flex justify-between items-center px-gutter z-10";
    topbar.innerHTML = `
      <div class="flex items-center gap-4">
        <div class="relative">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
          <input class="pl-10 pr-4 py-1.5 bg-surface rounded border border-border-default text-body-sm w-80 focus:border-primary focus:ring-0" placeholder="Rechercher un membre (N° CLCAM, Nom)..." type="text"/>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full border border-outline-variant/50">
          <span class="w-2 h-2 rounded-full bg-warning animate-pulse"></span>
          <span class="font-caption text-caption text-on-surface-variant">Mode hors-ligne actif</span>
        </div>
        <button class="p-2 text-on-surface-variant hover:bg-surface-container rounded"><span class="material-symbols-outlined">help_outline</span></button>
        <button class="p-2 text-on-surface-variant hover:bg-surface-container rounded relative">
          <span class="material-symbols-outlined">notifications</span>
          <span class="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full border border-surface-header"></span>
        </button>
        <div class="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-bold text-sm cursor-pointer">AC</div>
      </div>`;
  }
  if (title) document.title = "SentinelleCoop — " + title;
}
