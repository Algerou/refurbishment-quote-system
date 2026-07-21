"use strict";

/* =========================================================
   REFURBISHMENT QUOTE SYSTEM
   MILESTONE 1 APPLICATION SCRIPT
========================================================= */

/* =========================================================
   1. APPLICATION CONFIGURATION
========================================================= */

const APP_STORAGE_KEYS = {
  theme: "rqs-theme",
  sidebarCollapsed: "rqs-sidebar-collapsed",
  settings: "rqs-settings",
  demoData: "rqs-demo-data"
};

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
   2. DEMONSTRATION DATA
========================================================= */

const demoData = {
  projects: [
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
  ],

  costItems: [
    {
      id: "cost-operator-labour",
      name: "Operator Labour",
      category: "labour",
      type: "hourly",
      rate: 28
    },
    {
      id: "cost-engineer-labour",
      name: "Engineer Labour",
      category: "labour",
      type: "hourly",
      rate: 38
    },
    {
      id: "cost-qc-labour",
      name: "Quality Control Labour",
      category: "labour",
      type: "hourly",
      rate: 31
    },
    {
      id: "cost-replacement-parts",
      name: "Replacement Parts Allowance",
      category: "parts",
      type: "per-unit",
      rate: 17
    },
    {
      id: "cost-standard-carton",
      name: "Standard Carton",
      category: "packaging",
      type: "per-unit",
      rate: 4.1
    },
    {
      id: "cost-outbound-logistics",
      name: "Outbound Logistics",
      category: "logistics",
      type: "per-unit",
      rate: 9.5
    },
    {
      id: "cost-diagnostic-equipment",
      name: "Diagnostic Equipment",
      category: "equipment",
      type: "fixed",
      rate: 600
    },
    {
      id: "cost-warehouse-allocation",
      name: "Warehouse Allocation",
      category: "overhead",
      type: "fixed",
      rate: 3200
    }
  ],

  templates: [
    {
      id: "template-floor-washer",
      name: "Floor Washer Refurbishment",
      steps: 9
    },
    {
      id: "template-vacuum",
      name: "Vacuum Refurbishment",
      steps: 8
    },
    {
      id: "template-bulk-inspection",
      name: "Bulk Return Inspection",
      steps: 7
    }
  ],

  customers: [
    {
      id: "customer-tineco",
      name: "Tineco"
    },
    {
      id: "customer-dyson",
      name: "Dyson"
    },
    {
      id: "customer-sharkninja",
      name: "SharkNinja"
    },
    {
      id: "customer-northstar",
      name: "Northstar Retail"
    }
  ]
};

/* =========================================================
   3. DOM HELPERS
========================================================= */

const getElement = (selector) => document.querySelector(selector);

const getElements = (selector) =>
  Array.from(document.querySelectorAll(selector));

const safeAddEventListener = (element, eventName, handler) => {
  if (element) {
    element.addEventListener(eventName, handler);
  }
};

const escapeHtml = (value) => {
  const temporaryElement = document.createElement("div");
  temporaryElement.textContent = String(value ?? "");
  return temporaryElement.innerHTML;
};

const normalizeSearchValue = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase();

const formatCurrency = (value, currency = "USD") => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "$0.00";
  }

  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericValue);
};

/* =========================================================
   4. APPLICATION STATE
========================================================= */

const appState = {
  currentPage: "dashboard",
  currentTheme: "dark",
  sidebarCollapsed: false,
  selectedCostCategory: "all",
  selectedProjectStatus: "all",
  currentSettingsPanel: "company",
  modalConfirmHandler: null
};

/* =========================================================
   5. PAGE NAVIGATION
========================================================= */

const closeMobileSidebar = () => {
  document.body.classList.remove("sidebar-open");
};

const updatePageHeader = (pageName) => {
  const pageTitle = getElement("#page-title");
  const pageEyebrow = getElement("#page-eyebrow");
  const pageInfo = PAGE_INFORMATION[pageName];

  if (!pageInfo) {
    return;
  }

  if (pageTitle) {
    pageTitle.textContent = pageInfo.title;
  }

  if (pageEyebrow) {
    pageEyebrow.textContent = pageInfo.eyebrow;
  }

  document.title = `${pageInfo.title} | Refurbishment Quote System`;
};

