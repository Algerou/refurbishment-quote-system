"use strict";

/* =========================================================
   REFURBISHMENT QUOTE SYSTEM
   MILESTONE 3 — COST POOL + REVENUE LIBRARY
========================================================= */

const STORAGE_KEYS = {
  theme: "rqs-theme",
  sidebarCollapsed: "rqs-sidebar-collapsed",
  settings: "rqs-settings",
  costItems: "rqs-cost-items",
  costCategories: "rqs-cost-categories",
  revenueItems: "rqs-revenue-items",
  revenueCategories: "rqs-revenue-categories"
};

const PAGE_INFORMATION = {
  dashboard: { title: "Dashboard", eyebrow: "WORKSPACE" },
  projects: { title: "Projects", eyebrow: "PROJECT MANAGEMENT" },
  "cost-pool": { title: "Cost Pool", eyebrow: "REUSABLE COST LIBRARY" },
  "revenue-library": {
    title: "Revenue Library",
    eyebrow: "REUSABLE INCOME LIBRARY"
  },
  templates: {
    title: "Templates",
    eyebrow: "REUSABLE SOP WORKFLOWS"
  },
  customers: {
    title: "Customers",
    eyebrow: "CUSTOMER DIRECTORY"
  },
  reports: {
    title: "Reports",
    eyebrow: "COST AND PROFITABILITY"
  },
  settings: {
    title: "Settings",
    eyebrow: "SYSTEM CONFIGURATION"
  }
};

const DEFAULT_COST_CATEGORIES = [
  {
    id: "labour",
    name: "Labour",
    abbreviation: "L",
    colorClass: "labour",
    builtIn: true
  },
  {
    id: "parts",
    name: "Parts",
    abbreviation: "P",
    colorClass: "parts",
    builtIn: true
  },
  {
    id: "packaging",
    name: "Packaging",
    abbreviation: "PK",
    colorClass: "packaging",
    builtIn: true
  },
  {
    id: "logistics",
    name: "Logistics",
    abbreviation: "LG",
    colorClass: "logistics",
    builtIn: true
  },
  {
    id: "equipment",
    name: "Equipment",
    abbreviation: "EQ",
    colorClass: "equipment",
    builtIn: true
  },
  {
    id: "overhead",
    name: "Overhead",
    abbreviation: "OH",
    colorClass: "overhead",
    builtIn: true
  }
];

const DEFAULT_COST_ITEMS = [
  {
    id: "cost-operator-labour",
    name: "Operator Labour",
    categoryId: "labour",
    calculationMethod: "hourly",
    rate: 28,
    currency: "CAD",
    unit: "hour",
    defaultQuantity: 12,
    quantityUnit: "minutes",
    description: "Production and refurbishment operator labour.",
    status: "active",
    updatedAt: "2026-07-10T09:00:00.000Z"
  },
  {
    id: "cost-engineer-labour",
    name: "Engineer Labour",
    categoryId: "labour",
    calculationMethod: "hourly",
    rate: 38,
    currency: "CAD",
    unit: "hour",
    defaultQuantity: 8,
    quantityUnit: "minutes",
    description: "Diagnosis and technical repair support.",
    status: "active",
    updatedAt: "2026-07-12T09:00:00.000Z"
  },
  {
    id: "cost-qc-labour",
    name: "Quality Control Labour",
    categoryId: "labour",
    calculationMethod: "hourly",
    rate: 31,
    currency: "CAD",
    unit: "hour",
    defaultQuantity: 10,
    quantityUnit: "minutes",
    description: "Final inspection and functional testing.",
    status: "active",
    updatedAt: "2026-07-08T09:00:00.000Z"
  },
  {
    id: "cost-supervisor-labour",
    name: "Supervisor Labour",
    categoryId: "labour",
    calculationMethod: "hourly",
    rate: 35,
    currency: "CAD",
    unit: "hour",
    defaultQuantity: 3,
    quantityUnit: "minutes",
    description: "Production supervision and process support.",
    status: "active",
    updatedAt: "2026-07-06T09:00:00.000Z"
  },
  {
    id: "cost-replacement-parts",
    name: "Replacement Parts Allowance",
    categoryId: "parts",
    calculationMethod: "per-unit",
    rate: 17,
    currency: "USD",
    unit: "unit",
    defaultQuantity: 1,
    quantityUnit: "unit",
    description: "Average replacement component allocation.",
    status: "active",
    updatedAt: "2026-07-14T09:00:00.000Z"
  },
  {
    id: "cost-consumable-parts",
    name: "Consumable Parts Allowance",
    categoryId: "parts",
    calculationMethod: "per-unit",
    rate: 2.25,
    currency: "USD",
    unit: "unit",
    defaultQuantity: 1,
    quantityUnit: "unit",
    description: "Fasteners, filters and small consumable parts.",
    status: "active",
    updatedAt: "2026-07-09T09:00:00.000Z"
  },
  {
    id: "cost-standard-carton",
    name: "Standard Carton",
    categoryId: "packaging",
    calculationMethod: "per-unit",
    rate: 4.1,
    currency: "USD",
    unit: "unit",
    defaultQuantity: 1,
    quantityUnit: "unit",
    description: "Outer carton, inserts and protective materials.",
    status: "active",
    updatedAt: "2026-07-05T09:00:00.000Z"
  },
  {
    id: "cost-label-package",
    name: "Label and Documentation Package",
    categoryId: "packaging",
    calculationMethod: "per-unit",
    rate: 0.65,
    currency: "USD",
    unit: "unit",
    defaultQuantity: 1,
    quantityUnit: "unit",
    description: "Product labels, documents and barcode materials.",
    status: "active",
    updatedAt: "2026-07-04T09:00:00.000Z"
  },
  {
    id: "cost-outbound-logistics",
    name: "Outbound Logistics",
    categoryId: "logistics",
    calculationMethod: "per-unit",
    rate: 9.5,
    currency: "USD",
    unit: "unit",
    defaultQuantity: 1,
    quantityUnit: "unit",
    description: "Allocated outbound transportation expense.",
    status: "active",
    updatedAt: "2026-07-15T09:00:00.000Z"
  },
  {
    id: "cost-diagnostic-equipment",
    name: "Diagnostic Equipment",
    categoryId: "equipment",
    calculationMethod: "monthly",
    rate: 600,
    currency: "CAD",
    unit: "month",
    defaultQuantity: 1,
    quantityUnit: "month",
    description: "Monthly diagnostic and testing equipment allocation.",
    status: "active",
    updatedAt: "2026-06-30T09:00:00.000Z"
  },
  {
    id: "cost-warehouse-allocation",
    name: "Warehouse Allocation",
    categoryId: "overhead",
    calculationMethod: "monthly",
    rate: 3200,
    currency: "CAD",
    unit: "month",
    defaultQuantity: 1,
    quantityUnit: "month",
    description: "Rent, utilities and project floor-space allocation.",
    status: "active",
    updatedAt: "2026-07-01T09:00:00.000Z"
  },
  {
    id: "cost-admin-allocation",
    name: "Administration Allocation",
    categoryId: "overhead",
    calculationMethod: "percentage",
    rate: 3,
    currency: "CAD",
    unit: "percent",
    defaultQuantity: 1,
    quantityUnit: "project",
    description: "Administration and office support allocation.",
    status: "inactive",
    updatedAt: "2026-06-28T09:00:00.000Z"
  }
];

const DEFAULT_REVENUE_CATEGORIES = [
  {
    id: "service-fees",
    name: "Service Fees",
    abbreviation: "SF",
    colorClass: "labour",
    builtIn: true
  },
  {
    id: "product-revenue",
    name: "Product Revenue",
    abbreviation: "PR",
    colorClass: "parts",
    builtIn: true
  },
  {
    id: "logistics-revenue",
    name: "Logistics Revenue",
    abbreviation: "LR",
    colorClass: "logistics",
    builtIn: true
  },
  {
    id: "warranty-revenue",
    name: "Warranty",
    abbreviation: "WR",
    colorClass: "packaging",
    builtIn: true
  },
  {
    id: "storage-revenue",
    name: "Storage",
    abbreviation: "ST",
    colorClass: "equipment",
    builtIn: true
  },
  {
    id: "other-revenue",
    name: "Other Revenue",
    abbreviation: "OR",
    colorClass: "overhead",
    builtIn: true
  }
];

