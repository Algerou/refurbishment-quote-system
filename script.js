"use strict";

/* =========================================================
   REFURBISHMENT QUOTE SYSTEM
   MILESTONE 2 — EDITABLE COST POOL
========================================================= */

/* =========================================================
   1. STORAGE KEYS
========================================================= */

const STORAGE_KEYS = {
  theme: "rqs-theme",
  sidebarCollapsed: "rqs-sidebar-collapsed",
  settings: "rqs-settings",
  costItems: "rqs-cost-items",
  costCategories: "rqs-cost-categories"
};

/* =========================================================
   2. PAGE INFORMATION
========================================================= */

const PAGE_INFORMATION = {
  dashboard: {
    title: "Dashboard",
    eyebrow: "WORKSPACE"
  },

  projects: {
    title: "Projects",
    eyebrow: "PROJECT MANAGEMENT"
  },

  "cost-pool": {
    title: "Cost Pool",
    eyebrow: "REUSABLE COST LIBRARY"
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

/* =========================================================
   3. DEFAULT CATEGORIES
========================================================= */

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

/* =========================================================
   4. DEFAULT COST ITEMS
========================================================= */

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

/* =========================================================
   5. DEMONSTRATION PROJECT DATA
========================================================= */

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

/* =========================================================
   6. APPLICATION STATE
========================================================= */

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

  editingCostItemId: null,
  editingCategoryId: null,

  modalConfirmHandler: null
};

/* =========================================================
   7. DOM HELPERS
========================================================= */

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

const escapeHtml = (value) => {
  const element = document.createElement("div");
  element.textContent = String(value ?? "");
  return element.innerHTML;
};

const normalizeSearchValue = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const createId = (prefix) => {
  const randomText = Math.random()
    .toString(36)
    .slice(2, 9);

  return `${prefix}-${Date.now()}-${randomText}`;
};

const deepClone = (value) =>
  JSON.parse(JSON.stringify(value));

/* =========================================================
   8. FORMATTING HELPERS
========================================================= */

const formatCurrency = (
  value,
  currency = "CAD"
) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "$0.00";
  }

  try {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(numericValue);
  } catch {
    return `${currency} ${numericValue.toFixed(2)}`;
  }
};