const navigateToPage = (pageName) => {
  const targetPage = getElement(`[data-page="${pageName}"]`);

  if (!targetPage) {
    showToast(`Page "${pageName}" was not found.`, "error");
    return;
  }

  getElements(".app-page").forEach((page) => {
    page.classList.remove("active");
  });

  targetPage.classList.add("active");

  getElements(".nav-item[data-page-target]").forEach((button) => {
    const buttonPage = button.dataset.pageTarget;
    button.classList.toggle("active", buttonPage === pageName);
  });

  appState.currentPage = pageName;
  updatePageHeader(pageName);
  closeMobileSidebar();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

const initializeNavigation = () => {
  getElements("[data-page-target]").forEach((button) => {
    safeAddEventListener(button, "click", () => {
      navigateToPage(button.dataset.pageTarget);
    });
  });

  safeAddEventListener(getElement("#brand-button"), "click", () => {
    navigateToPage("dashboard");
  });

  safeAddEventListener(
    getElement("#view-all-projects-button"),
    "click",
    () => {
      navigateToPage("projects");
    }
  );
};

/* =========================================================
   6. SIDEBAR
========================================================= */

const applySidebarState = () => {
  document.body.classList.toggle(
    "sidebar-collapsed",
    appState.sidebarCollapsed
  );
};

const toggleSidebarCollapse = () => {
  appState.sidebarCollapsed = !appState.sidebarCollapsed;

  localStorage.setItem(
    APP_STORAGE_KEYS.sidebarCollapsed,
    String(appState.sidebarCollapsed)
  );

  applySidebarState();
};

const initializeSidebar = () => {
  const savedSidebarState =
    localStorage.getItem(APP_STORAGE_KEYS.sidebarCollapsed);

  appState.sidebarCollapsed = savedSidebarState === "true";
  applySidebarState();

  safeAddEventListener(
    getElement("#sidebar-collapse-button"),
    "click",
    () => {
      if (window.innerWidth <= 1000) {
        closeMobileSidebar();
        return;
      }

      toggleSidebarCollapse();
    }
  );

  safeAddEventListener(
    getElement("#mobile-menu-button"),
    "click",
    () => {
      document.body.classList.add("sidebar-open");
    }
  );

  safeAddEventListener(
    getElement("#sidebar-overlay"),
    "click",
    closeMobileSidebar
  );

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
      closeMobileSidebar();
    }
  });
};

/* =========================================================
   7. THEME
========================================================= */

const updateThemeControls = () => {
  const themeIcon = getElement("#theme-toggle-icon");

  if (themeIcon) {
    themeIcon.textContent =
      appState.currentTheme === "dark" ? "☾" : "☀";
  }

  getElements("[data-theme-choice]").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.themeChoice === appState.currentTheme
    );
  });
};

const applyTheme = (themeName, savePreference = true) => {
  const safeTheme = themeName === "light" ? "light" : "dark";

  appState.currentTheme = safeTheme;

  document.body.classList.toggle(
    "light-theme",
    safeTheme === "light"
  );

  if (savePreference) {
    localStorage.setItem(APP_STORAGE_KEYS.theme, safeTheme);
  }

  updateThemeControls();
};

const toggleTheme = () => {
  const nextTheme =
    appState.currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);
  showToast(
    `${nextTheme === "dark" ? "Dark" : "Light"} theme enabled.`
  );
};

const initializeTheme = () => {
  const savedTheme = localStorage.getItem(APP_STORAGE_KEYS.theme);

  applyTheme(savedTheme || "dark", false);

  safeAddEventListener(
    getElement("#theme-toggle-button"),
    "click",
    toggleTheme
  );

  getElements("[data-theme-choice]").forEach((button) => {
    safeAddEventListener(button, "click", () => {
      applyTheme(button.dataset.themeChoice);
      showToast(
        `${
          button.dataset.themeChoice === "dark" ? "Dark" : "Light"
        } theme enabled.`
      );
    });
  });
};

/* =========================================================
   8. TOAST NOTIFICATIONS
========================================================= */

function showToast(message, type = "success", duration = 3200) {
  const toastContainer = getElement("#toast-container");

  if (!toastContainer) {
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

  toastContainer.appendChild(toast);

  window.setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(12px)";

    window.setTimeout(() => {
      toast.remove();
    }, 220);
  }, duration);
}

/* =========================================================
   9. MODAL SYSTEM
========================================================= */

const getModalElements = () => ({
  backdrop: getElement("#modal-backdrop"),
  kicker: getElement("#modal-kicker"),
  title: getElement("#modal-title"),
  body: getElement("#modal-body"),
  confirmButton: getElement("#modal-confirm-button")
});

const openModal = ({
  kicker = "NEW ITEM",
  title = "Dialog",
  content = "",
  confirmText = "Continue",
  confirmHandler = null
}) => {
  const modal = getModalElements();

  if (
    !modal.backdrop ||
    !modal.kicker ||
    !modal.title ||
    !modal.body ||
    !modal.confirmButton
  ) {
    return;
  }

  modal.kicker.textContent = kicker;
  modal.title.textContent = title;
  modal.body.innerHTML = content;
  modal.confirmButton.textContent = confirmText;

  appState.modalConfirmHandler = confirmHandler;

  modal.backdrop.classList.add("active");
  modal.backdrop.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  window.setTimeout(() => {
    const firstInput = modal.body.querySelector(
      "input, select, textarea, button"
    );

    if (firstInput) {
      firstInput.focus();
    }
  }, 50);
};

const closeModal = () => {
  const backdrop = getElement("#modal-backdrop");

  if (!backdrop) {
    return;
  }

  backdrop.classList.remove("active");
  backdrop.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
  appState.modalConfirmHandler = null;
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
      if (event.target.id === "modal-backdrop") {
        closeModal();
      }
    }
  );

  safeAddEventListener(
    getElement("#modal-confirm-button"),
    "click",
    () => {
      if (typeof appState.modalConfirmHandler === "function") {
        appState.modalConfirmHandler();
      }
    }
  );

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
      closeMobileSidebar();
    }
  });
};