const DEFAULT_REVENUE_ITEMS = [
  {
    id: "revenue-standard-refurbishment",
    name: "Standard Refurbishment Service",
    categoryId: "service-fees",
    calculationMethod: "per-unit",
    rate: 80,
    currency: "USD",
    unit: "unit",
    defaultQuantity: 1,
    quantityUnit: "unit",
    description: "Standard customer charge for one completed refurbishment.",
    status: "active",
    updatedAt: "2026-07-16T09:00:00.000Z"
  },
  {
    id: "revenue-diagnostic-fee",
    name: "Diagnostic Fee",
    categoryId: "service-fees",
    calculationMethod: "per-unit",
    rate: 12,
    currency: "USD",
    unit: "unit",
    defaultQuantity: 1,
    quantityUnit: "unit",
    description: "Customer charge for inspection, diagnosis and reporting.",
    status: "active",
    updatedAt: "2026-07-13T09:00:00.000Z"
  },
  {
    id: "revenue-rush-service",
    name: "Rush Service Fee",
    categoryId: "service-fees",
    calculationMethod: "percentage",
    rate: 15,
    currency: "USD",
    unit: "percent",
    defaultQuantity: 1,
    quantityUnit: "project",
    description: "Premium charge for accelerated project turnaround.",
    status: "active",
    updatedAt: "2026-07-12T09:00:00.000Z"
  },
  {
    id: "revenue-parts-charge",
    name: "Replacement Parts Charge",
    categoryId: "product-revenue",
    calculationMethod: "per-unit",
    rate: 24,
    currency: "USD",
    unit: "unit",
    defaultQuantity: 1,
    quantityUnit: "unit",
    description: "Average customer charge for replacement parts usage.",
    status: "active",
    updatedAt: "2026-07-11T09:00:00.000Z"
  },
  {
    id: "revenue-accessory-package",
    name: "Accessory Package",
    categoryId: "product-revenue",
    calculationMethod: "per-unit",
    rate: 9.5,
    currency: "USD",
    unit: "unit",
    defaultQuantity: 1,
    quantityUnit: "unit",
    description: "Optional customer charge for accessories supplied with the unit.",
    status: "active",
    updatedAt: "2026-07-08T09:00:00.000Z"
  },
  {
    id: "revenue-return-shipping",
    name: "Return Shipping Charge",
    categoryId: "logistics-revenue",
    calculationMethod: "per-shipment",
    rate: 35,
    currency: "USD",
    unit: "shipment",
    defaultQuantity: 1,
    quantityUnit: "shipment",
    description: "Customer-facing transportation charge for returned goods.",
    status: "active",
    updatedAt: "2026-07-15T09:00:00.000Z"
  },
  {
    id: "revenue-pallet-handling",
    name: "Pallet Handling Charge",
    categoryId: "logistics-revenue",
    calculationMethod: "per-pallet",
    rate: 18,
    currency: "CAD",
    unit: "pallet",
    defaultQuantity: 1,
    quantityUnit: "pallet",
    description: "Receiving or outbound handling charge per pallet.",
    status: "active",
    updatedAt: "2026-07-06T09:00:00.000Z"
  },
  {
    id: "revenue-extended-warranty",
    name: "Extended Warranty",
    categoryId: "warranty-revenue",
    calculationMethod: "per-unit",
    rate: 14,
    currency: "USD",
    unit: "unit",
    defaultQuantity: 1,
    quantityUnit: "unit",
    description: "Optional extended warranty charge per refurbished unit.",
    status: "active",
    updatedAt: "2026-07-09T09:00:00.000Z"
  },
  {
    id: "revenue-storage-fee",
    name: "Daily Storage Fee",
    categoryId: "storage-revenue",
    calculationMethod: "per-day",
    rate: 2.5,
    currency: "CAD",
    unit: "day",
    defaultQuantity: 1,
    quantityUnit: "day",
    description: "Daily storage charge for units held beyond the agreed period.",
    status: "active",
    updatedAt: "2026-07-03T09:00:00.000Z"
  },
  {
    id: "revenue-project-management",
    name: "Project Management Fee",
    categoryId: "other-revenue",
    calculationMethod: "monthly",
    rate: 1250,
    currency: "CAD",
    unit: "month",
    defaultQuantity: 1,
    quantityUnit: "month",
    description: "Monthly customer charge for project administration and reporting.",
    status: "inactive",
    updatedAt: "2026-06-29T09:00:00.000Z"
  }
];

const DEMO_PROJECTS = [
  {
    id: "project-tineco-s7",
    name: "Tineco S7 Refurbishment",
    customer: "Tineco",
    status: "draft",
    volume: 500,
    volumeUnit: "month",
    unitPrice: 81,
    margin: 27.4
  },
  {
    id: "project-dyson-v15",
    name: "Dyson V15 Refurbishment",
    customer: "Dyson",
    status: "review",
    volume: 300,
    volumeUnit: "month",
    unitPrice: 94.5,
    margin: 25.2
  },
  {
    id: "project-shark-detect",
    name: "Shark Detect Repair Program",
    customer: "SharkNinja",
    status: "approved",
    volume: 800,
    volumeUnit: "month",
    unitPrice: 69.8,
    margin: 29.8
  },
  {
    id: "project-bulk-inspection",
    name: "Bulk Return Inspection",
    customer: "Northstar Retail",
    status: "draft",
    volume: 1500,
    volumeUnit: "batch",
    unitPrice: 16.2,
    margin: 22.6
  }
];

const appState = {
  currentPage: "dashboard",
  currentTheme: "dark",
  sidebarCollapsed: false,

  costItems: [],
  costCategories: [],
  selectedCostCategory: "all",
  selectedCostMethod: "all",
  selectedCostStatus: "all",
  costSearchText: "",
  costSortMethod: "updated-desc",

  revenueItems: [],
  revenueCategories: [],
  selectedRevenueCategory: "all",
  selectedRevenueMethod: "all",
  selectedRevenueStatus: "all",
  revenueSearchText: "",
  revenueSortMethod: "updated-desc",

  modalConfirmHandler: null
};

const getElement = (selector) => document.querySelector(selector);

const getElements = (selector) =>
  Array.from(document.querySelectorAll(selector));

const safeAddEventListener = (
  element,
  eventName,
  handler
) => {
  if (element) {
    element.addEventListener(eventName, handler);
  }
};

const normalizeSearchValue = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const deepClone = (value) =>
  JSON.parse(JSON.stringify(value));

const createId = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;

const escapeHtml = (value) => {
  const element = document.createElement("div");
  element.textContent = String(value ?? "");
  return element.innerHTML;
};

const parseStoredArray = (
  key,
  fallback
) => {
  try {
    const parsed = JSON.parse(
      localStorage.getItem(key) || "null"
    );

    return Array.isArray(parsed)
      ? parsed
      : deepClone(fallback);
  } catch {
    return deepClone(fallback);
  }
};

const normalizeMethod = (method) =>
  method === "per-hour"
    ? "hourly"
    : method;

const methodMatches = (
  itemMethod,
  selectedMethod
) =>
  selectedMethod === "all" ||
  normalizeMethod(itemMethod) ===
    normalizeMethod(selectedMethod);

const formatCurrency = (
  value,
  currency = "CAD"
) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "$0.00";
  }

  try {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(number);
  } catch {
    return `${currency} ${number.toFixed(2)}`;
  }
};

const formatDate = (value) => {
  const date = new Date(value);

  if (
    !value ||
    Number.isNaN(date.getTime())
  ) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
};

const METHOD_LABELS = {
  hourly: "Per hour",
  "per-hour": "Per hour",
  "per-minute": "Per minute",
  "per-unit": "Per unit",
  fixed: "Fixed fee",
  monthly: "Monthly",
  percentage: "Percentage",
  "per-shipment": "Per shipment",
  "per-pallet": "Per pallet",
  "per-day": "Per day"
};

const formatCalculationMethod = (method) =>
  METHOD_LABELS[method] || method;

const formatRate = (item) => {
  if (
    item.calculationMethod ===
    "percentage"
  ) {
    return `${Number(item.rate).toFixed(2)}%`;
  }

  const suffixes = {
    hourly: "hour",
    "per-hour": "hour",
    "per-minute": "minute",
    "per-unit": "unit",
    fixed: "fixed",
    monthly: "month",
    "per-shipment": "shipment",
    "per-pallet": "pallet",
    "per-day": "day"
  };

  return `${formatCurrency(
    item.rate,
    item.currency
  )} / ${
    suffixes[item.calculationMethod] ||
    item.unit ||
    "unit"
  }`;
};