const formatDate = (dateValue) => {
  if (!dateValue) {
    return "—";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
};

const formatCalculationMethod = (method) => {
  const labels = {
    hourly: "Hourly",
    "per-minute": "Per minute",
    "per-unit": "Per unit",
    fixed: "Fixed",
    monthly: "Monthly",
    percentage: "Percentage",
    "per-shipment": "Per shipment",
    "per-pallet": "Per pallet"
  };

  return labels[method] || method;
};

const formatRate = (item) => {
  if (item.calculationMethod === "percentage") {
    return `${Number(item.rate).toFixed(2)}%`;
  }

  const amount = formatCurrency(
    item.rate,
    item.currency
  );

  const suffixes = {
    hourly: "hour",
    "per-minute": "minute",
    "per-unit": "unit",
    fixed: "fixed",
    monthly: "month",
    "per-shipment": "shipment",
    "per-pallet": "pallet"
  };

  const suffix =
    suffixes[item.calculationMethod] ||
    item.unit ||
    "unit";

  return `${amount} / ${suffix}`;
};

const getCategoryById = (categoryId) =>
  appState.costCategories.find(
    (category) => category.id === categoryId
  );

const getCategoryName = (categoryId) =>
  getCategoryById(categoryId)?.name ||
  "Uncategorized";

const getCategoryClass = (categoryId) =>
  getCategoryById(categoryId)?.colorClass ||
  "overhead";

/* =========================================================
   9. LOCAL STORAGE
========================================================= */

const loadCostPoolData = () => {
  const savedCategories =
    localStorage.getItem(
      STORAGE_KEYS.costCategories
    );

  const savedItems =
    localStorage.getItem(
      STORAGE_KEYS.costItems
    );

  try {
    appState.costCategories = savedCategories
      ? JSON.parse(savedCategories)
      : deepClone(DEFAULT_COST_CATEGORIES);
  } catch {
    appState.costCategories =
      deepClone(DEFAULT_COST_CATEGORIES);
  }

  try {
    appState.costItems = savedItems
      ? JSON.parse(savedItems)
      : deepClone(DEFAULT_COST_ITEMS);
  } catch {
    appState.costItems =
      deepClone(DEFAULT_COST_ITEMS);
  }

  if (!Array.isArray(appState.costCategories)) {
    appState.costCategories =
      deepClone(DEFAULT_COST_CATEGORIES);
  }

  if (!Array.isArray(appState.costItems)) {
    appState.costItems =
      deepClone(DEFAULT_COST_ITEMS);
  }

  saveCostPoolData();
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

/* =========================================================
   10. TOAST NOTIFICATIONS
========================================================= */

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

  const toast = document.createElement("div");

  toast.className = `toast ${type}`;

  const icon =
    type === "error"
      ? "!"
      : type === "warning"
        ? "⚠"
        : "✓";

  toast.innerHTML = `
    <span aria-hidden="true">${icon}</span>
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

/* =========================================================
   11. NAVIGATION
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
    title.textContent = pageData.title;
  }

  if (eyebrow) {
    eyebrow.textContent = pageData.eyebrow;
  }

  document.title =
    `${pageData.title} | Refurbishment Quote System`;
};

const navigateToPage = (pageName) => {
  const targetPage =
    getElement(`[data-page="${pageName}"]`);

  if (!targetPage) {
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
      button.dataset.pageTarget === pageName
    );
  });

  appState.currentPage = pageName;

  updatePageHeader(pageName);
  closeMobileSidebar();

  if (pageName === "cost-pool") {
    renderCostPool();
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

const initializeNavigation = () => {
  getElements("[data-page-target]").forEach(
    (button) => {
      safeAddEventListener(
        button,
        "click",
        () => {
          navigateToPage(
            button.dataset.pageTarget
          );
        }
      );
    }
  );

  safeAddEventListener(
    getElement("#brand-button"),
    "click",
    () => navigateToPage("dashboard")
  );

  safeAddEventListener(
    getElement("#view-all-projects-button"),
    "click",
    () => navigateToPage("projects")
  );
};

/* =========================================================
   12. SIDEBAR
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
    getElement("#sidebar-collapse-button"),
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
        String(appState.sidebarCollapsed)
      );

      applySidebarState();
    }
  );

  safeAddEventListener(
    getElement("#mobile-menu-button"),
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
   13. THEME
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
    getElement("#theme-toggle-button"),
    "click",
    () => {
      const nextTheme =
        appState.currentTheme === "dark"
          ? "light"
          : "dark";

      applyTheme(nextTheme);

      showToast(
        `${nextTheme === "dark" ? "Dark" : "Light"} theme enabled.`
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
   14. MODAL SYSTEM
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
    getElement("#modal-confirm-button");

  if (
    !backdrop ||
    !modalKicker ||
    !modalTitle ||
    !modalBody ||
    !confirmButton
  ) {
    return;
  }

  modalKicker.textContent = kicker;
  modalTitle.textContent = title;
  modalBody.innerHTML = content;
  confirmButton.textContent = confirmText;

  appState.modalConfirmHandler =
    confirmHandler;

  backdrop.classList.add("active");

  backdrop.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow = "hidden";

  window.setTimeout(() => {
    const firstField =
      modalBody.querySelector(
        "input, select, textarea, button"
      );

    firstField?.focus();
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

  appState.modalConfirmHandler = null;
  appState.editingCostItemId = null;
  appState.editingCategoryId = null;
};

const initializeModal = () => {
  safeAddEventListener(
    getElement("#modal-close-button"),
    "click",
    closeModal
  );

  safeAddEventListener(
    getElement("#modal-cancel-button"),
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
    getElement("#modal-confirm-button"),
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
   15. COST CATEGORY RENDERING
========================================================= */

const renderCostCategories = () => {
  const container =
    getElement("#cost-category-list");

  if (!container) {
    return;
  }

  const allCount =
    appState.costItems.length;

  const allButton = `
    <button
      class="category-item ${
        appState.selectedCostCategory === "all"
          ? "active"
          : ""
      }"
      type="button"
      data-cost-category="all"
    >
      <span class="category-icon">▦</span>
      <span class="category-name">All Costs</span>
      <span class="category-count">${allCount}</span>
    </button>
  `;

  const categoryButtons =
    appState.costCategories
      .map((category) => {
        const categoryCount =
          appState.costItems.filter(
            (item) =>
              item.categoryId === category.id
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
              ${escapeHtml(category.abbreviation)}
            </span>

            <span class="category-name">
              ${escapeHtml(category.name)}
            </span>

            <span class="category-count">
              ${categoryCount}
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
   16. COST ITEM FILTERING AND SORTING
========================================================= */

const getFilteredCostItems = () => {
  const searchText =
    normalizeSearchValue(
      appState.costSearchText
    );

  let items =
    appState.costItems.filter((item) => {
      const searchableText =
        normalizeSearchValue(
          [
            item.name,
            item.description,
            getCategoryName(
              item.categoryId
            ),
            item.calculationMethod,
            item.currency,
            item.status
          ].join(" ")
        );

      const matchesSearch =
        !searchText ||
        searchableText.includes(searchText);

      const matchesCategory =
        appState.selectedCostCategory ===
          "all" ||
        item.categoryId ===
          appState.selectedCostCategory;

      const matchesMethod =
        appState.selectedCostMethod ===
          "all" ||
        item.calculationMethod ===
          appState.selectedCostMethod;

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
    });

  items = [...items];

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
        getCategoryName(
          a.categoryId
        ).localeCompare(
          getCategoryName(
            b.categoryId
          )
        )
      );
      break;

    case "updated-desc":
    default:
      items.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
      );
      break;
  }

  return items;
};

/* =========================================================
   17. COST ITEM CARD RENDERING
========================================================= */

const renderCostCards = () => {
  const container =
    getElement("#cost-card-grid");

  const emptyState =
    getElement("#cost-pool-empty-state");

  const resultsText =
    getElement("#cost-results-text");

  if (!container) {
    return;
  }

  const filteredItems =
    getFilteredCostItems();

  if (resultsText) {
    resultsText.textContent =
      `Showing ${filteredItems.length} of ${appState.costItems.length} cost items`;
  }

  if (filteredItems.length === 0) {
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
    filteredItems
      .map((item) => {
        const category =
          getCategoryById(
            item.categoryId
          );

        const categoryClass =
          category?.colorClass ||
          "overhead";

        const abbreviation =
          category?.abbreviation ||
          "C";

        const statusLabel =
          item.status === "active"
            ? "Active"
            : "Inactive";

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
                ${statusLabel}
              </span>
            </div>

            <div class="cost-card-main">
              <span
                class="cost-card-icon ${escapeHtml(
                  categoryClass
                )}"
              >
                ${escapeHtml(abbreviation)}
              </span>

              <div>
                <h3>${escapeHtml(
                  item.name
                )}</h3>

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
                    item.currency ||
                      "CAD"
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
                  class="text-button edit-cost-button"
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
   18. COST POOL SUMMARY
========================================================= */

const updateCostPoolSummary = () => {
  const totalItems =
    appState.costItems.length;

  const usedCategories =
    new Set(
      appState.costItems.map(
        (item) => item.categoryId
      )
    ).size;

  const labourCount =
    appState.costItems.filter(
      (item) =>
        item.categoryId === "labour"
    ).length;

  const latestDate =
    appState.costItems
      .map((item) =>
        new Date(item.updatedAt)
      )
      .filter(
        (date) =>
          !Number.isNaN(date.getTime())
      )
      .sort(
        (a, b) =>
          b.getTime() - a.getTime()
      )[0];

  const totalElement =
    getElement("#cost-pool-total-items");

  const categoriesElement =
    getElement(
      "#cost-pool-total-categories"
    );

  const labourElement =
    getElement(
      "#cost-pool-labour-count"
    );

  const updatedElement =
    getElement(
      "#cost-pool-last-updated"
    );

  if (totalElement) {
    totalElement.textContent =
      String(totalItems);
  }

  if (categoriesElement) {
    categoriesElement.textContent =
      String(usedCategories);
  }

  if (labourElement) {
    labourElement.textContent =
      String(labourCount);
  }

  if (updatedElement) {
    updatedElement.textContent =
      latestDate
        ? formatDate(latestDate)
        : "—";
  }
};

/* =========================================================
   19. COMPLETE COST POOL RENDER
========================================================= */

const renderCostPool = () => {
  renderCostCategories();
  renderCostCards();
  updateCostPoolSummary();
};

/* =========================================================
   20. COST ITEM FORM
========================================================= */

const buildCategoryOptions = (
  selectedCategoryId = ""
) =>
  appState.costCategories
    .map(
      (category) => `
        <option
          value="${escapeHtml(
            category.id
          )}"
          ${
            category.id ===
            selectedCategoryId
              ? "selected"
              : ""
          }
        >
          ${escapeHtml(category.name)}
        </option>
      `
    )
    .join("");

const createCostItemForm = (
  item = {}
) => {
  const costItem = {
    name: "",
    categoryId:
      appState.costCategories[0]?.id ||
      "labour",
    calculationMethod: "hourly",
    rate: 0,
    currency: "CAD",
    unit: "hour",
    defaultQuantity: 1,
    quantityUnit: "unit",
    description: "",
    status: "active",
    ...item
  };

  return `
    <form
      id="cost-item-form"
      class="settings-form"
    >
      <div class="form-field full-width">
        <label for="cost-item-name">
          Cost Item Name
        </label>

        <input
          id="cost-item-name"
          type="text"
          value="${escapeHtml(
            costItem.name
          )}"
          placeholder="Example: Senior Technician Labour"
          required
        >
      </div>

      <div class="form-field">
        <label for="cost-item-category">
          Category
        </label>

        <select id="cost-item-category">
          ${buildCategoryOptions(
            costItem.categoryId
          )}
        </select>
      </div>

      <div class="form-field">
        <label for="cost-item-method">
          Calculation Method
        </label>

        <select id="cost-item-method">
          <option
            value="hourly"
            ${
              costItem.calculationMethod ===
              "hourly"
                ? "selected"
                : ""
            }
          >
            Hourly
          </option>

          <option
            value="per-minute"
            ${
              costItem.calculationMethod ===
              "per-minute"
                ? "selected"
                : ""
            }
          >
            Per minute
          </option>

          <option
            value="per-unit"
            ${
              costItem.calculationMethod ===
              "per-unit"
                ? "selected"
                : ""
            }
          >
            Per unit
          </option>

          <option
            value="fixed"
            ${
              costItem.calculationMethod ===
              "fixed"
                ? "selected"
                : ""
            }
          >
            Fixed cost
          </option>

          <option
            value="monthly"
            ${
              costItem.calculationMethod ===
              "monthly"
                ? "selected"
                : ""
            }
          >
            Monthly
          </option>

          <option
            value="percentage"
            ${
              costItem.calculationMethod ===
              "percentage"
                ? "selected"
                : ""
            }
          >
            Percentage
          </option>

          <option
            value="per-shipment"
            ${
              costItem.calculationMethod ===
              "per-shipment"
                ? "selected"
                : ""
            }
          >
            Per shipment
          </option>

          <option
            value="per-pallet"
            ${
              costItem.calculationMethod ===
              "per-pallet"
                ? "selected"
                : ""
            }
          >
            Per pallet
          </option>
        </select>
      </div>

      <div class="form-field">
        <label for="cost-item-rate">
          Rate
        </label>

        <input
          id="cost-item-rate"
          type="number"
          min="0"
          step="0.01"
          value="${escapeHtml(
            costItem.rate
          )}"
          required
        >
      </div>

      <div class="form-field">
        <label for="cost-item-currency">
          Currency
        </label>

        <select id="cost-item-currency">
          <option
            value="CAD"
            ${
              costItem.currency === "CAD"
                ? "selected"
                : ""
            }
          >
            CAD
          </option>

          <option
            value="USD"
            ${
              costItem.currency === "USD"
                ? "selected"
                : ""
            }
          >
            USD
          </option>

          <option
            value="CNY"
            ${
              costItem.currency === "CNY"
                ? "selected"
                : ""
            }
          >
            CNY
          </option>
        </select>
      </div>

      <div class="form-field">
        <label for="cost-item-default-quantity">
          Default Quantity
        </label>

        <input
          id="cost-item-default-quantity"
          type="number"
          min="0"
          step="0.01"
          value="${escapeHtml(
            costItem.defaultQuantity
          )}"
        >
      </div>

      <div class="form-field">
        <label for="cost-item-quantity-unit">
          Quantity Unit
        </label>

        <input
          id="cost-item-quantity-unit"
          type="text"
          value="${escapeHtml(
            costItem.quantityUnit
          )}"
          placeholder="minutes, units, hours..."
        >
      </div>

      <div class="form-field">
        <label for="cost-item-unit">
          Rate Unit
        </label>

        <input
          id="cost-item-unit"
          type="text"
          value="${escapeHtml(
            costItem.unit
          )}"
          placeholder="hour, unit, month..."
        >
      </div>

      <div class="form-field">
        <label for="cost-item-status">
          Status
        </label>

        <select id="cost-item-status">
          <option
            value="active"
            ${
              costItem.status === "active"
                ? "selected"
                : ""
            }
          >
            Active
          </option>

          <option
            value="inactive"
            ${
              costItem.status === "inactive"
                ? "selected"
                : ""
            }
          >
            Inactive
          </option>
        </select>
      </div>

      <div class="form-field full-width">
        <label for="cost-item-description">
          Description
        </label>

        <textarea
          id="cost-item-description"
          rows="3"
          placeholder="Describe when this cost should be used"
        >${escapeHtml(
          costItem.description
        )}</textarea>
      </div>
    </form>
  `;
};

/* =========================================================
   21. READ COST ITEM FORM
========================================================= */

const readCostItemForm = () => {
  const name =
    getElement(
      "#cost-item-name"
    )?.value.trim();

  const categoryId =
    getElement(
      "#cost-item-category"
    )?.value;

  const calculationMethod =
    getElement(
      "#cost-item-method"
    )?.value;

  const rate =
    Number(
      getElement(
        "#cost-item-rate"
      )?.value
    );

  const currency =
    getElement(
      "#cost-item-currency"
    )?.value;

  const defaultQuantity =
    Number(
      getElement(
        "#cost-item-default-quantity"
      )?.value
    );

  const quantityUnit =
    getElement(
      "#cost-item-quantity-unit"
    )?.value.trim();

  const unit =
    getElement(
      "#cost-item-unit"
    )?.value.trim();

  const status =
    getElement(
      "#cost-item-status"
    )?.value;

  const description =
    getElement(
      "#cost-item-description"
    )?.value.trim();

  if (!name) {
    showToast(
      "Enter a cost item name.",
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
      "Enter a valid cost rate.",
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
    calculationMethod,
    rate,
    currency,
    defaultQuantity,
    quantityUnit:
      quantityUnit || "unit",
    unit: unit || "unit",
    status,
    description
  };
};

/* =========================================================
   22. CREATE COST ITEM
========================================================= */

const openNewCostItemModal = () => {
  appState.editingCostItemId = null;

  openModal({
    kicker: "COST POOL",
    title: "Add Cost Item",
    content: createCostItemForm(),
    confirmText: "Add Cost Item",

    confirmHandler: () => {
      const formData =
        readCostItemForm();

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

/* =========================================================
   23. EDIT COST ITEM
========================================================= */

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

  appState.editingCostItemId =
    costItemId;

  openModal({
    kicker: "COST POOL",
    title: `Edit ${item.name}`,
    content: createCostItemForm(item),
    confirmText: "Save Changes",

    confirmHandler: () => {
      const formData =
        readCostItemForm();

      if (!formData) {
        return;
      }

      const itemIndex =
        appState.costItems.findIndex(
          (costItem) =>
            costItem.id === costItemId
        );

      if (itemIndex === -1) {
        showToast(
          "The cost item could not be updated.",
          "error"
        );

        return;
      }

      appState.costItems[itemIndex] = {
        ...appState.costItems[itemIndex],
        ...formData,
        updatedAt:
          new Date().toISOString()
      };

      const updatedName =
        appState.costItems[itemIndex].name;

      saveCostPoolData();
      closeModal();
      renderCostPool();

      showToast(
        `${updatedName} was updated.`
      );
    }
  });
};

/* =========================================================
   24. DELETE COST ITEM
========================================================= */

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
        This cost item will be removed from the Cost Pool.
      </p>

      <p>
        Existing project costs will be handled separately when
        project versioning is added.
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
   25. CATEGORY CREATION
========================================================= */

const openNewCategoryModal = () => {
  openModal({
    kicker: "COST POOL",
    title: "Create Cost Category",

    content: `
      <form
        id="category-form"
        class="settings-form"
      >
        <div class="form-field full-width">
          <label for="category-name">
            Category Name
          </label>

          <input
            id="category-name"
            type="text"
            placeholder="Example: Consumables"
            required
          >
        </div>

        <div class="form-field">
          <label for="category-abbreviation">
            Abbreviation
          </label>

          <input
            id="category-abbreviation"
            type="text"
            maxlength="3"
            placeholder="CON"
          >
        </div>

        <div class="form-field">
          <label for="category-color">
            Colour Group
          </label>

          <select id="category-color">
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
    `,

    confirmText: "Create Category",

    confirmHandler: () => {
      const name =
        getElement(
          "#category-name"
        )?.value.trim();

      const abbreviationInput =
        getElement(
          "#category-abbreviation"
        )?.value.trim();

      const colorClass =
        getElement(
          "#category-color"
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
          "A category with this name already exists.",
          "warning"
        );

        return;
      }

      const abbreviation =
        abbreviationInput ||
        name
          .split(/\s+/)
          .map((word) => word[0])
          .join("")
          .slice(0, 3)
          .toUpperCase();

      const newCategory = {
        id: createId("category"),
        name,
        abbreviation,
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
   26. CLEAR COST FILTERS
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

  const searchInput =
    getElement(
      "#cost-pool-search-input"
    );

  const methodFilter =
    getElement(
      "#cost-type-filter"
    );

  const statusFilter =
    getElement(
      "#cost-status-filter"
    );

  const sortFilter =
    getElement(
      "#cost-sort-select"
    );

  if (searchInput) {
    searchInput.value = "";
  }

  if (methodFilter) {
    methodFilter.value = "all";
  }

  if (statusFilter) {
    statusFilter.value = "all";
  }

  if (sortFilter) {
    sortFilter.value =
      "updated-desc";
  }

  renderCostPool();
};

/* =========================================================
   27. COST POOL EVENTS
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
      openNewCategoryModal
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
    getElement("#cost-type-filter"),
    "change",
    (event) => {
      appState.selectedCostMethod =
        event.target.value;

      renderCostCards();
    }
  );

  safeAddEventListener(
    getElement("#cost-status-filter"),
    "change",
    (event) => {
      appState.selectedCostStatus =
        event.target.value;

      renderCostCards();
    }
  );

  safeAddEventListener(
    getElement("#cost-sort-select"),
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
    getElement("#cost-view-toggle"),
    "click",
    () => {
      showToast(
        "List view will be added after the Cost Pool table design is approved."
      );
    }
  );
};

/* =========================================================
   28. PROJECT FILTERS
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
      cardText.includes(searchValue);

    const matchesStatus =
      selectedStatus === "all" ||
      selectedStatus === cardStatus;

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
        "Project list view will be added in the Project milestone."
      );
    }
  );
};

/* =========================================================
   29. SETTINGS PANELS
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
   30. PROJECT PREVIEW
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
   31. BACKUP AND RESTORE
========================================================= */

const createBackupPayload = () => ({
  application:
    "Refurbishment Quote System",

  version:
    "2.0.0-cost-pool",

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
    appState.costItems
});

const downloadJsonFile = (
  data,
  filename
) => {
  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
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

  URL.revokeObjectURL(objectUrl);
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
        "Invalid backup"
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
      Array.isArray(data.costItems)
    ) {
      appState.costItems =
        data.costItems;
    }

    if (data.theme) {
      applyTheme(data.theme);
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
    }

    saveCostPoolData();
    renderCostPool();

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
   32. RESET LOCAL DATA
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
            This will permanently remove saved Cost Pool items,
            custom categories and local settings from this browser.
          </p>
        `,

        confirmText: "Reset Local Data",

        confirmHandler: () => {
          Object.values(
            STORAGE_KEYS
          ).forEach((key) => {
            localStorage.removeItem(key);
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
   33. GENERAL ACTIONS
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
      navigateToPage("settings");
      switchSettingsPanel("company");
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
          exportedAt:
            new Date().toISOString(),

          projects:
            DEMO_PROJECTS,

          costItems:
            appState.costItems
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
        showToast(
          "The full Project Builder will be added in Milestone 4."
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
        navigateToPage("templates");

        showToast(
          "The editable Template Builder will be added next."
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
   34. GLOBAL SEARCH
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
      if (event.key !== "Enter") {
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
          (item) =>
            normalizeSearchValue(
              item.name
            ).includes(value)
        );

      if (matchingCost) {
        navigateToPage("cost-pool");

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
        navigateToPage("projects");

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
        (event.ctrlKey ||
          event.metaKey) &&
        event.key.toLowerCase() === "k";

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
   35. KEYBOARD SHORTCUTS
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
        event.key.toLowerCase() === "s"
      ) {
        event.preventDefault();

        if (
          appState.currentPage ===
          "settings"
        ) {
          saveSettings();
        } else {
          saveCostPoolData();

          showToast(
            "Current browser data was saved."
          );
        }
      }
    }
  );
};

/* =========================================================
   36. APPLICATION INITIALIZATION
========================================================= */

const initializeApplication = () => {
  loadCostPoolData();

  initializeTheme();
  initializeSidebar();
  initializeNavigation();
  initializeModal();

  initializeCostPoolEvents();
  initializeProjectFilters();
  initializeSettings();
  initializeProjectActions();

  initializeBackupActions();
  initializeResetAction();
  initializeGeneralActions();
  initializeGlobalSearch();
  initializeKeyboardShortcuts();

  renderCostPool();

  navigateToPage("dashboard");

  console.info(
    "Refurbishment Quote System Milestone 2 initialized."
  );
};

if (
  document.readyState === "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    initializeApplication
  );
} else {
  initializeApplication();
}