/* =========================================================
   10. FORM FIELD TEMPLATES
========================================================= */

const createProjectModalContent = () => `
  <form id="new-project-form" class="settings-form">
    <div class="form-field full-width">
      <label for="new-project-name">Project Name</label>
      <input
        id="new-project-name"
        name="projectName"
        type="text"
        placeholder="Example: Tineco S9 Refurbishment"
        required
      >
    </div>

    <div class="form-field">
      <label for="new-project-customer">Customer</label>
      <input
        id="new-project-customer"
        name="customer"
        type="text"
        placeholder="Customer name"
        required
      >
    </div>

    <div class="form-field">
      <label for="new-project-template">Template</label>
      <select id="new-project-template" name="template">
        <option value="">Blank Project</option>
        <option value="floor-washer">
          Floor Washer Refurbishment
        </option>
        <option value="vacuum">
          Vacuum Refurbishment
        </option>
        <option value="inspection">
          Bulk Return Inspection
        </option>
      </select>
    </div>

    <div class="form-field">
      <label for="new-project-volume">Estimated Volume</label>
      <input
        id="new-project-volume"
        name="volume"
        type="number"
        value="500"
        min="1"
        required
      >
    </div>

    <div class="form-field">
      <label for="new-project-currency">Currency</label>
      <select id="new-project-currency" name="currency">
        <option value="CAD">CAD</option>
        <option value="USD">USD</option>
        <option value="CNY">CNY</option>
      </select>
    </div>

    <div class="form-field full-width">
      <label for="new-project-notes">Project Notes</label>
      <textarea
        id="new-project-notes"
        name="notes"
        rows="3"
        placeholder="Add project requirements or SOP notes"
      ></textarea>
    </div>
  </form>
`;

const createCostItemModalContent = () => `
  <form id="new-cost-item-form" class="settings-form">
    <div class="form-field full-width">
      <label for="new-cost-name">Cost Item Name</label>
      <input
        id="new-cost-name"
        name="costName"
        type="text"
        placeholder="Example: Senior Technician Labour"
        required
      >
    </div>

    <div class="form-field">
      <label for="new-cost-category">Category</label>
      <select id="new-cost-category" name="category">
        <option value="labour">Labour</option>
        <option value="parts">Parts</option>
        <option value="packaging">Packaging</option>
        <option value="logistics">Logistics</option>
        <option value="equipment">Equipment</option>
        <option value="overhead">Overhead</option>
      </select>
    </div>

    <div class="form-field">
      <label for="new-cost-type">Calculation Method</label>
      <select id="new-cost-type" name="type">
        <option value="hourly">Hourly</option>
        <option value="per-unit">Per Unit</option>
        <option value="fixed">Fixed</option>
        <option value="percentage">Percentage</option>
      </select>
    </div>

    <div class="form-field">
      <label for="new-cost-rate">Rate</label>
      <input
        id="new-cost-rate"
        name="rate"
        type="number"
        min="0"
        step="0.01"
        value="0"
        required
      >
    </div>

    <div class="form-field">
      <label for="new-cost-currency">Currency</label>
      <select id="new-cost-currency" name="currency">
        <option value="CAD">CAD</option>
        <option value="USD">USD</option>
        <option value="CNY">CNY</option>
      </select>
    </div>

    <div class="form-field full-width">
      <label for="new-cost-description">Description</label>
      <textarea
        id="new-cost-description"
        name="description"
        rows="3"
        placeholder="Describe when this cost should be used"
      ></textarea>
    </div>
  </form>
`;

const createTemplateModalContent = () => `
  <form id="new-template-form" class="settings-form">
    <div class="form-field full-width">
      <label for="new-template-name">Template Name</label>
      <input
        id="new-template-name"
        name="templateName"
        type="text"
        placeholder="Example: Electronics Refurbishment"
        required
      >
    </div>

    <div class="form-field">
      <label for="new-template-type">Template Type</label>
      <select id="new-template-type" name="templateType">
        <option value="product-refurbishment">
          Product Refurbishment
        </option>
        <option value="inspection-service">
          Inspection Service
        </option>
        <option value="repair-only">
          Repair Only
        </option>
        <option value="custom">Custom</option>
      </select>
    </div>

    <div class="form-field">
      <label for="new-template-start">Starting Point</label>
      <select id="new-template-start" name="startingPoint">
        <option value="blank">Blank Workflow</option>
        <option value="standard">
          Standard Refurbishment Steps
        </option>
        <option value="inspection">
          Inspection Workflow
        </option>
      </select>
    </div>

    <div class="form-field full-width">
      <label for="new-template-description">Description</label>
      <textarea
        id="new-template-description"
        name="description"
        rows="3"
        placeholder="Describe the purpose of this template"
      ></textarea>
    </div>
  </form>
`;