const showToast = (
  message,
  type = "success",
  duration = 3000
) => {
  const container =
    getElement("#toast-container");

  if (!container) {
    return;
  }

  const toast =
    document.createElement("div");

  toast.className = `toast ${type}`;

  toast.innerHTML = `
    <span aria-hidden="true">
      ${
        type === "error"
          ? "!"
          : type === "warning"
            ? "⚠"
            : "✓"
      }
    </span>

    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  window.setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform =
      "translateX(12px)";

    window.setTimeout(() => {
      toast.remove();
    }, 220);
  }, duration);
};

const saveCostPoolData = () => {
  localStorage.setItem(
    STORAGE_KEYS.costCategories,
    JSON.stringify(appState.costCategories)
  );

  localStorage.setItem(
    STORAGE_KEYS.costItems,
    JSON.stringify(appState.costItems)
  );
};

const saveRevenueLibraryData = () => {
  localStorage.setItem(
    STORAGE_KEYS.revenueCategories,
    JSON.stringify(appState.revenueCategories)
  );

  localStorage.setItem(
    STORAGE_KEYS.revenueItems,
    JSON.stringify(appState.revenueItems)
  );
};

const saveAllLibraryData = () => {
  saveCostPoolData();
  saveRevenueLibraryData();
};

const loadLibraryData = () => {
  appState.costCategories =
    parseStoredArray(
      STORAGE_KEYS.costCategories,
      DEFAULT_COST_CATEGORIES
    );

  appState.costItems =
    parseStoredArray(
      STORAGE_KEYS.costItems,
      DEFAULT_COST_ITEMS
    );

  appState.revenueCategories =
    parseStoredArray(
      STORAGE_KEYS.revenueCategories,
      DEFAULT_REVENUE_CATEGORIES
    );

  appState.revenueItems =
    parseStoredArray(
      STORAGE_KEYS.revenueItems,
      DEFAULT_REVENUE_ITEMS
    );

  saveAllLibraryData();
};
/* =========================================================
   NAVIGATION
========================================================= */

const closeMobileSidebar = () => {
  document.body.classList.remove(
    "sidebar-open"
  );
};

const updatePageHeader = (pageName) => {
  const pageData =
    PAGE_INFORMATION[pageName];

  if (!pageData) {
    return;
  }

  const title =
    getElement("#page-title");

  const eyebrow =
    getElement("#page-eyebrow");

  if (title) {
    title.textContent =
      pageData.title;
  }

  if (eyebrow) {
    eyebrow.textContent =
      pageData.eyebrow;
  }

  document.title =
    `${pageData.title} | Refurbishment Quote System`;
};

const navigateToPage = (pageName) => {
  const targetPage =
    getElement(
      `[data-page="${pageName}"]`
    );

  if (!targetPage) {
    showToast(
      `The ${pageName} page was not found.`,
      "error"
    );

    return;
  }

  getElements(".app-page").forEach(
    (page) => {
      page.classList.remove("active");
    }
  );

  targetPage.classList.add("active");

  getElements(
    ".nav-item[data-page-target]"
  ).forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.pageTarget ===
        pageName
    );
  });

  appState.currentPage = pageName;

  updatePageHeader(pageName);
  closeMobileSidebar();

  if (pageName === "cost-pool") {
    renderCostPool();
  }

  if (
    pageName ===
    "revenue-library"
  ) {
    renderRevenueLibrary();
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

const initializeNavigation = () => {
  getElements(
    "[data-page-target]"
  ).forEach((button) => {
    safeAddEventListener(
      button,
      "click",
      () => {
        navigateToPage(
          button.dataset.pageTarget
        );
      }
    );
  });

  safeAddEventListener(
    getElement("#brand-button"),
    "click",
    () => navigateToPage("dashboard")
  );

  safeAddEventListener(
    getElement(
      "#view-all-projects-button"
    ),
    "click",
    () => navigateToPage("projects")
  );
};

/* =========================================================
   SIDEBAR
========================================================= */

const applySidebarState = () => {
  document.body.classList.toggle(
    "sidebar-collapsed",
    appState.sidebarCollapsed
  );
};

const initializeSidebar = () => {
  appState.sidebarCollapsed =
    localStorage.getItem(
      STORAGE_KEYS.sidebarCollapsed
    ) === "true";

  applySidebarState();

  safeAddEventListener(
    getElement(
      "#sidebar-collapse-button"
    ),
    "click",
    () => {
      if (window.innerWidth <= 1000) {
        closeMobileSidebar();
        return;
      }

      appState.sidebarCollapsed =
        !appState.sidebarCollapsed;

      localStorage.setItem(
        STORAGE_KEYS.sidebarCollapsed,
        String(
          appState.sidebarCollapsed
        )
      );

      applySidebarState();
    }
  );

  safeAddEventListener(
    getElement(
      "#mobile-menu-button"
    ),
    "click",
    () => {
      document.body.classList.add(
        "sidebar-open"
      );
    }
  );

  safeAddEventListener(
    getElement("#sidebar-overlay"),
    "click",
    closeMobileSidebar
  );

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 1000) {
        closeMobileSidebar();
      }
    }
  );
};

/* =========================================================
   THEME
========================================================= */

const updateThemeControls = () => {
  const themeIcon =
    getElement("#theme-toggle-icon");

  if (themeIcon) {
    themeIcon.textContent =
      appState.currentTheme === "dark"
        ? "☾"
        : "☀";
  }

  getElements(
    "[data-theme-choice]"
  ).forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.themeChoice ===
        appState.currentTheme
    );
  });
};

const applyTheme = (
  theme,
  savePreference = true
) => {
  const safeTheme =
    theme === "light"
      ? "light"
      : "dark";

  appState.currentTheme = safeTheme;

  document.body.classList.toggle(
    "light-theme",
    safeTheme === "light"
  );

  if (savePreference) {
    localStorage.setItem(
      STORAGE_KEYS.theme,
      safeTheme
    );
  }

  updateThemeControls();
};

const initializeTheme = () => {
  const savedTheme =
    localStorage.getItem(
      STORAGE_KEYS.theme
    );

  applyTheme(
    savedTheme || "dark",
    false
  );

  safeAddEventListener(
    getElement(
      "#theme-toggle-button"
    ),
    "click",
    () => {
      const nextTheme =
        appState.currentTheme === "dark"
          ? "light"
          : "dark";

      applyTheme(nextTheme);

      showToast(
        `${
          nextTheme === "dark"
            ? "Dark"
            : "Light"
        } theme enabled.`
      );
    }
  );

  getElements(
    "[data-theme-choice]"
  ).forEach((button) => {
    safeAddEventListener(
      button,
      "click",
      () => {
        applyTheme(
          button.dataset.themeChoice
        );
      }
    );
  });
};

/* =========================================================
   MODAL SYSTEM
========================================================= */

const openModal = ({
  kicker = "NEW ITEM",
  title = "Dialog",
  content = "",
  confirmText = "Save",
  confirmHandler = null
}) => {
  const backdrop =
    getElement("#modal-backdrop");

  const modalKicker =
    getElement("#modal-kicker");

  const modalTitle =
    getElement("#modal-title");

  const modalBody =
    getElement("#modal-body");

  const confirmButton =
    getElement(
      "#modal-confirm-button"
    );

  if (
    !backdrop ||
    !modalKicker ||
    !modalTitle ||
    !modalBody ||
    !confirmButton
  ) {
    showToast(
      "The modal container is missing from index.html.",
      "error"
    );

    return;
  }

  modalKicker.textContent = kicker;
  modalTitle.textContent = title;
  modalBody.innerHTML = content;
  confirmButton.textContent =
    confirmText;

  appState.modalConfirmHandler =
    confirmHandler;

  backdrop.classList.add("active");

  backdrop.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";

  window.setTimeout(() => {
    modalBody
      .querySelector(
        "input, select, textarea, button"
      )
      ?.focus();
  }, 50);
};

const closeModal = () => {
  const backdrop =
    getElement("#modal-backdrop");

  if (!backdrop) {
    return;
  }

  backdrop.classList.remove("active");

  backdrop.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";

  appState.modalConfirmHandler =
    null;
};

const initializeModal = () => {
  safeAddEventListener(
    getElement(
      "#modal-close-button"
    ),
    "click",
    closeModal
  );

  safeAddEventListener(
    getElement(
      "#modal-cancel-button"
    ),
    "click",
    closeModal
  );

  safeAddEventListener(
    getElement("#modal-backdrop"),
    "click",
    (event) => {
      if (
        event.target.id ===
        "modal-backdrop"
      ) {
        closeModal();
      }
    }
  );

  safeAddEventListener(
    getElement(
      "#modal-confirm-button"
    ),
    "click",
    () => {
      if (
        typeof appState.modalConfirmHandler ===
        "function"
      ) {
        appState.modalConfirmHandler();
      }
    }
  );

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        closeModal();
        closeMobileSidebar();
      }
    }
  );
};

/* =========================================================
   COST CATEGORY HELPERS
========================================================= */

const getCostCategoryById = (
  categoryId
) =>
  appState.costCategories.find(
    (category) =>
      category.id === categoryId
  );

const getCostCategoryName = (
  categoryId
) =>
  getCostCategoryById(
    categoryId
  )?.name || "Uncategorized";

const getCostCategoryClass = (
  categoryId
) =>
  getCostCategoryById(
    categoryId
  )?.colorClass || "overhead";

/* =========================================================
   REVENUE CATEGORY HELPERS
========================================================= */

const getRevenueCategoryById = (
  categoryId
) =>
  appState.revenueCategories.find(
    (category) =>
      category.id === categoryId
  );

const getRevenueCategoryName = (
  categoryId
) =>
  getRevenueCategoryById(
    categoryId
  )?.name || "Uncategorized";

const getRevenueCategoryClass = (
  categoryId
) =>
  getRevenueCategoryById(
    categoryId
  )?.colorClass || "overhead";

/* =========================================================
   COST CATEGORY RENDERING
========================================================= */

const renderCostCategories = () => {
  const container =
    getElement(
      "#cost-category-list"
    );

  if (!container) {
    return;
  }

  const allButton = `
    <button
      class="category-item ${
        appState.selectedCostCategory ===
        "all"
          ? "active"
          : ""
      }"
      type="button"
      data-cost-category="all"
    >
      <span class="category-icon">
        ▦
      </span>

      <span class="category-name">
        All Costs
      </span>

      <span class="category-count">
        ${appState.costItems.length}
      </span>
    </button>
  `;

  const categoryButtons =
    appState.costCategories
      .map((category) => {
        const count =
          appState.costItems.filter(
            (item) =>
              item.categoryId ===
              category.id
          ).length;

        return `
          <button
            class="category-item ${
              appState.selectedCostCategory ===
              category.id
                ? "active"
                : ""
            }"
            type="button"
            data-cost-category="${escapeHtml(
              category.id
            )}"
          >
            <span
              class="category-icon category-${escapeHtml(
                category.colorClass
              )}"
            >
              ${escapeHtml(
                category.abbreviation
              )}
            </span>

            <span class="category-name">
              ${escapeHtml(
                category.name
              )}
            </span>

            <span class="category-count">
              ${count}
            </span>
          </button>
        `;
      })
      .join("");

  container.innerHTML =
    allButton + categoryButtons;

  getElements(
    "[data-cost-category]"
  ).forEach((button) => {
    safeAddEventListener(
      button,
      "click",
      () => {
        appState.selectedCostCategory =
          button.dataset.costCategory ||
          "all";

        renderCostPool();
      }
    );
  });
};

/* =========================================================
   REVENUE CATEGORY RENDERING
========================================================= */

const renderRevenueCategories = () => {
  const container =
    getElement(
      "#revenue-category-list"
    );

  if (!container) {
    return;
  }

  const allButton = `
    <button
      class="category-item ${
        appState.selectedRevenueCategory ===
        "all"
          ? "active"
          : ""
      }"
      type="button"
      data-revenue-category="all"
    >
      <span class="category-icon">
        $
      </span>

      <span class="category-name">
        All Revenue
      </span>

      <span class="category-count">
        ${appState.revenueItems.length}
      </span>
    </button>
  `;

  const categoryButtons =
    appState.revenueCategories
      .map((category) => {
        const count =
          appState.revenueItems.filter(
            (item) =>
              item.categoryId ===
              category.id
          ).length;

        return `
          <button
            class="category-item ${
              appState.selectedRevenueCategory ===
              category.id
                ? "active"
                : ""
            }"
            type="button"
            data-revenue-category="${escapeHtml(
              category.id
            )}"
          >
            <span
              class="category-icon category-${escapeHtml(
                category.colorClass
              )}"
            >
              ${escapeHtml(
                category.abbreviation
              )}
            </span>

            <span class="category-name">
              ${escapeHtml(
                category.name
              )}
            </span>

            <span class="category-count">
              ${count}
            </span>
          </button>
        `;
      })
      .join("");

  container.innerHTML =
    allButton + categoryButtons;

  getElements(
    "[data-revenue-category]"
  ).forEach((button) => {
    safeAddEventListener(
      button,
      "click",
      () => {
        appState.selectedRevenueCategory =
          button.dataset
            .revenueCategory || "all";

        renderRevenueLibrary();
      }
    );
  });
};

/* =========================================================
   COST FILTERING AND SORTING
========================================================= */

const getFilteredCostItems = () => {
  const searchText =
    normalizeSearchValue(
      appState.costSearchText
    );

  const filtered =
    appState.costItems.filter(
      (item) => {
        const searchableText =
          normalizeSearchValue(
            [
              item.name,
              item.description,
              getCostCategoryName(
                item.categoryId
              ),
              item.calculationMethod,
              item.currency,
              item.status
            ].join(" ")
          );

        const matchesSearch =
          !searchText ||
          searchableText.includes(
            searchText
          );

        const matchesCategory =
          appState.selectedCostCategory ===
            "all" ||
          item.categoryId ===
            appState.selectedCostCategory;

        const matchesMethod =
          methodMatches(
            item.calculationMethod,
            appState.selectedCostMethod
          );

        const matchesStatus =
          appState.selectedCostStatus ===
            "all" ||
          item.status ===
            appState.selectedCostStatus;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesMethod &&
          matchesStatus
        );
      }
    );

  const items = [...filtered];

  switch (appState.costSortMethod) {
    case "name-asc":
      items.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;

    case "rate-desc":
      items.sort(
        (a, b) =>
          Number(b.rate) -
          Number(a.rate)
      );
      break;

    case "rate-asc":
      items.sort(
        (a, b) =>
          Number(a.rate) -
          Number(b.rate)
      );
      break;

    case "category-asc":
      items.sort((a, b) =>
        getCostCategoryName(
          a.categoryId
        ).localeCompare(
          getCostCategoryName(
            b.categoryId
          )
        )
      );
      break;

    case "updated-desc":
    default:
      items.sort(
        (a, b) =>
          new Date(
            b.updatedAt
          ).getTime() -
          new Date(
            a.updatedAt
          ).getTime()
      );
      break;
  }

  return items;
};

/* =========================================================
   REVENUE FILTERING AND SORTING
========================================================= */

const getFilteredRevenueItems = () => {
  const searchText =
    normalizeSearchValue(
      appState.revenueSearchText
    );

  const filtered =
    appState.revenueItems.filter(
      (item) => {
        const searchableText =
          normalizeSearchValue(
            [
              item.name,
              item.description,
              getRevenueCategoryName(
                item.categoryId
              ),
              item.calculationMethod,
              item.currency,
              item.status
            ].join(" ")
          );

        const matchesSearch =
          !searchText ||
          searchableText.includes(
            searchText
          );

        const matchesCategory =
          appState.selectedRevenueCategory ===
            "all" ||
          item.categoryId ===
            appState.selectedRevenueCategory;

        const matchesMethod =
          methodMatches(
            item.calculationMethod,
            appState.selectedRevenueMethod
          );

        const matchesStatus =
          appState.selectedRevenueStatus ===
            "all" ||
          item.status ===
            appState.selectedRevenueStatus;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesMethod &&
          matchesStatus
        );
      }
    );

  const items = [...filtered];

  switch (
    appState.revenueSortMethod
  ) {
    case "name-asc":
      items.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;

    case "rate-desc":
      items.sort(
        (a, b) =>
          Number(b.rate) -
          Number(a.rate)
      );
      break;

    case "rate-asc":
      items.sort(
        (a, b) =>
          Number(a.rate) -
          Number(b.rate)
      );
      break;

    case "category-asc":
      items.sort((a, b) =>
        getRevenueCategoryName(
          a.categoryId
        ).localeCompare(
          getRevenueCategoryName(
            b.categoryId
          )
        )
      );
      break;

    case "updated-desc":
    default:
      items.sort(
        (a, b) =>
          new Date(
            b.updatedAt
          ).getTime() -
          new Date(
            a.updatedAt
          ).getTime()
      );
      break;
  }

  return items;
};

/* =========================================================
   COST CARD RENDERING
========================================================= */

const renderCostCards = () => {
  const container =
    getElement("#cost-card-grid");

  const emptyState =
    getElement(
      "#cost-pool-empty-state"
    );

  const resultsText =
    getElement(
      "#cost-results-text"
    );

  if (!container) {
    return;
  }

  const items =
    getFilteredCostItems();

  if (resultsText) {
    resultsText.textContent =
      `Showing ${items.length} of ${appState.costItems.length} cost items`;
  }

  if (items.length === 0) {
    container.innerHTML = "";

    if (emptyState) {
      emptyState.hidden = false;
    }

    return;
  }

  if (emptyState) {
    emptyState.hidden = true;
  }

  container.innerHTML =
    items
      .map((item) => {
        const category =
          getCostCategoryById(
            item.categoryId
          );

        const categoryClass =
          category?.colorClass ||
          "overhead";

        return `
          <article
            class="cost-card"
            data-cost-card-id="${escapeHtml(
              item.id
            )}"
          >
            <div class="cost-card-header">
              <span
                class="cost-card-category ${escapeHtml(
                  categoryClass
                )}"
              >
                ${escapeHtml(
                  category?.name ||
                    "Uncategorized"
                )}
              </span>

              <span
                class="status-badge ${
                  item.status === "active"
                    ? "approved"
                    : "draft"
                }"
              >
                ${
                  item.status === "active"
                    ? "Active"
                    : "Inactive"
                }
              </span>
            </div>

            <div class="cost-card-main">
              <span
                class="cost-card-icon ${escapeHtml(
                  categoryClass
                )}"
              >
                ${escapeHtml(
                  category?.abbreviation ||
                    "C"
                )}
              </span>

              <div>
                <h3>
                  ${escapeHtml(
                    item.name
                  )}
                </h3>

                <p>
                  ${escapeHtml(
                    item.description ||
                      "No description provided."
                  )}
                </p>
              </div>
            </div>

            <dl class="cost-card-details">
              <div>
                <dt>Rate</dt>
                <dd>
                  ${escapeHtml(
                    formatRate(item)
                  )}
                </dd>
              </div>

              <div>
                <dt>Method</dt>
                <dd>
                  ${escapeHtml(
                    formatCalculationMethod(
                      item.calculationMethod
                    )
                  )}
                </dd>
              </div>

              <div>
                <dt>Default Quantity</dt>
                <dd>
                  ${escapeHtml(
                    `${item.defaultQuantity ?? 1} ${
                      item.quantityUnit ||
                      "unit"
                    }`
                  )}
                </dd>
              </div>

              <div>
                <dt>Currency</dt>
                <dd>
                  ${escapeHtml(
                    item.currency || "CAD"
                  )}
                </dd>
              </div>
            </dl>

            <div class="cost-card-footer">
              <span>
                Updated ${escapeHtml(
                  formatDate(
                    item.updatedAt
                  )
                )}
              </span>

              <div class="cost-card-actions">
                <button
                  class="text-button"
                  type="button"
                  data-edit-cost-id="${escapeHtml(
                    item.id
                  )}"
                >
                  Edit
                </button>

                <button
                  class="text-button delete-cost-button"
                  type="button"
                  data-delete-cost-id="${escapeHtml(
                    item.id
                  )}"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

  getElements(
    "[data-edit-cost-id]"
  ).forEach((button) => {
    safeAddEventListener(
      button,
      "click",
      () => {
        openEditCostItemModal(
          button.dataset.editCostId
        );
      }
    );
  });

  getElements(
    "[data-delete-cost-id]"
  ).forEach((button) => {
    safeAddEventListener(
      button,
      "click",
      () => {
        confirmDeleteCostItem(
          button.dataset.deleteCostId
        );
      }
    );
  });
};

