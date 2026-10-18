/* Progressive enhancements for the fictional NODE-01 preview. No data leaves this page. */
(() => {
  'use strict';

  // Follow the WAI-ARIA tab pattern, including roving focus and arrow keys.
  const tabs = [...document.querySelectorAll('.dashboard-tab')];
  function selectTab(tab, moveFocus = false) {
    tabs.forEach((item) => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
    });
    if (moveFocus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (event) => {
      let next = null;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== null) {
        event.preventDefault();
        selectTab(tabs[next], true);
      }
    });
  });

  const sites = {
    A: { name: 'Site-A', facility: 'North Relay', status: 'Nominal', gateway: '1', heartbeat: '12:04:14 UTC', redundancy: 'Backup ready', incidents: '0', route: 'Primary path', incident: 'No open incidents. The primary uplink is operating normally and the redundant route is available. Last health check completed at 12:03:00 UTC.' },
    B: { name: 'Site-B', facility: 'Data Hall', status: 'Nominal', gateway: '1', heartbeat: '12:04:13 UTC', redundancy: 'Backup ready', incidents: '0', route: 'Primary path', incident: 'No open incidents. Device signals and link checks are within their expected sample ranges. The scheduled health check passed at 11:32:00 UTC.' },
    C: { name: 'Site-C', facility: 'Substation', status: 'Failover active', gateway: '2', heartbeat: '12:04:11 UTC', redundancy: 'Secondary path', incidents: '1', route: 'Secondary path', incident: 'INC-0042 · Primary link lost at 12:04:08 UTC. Gateway 2 confirmed the secondary route at 12:04:11 UTC. Buffered signals remain available while the primary link is investigated.' },
    D: { name: 'Site-D', facility: 'Remote Depot', status: 'Offline', gateway: '2', heartbeat: '11:48:06 UTC', redundancy: 'Unavailable', incidents: '1', route: 'No active path', incident: 'INC-0041 · Scheduled heartbeats have not been received since 11:48:06 UTC. Both routes are unavailable in this example. Historical signals remain available for review.' }
  };
  let selectedSite = 'C';
  const diagramSites = [...document.querySelectorAll('.diagram-site')];
  const detailFields = { 'node-status': 'status', 'node-heartbeat': 'heartbeat', 'node-redundancy': 'redundancy', 'node-incidents': 'incidents' };
  function selectSite(key) {
    const site = sites[key];
    if (!site) return;
    selectedSite = key;
    diagramSites.forEach((node) => {
      const active = node.dataset.site === key;
      node.classList.toggle('is-selected', active);
      node.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-site-path]').forEach((path) => path.classList.toggle('is-selected', path.dataset.sitePath === key));
    document.querySelectorAll('[data-gateway]').forEach((path) => path.classList.toggle('is-selected', path.dataset.gateway === site.gateway));
    document.getElementById('selected-node-name').textContent = site.name;
    document.getElementById('selected-node-facility').textContent = site.facility;
    document.getElementById('node-uplink').textContent = `Gateway ${site.gateway}`;
    Object.entries(detailFields).forEach(([id, property]) => { document.getElementById(id).textContent = site[property]; });
  }
  diagramSites.forEach((node) => {
    node.addEventListener('click', () => selectSite(node.dataset.site));
    node.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectSite(node.dataset.site);
      }
    });
  });

  // Native dialog supplies Escape handling and modal focus containment.
  const modal = document.getElementById('node-modal');
  const modalTrigger = document.getElementById('node-detail-trigger');
  let modalOpener = null;
  modalTrigger.addEventListener('click', () => {
    const site = sites[selectedSite];
    document.getElementById('node-modal-title').textContent = `${site.name} / ${site.facility}`;
    document.getElementById('modal-node-context').textContent = site.incident;
    const facts = [ ['Status', site.status], ['Uplink', `Gateway ${site.gateway}`], ['Active route', site.route], ['Last heartbeat', site.heartbeat], ['Redundancy', site.redundancy], ['Open incidents', site.incidents] ];
    const factList = document.getElementById('modal-node-facts');
    factList.replaceChildren(...facts.map(([label, value]) => {
      const row = document.createElement('div');
      const term = document.createElement('dt');
      const description = document.createElement('dd');
      term.textContent = label;
      description.textContent = value;
      row.append(term, description);
      return row;
    }));
    modalOpener = document.activeElement;
    modal.showModal();
  });
  document.getElementById('node-modal-close').addEventListener('click', () => modal.close());
  modal.addEventListener('close', () => { if (modalOpener?.isConnected) modalOpener.focus(); });
  modal.addEventListener('click', (event) => {
    if (event.target !== modal) return;
    const bounds = modal.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) modal.close();
  });

  const form = document.getElementById('inquiry-form');
  const steps = [...form.querySelectorAll('.inquiry-step')];
  const progress = [...document.querySelectorAll('.inquiry-steps li')];
  const error = document.getElementById('form-error');
  const completion = document.getElementById('inquiry-complete');
  const sitesField = document.getElementById('sites-field');
  const environmentField = document.getElementById('environment-field');
  const siteCount = document.getElementById('sites');
  const environment = document.getElementById('environment');
  let currentStep = 0;

  // Keep the three groups visible; only inapplicable conditional fields are disabled.
  function updateConditionalFields(announce = false) {
    const type = form.elements.deployment.value;
    const multipleSites = type === 'multi' || type === 'hybrid';
    const hybrid = type === 'hybrid';
    sitesField.hidden = !multipleSites;
    environmentField.hidden = !hybrid;
    siteCount.required = multipleSites;
    environment.required = hybrid;
    siteCount.disabled = !multipleSites;
    environment.disabled = !hybrid;
    if (!multipleSites) siteCount.removeAttribute('aria-invalid');
    if (!hybrid) environment.removeAttribute('aria-invalid');
    if (announce) {
      document.getElementById('deployment-update').textContent = hybrid
        ? 'Hybrid deployment selected. Deployment environment, number of sites, and monitoring concerns are required.'
        : multipleSites ? 'Multi-site deployment selected. Number of sites and monitoring concerns are required.'
          : 'Single site selected. Only monitoring concerns are required.';
    }
  }

  function showStep(index, focus = true) {
    currentStep = index;
    progress.forEach((item, position) => {
      if (position === index) item.setAttribute('aria-current', 'step');
      else item.removeAttribute('aria-current');
      const fields = [...steps[position].querySelectorAll('input, select, textarea')].filter((field) => !field.disabled);
      item.classList.toggle('is-complete', position < index && fields.every((field) => field.validity.valid && (!field.required || field.value.trim())));
    });
    document.getElementById('form-step-count').textContent = `Step 0${index + 1} / 03 · ${['Organization', 'Deployment', 'Contact'][index]}`;
    if (focus) {
      const first = steps[index].querySelector('input:checked') || steps[index].querySelector('input:not(:disabled), select:not(:disabled), textarea:not(:disabled)');
      first?.focus();
    }
  }

  function validateStep(index) {
    const fields = [...steps[index].querySelectorAll('input, select, textarea')].filter((field) => !field.disabled);
    let invalid = null;
    fields.forEach((field) => {
      // Native required accepts whitespace, so require meaningful organization/concern text.
      if (['organization', 'concerns'].includes(field.id)) field.setCustomValidity(field.value.trim() ? '' : 'Please enter a value for this field.');
      const valid = field.checkValidity();
      field.toggleAttribute('aria-invalid', !valid);
      if (!valid) field.setAttribute('aria-invalid', 'true');
      if (!valid && !invalid) invalid = field;
    });
    if (!invalid) {
      error.hidden = true;
      error.textContent = '';
      return true;
    }
    const label = form.querySelector(`label[for="${invalid.id}"]`)?.textContent.trim() || 'the required field';
    error.textContent = `Please check ${label.toLowerCase()}. ${invalid.validationMessage}`;
    error.hidden = false;
    invalid.focus();
    invalid.reportValidity();
    return false;
  }

  form.classList.add('is-enhanced');
  // The compact, continuous form uses native constraints with one announced error.
  form.noValidate = true;
  updateConditionalFields();
  showStep(0, false);
  document.querySelectorAll('[data-step-target]').forEach((button) => button.addEventListener('click', () => {
    const target = Number(button.dataset.stepTarget);
    if (form.hidden) return;
    if (target > currentStep) {
      for (let index = 0; index < target; index += 1) {
        if (!validateStep(index)) return;
      }
    }
    error.hidden = true;
    error.textContent = '';
    showStep(target);
  }));
  form.addEventListener('focusin', (event) => {
    const group = event.target.closest('.inquiry-step');
    if (group) showStep(Number(group.dataset.step), false);
  });
  form.querySelectorAll('input[name="deployment"]').forEach((radio) => radio.addEventListener('change', () => updateConditionalFields(true)));
  form.addEventListener('input', (event) => {
    const field = event.target;
    if (!(field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement)) return;
    field.setCustomValidity('');
    if (field.validity.valid) field.removeAttribute('aria-invalid');
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Validate every applicable group, including fields edited after moving onward.
    for (let index = 0; index < 3; index += 1) {
      if (!validateStep(index)) return;
    }
    form.hidden = true;
    completion.hidden = false;
    progress.forEach((item) => { item.classList.add('is-complete'); item.removeAttribute('aria-current'); });
    completion.focus({ preventScroll: true });
  });
  // The source default remains disabled so a no-JS visit cannot submit form values.
  form.querySelector('[type="submit"]').disabled = false;
  document.getElementById('inquiry-restart').addEventListener('click', () => {
    form.reset();
    form.querySelectorAll('[aria-invalid]').forEach((field) => field.removeAttribute('aria-invalid'));
    form.querySelectorAll('input, textarea, select').forEach((field) => field.setCustomValidity(''));
    completion.hidden = true;
    form.hidden = false;
    error.hidden = true;
    error.textContent = '';
    form.querySelector('.optional-message').open = false;
    updateConditionalFields();
    showStep(0);
  });
})();