const createCustomerModalContent = () => `
  <form id="new-customer-form" class="settings-form">
    <div class="form-field full-width">
      <label for="new-customer-name">Customer Name</label>
      <input
        id="new-customer-name"
        name="customerName"
        type="text"
        placeholder="Customer or company name"
        required
      >
    </div>

    <div class="form-field">
      <label for="new-customer-contact">Contact Person</label>
      <input
        id="new-customer-contact"
        name="contact"
        type="text"
        placeholder="Contact name"
      >
    </div>

    <div class="form-field">
      <label for="new-customer-email">Email</label>
      <input
        id="new-customer-email"
        name="email"
        type="email"
        placeholder="contact@company.com"
      >
    </div>

    <div class="form-field full-width">
      <label for="new-customer-notes">Notes</label>
      <textarea
        id="new-customer-notes"
        name="notes"
        rows="3"
        placeholder="Customer requirements or account notes"
      ></textarea>
    </div>
  </form>
`;

/* =========================================================
   11. CREATE ACTIONS
========================================================= */

const openNewProjectModal = () => {
  openModal({
    kicker: "NEW PROJECT",
    title: "Create Refurbishment Project",
    content: createProjectModalContent(),
    confirmText: "Create Project",
    confirmHandler: () => {
      const projectName =
        getElement("#new-project-name")?.value.trim();

      const customer =
        getElement("#new-project-customer")?.value.trim();

      if (!projectName || !customer) {
        showToast(
          "Enter both a project name and customer.",
          "warning"
        );
        return;
      }

      closeModal();
      navigateToPage("projects");

      showToast(
        `${projectName} was created as a demonstration project.`
      );
    }
  });
};

const openNewCostItemModal = () => {
  openModal({
    kicker: "COST POOL",
    title: "Add Cost Item",
    content: createCostItemModalContent(),
    confirmText: "Add Cost Item",
    confirmHandler: () => {
      const costName =
        getElement("#new-cost-name")?.value.trim();

      const rate = Number(
        getElement("#new-cost-rate")?.value
      );

      if (!costName) {
        showToast("Enter a cost item name.", "warning");
        return;
      }

      if (!Number.isFinite(rate) || rate < 0) {
        showToast("Enter a valid cost rate.", "warning");
        return;
      }

      closeModal();
      navigateToPage("cost-pool");

      showToast(
        `${costName} was added as a demonstration cost item.`
      );
    }
  });
};

const openNewTemplateModal = () => {
  openModal({
    kicker: "PROCESS TEMPLATE",
    title: "Create Template",
    content: createTemplateModalContent(),
    confirmText: "Create Template",
    confirmHandler: () => {
      const templateName =
        getElement("#new-template-name")?.value.trim();

      if (!templateName) {
        showToast("Enter a template name.", "warning");
        return;
      }

      closeModal();
      navigateToPage("templates");

      showToast(
        `${templateName} was created as a demonstration template.`
      );
    }
  });
};

const openNewCustomerModal = () => {
  openModal({
    kicker: "CUSTOMER DIRECTORY",
    title: "Add Customer",
    content: createCustomerModalContent(),
    confirmText: "Add Customer",
    confirmHandler: () => {
      const customerName =
        getElement("#new-customer-name")?.value.trim();

      if (!customerName) {
        showToast("Enter a customer name.", "warning");
        return;
      }

      closeModal();
      navigateToPage("customers");

      showToast(
        `${customerName} was added as a demonstration customer.`
      );
    }
  });
};

const initializeCreateActions = () => {
  [
    "#new-quote-button",
    "#dashboard-create-quote-button",
    "#quick-new-project-button",
    "#projects-create-project-button"
  ].forEach((selector) => {
    safeAddEventListener(
      getElement(selector),
      "click",
      openNewProjectModal
    );
  });

  [
    "#add-cost-item-button"
  ].forEach((selector) => {
    safeAddEventListener(
      getElement(selector),
      "click",
      openNewCostItemModal
    );
  });

  [
    "#create-template-button",
    "#empty-create-template-button"
  ].forEach((selector) => {
    safeAddEventListener(
      getElement(selector),
      "click",
      openNewTemplateModal
    );
  });

  safeAddEventListener(
    getElement("#add-customer-button"),
    "click",
    openNewCustomerModal
  );

  safeAddEventListener(
    getElement("#add-cost-category-button"),
    "click",
    () => {
      openModal({
        kicker: "COST POOL",
        title: "Create Cost Category",
        content: `
          <div class="form-field">
            <label for="new-category-name">Category Name</label>
            <input
              id="new-category-name"
              type="text"
              placeholder="Example: Consumables"
            >
          </div>
        `,
        confirmText: "Create Category",
        confirmHandler: () => {
          const categoryName =
            getElement("#new-category-name")?.value.trim();

          if (!categoryName) {
            showToast("Enter a category name.", "warning");
            return;
          }

          closeModal();
          showToast(
            `${categoryName} was created as a demonstration category.`
          );
        }
      });
    }
  );
};