/* =========================================================
   REVENUE CARD RENDERING
========================================================= */

const renderRevenueCards = () => {
  const container =
    getElement(
      "#revenue-card-grid"
    );

  const emptyState =
    getElement(
      "#revenue-empty-state"
    );

  const resultsText =
    getElement(
      "#revenue-results-text"
    );

  if (!container) {
    return;
  }

  const items =
    getFilteredRevenueItems();

  if (resultsText) {
    resultsText.textContent =
      `Showing ${items.length} of ${appState.revenueItems.length} revenue items`;
  }

  if (items.length === 0) {
    container.innerHTML = "";

    if (emptyState) {
      emptyState.hidden = false;
    }

    return;
  }

  if (emptyState) {
    emptyState.hidden = true;
  }

  container.innerHTML =
    items
      .map((item) => {
        const category =
          getRevenueCategoryById(
            item.categoryId
          );

        const categoryClass =
          category?.colorClass ||
          "overhead";

        return `
          <article
            class="cost-card revenue-card"
            data-revenue-card-id="${escapeHtml(
              item.id
            )}"
          >
            <div class="cost-card-header">
              <span
                class="cost-card-category ${escapeHtml(
                  categoryClass
                )}"
              >
                ${escapeHtml(
                  category?.name ||
                    "Uncategorized"
                )}
              </span>

              <span
                class="status-badge ${
                  item.status === "active"
                    ? "approved"
                    : "draft"
                }"
              >
                ${
                  item.status === "active"
                    ? "Active"
                    : "Inactive"
                }
              </span>
            </div>

            <div class="cost-card-main">
              <span
                class="cost-card-icon ${escapeHtml(
                  categoryClass
                )}"
              >
                ${escapeHtml(
                  category?.abbreviation ||
                    "$"
                )}
              </span>

              <div>
                <h3>
                  ${escapeHtml(
                    item.name
                  )}
                </h3>

                <p>
                  ${escapeHtml(
                    item.description ||
                      "No description provided."
                  )}
                </p>
              </div>
            </div>

            <dl class="cost-card-details">
              <div>
                <dt>Rate</dt>
                <dd>
                  ${escapeHtml(
                    formatRate(item)
                  )}
                </dd>
              </div>

              <div>
                <dt>Method</dt>
                <dd>
                  ${escapeHtml(
                    formatCalculationMethod(
                      item.calculationMethod
                    )
                  )}
                </dd>
              </div>

              <div>
                <dt>Default Quantity</dt>
                <dd>
                  ${escapeHtml(
                    `${item.defaultQuantity ?? 1} ${
                      item.quantityUnit ||
                      "unit"
                    }`
                  )}
                </dd>
              </div>

              <div>
                <dt>Currency</dt>
                <dd>
                  ${escapeHtml(
                    item.currency || "CAD"
                  )}
                </dd>
              </div>
            </dl>

            <div class="cost-card-footer">
              <span>
                Updated ${escapeHtml(
                  formatDate(
                    item.updatedAt
                  )
                )}
              </span>

              <div class="cost-card-actions">
                <button
                  class="text-button"
                  type="button"
                  data-edit-revenue-id="${escapeHtml(
                    item.id
                  )}"
                >
                  Edit
                </button>

                <button
                  class="text-button delete-cost-button"
                  type="button"
                  data-delete-revenue-id="${escapeHtml(
                    item.id
                  )}"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

  getElements(
    "[data-edit-revenue-id]"
  ).forEach((button) => {
    safeAddEventListener(
      button,
      "click",
      () => {
        openEditRevenueItemModal(
          button.dataset
            .editRevenueId
        );
      }
    );
  });

  getElements(
    "[data-delete-revenue-id]"
  ).forEach((button) => {
    safeAddEventListener(
      button,
      "click",
      () => {
        confirmDeleteRevenueItem(
          button.dataset
            .deleteRevenueId
        );
      }
    );
  });
};

/* =========================================================
   SUMMARY CALCULATIONS
========================================================= */

const getLatestUpdatedDate = (
  items
) =>
  items
    .map((item) =>
      new Date(item.updatedAt)
    )
    .filter(
      (date) =>
        !Number.isNaN(
          date.getTime()
        )
    )
    .sort(
      (a, b) =>
        b.getTime() -
        a.getTime()
    )[0];

const updateCostPoolSummary = () => {
  const usedCategories =
    new Set(
      appState.costItems.map(
        (item) => item.categoryId
      )
    ).size;

  const labourCount =
    appState.costItems.filter(
      (item) =>
        item.categoryId ===
        "labour"
    ).length;

  const latestDate =
    getLatestUpdatedDate(
      appState.costItems
    );

  const values = {
    "#cost-pool-total-items":
      appState.costItems.length,

    "#cost-pool-total-categories":
      usedCategories,

    "#cost-pool-labour-count":
      labourCount,

    "#cost-pool-last-updated":
      latestDate
        ? formatDate(latestDate)
        : "—"
  };

  Object.entries(values).forEach(
    ([selector, value]) => {
      const element =
        getElement(selector);

      if (element) {
        element.textContent =
          String(value);
      }
    }
  );
};

const updateRevenueSummary = () => {
  const usedCategories =
    new Set(
      appState.revenueItems.map(
        (item) => item.categoryId
      )
    ).size;

  const activeCount =
    appState.revenueItems.filter(
      (item) =>
        item.status === "active"
    ).length;

  const latestDate =
    getLatestUpdatedDate(
      appState.revenueItems
    );

  const values = {
    "#revenue-total-items":
      appState.revenueItems.length,

    "#revenue-total-categories":
      usedCategories,

    "#revenue-active-count":
      activeCount,

    "#revenue-last-updated":
      latestDate
        ? formatDate(latestDate)
        : "—"
  };

  Object.entries(values).forEach(
    ([selector, value]) => {
      const element =
        getElement(selector);

      if (element) {
        element.textContent =
          String(value);
      }
    }
  );
};

/* =========================================================
   COMPLETE LIBRARY RENDERING
========================================================= */

const renderCostPool = () => {
  renderCostCategories();
  renderCostCards();
  updateCostPoolSummary();
};

const renderRevenueLibrary = () => {
  renderRevenueCategories();
  renderRevenueCards();
  updateRevenueSummary();
};
/* =========================================================
   SHARED LIBRARY FORM HELPERS
========================================================= */

const buildCategoryOptions = (
  categories,
  selectedCategoryId = ""
) =>
  categories
    .map(
      (category) => `
        <option
          value="${escapeHtml(category.id)}"
          ${
            category.id === selectedCategoryId
              ? "selected"
              : ""
          }
        >
          ${escapeHtml(category.name)}
        </option>
      `
    )
    .join("");

const buildMethodOptions = (
  selectedMethod = "per-unit"
) => {
  const methods = [
    ["hourly", "Per hour"],
    ["per-minute", "Per minute"],
    ["per-unit", "Per unit"],
    ["fixed", "Fixed fee"],
    ["monthly", "Monthly"],
    ["percentage", "Percentage"],
    ["per-shipment", "Per shipment"],
    ["per-pallet", "Per pallet"],
    ["per-day", "Per day"]
  ];

  return methods
    .map(
      ([value, label]) => `
        <option
          value="${value}"
          ${
            normalizeMethod(
              selectedMethod
            ) === normalizeMethod(value)
              ? "selected"
              : ""
          }
        >
          ${label}
        </option>
      `
    )
    .join("");
};

const buildCurrencyOptions = (
  selectedCurrency = "CAD"
) => {
  const currencies = [
    "CAD",
    "USD",
    "CNY"
  ];

  return currencies
    .map(
      (currency) => `
        <option
          value="${currency}"
          ${
            currency === selectedCurrency
              ? "selected"
              : ""
          }
        >
          ${currency}
        </option>
      `
    )
    .join("");
};

const buildStatusOptions = (
  selectedStatus = "active"
) => `
  <option
    value="active"
    ${
      selectedStatus === "active"
        ? "selected"
        : ""
    }
  >
    Active
  </option>

  <option
    value="inactive"
    ${
      selectedStatus === "inactive"
        ? "selected"
        : ""
    }
  >
    Inactive
  </option>
`;

const createLibraryItemForm = ({
  item = {},
  type = "cost"
}) => {
  const isRevenue =
    type === "revenue";

  const categories =
    isRevenue
      ? appState.revenueCategories
      : appState.costCategories;

  const defaultCategoryId =
    categories[0]?.id || "";

  const data = {
    name: "",
    categoryId: defaultCategoryId,
    calculationMethod:
      isRevenue
        ? "per-unit"
        : "hourly",
    rate: 0,
    currency: "CAD",
    unit:
      isRevenue
        ? "unit"
        : "hour",
    defaultQuantity: 1,
    quantityUnit: "unit",
    description: "",
    status: "active",
    ...item
  };

  const prefix =
    isRevenue
      ? "revenue-item"
      : "cost-item";

  const itemLabel =
    isRevenue
      ? "Revenue Item"
      : "Cost Item";

  return `
    <form
      id="${prefix}-form"
      class="settings-form"
    >
      <div class="form-field full-width">
        <label for="${prefix}-name">
          ${itemLabel} Name
        </label>

        <input
          id="${prefix}-name"
          type="text"
          value="${escapeHtml(data.name)}"
          placeholder="${
            isRevenue
              ? "Example: Refurbishment Service Fee"
              : "Example: Senior Technician Labour"
          }"
          required
        >
      </div>

      <div class="form-field">
        <label for="${prefix}-category">
          Category
        </label>

        <select id="${prefix}-category">
          ${buildCategoryOptions(
            categories,
            data.categoryId
          )}
        </select>
      </div>

      <div class="form-field">
        <label for="${prefix}-method">
          Calculation Method
        </label>

        <select id="${prefix}-method">
          ${buildMethodOptions(
            data.calculationMethod
          )}
        </select>
      </div>

      <div class="form-field">
        <label for="${prefix}-rate">
          Rate
        </label>

        <input
          id="${prefix}-rate"
          type="number"
          min="0"
          step="0.01"
          value="${escapeHtml(data.rate)}"
          required
        >
      </div>

      <div class="form-field">
        <label for="${prefix}-currency">
          Currency
        </label>

        <select id="${prefix}-currency">
          ${buildCurrencyOptions(
            data.currency
          )}
        </select>
      </div>

      <div class="form-field">
        <label for="${prefix}-default-quantity">
          Default Quantity
        </label>

        <input
          id="${prefix}-default-quantity"
          type="number"
          min="0"
          step="0.01"
          value="${escapeHtml(
            data.defaultQuantity
          )}"
        >
      </div>

      <div class="form-field">
        <label for="${prefix}-quantity-unit">
          Quantity Unit
        </label>

        <input
          id="${prefix}-quantity-unit"
          type="text"
          value="${escapeHtml(
            data.quantityUnit
          )}"
          placeholder="units, minutes, pallets..."
        >
      </div>

      <div class="form-field">
        <label for="${prefix}-unit">
          Rate Unit
        </label>

        <input
          id="${prefix}-unit"
          type="text"
          value="${escapeHtml(data.unit)}"
          placeholder="hour, unit, shipment..."
        >
      </div>

      <div class="form-field">
        <label for="${prefix}-status">
          Status
        </label>

        <select id="${prefix}-status">
          ${buildStatusOptions(
            data.status
          )}
        </select>
      </div>

      <div class="form-field full-width">
        <label for="${prefix}-description">
          Description
        </label>

        <textarea
          id="${prefix}-description"
          rows="3"
          placeholder="${
            isRevenue
              ? "Describe when this customer charge should be used"
              : "Describe when this cost should be used"
          }"
        >${escapeHtml(
          data.description
        )}</textarea>
      </div>
    </form>
  `;
};

const readLibraryItemForm = (
  type = "cost"
) => {
  const isRevenue =
    type === "revenue";

  const prefix =
    isRevenue
      ? "revenue-item"
      : "cost-item";

  const name =
    getElement(
      `#${prefix}-name`
    )?.value.trim();

  const categoryId =
    getElement(
      `#${prefix}-category`
    )?.value;

  const calculationMethod =
    getElement(
      `#${prefix}-method`
    )?.value;

  const rate =
    Number(
      getElement(
        `#${prefix}-rate`
      )?.value
    );

  const currency =
    getElement(
      `#${prefix}-currency`
    )?.value || "CAD";

  const defaultQuantity =
    Number(
      getElement(
        `#${prefix}-default-quantity`
      )?.value
    );

  const quantityUnit =
    getElement(
      `#${prefix}-quantity-unit`
    )?.value.trim();

  const unit =
    getElement(
      `#${prefix}-unit`
    )?.value.trim();

  const status =
    getElement(
      `#${prefix}-status`
    )?.value || "active";

  const description =
    getElement(
      `#${prefix}-description`
    )?.value.trim();

  if (!name) {
    showToast(
      `Enter a ${
        isRevenue
          ? "revenue"
          : "cost"
      } item name.`,
      "warning"
    );

    return null;
  }

  if (!categoryId) {
    showToast(
      "Select a category.",
      "warning"
    );

    return null;
  }

  if (
    !Number.isFinite(rate) ||
    rate < 0
  ) {
    showToast(
      "Enter a valid rate.",
      "warning"
    );

    return null;
  }

  if (
    !Number.isFinite(
      defaultQuantity
    ) ||
    defaultQuantity < 0
  ) {
    showToast(
      "Enter a valid default quantity.",
      "warning"
    );

    return null;
  }

  return {
    name,
    categoryId,
    calculationMethod:
      normalizeMethod(
        calculationMethod
      ),
    rate,
    currency,
    defaultQuantity,
    quantityUnit:
      quantityUnit || "unit",
    unit:
      unit || "unit",
    status,
    description
  };
};

