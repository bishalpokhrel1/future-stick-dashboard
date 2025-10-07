/* future-stick-dashboard - dashboard.js */
// Basic state
const state = {
  theme: 'dark',
  notifications: [],
  charts: {},
};

// Utilities
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
const on = (el, evt, fn) => el && el.addEventListener(evt, fn);
const emit = (name, detail={}) => document.dispatchEvent(new CustomEvent(name, {detail}));

// Sidebar toggle for mobile
function setupSidebarToggle(){
  const sidebar = $('.sidebar');
  const toggleBtn = $('#sidebar-toggle');
  if(!sidebar || !toggleBtn) return;
  on(toggleBtn, 'click', ()=> sidebar.classList.toggle('open'));
}

// Theme toggle
function setupThemeToggle(){
  const btn = $('#theme-toggle');
  if(!btn) return;
  const apply = () => {
    if(state.theme === 'light') document.documentElement.classList.add('light');
    else document.documentElement.classList.remove('light');
  };
  on(btn, 'click', ()=>{
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('fsd-theme', state.theme);
    apply();
  });
  const saved = localStorage.getItem('fsd-theme');
  if(saved) state.theme = saved;
  apply();
}

// Toasts
function showToast(message, opts={}){
  let toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(()=> toast.classList.add('show'));
  setTimeout(()=>{
    toast.classList.remove('show');
    setTimeout(()=> toast.remove(), 250);
  }, opts.duration || 2500);
}

// Drawer (notifications)
function setupDrawer(){
  const drawer = $('#drawer');
  const openBtn = $('#open-drawer');
  const closeBtn = $('#close-drawer');
  if(!drawer) return;
  on(openBtn, 'click', ()=> drawer.classList.add('open'));
  on(closeBtn, 'click', ()=> drawer.classList.remove('open'));
}

// Demo data generator
function randomSeries(n=12, base=50, variance=25){
  const out = [];
  let val = base;
  for(let i=0;i<n;i++){
    val += (Math.random()-.5)*variance;
    out.push(Math.max(0, Math.round(val)));
  }
  return out;
}

// Chart rendering with Chart.js if available
function setupCharts(){
  if(typeof Chart === 'undefined'){
    console.warn('Chart.js not found. Skipping chart render.');
    return;
  }
  const pal = {
    primary: '#22d3ee',
    purple: '#7c3aed',
    green: '#22c55e',
    orange: '#f59e0b',
  };
  const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#94a3b8';

  // Line chart
  const lineEl = $('#chart-line');
  if(lineEl){
    state.charts.line = new Chart(lineEl.getContext('2d'), {
      type: 'line',
      data: {
        labels: Array.from({length:12}, (_,i)=> `M${i+1}`),
        datasets: [{
          label: 'Active Users',
          data: randomSeries(12, 120, 40),
          borderColor: pal.primary,
          backgroundColor: 'rgba(34,211,238,.15)',
          tension: .35, fill:true,
        }]
      },
      options: {
        responsive:true, maintainAspectRatio:false,
        scales: {x: {grid:{color:'transparent'}}, y:{grid:{color:gridColor+'44'}}},
        plugins:{legend:{labels:{color:'#cbd5e1'}}}
      }
    });
  }

  // Bar chart
  const barEl = $('#chart-bar');
  if(barEl){
    state.charts.bar = new Chart(barEl.getContext('2d'),{
      type:'bar',
      data:{
        labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets:[{
          label:'Sessions',
          data: randomSeries(7, 80, 30),
          backgroundColor: pal.purple,
          borderRadius: 8,
        }]
      },
      options:{
        responsive:true, maintainAspectRatio:false,
        scales:{x:{grid:{display:false}}, y:{grid:{color:gridColor+'44'}}},
        plugins:{legend:{labels:{color:'#cbd5e1'}}}
      }
    });
  }

  // Doughnut chart
  const doughnutEl = $('#chart-doughnut');
  if(doughnutEl){
    state.charts.donut = new Chart(doughnutEl.getContext('2d'),{
      type:'doughnut',
      data:{
        labels:['Desktop','Mobile','Tablet'],
        datasets:[{
          data:[58,32,10],
          backgroundColor:[pal.green, pal.primary, pal.orange],
          borderWidth:0,
        }]
      },
      options:{
        responsive:true, maintainAspectRatio:false,
        plugins:{legend:{position:'bottom', labels:{color:'#cbd5e1'}}},
        cutout:'62%'
      }
    });
  }
}

// Dynamic content examples
function renderKPIs(){
  const els = $$('.kpi [data-kpi]');
  els.forEach(el => {
    const key = el.getAttribute('data-kpi');
    const n = Math.round(100 + Math.random()*900);
    el.textContent = key === 'revenue' ? `$${n}k` : n;
  });
}

function renderTable(){
  const tbody = $('#recent-activity');
  if(!tbody) return;
  const items = Array.from({length:6}).map((_,i)=>({
    id: `#${1000+i}`,
    user: ['Alex','Sam','Taylor','Jordan','Riya','Kai'][i%6],
    status: ['success','warn','danger'][i%3],
    amount: (20 + Math.random()*180).toFixed(2),
  }));
  tbody.innerHTML = items.map(it => `
    <tr>
      <td>${it.id}</td>
      <td>${it.user}</td>
      <td><span class="status-dot ${it.status}"></span> ${it.status}</td>
      <td>$${it.amount}</td>
    </tr>
  `).join('');
}

// Search demo
function setupSearch(){
  const input = $('#global-search');
  if(!input) return;
  on(input, 'keydown', (e)=>{
    if(e.key === 'Enter'){
      showToast(`Search: ${input.value}`);
      emit('search', {query: input.value});
    }
  });
}

// Initialization
function init(){
  setupSidebarToggle();
  setupThemeToggle();
  setupDrawer();
  setupSearch();
  renderKPIs();
  renderTable();
  setupCharts();
  showToast('Dashboard ready');
}

document.addEventListener('DOMContentLoaded', init);