/* =========================================================
   12. PROJECT FILTERING
========================================================= */

const filterProjectCards = () => {
  const searchValue = normalizeSearchValue(
    getElement("#project-search-input")?.value
  );

  const selectedStatus =
    getElement("#project-status-filter")?.value || "all";

  const projectCards = getElements("[data-project-card]");

  let visibleCount = 0;

  projectCards.forEach((card) => {
    const cardText = normalizeSearchValue(card.textContent);
    const cardStatus = card.dataset.status || "";

    const matchesSearch =
      !searchValue || cardText.includes(searchValue);

    const matchesStatus =
      selectedStatus === "all" ||
      cardStatus === selectedStatus;

    const shouldShow = matchesSearch && matchesStatus;

    card.classList.toggle("is-hidden", !shouldShow);

    if (shouldShow) {
      visibleCount += 1;
    }
  });

  if (visibleCount === 0) {
    showToast("No projects match the selected filters.", "warning");
  }
};

const sortProjectCards = () => {
  const grid = getElement("#project-card-grid");
  const sortValue =
    getElement("#project-sort-select")?.value;

  if (!grid || !sortValue) {
    return;
  }

  const cards = getElements("[data-project-card]");

  cards.sort((firstCard, secondCard) => {
    const firstName =
      firstCard.querySelector("h3")?.textContent.trim() || "";

    const secondName =
      secondCard.querySelector("h3")?.textContent.trim() || "";

    if (sortValue === "name-asc") {
      return firstName.localeCompare(secondName);
    }

    return 0;
  });

  cards.forEach((card) => {
    grid.appendChild(card);
  });

  if (sortValue !== "name-asc") {
    showToast(
      "Advanced project sorting will be connected in the data milestone."
    );
  }
};

const initializeProjectFilters = () => {
  safeAddEventListener(
    getElement("#project-search-input"),
    "input",
    filterProjectCards
  );

  safeAddEventListener(
    getElement("#project-status-filter"),
    "change",
    filterProjectCards
  );

  safeAddEventListener(
    getElement("#project-sort-select"),
    "change",
    sortProjectCards
  );

  safeAddEventListener(
    getElement("#project-view-toggle"),
    "click",
    () => {
      showToast(
        "List and grid view switching will be added with project storage."
      );
    }
  );
};

/* =========================================================
   13. COST POOL FILTERING
========================================================= */

const filterCostCards = () => {
  const searchValue = normalizeSearchValue(
    getElement("#cost-pool-search-input")?.value
  );

  const selectedType =
    getElement("#cost-type-filter")?.value || "all";

  const selectedCategory =
    appState.selectedCostCategory || "all";

  getElements("[data-cost-card]").forEach((card) => {
    const cardText = normalizeSearchValue(card.textContent);
    const cardCategory = card.dataset.category || "";
    const cardType = card.dataset.costType || "";

    const matchesSearch =
      !searchValue || cardText.includes(searchValue);

    const matchesCategory =
      selectedCategory === "all" ||
      cardCategory === selectedCategory;

    const matchesType =
      selectedType === "all" ||
      cardType === selectedType;

    card.classList.toggle(
      "is-hidden",
      !(matchesSearch && matchesCategory && matchesType)
    );
  });
};

const initializeCostPoolFilters = () => {
  getElements("[data-cost-category]").forEach((button) => {
    safeAddEventListener(button, "click", () => {
      appState.selectedCostCategory =
        button.dataset.costCategory || "all";

      getElements("[data-cost-category]").forEach(
        (categoryButton) => {
          categoryButton.classList.toggle(
            "active",
            categoryButton === button
          );
        }
      );

      filterCostCards();
    });
  });

  safeAddEventListener(
    getElement("#cost-pool-search-input"),
    "input",
    filterCostCards
  );

  safeAddEventListener(
    getElement("#cost-type-filter"),
    "change",
    filterCostCards
  );

  safeAddEventListener(
    getElement("#cost-view-toggle"),
    "click",
    () => {
      showToast(
        "Cost list view will be added in the Cost Pool milestone."
      );
    }
  );

  getElements(".edit-cost-button").forEach((button) => {
    safeAddEventListener(button, "click", () => {
      const costCard = button.closest(".cost-card");
      const costName =
        costCard?.querySelector("h3")?.textContent.trim() ||
        "Cost Item";

      openModal({
        kicker: "COST POOL",
        title: `Edit ${costName}`,
        content: `
          <p>
            Editing and permanently saving Cost Pool items will be
            connected in Milestone 2.
          </p>

          <div class="form-field">
            <label for="demo-cost-name">Cost Item Name</label>
            <input
              id="demo-cost-name"
              type="text"
              value="${escapeHtml(costName)}"
            >
          </div>
        `,
        confirmText: "Save Demo Change",
        confirmHandler: () => {
          closeModal();
          showToast(
            `${costName} demo changes were accepted.`
          );
        }
      });
    });
  });
};

/* =========================================================
   14. CUSTOMER SEARCH
========================================================= */