/* =========================================================
   COST ITEM CRUD
========================================================= */

const openNewCostItemModal = () => {
  openModal({
    kicker: "COST POOL",
    title: "Add Cost Item",
    content: createLibraryItemForm({
      type: "cost"
    }),
    confirmText: "Add Cost Item",

    confirmHandler: () => {
      const formData =
        readLibraryItemForm("cost");

      if (!formData) {
        return;
      }

      const newItem = {
        id: createId("cost"),
        ...formData,
        updatedAt:
          new Date().toISOString()
      };

      appState.costItems.push(newItem);

      saveCostPoolData();
      closeModal();
      renderCostPool();

      showToast(
        `${newItem.name} was added to the Cost Pool.`
      );
    }
  });
};

const openEditCostItemModal = (
  costItemId
) => {
  const item =
    appState.costItems.find(
      (costItem) =>
        costItem.id === costItemId
    );

  if (!item) {
    showToast(
      "The selected cost item was not found.",
      "error"
    );

    return;
  }

  openModal({
    kicker: "COST POOL",
    title: `Edit ${item.name}`,
    content: createLibraryItemForm({
      type: "cost",
      item
    }),
    confirmText: "Save Changes",

    confirmHandler: () => {
      const formData =
        readLibraryItemForm("cost");

      if (!formData) {
        return;
      }

      const index =
        appState.costItems.findIndex(
          (costItem) =>
            costItem.id === costItemId
        );

      if (index === -1) {
        showToast(
          "The cost item could not be updated.",
          "error"
        );

        return;
      }

      appState.costItems[index] = {
        ...appState.costItems[index],
        ...formData,
        updatedAt:
          new Date().toISOString()
      };

      const updatedName =
        appState.costItems[index].name;

      saveCostPoolData();
      closeModal();
      renderCostPool();

      showToast(
        `${updatedName} was updated.`
      );
    }
  });
};

