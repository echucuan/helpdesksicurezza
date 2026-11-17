const defaultTickets = [
  { id: 'SIC-0261', store: 'Kelder', branch: 'Casa Blanca', extension: '4346', system: 'Alarma', priority: 'Crítica', status: 'Abierta', owner: 'Sin asignar', date: '16 nov 2026', description: 'EPX fuera de línea, transformador dañado.' },
  { id: 'SIC-0260', store: 'Kelder', branch: 'Cachanilla', extension: '', system: 'Alarma', priority: 'Alta', status: 'En atención', owner: 'Carlos M.', date: '9 feb 2026', description: 'Zona 15 abierta y no permite armar la alarma.' },
  { id: 'SIC-0259', store: 'Columbia', branch: 'San Pedro', extension: '4932', system: 'Alarma', priority: 'Crítica', status: 'Abierta', owner: 'Sin asignar', date: '14 ago 2026', description: 'Contacto de escotilla mal colocado.' },
  { id: 'SIC-0258', store: 'Calzzapato', branch: 'Benito Juárez', extension: '4129', system: 'CCTV', priority: 'Media', status: 'En atención', owner: 'Luis R.', date: '20 jul 2026', description: 'Revisión de grabación y cámaras intermitentes.' },
  { id: 'SIC-0257', store: 'CalzzaSport', branch: 'Sendero', extension: '4228', system: 'Antenas EAS', priority: 'Alta', status: 'Pendiente', owner: 'Sin asignar', date: '18 jul 2026', description: 'Antenas requieren calibración.' },
  { id: 'SIC-0256', store: 'Kelder', branch: 'Cabo Vicario', extension: '4075', system: 'Internet', priority: 'Media', status: 'Resuelta', owner: 'Ana P.', date: '13 jul 2026', description: 'Se instaló módem nuevo y se validó navegación.' },
];

const storageKey = 'sicurezza-tickets';
let tickets = JSON.parse(localStorage.getItem(storageKey) || 'null') || defaultTickets;

const priorityClass = (priority) => ({ 'Crítica': 'critical', 'Alta': 'high', 'Media': 'medium', 'Baja': 'low' }[priority]);
const statusClass = (status) => ({ 'Abierta': 'open', 'En atención': 'progress', 'Pendiente': 'pending', 'Resuelta': 'resolved' }[status]);
const save = () => localStorage.setItem(storageKey, JSON.stringify(tickets));

function renderMetrics() {
  const active = tickets.filter((ticket) => ticket.status !== 'Resuelta');
  document.querySelector('#metric-open').textContent = active.length;
  document.querySelector('#metric-critical').textContent = active.filter((ticket) => ticket.priority === 'Crítica').length;
  document.querySelector('#metric-resolved').textContent = tickets.filter((ticket) => ticket.status === 'Resuelta').length;
  document.querySelector('#open-count').textContent = active.length;
}

function renderTickets() {
  const search = document.querySelector('#search').value.trim().toLowerCase();
  const system = document.querySelector('#system-filter').value;
  const priority = document.querySelector('#priority-filter').value;
  const filtered = tickets.filter((ticket) => {
    const matchesText = [ticket.id, ticket.store, ticket.branch, ticket.description, ticket.extension].join(' ').toLowerCase().includes(search);
    return matchesText && (!system || ticket.system === system) && (!priority || ticket.priority === priority);
  });
  const container = document.querySelector('#ticket-list');
  container.innerHTML = filtered.length ? filtered.map((ticket) => `
    <article class="ticket-card">
      <div class="ticket-main"><div class="ticket-title"><span class="ticket-id">${ticket.id}</span><span class="tag ${priorityClass(ticket.priority)}">${ticket.priority}</span><span class="tag ${statusClass(ticket.status)}">${ticket.status}</span></div><h3>${ticket.store} <span>·</span> ${ticket.branch}</h3><p>${ticket.description}</p><div class="ticket-meta"><span>▣ ${ticket.system}</span>${ticket.extension ? `<span>Ext. ${ticket.extension}</span>` : ''}<span>◷ ${ticket.date}</span></div></div>
      <div class="ticket-owner"><span class="owner-avatar">${ticket.owner === 'Sin asignar' ? '?' : ticket.owner.split(' ').map((part) => part[0]).join('')}</span><small>${ticket.owner}</small><select aria-label="Cambiar estado de ${ticket.id}" data-id="${ticket.id}" class="status-select"><option ${ticket.status === 'Abierta' ? 'selected' : ''}>Abierta</option><option ${ticket.status === 'En atención' ? 'selected' : ''}>En atención</option><option ${ticket.status === 'Pendiente' ? 'selected' : ''}>Pendiente</option><option ${ticket.status === 'Resuelta' ? 'selected' : ''}>Resuelta</option></select></div>
    </article>`).join('') : '<div class="empty-state">No encontramos incidencias con esos filtros.</div>';
  document.querySelectorAll('.status-select').forEach((select) => select.addEventListener('change', (event) => {
    tickets = tickets.map((ticket) => ticket.id === event.target.dataset.id ? { ...ticket, status: event.target.value } : ticket);
    save(); renderAll();
  }));
}

function renderSystemSummary() {
  const systems = ['CCTV', 'Alarma', 'Antenas EAS', 'Internet', 'Botón de pánico'];
  document.querySelector('#system-summary').innerHTML = systems.map((system) => {
    const open = tickets.filter((ticket) => ticket.system === system && ticket.status !== 'Resuelta').length;
    return `<div class="system-row"><span class="system-dot ${system.replaceAll(' ', '-').toLowerCase()}"></span><span>${system}</span><strong>${open}</strong><small>abiertas</small></div>`;
  }).join('');
}

function renderAll() { renderMetrics(); renderTickets(); renderSystemSummary(); }

document.querySelector('#new-ticket').addEventListener('click', () => document.querySelector('#ticket-dialog').showModal());
document.querySelector('#ticket-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  const number = Math.max(...tickets.map((ticket) => Number(ticket.id.replace('SIC-', '')))) + 1;
  tickets.unshift({ id: `SIC-${String(number).padStart(4, '0')}`, store: data.store, branch: data.branch, extension: data.extension, system: data.system, priority: data.priority, owner: data.owner || 'Sin asignar', description: data.description, status: 'Abierta', date: '16 nov 2026' });
  save(); event.target.reset(); document.querySelector('#ticket-dialog').close(); renderAll();
});
['#search', '#system-filter', '#priority-filter'].forEach((selector) => document.querySelector(selector).addEventListener('input', renderTickets));
document.querySelector('#clear-filters').addEventListener('click', () => { document.querySelector('#search').value = ''; document.querySelector('#system-filter').value = ''; document.querySelector('#priority-filter').value = ''; renderTickets(); });
document.querySelector('#connect-drive').addEventListener('click', () => {
  document.querySelector('#sync-message').textContent = 'La conexión requiere configurar OAuth de Google en la API segura del sistema.';
});
document.querySelector('#today').textContent = new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
renderAll();