const initializeCustomerSearch = () => {
  safeAddEventListener(
    getElement("#customer-search-input"),
    "input",
    (event) => {
      const searchValue = normalizeSearchValue(
        event.target.value
      );

      getElements(".customer-card").forEach((card) => {
        const matches = normalizeSearchValue(
          card.textContent
        ).includes(searchValue);

        card.classList.toggle(
          "is-hidden",
          searchValue && !matches
        );
      });
    }
  );
};

/* =========================================================
   15. SETTINGS NAVIGATION
========================================================= */

const switchSettingsPanel = (panelName) => {
  const targetPanel = getElement(
    `[data-settings-content="${panelName}"]`
  );

  if (!targetPanel) {
    return;
  }

  getElements("[data-settings-content]").forEach((panel) => {
    panel.classList.remove("active");
  });

  targetPanel.classList.add("active");

  getElements("[data-settings-panel]").forEach((button) => {
    button.classList.toggle(
      "active",
      button.dataset.settingsPanel === panelName
    );
  });

  appState.currentSettingsPanel = panelName;
};

const collectSettings = () => ({
  companyName:
    getElement("#company-name-input")?.value.trim() || "",
  companyEmail:
    getElement("#company-email-input")?.value.trim() || "",
  companyPhone:
    getElement("#company-phone-input")?.value.trim() || "",
  companyAddress:
    getElement("#company-address-input")?.value.trim() || "",
  defaultCurrency:
    getElement("#default-currency-select")?.value || "CAD",
  quoteValidity:
    Number(getElement("#quote-validity-input")?.value) || 30,
  pricingMethod:
    getElement("#default-pricing-method")?.value || "margin",
  defaultMargin:
    Number(getElement("#default-margin-input")?.value) || 25,
  workingHours:
    Number(getElement("#working-hours-input")?.value) || 8,
  workingDays:
    Number(getElement("#working-days-input")?.value) || 22,
  reworkAllowance:
    Number(getElement("#default-rework-input")?.value) || 2,
  contingency:
    Number(getElement("#default-contingency-input")?.value) || 3
});

const loadSavedSettings = () => {
  const savedSettingsText =
    localStorage.getItem(APP_STORAGE_KEYS.settings);

  if (!savedSettingsText) {
    return;
  }

  try {
    const settings = JSON.parse(savedSettingsText);

    const fieldValues = {
      "#company-name-input": settings.companyName,
      "#company-email-input": settings.companyEmail,
      "#company-phone-input": settings.companyPhone,
      "#company-address-input": settings.companyAddress,
      "#default-currency-select": settings.defaultCurrency,
      "#quote-validity-input": settings.quoteValidity,
      "#default-pricing-method": settings.pricingMethod,
      "#default-margin-input": settings.defaultMargin,
      "#working-hours-input": settings.workingHours,
      "#working-days-input": settings.workingDays,
      "#default-rework-input": settings.reworkAllowance,
      "#default-contingency-input": settings.contingency
    };

    Object.entries(fieldValues).forEach(
      ([selector, value]) => {
        const element = getElement(selector);

        if (
          element &&
          value !== undefined &&
          value !== null
        ) {
          element.value = value;
        }
      }
    );
  } catch (error) {
    console.error("Unable to load saved settings:", error);
  }
};

const saveSettings = () => {
  const settings = collectSettings();

  localStorage.setItem(
    APP_STORAGE_KEYS.settings,
    JSON.stringify(settings)
  );

  showToast("Settings saved on this device.");
};

const initializeSettings = () => {
  getElements("[data-settings-panel]").forEach((button) => {
    safeAddEventListener(button, "click", () => {
      switchSettingsPanel(button.dataset.settingsPanel);
    });
  });

  safeAddEventListener(
    getElement("#save-settings-button"),
    "click",
    saveSettings
  );

  loadSavedSettings();
};

/* =========================================================
   16. PROJECT OPEN ACTIONS
========================================================= */

const openProjectPreview = (projectId) => {
  const project = demoData.projects.find(
    (item) => item.id === projectId
  );

  if (!project) {
    showToast("Project information was not found.", "error");
    return;
  }

  const monthlyValue =
    project.volume * project.unitPrice;

  openModal({
    kicker: "PROJECT PREVIEW",
    title: project.name,
    content: `
      <div class="settings-form">
        <div class="form-field">
          <label>Customer</label>
          <input value="${escapeHtml(project.customer)}" readonly>
        </div>

        <div class="form-field">
          <label>Status</label>
          <input value="${escapeHtml(project.status)}" readonly>
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
            value="${escapeHtml(formatCurrency(project.unitPrice))}"
            readonly
          >
        </div>

        <div class="form-field">
          <label>Margin</label>
          <input value="${project.margin}%" readonly>
        </div>

        <div class="form-field">
          <label>Quoted Value</label>
          <input
            value="${escapeHtml(formatCurrency(monthlyValue))}"
            readonly
          >
        </div>
      </div>

      <p style="margin-top: 18px;">
        The complete project workspace and Cost Canvas will be
        connected in a later milestone.
      </p>
    `,
    confirmText: "Open Projects",
    confirmHandler: () => {
      closeModal();
      navigateToPage("projects");
    }
  });
};