const confirmDeleteCostItem = (
  costItemId
) => {
  const item =
    appState.costItems.find(
      (costItem) =>
        costItem.id === costItemId
    );

  if (!item) {
    return;
  }

  openModal({
    kicker: "DELETE COST ITEM",
    title: `Delete ${item.name}?`,

    content: `
      <p>
        This item will be permanently removed from the Cost Pool.
      </p>

      <p>
        Existing project snapshots will be handled separately when
        the Project Builder is added.
      </p>
    `,

    confirmText: "Delete Cost Item",

    confirmHandler: () => {
      appState.costItems =
        appState.costItems.filter(
          (costItem) =>
            costItem.id !== costItemId
        );

      saveCostPoolData();
      closeModal();
      renderCostPool();

      showToast(
        `${item.name} was deleted.`,
        "warning"
      );
    }
  });
};

/* =========================================================
   REVENUE ITEM CRUD
========================================================= */

const openNewRevenueItemModal = () => {
  openModal({
    kicker: "REVENUE LIBRARY",
    title: "Add Revenue Item",
    content: createLibraryItemForm({
      type: "revenue"
    }),
    confirmText: "Add Revenue Item",

    confirmHandler: () => {
      const formData =
        readLibraryItemForm(
          "revenue"
        );

      if (!formData) {
        return;
      }

      const newItem = {
        id: createId("revenue"),
        ...formData,
        updatedAt:
          new Date().toISOString()
      };

      appState.revenueItems.push(
        newItem
      );

      saveRevenueLibraryData();
      closeModal();
      renderRevenueLibrary();

      showToast(
        `${newItem.name} was added to the Revenue Library.`
      );
    }
  });
};

const openEditRevenueItemModal = (
  revenueItemId
) => {
  const item =
    appState.revenueItems.find(
      (revenueItem) =>
        revenueItem.id ===
        revenueItemId
    );

  if (!item) {
    showToast(
      "The selected revenue item was not found.",
      "error"
    );

    return;
  }

  openModal({
    kicker: "REVENUE LIBRARY",
    title: `Edit ${item.name}`,
    content: createLibraryItemForm({
      type: "revenue",
      item
    }),
    confirmText: "Save Changes",

    confirmHandler: () => {
      const formData =
        readLibraryItemForm(
          "revenue"
        );

      if (!formData) {
        return;
      }

      const index =
        appState.revenueItems.findIndex(
          (revenueItem) =>
            revenueItem.id ===
            revenueItemId
        );

      if (index === -1) {
        showToast(
          "The revenue item could not be updated.",
          "error"
        );

        return;
      }

      appState.revenueItems[index] = {
        ...appState.revenueItems[index],
        ...formData,
        updatedAt:
          new Date().toISOString()
      };

      const updatedName =
        appState.revenueItems[index]
          .name;

      saveRevenueLibraryData();
      closeModal();
      renderRevenueLibrary();

      showToast(
        `${updatedName} was updated.`
      );
    }
  });
};

const confirmDeleteRevenueItem = (
  revenueItemId
) => {
  const item =
    appState.revenueItems.find(
      (revenueItem) =>
        revenueItem.id ===
        revenueItemId
    );

  if (!item) {
    return;
  }

  openModal({
    kicker: "DELETE REVENUE ITEM",
    title: `Delete ${item.name}?`,

    content: `
      <p>
        This item will be permanently removed from the Revenue Library.
      </p>

      <p>
        Existing project snapshots will be handled separately when
        the Project Builder is added.
      </p>
    `,

    confirmText:
      "Delete Revenue Item",

    confirmHandler: () => {
      appState.revenueItems =
        appState.revenueItems.filter(
          (revenueItem) =>
            revenueItem.id !==
            revenueItemId
        );

      saveRevenueLibraryData();
      closeModal();
      renderRevenueLibrary();

      showToast(
        `${item.name} was deleted.`,
        "warning"
      );
    }
  });
};

/* =========================================================
   CATEGORY FORM
========================================================= */

const createCategoryForm = ({
  type = "cost"
}) => {
  const isRevenue =
    type === "revenue";

  const prefix =
    isRevenue
      ? "revenue-category"
      : "cost-category";

  return `
    <form
      id="${prefix}-form"
      class="settings-form"
    >
      <div class="form-field full-width">
        <label for="${prefix}-name">
          Category Name
        </label>

        <input
          id="${prefix}-name"
          type="text"
          placeholder="${
            isRevenue
              ? "Example: Environmental Fees"
              : "Example: Consumables"
          }"
          required
        >
      </div>

      <div class="form-field">
        <label for="${prefix}-abbreviation">
          Abbreviation
        </label>

        <input
          id="${prefix}-abbreviation"
          type="text"
          maxlength="3"
          placeholder="${
            isRevenue
              ? "EF"
              : "CON"
          }"
        >
      </div>

      <div class="form-field">
        <label for="${prefix}-color">
          Colour Group
        </label>

        <select id="${prefix}-color">
          <option value="labour">
            Blue
          </option>

          <option value="parts">
            Green
          </option>

          <option value="packaging">
            Purple
          </option>

          <option value="logistics">
            Orange
          </option>

          <option value="equipment">
            Pink
          </option>

          <option value="overhead">
            Grey
          </option>
        </select>
      </div>
    </form>
  `;
};

const createAbbreviation = (
  name,
  abbreviationInput
) =>
  abbreviationInput ||
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

/* =========================================================
   COST CATEGORY CREATION
========================================================= */

const openNewCostCategoryModal = () => {
  openModal({
    kicker: "COST POOL",
    title: "Create Cost Category",
    content: createCategoryForm({
      type: "cost"
    }),
    confirmText: "Create Category",

    confirmHandler: () => {
      const name =
        getElement(
          "#cost-category-name"
        )?.value.trim();

      const abbreviationInput =
        getElement(
          "#cost-category-abbreviation"
        )?.value.trim();

      const colorClass =
        getElement(
          "#cost-category-color"
        )?.value || "overhead";

      if (!name) {
        showToast(
          "Enter a category name.",
          "warning"
        );

        return;
      }

      const duplicate =
        appState.costCategories.some(
          (category) =>
            normalizeSearchValue(
              category.name
            ) ===
            normalizeSearchValue(name)
        );

      if (duplicate) {
        showToast(
          "A cost category with this name already exists.",
          "warning"
        );

        return;
      }

      const newCategory = {
        id: createId(
          "cost-category"
        ),
        name,
        abbreviation:
          createAbbreviation(
            name,
            abbreviationInput
          ),
        colorClass,
        builtIn: false
      };

      appState.costCategories.push(
        newCategory
      );

      saveCostPoolData();
      closeModal();
      renderCostPool();

      showToast(
        `${name} category was created.`
      );
    }
  });
};

/* =========================================================
   REVENUE CATEGORY CREATION
========================================================= */

const openNewRevenueCategoryModal = () => {
  openModal({
    kicker: "REVENUE LIBRARY",
    title: "Create Revenue Category",
    content: createCategoryForm({
      type: "revenue"
    }),
    confirmText: "Create Category",

    confirmHandler: () => {
      const name =
        getElement(
          "#revenue-category-name"
        )?.value.trim();

      const abbreviationInput =
        getElement(
          "#revenue-category-abbreviation"
        )?.value.trim();

      const colorClass =
        getElement(
          "#revenue-category-color"
        )?.value || "overhead";

      if (!name) {
        showToast(
          "Enter a category name.",
          "warning"
        );

        return;
      }

      const duplicate =
        appState.revenueCategories.some(
          (category) =>
            normalizeSearchValue(
              category.name
            ) ===
            normalizeSearchValue(name)
        );

      if (duplicate) {
        showToast(
          "A revenue category with this name already exists.",
          "warning"
        );

        return;
      }

      const newCategory = {
        id: createId(
          "revenue-category"
        ),
        name,
        abbreviation:
          createAbbreviation(
            name,
            abbreviationInput
          ),
        colorClass,
        builtIn: false
      };

      appState.revenueCategories.push(
        newCategory
      );

      saveRevenueLibraryData();
      closeModal();
      renderRevenueLibrary();

      showToast(
        `${name} category was created.`
      );
    }
  });
};

/* =========================================================
   CLEAR FILTERS
========================================================= */

const clearCostFilters = () => {
  appState.selectedCostCategory =
    "all";

  appState.selectedCostMethod =
    "all";

  appState.selectedCostStatus =
    "all";

  appState.costSearchText = "";

  appState.costSortMethod =
    "updated-desc";

  const fieldValues = {
    "#cost-pool-search-input": "",
    "#cost-type-filter": "all",
    "#cost-status-filter": "all",
    "#cost-sort-select":
      "updated-desc"
  };

  Object.entries(fieldValues).forEach(
    ([selector, value]) => {
      const field =
        getElement(selector);

      if (field) {
        field.value = value;
      }
    }
  );

  renderCostPool();
};

const clearRevenueFilters = () => {
  appState.selectedRevenueCategory =
    "all";

  appState.selectedRevenueMethod =
    "all";

  appState.selectedRevenueStatus =
    "all";

  appState.revenueSearchText = "";

  appState.revenueSortMethod =
    "updated-desc";

  const fieldValues = {
    "#revenue-search-input": "",
    "#revenue-method-filter": "all",
    "#revenue-status-filter": "all",
    "#revenue-sort-select":
      "updated-desc"
  };

  Object.entries(fieldValues).forEach(
    ([selector, value]) => {
      const field =
        getElement(selector);

      if (field) {
        field.value = value;
      }
    }
  );

  renderRevenueLibrary();
};