const initializeProjectOpenActions = () => {
  getElements("[data-project-id]").forEach((button) => {
    safeAddEventListener(button, "click", () => {
      openProjectPreview(button.dataset.projectId);
    });
  });
};

/* =========================================================
   17. TEMPLATE ACTIONS
========================================================= */

const initializeTemplateActions = () => {
  getElements(".duplicate-template-button").forEach((button) => {
    safeAddEventListener(button, "click", () => {
      const templateCard = button.closest(".template-card");

      const templateName =
        templateCard?.querySelector("h3")?.textContent.trim() ||
        "Template";

      showToast(`${templateName} was duplicated in demo mode.`);
    });
  });

  getElements(".edit-template-button").forEach((button) => {
    safeAddEventListener(button, "click", () => {
      const templateCard = button.closest(".template-card");

      const templateName =
        templateCard?.querySelector("h3")?.textContent.trim() ||
        "Template";

      openModal({
        kicker: "TEMPLATE EDITOR",
        title: templateName,
        content: `
          <p>
            The full drag-and-drop template editor will be added in
            Milestone 3.
          </p>

          <div class="form-field">
            <label for="demo-template-name">Template Name</label>
            <input
              id="demo-template-name"
              type="text"
              value="${escapeHtml(templateName)}"
            >
          </div>
        `,
        confirmText: "Save Demo Change",
        confirmHandler: () => {
          closeModal();
          showToast(
            `${templateName} demo changes were accepted.`
          );
        }
      });
    });
  });
};

/* =========================================================
   18. GLOBAL SEARCH
========================================================= */

const initializeGlobalSearch = () => {
  const globalSearchInput =
    getElement("#global-search-input");

  safeAddEventListener(
    globalSearchInput,
    "keydown",
    (event) => {
      if (event.key !== "Enter") {
        return;
      }

      const searchValue = normalizeSearchValue(
        globalSearchInput.value
      );

      if (!searchValue) {
        return;
      }

      const matchedProject = demoData.projects.find(
        (project) =>
          normalizeSearchValue(project.name).includes(searchValue) ||
          normalizeSearchValue(project.customer).includes(searchValue)
      );

      const matchedCost = demoData.costItems.find(
        (costItem) =>
          normalizeSearchValue(costItem.name).includes(searchValue)
      );

      const matchedTemplate = demoData.templates.find(
        (template) =>
          normalizeSearchValue(template.name).includes(searchValue)
      );

      if (matchedProject) {
        navigateToPage("projects");

        const projectSearchInput =
          getElement("#project-search-input");

        if (projectSearchInput) {
          projectSearchInput.value = globalSearchInput.value;
          filterProjectCards();
        }

        showToast(`Project result: ${matchedProject.name}`);
        return;
      }

      if (matchedCost) {
        navigateToPage("cost-pool");

        const costSearchInput =
          getElement("#cost-pool-search-input");

        if (costSearchInput) {
          costSearchInput.value = globalSearchInput.value;
          filterCostCards();
        }

        showToast(`Cost result: ${matchedCost.name}`);
        return;
      }

      if (matchedTemplate) {
        navigateToPage("templates");
        showToast(`Template result: ${matchedTemplate.name}`);
        return;
      }

      showToast("No matching project, cost, or template was found.", "warning");
    }
  );

  document.addEventListener("keydown", (event) => {
    const isShortcut =
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "k";

    if (!isShortcut) {
      return;
    }

    event.preventDefault();

    if (globalSearchInput) {
      globalSearchInput.focus();
      globalSearchInput.select();
    }
  });
};

/* =========================================================
   19. BACKUP AND RESTORE
========================================================= */

const createBackupPayload = () => ({
  application: "Refurbishment Quote System",
  version: "1.0.0-milestone-1",
  exportedAt: new Date().toISOString(),
  theme: appState.currentTheme,
  sidebarCollapsed: appState.sidebarCollapsed,
  settings: collectSettings(),
  demoData
});

const downloadJsonFile = (data, filename) => {
  const jsonText = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonText], {
    type: "application/json"
  });

  const temporaryUrl = URL.createObjectURL(blob);
  const downloadLink = document.createElement("a");

  downloadLink.href = temporaryUrl;
  downloadLink.download = filename;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();

  URL.revokeObjectURL(temporaryUrl);
};

const exportBackup = () => {
  const dateText = new Date()
    .toISOString()
    .slice(0, 10);

  downloadJsonFile(
    createBackupPayload(),
    `refurbishment-quote-system-backup-${dateText}.json`
  );

  showToast("Backup file exported.");
};

const importBackupFile = async (file) => {
  if (!file) {
    return;
  }

  try {
    const fileText = await file.text();
    const importedData = JSON.parse(fileText);

    if (
      !importedData ||
      importedData.application !==
        "Refurbishment Quote System"
    ) {
      throw new Error("Invalid backup file.");
    }

    if (importedData.settings) {
      localStorage.setItem(
        APP_STORAGE_KEYS.settings,
        JSON.stringify(importedData.settings)
      );
    }

    if (importedData.theme) {
      localStorage.setItem(
        APP_STORAGE_KEYS.theme,
        importedData.theme
      );
    }

    if (
      typeof importedData.sidebarCollapsed === "boolean"
    ) {
      localStorage.setItem(
        APP_STORAGE_KEYS.sidebarCollapsed,
        String(importedData.sidebarCollapsed)
      );
    }

    showToast(
      "Backup imported. Reload the page to apply all settings."
    );
  } catch (error) {
    console.error("Backup import failed:", error);
    showToast(
      "The selected file is not a valid system backup.",
      "error"
    );
  }
};

const triggerBackupImport = () => {
  const fileInput = getElement("#backup-file-input");

  if (fileInput) {
    fileInput.value = "";
    fileInput.click();
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
      triggerBackupImport
    );
  });

  safeAddEventListener(
    getElement("#backup-file-input"),
    "change",
    (event) => {
      const selectedFile = event.target.files?.[0];
      importBackupFile(selectedFile);
    }
  );
};

/* =========================================================
   20. RESET LOCAL DATA
========================================================= */

const resetLocalData = () => {
  openModal({
    kicker: "DANGER ZONE",
    title: "Reset Local Data",
    content: `
      <p>
        This will remove saved theme, sidebar and settings data
        from this browser.
      </p>

      <p>
        The demonstration information inside the HTML will remain
        available.
      </p>
    `,
    confirmText: "Reset Local Data",
    confirmHandler: () => {
      Object.values(APP_STORAGE_KEYS).forEach((storageKey) => {
        localStorage.removeItem(storageKey);
      });

      closeModal();
      showToast("Local data was reset.", "warning");

      window.setTimeout(() => {
        window.location.reload();
      }, 700);
    }
  });
};

const initializeResetAction = () => {
  safeAddEventListener(
    getElement("#reset-local-data-button"),
    "click",
    resetLocalData
  );
};

/* =========================================================
   21. GENERAL DEMONSTRATION ACTIONS
========================================================= */

const initializeGeneralActions = () => {
  safeAddEventListener(
    getElement("#notification-button"),
    "click",
    () => {
      showToast("You have no new critical notifications.");
    }
  );

  safeAddEventListener(
    getElement("#user-profile-button"),
    "click",
    () => {
      navigateToPage("settings");
      switchSettingsPanel("company");
    }
  );

  safeAddEventListener(
    getElement("#export-report-button"),
    "click",
    () => {
      const reportData = {
        exportedAt: new Date().toISOString(),
        projects: demoData.projects,
        totalQuotedValue: 148600,
        averageMargin: 27.4
      };

      downloadJsonFile(
        reportData,
        "refurbishment-report.json"
      );

      showToast("Report data exported.");
    }
  );

  safeAddEventListener(
    getElement("#dashboard-cost-project-select"),
    "change",
    (event) => {
      const selectedProject = demoData.projects.find(
        (project) => project.id === event.target.value
      );

      if (selectedProject) {
        showToast(
          `Cost preview changed to ${selectedProject.name}.`
        );
      }
    }
  );

  getElements(".row-menu-button").forEach((button) => {
    safeAddEventListener(button, "click", (event) => {
      event.stopPropagation();
      showToast(
        "Additional item actions will be added in the next milestone."
      );
    });
  });
};

/* =========================================================
   22. KEYBOARD SHORTCUTS
========================================================= */

const initializeKeyboardShortcuts = () => {
  document.addEventListener("keydown", (event) => {
    const targetTag =
      event.target?.tagName?.toLowerCase();

    const isTyping =
      targetTag === "input" ||
      targetTag === "textarea" ||
      targetTag === "select";

    if (isTyping) {
      return;
    }

    const commandKey = event.ctrlKey || event.metaKey;

    if (commandKey && event.key.toLowerCase() === "n") {
      event.preventDefault();
      openNewProjectModal();
    }

    if (commandKey && event.key.toLowerCase() === "s") {
      event.preventDefault();

      if (appState.currentPage === "settings") {
        saveSettings();
      } else {
        showToast(
          "Current work is stored in demonstration mode."
        );
      }
    }
  });
};

/* =========================================================
   23. APPLICATION INITIALIZATION
========================================================= */

const initializeApplication = () => {
  initializeTheme();
  initializeSidebar();
  initializeNavigation();
  initializeModal();
  initializeCreateActions();
  initializeProjectFilters();
  initializeCostPoolFilters();
  initializeCustomerSearch();
  initializeSettings();
  initializeProjectOpenActions();
  initializeTemplateActions();
  initializeGlobalSearch();
  initializeBackupActions();
  initializeResetAction();
  initializeGeneralActions();
  initializeKeyboardShortcuts();

  navigateToPage("dashboard");

  console.info(
    "Refurbishment Quote System Milestone 1 initialized."
  );
};

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    initializeApplication
  );
} else {
  initializeApplication();
}