/* =========================================================
   COST POOL EVENTS
========================================================= */

const initializeCostPoolEvents = () => {
  [
    "#add-cost-item-button",
    "#empty-state-add-cost-button"
  ].forEach((selector) => {
    safeAddEventListener(
      getElement(selector),
      "click",
      openNewCostItemModal
    );
  });

  [
    "#add-cost-category-button",
    "#category-panel-add-button"
  ].forEach((selector) => {
    safeAddEventListener(
      getElement(selector),
      "click",
      openNewCostCategoryModal
    );
  });

  safeAddEventListener(
    getElement(
      "#cost-pool-search-input"
    ),
    "input",
    (event) => {
      appState.costSearchText =
        event.target.value;

      renderCostCards();
    }
  );

  safeAddEventListener(
    getElement(
      "#cost-type-filter"
    ),
    "change",
    (event) => {
      appState.selectedCostMethod =
        event.target.value;

      renderCostCards();
    }
  );

  safeAddEventListener(
    getElement(
      "#cost-status-filter"
    ),
    "change",
    (event) => {
      appState.selectedCostStatus =
        event.target.value;

      renderCostCards();
    }
  );

  safeAddEventListener(
    getElement(
      "#cost-sort-select"
    ),
    "change",
    (event) => {
      appState.costSortMethod =
        event.target.value;

      renderCostCards();
    }
  );

  safeAddEventListener(
    getElement(
      "#clear-cost-filters-button"
    ),
    "click",
    clearCostFilters
  );

  safeAddEventListener(
    getElement(
      "#cost-view-toggle"
    ),
    "click",
    () => {
      showToast(
        "List view will be added after the table design is approved."
      );
    }
  );
};

/* =========================================================
   REVENUE LIBRARY EVENTS
========================================================= */

const initializeRevenueLibraryEvents = () => {
  [
    "#add-revenue-item-button",
    "#empty-state-add-revenue-button"
  ].forEach((selector) => {
    safeAddEventListener(
      getElement(selector),
      "click",
      openNewRevenueItemModal
    );
  });

  [
    "#add-revenue-category-button",
    "#revenue-category-panel-add-button"
  ].forEach((selector) => {
    safeAddEventListener(
      getElement(selector),
      "click",
      openNewRevenueCategoryModal
    );
  });

  safeAddEventListener(
    getElement(
      "#revenue-search-input"
    ),
    "input",
    (event) => {
      appState.revenueSearchText =
        event.target.value;

      renderRevenueCards();
    }
  );

  safeAddEventListener(
    getElement(
      "#revenue-method-filter"
    ),
    "change",
    (event) => {
      appState.selectedRevenueMethod =
        event.target.value;

      renderRevenueCards();
    }
  );

  safeAddEventListener(
    getElement(
      "#revenue-status-filter"
    ),
    "change",
    (event) => {
      appState.selectedRevenueStatus =
        event.target.value;

      renderRevenueCards();
    }
  );

  safeAddEventListener(
    getElement(
      "#revenue-sort-select"
    ),
    "change",
    (event) => {
      appState.revenueSortMethod =
        event.target.value;

      renderRevenueCards();
    }
  );

  safeAddEventListener(
    getElement(
      "#clear-revenue-filters-button"
    ),
    "click",
    clearRevenueFilters
  );

  safeAddEventListener(
    getElement(
      "#revenue-view-toggle"
    ),
    "click",
    () => {
      showToast(
        "Revenue list view will be added after the table design is approved."
      );
    }
  );
};

/* =========================================================
   PROJECT FILTERS
========================================================= */

const filterProjectCards = () => {
  const searchValue =
    normalizeSearchValue(
      getElement(
        "#project-search-input"
      )?.value
    );

  const selectedStatus =
    getElement(
      "#project-status-filter"
    )?.value || "all";

  getElements(
    "[data-project-card]"
  ).forEach((card) => {
    const cardText =
      normalizeSearchValue(
        card.textContent
      );

    const cardStatus =
      card.dataset.status || "";

    const matchesSearch =
      !searchValue ||
      cardText.includes(
        searchValue
      );

    const matchesStatus =
      selectedStatus === "all" ||
      selectedStatus ===
        cardStatus;

    card.classList.toggle(
      "is-hidden",
      !(
        matchesSearch &&
        matchesStatus
      )
    );
  });
};

const initializeProjectFilters = () => {
  safeAddEventListener(
    getElement(
      "#project-search-input"
    ),
    "input",
    filterProjectCards
  );

  safeAddEventListener(
    getElement(
      "#project-status-filter"
    ),
    "change",
    filterProjectCards
  );

  safeAddEventListener(
    getElement(
      "#project-view-toggle"
    ),
    "click",
    () => {
      showToast(
        "Project list view will be added in the Project Builder milestone."
      );
    }
  );
};
/* =========================================================
   SETTINGS
========================================================= */

const switchSettingsPanel = (
  panelName
) => {
  getElements(
    "[data-settings-content]"
  ).forEach((panel) => {
    panel.classList.toggle(
      "active",
      panel.dataset.settingsContent ===
        panelName
    );
  });

  getElements(
    "[data-settings-panel]"
  ).forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.settingsPanel ===
        panelName
    );
  });
};

const collectSettings = () => ({
  companyName:
    getElement(
      "#company-name-input"
    )?.value.trim() || "",

  companyEmail:
    getElement(
      "#company-email-input"
    )?.value.trim() || "",

  companyPhone:
    getElement(
      "#company-phone-input"
    )?.value.trim() || "",

  companyAddress:
    getElement(
      "#company-address-input"
    )?.value.trim() || "",

  defaultCurrency:
    getElement(
      "#default-currency-select"
    )?.value || "CAD",

  quoteValidity:
    Number(
      getElement(
        "#quote-validity-input"
      )?.value
    ) || 30,

  pricingMethod:
    getElement(
      "#default-pricing-method"
    )?.value || "margin",

  defaultMargin:
    Number(
      getElement(
        "#default-margin-input"
      )?.value
    ) || 25
});

const applySavedSettingsToForm = () => {
  let savedSettings = null;

  try {
    savedSettings =
      JSON.parse(
        localStorage.getItem(
          STORAGE_KEYS.settings
        ) || "null"
      );
  } catch {
    savedSettings = null;
  }

  if (
    !savedSettings ||
    typeof savedSettings !== "object"
  ) {
    return;
  }

  const fieldValues = {
    "#company-name-input":
      savedSettings.companyName || "",

    "#company-email-input":
      savedSettings.companyEmail || "",

    "#company-phone-input":
      savedSettings.companyPhone || "",

    "#company-address-input":
      savedSettings.companyAddress || "",

    "#default-currency-select":
      savedSettings.defaultCurrency || "CAD",

    "#quote-validity-input":
      savedSettings.quoteValidity ?? 30,

    "#default-pricing-method":
      savedSettings.pricingMethod ||
      "margin",

    "#default-margin-input":
      savedSettings.defaultMargin ?? 25
  };

  Object.entries(fieldValues).forEach(
    ([selector, value]) => {
      const field =
        getElement(selector);

      if (field) {
        field.value = value;
      }
    }
  );
};

const saveSettings = () => {
  localStorage.setItem(
    STORAGE_KEYS.settings,
    JSON.stringify(
      collectSettings()
    )
  );

  showToast(
    "Settings saved on this device."
  );
};

const initializeSettings = () => {
  applySavedSettingsToForm();

  getElements(
    "[data-settings-panel]"
  ).forEach((button) => {
    safeAddEventListener(
      button,
      "click",
      () => {
        switchSettingsPanel(
          button.dataset.settingsPanel
        );
      }
    );
  });

  safeAddEventListener(
    getElement(
      "#save-settings-button"
    ),
    "click",
    saveSettings
  );
};

/* =========================================================
   PROJECT PREVIEW
========================================================= */

const openProjectPreview = (
  projectId
) => {
  const project =
    DEMO_PROJECTS.find(
      (item) =>
        item.id === projectId
    );

  if (!project) {
    showToast(
      "The selected project was not found.",
      "error"
    );

    return;
  }

  openModal({
    kicker: "PROJECT PREVIEW",
    title: project.name,

    content: `
      <div class="settings-form">
        <div class="form-field">
          <label>Customer</label>

          <input
            value="${escapeHtml(
              project.customer
            )}"
            readonly
          >
        </div>

        <div class="form-field">
          <label>Status</label>

          <input
            value="${escapeHtml(
              project.status
            )}"
            readonly
          >
        </div>

        <div class="form-field">
          <label>Volume</label>

          <input
            value="${escapeHtml(
              `${project.volume.toLocaleString()} / ${project.volumeUnit}`
            )}"
            readonly
          >
        </div>

        <div class="form-field">
          <label>Unit Price</label>

          <input
            value="${escapeHtml(
              formatCurrency(
                project.unitPrice,
                "USD"
              )
            )}"
            readonly
          >
        </div>

        <div class="form-field">
          <label>Margin</label>

          <input
            value="${escapeHtml(
              `${project.margin.toFixed(1)}%`
            )}"
            readonly
          >
        </div>
      </div>
    `,

    confirmText: "Open Projects",

    confirmHandler: () => {
      closeModal();
      navigateToPage("projects");
    }
  });
};

const initializeProjectActions = () => {
  getElements(
    "[data-project-id]"
  ).forEach((button) => {
    safeAddEventListener(
      button,
      "click",
      () => {
        openProjectPreview(
          button.dataset.projectId
        );
      }
    );
  });
};

/* =========================================================
   BACKUP AND RESTORE
========================================================= */

const createBackupPayload = () => ({
  application:
    "Refurbishment Quote System",

  version:
    "3.0.0-revenue-library",

  exportedAt:
    new Date().toISOString(),

  theme:
    appState.currentTheme,

  sidebarCollapsed:
    appState.sidebarCollapsed,

  settings:
    collectSettings(),

  costCategories:
    appState.costCategories,

  costItems:
    appState.costItems,

  revenueCategories:
    appState.revenueCategories,

  revenueItems:
    appState.revenueItems
});

const downloadJsonFile = (
  data,
  filename
) => {
  const blob =
    new Blob(
      [
        JSON.stringify(
          data,
          null,
          2
        )
      ],
      {
        type: "application/json"
      }
    );

  const objectUrl =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = objectUrl;
  link.download = filename;

  document.body.appendChild(link);

  link.click();
  link.remove();

  window.setTimeout(() => {
    URL.revokeObjectURL(
      objectUrl
    );
  }, 100);
};

const exportBackup = () => {
  const dateText =
    new Date()
      .toISOString()
      .slice(0, 10);

  downloadJsonFile(
    createBackupPayload(),
    `refurbishment-quote-system-backup-${dateText}.json`
  );

  showToast(
    "Backup file exported."
  );
};

const importBackupFile = async (
  file
) => {
  if (!file) {
    return;
  }

  try {
    const text =
      await file.text();

    const data =
      JSON.parse(text);

    if (
      data.application !==
      "Refurbishment Quote System"
    ) {
      throw new Error(
        "Invalid backup application"
      );
    }

    if (
      Array.isArray(
        data.costCategories
      )
    ) {
      appState.costCategories =
        data.costCategories;
    }

    if (
      Array.isArray(
        data.costItems
      )
    ) {
      appState.costItems =
        data.costItems;
    }

    if (
      Array.isArray(
        data.revenueCategories
      )
    ) {
      appState.revenueCategories =
        data.revenueCategories;
    }

    if (
      Array.isArray(
        data.revenueItems
      )
    ) {
      appState.revenueItems =
        data.revenueItems;
    }

    if (data.theme) {
      applyTheme(data.theme);
    }

    if (
      typeof data.sidebarCollapsed ===
      "boolean"
    ) {
      appState.sidebarCollapsed =
        data.sidebarCollapsed;

      localStorage.setItem(
        STORAGE_KEYS.sidebarCollapsed,
        String(
          data.sidebarCollapsed
        )
      );

      applySidebarState();
    }

    if (
      data.settings &&
      typeof data.settings === "object"
    ) {
      localStorage.setItem(
        STORAGE_KEYS.settings,
        JSON.stringify(
          data.settings
        )
      );

      applySavedSettingsToForm();
    }

    saveAllLibraryData();

    renderCostPool();
    renderRevenueLibrary();

    showToast(
      "Backup imported successfully."
    );
  } catch (error) {
    console.error(error);

    showToast(
      "The selected file is not a valid backup.",
      "error"
    );
  }
};

const initializeBackupActions = () => {
  [
    "#backup-data-button",
    "#settings-export-backup-button"
  ].forEach((selector) => {
    safeAddEventListener(
      getElement(selector),
      "click",
      exportBackup
    );
  });

  [
    "#import-project-button",
    "#settings-import-backup-button"
  ].forEach((selector) => {
    safeAddEventListener(
      getElement(selector),
      "click",
      () => {
        const fileInput =
          getElement(
            "#backup-file-input"
          );

        if (fileInput) {
          fileInput.value = "";
          fileInput.click();
        }
      }
    );
  });

  safeAddEventListener(
    getElement(
      "#backup-file-input"
    ),
    "change",
    (event) => {
      importBackupFile(
        event.target.files?.[0]
      );
    }
  );
};

/* =========================================================
   RESET LOCAL DATA
========================================================= */

const initializeResetAction = () => {
  safeAddEventListener(
    getElement(
      "#reset-local-data-button"
    ),
    "click",
    () => {
      openModal({
        kicker: "DANGER ZONE",
        title: "Reset Local Data",

        content: `
          <p>
            This will permanently remove all saved Cost Pool items,
            Revenue Library items, custom categories and local settings
            from this browser.
          </p>

          <p>
            Export a backup before continuing if you may need this
            information later.
          </p>
        `,

        confirmText:
          "Reset Local Data",

        confirmHandler: () => {
          Object.values(
            STORAGE_KEYS
          ).forEach((key) => {
            localStorage.removeItem(
              key
            );
          });

          closeModal();

          showToast(
            "Local data was reset.",
            "warning"
          );

          window.setTimeout(() => {
            window.location.reload();
          }, 600);
        }
      });
    }
  );
};

/* =========================================================
   GENERAL ACTIONS
========================================================= */

const initializeGeneralActions = () => {
  safeAddEventListener(
    getElement(
      "#notification-button"
    ),
    "click",
    () => {
      showToast(
        "You have no critical notifications."
      );
    }
  );

  safeAddEventListener(
    getElement(
      "#user-profile-button"
    ),
    "click",
    () => {
      navigateToPage(
        "settings"
      );

      switchSettingsPanel(
        "company"
      );
    }
  );

  safeAddEventListener(
    getElement(
      "#export-report-button"
    ),
    "click",
    () => {
      downloadJsonFile(
        {
          application:
            "Refurbishment Quote System",

          reportType:
            "Current Demo Report",

          exportedAt:
            new Date().toISOString(),

          projects:
            DEMO_PROJECTS,

          costCategories:
            appState.costCategories,

          costItems:
            appState.costItems,

          revenueCategories:
            appState.revenueCategories,

          revenueItems:
            appState.revenueItems
        },

        "refurbishment-report.json"
      );

      showToast(
        "Report exported."
      );
    }
  );

  [
    "#new-quote-button",
    "#dashboard-create-quote-button",
    "#quick-new-project-button",
    "#projects-create-project-button"
  ].forEach((selector) => {
    safeAddEventListener(
      getElement(selector),
      "click",
      () => {
        navigateToPage(
          "projects"
        );

        showToast(
          "The editable Project Builder will be added in Milestone 4."
        );
      }
    );
  });

  [
    "#create-template-button",
    "#empty-create-template-button"
  ].forEach((selector) => {
    safeAddEventListener(
      getElement(selector),
      "click",
      () => {
        navigateToPage(
          "templates"
        );

        showToast(
          "The editable Template Builder will be added after the Project Builder."
        );
      }
    );
  });

  safeAddEventListener(
    getElement(
      "#add-customer-button"
    ),
    "click",
    () => {
      showToast(
        "Customer creation will be connected in the Customer milestone."
      );
    }
  );
};

/* =========================================================
   GLOBAL SEARCH
========================================================= */

const initializeGlobalSearch = () => {
  const searchInput =
    getElement(
      "#global-search-input"
    );

  safeAddEventListener(
    searchInput,
    "keydown",
    (event) => {
      if (
        event.key !== "Enter"
      ) {
        return;
      }

      const value =
        normalizeSearchValue(
          searchInput.value
        );

      if (!value) {
        return;
      }

      const matchingCost =
        appState.costItems.find(
          (item) => {
            const searchableText =
              normalizeSearchValue(
                [
                  item.name,
                  item.description,
                  getCostCategoryName(
                    item.categoryId
                  )
                ].join(" ")
              );

            return searchableText.includes(
              value
            );
          }
        );

      if (matchingCost) {
        navigateToPage(
          "cost-pool"
        );

        const costSearch =
          getElement(
            "#cost-pool-search-input"
          );

        if (costSearch) {
          costSearch.value =
            searchInput.value;

          appState.costSearchText =
            searchInput.value;

          renderCostCards();
        }

        return;
      }

      const matchingRevenue =
        appState.revenueItems.find(
          (item) => {
            const searchableText =
              normalizeSearchValue(
                [
                  item.name,
                  item.description,
                  getRevenueCategoryName(
                    item.categoryId
                  )
                ].join(" ")
              );

            return searchableText.includes(
              value
            );
          }
        );

      if (matchingRevenue) {
        navigateToPage(
          "revenue-library"
        );

        const revenueSearch =
          getElement(
            "#revenue-search-input"
          );

        if (revenueSearch) {
          revenueSearch.value =
            searchInput.value;

          appState.revenueSearchText =
            searchInput.value;

          renderRevenueCards();
        }

        return;
      }

      const matchingProject =
        DEMO_PROJECTS.find(
          (project) =>
            normalizeSearchValue(
              project.name
            ).includes(value) ||
            normalizeSearchValue(
              project.customer
            ).includes(value)
        );

      if (matchingProject) {
        navigateToPage(
          "projects"
        );

        const projectSearch =
          getElement(
            "#project-search-input"
          );

        if (projectSearch) {
          projectSearch.value =
            searchInput.value;

          filterProjectCards();
        }

        return;
      }

      showToast(
        "No matching result was found.",
        "warning"
      );
    }
  );

  document.addEventListener(
    "keydown",
    (event) => {
      const shortcut =
        (
          event.ctrlKey ||
          event.metaKey
        ) &&
        event.key.toLowerCase() ===
          "k";

      if (!shortcut) {
        return;
      }

      event.preventDefault();

      searchInput?.focus();
      searchInput?.select();
    }
  );
};

/* =========================================================
   KEYBOARD SHORTCUTS
========================================================= */

const initializeKeyboardShortcuts = () => {
  document.addEventListener(
    "keydown",
    (event) => {
      const tagName =
        event.target?.tagName
          ?.toLowerCase();

      const isTyping =
        tagName === "input" ||
        tagName === "textarea" ||
        tagName === "select";

      if (isTyping) {
        return;
      }

      const commandKey =
        event.ctrlKey ||
        event.metaKey;

      if (
        commandKey &&
        event.key.toLowerCase() ===
          "s"
      ) {
        event.preventDefault();

        if (
          appState.currentPage ===
          "settings"
        ) {
          saveSettings();
        } else {
          saveAllLibraryData();

          showToast(
            "Current browser data was saved."
          );
        }
      }
    }
  );
};

/* =========================================================
   APPLICATION INITIALIZATION
========================================================= */

const initializeApplication = () => {
  try {
    loadLibraryData();

    initializeTheme();
    initializeSidebar();
    initializeNavigation();
    initializeModal();

    initializeCostPoolEvents();
    initializeRevenueLibraryEvents();

    initializeProjectFilters();
    initializeSettings();
    initializeProjectActions();

    initializeBackupActions();
    initializeResetAction();
    initializeGeneralActions();
    initializeGlobalSearch();
    initializeKeyboardShortcuts();

    renderCostPool();
    renderRevenueLibrary();

    navigateToPage(
      "dashboard"
    );

    console.info(
      "Refurbishment Quote System Milestone 3 initialized."
    );
  } catch (error) {
    console.error(
      "Application initialization failed:",
      error
    );

    showToast(
      "The application could not initialize. Check the browser console.",
      "error",
      5000
    );
  }
};

if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initializeApplication
  );
} else {
  initializeApplication();
}
