/* =====================================================================
   UMS · Unified Management System — dashboard logic
   - All dashboard data lives in DATA (top of file)
   - Inline stroke icons (ICONS), SVG charts, procedural live map
   - Interactions: sidebar collapse, theme toggle, map zoom/fullscreen,
     chart tooltips, quick-action toasts
   ===================================================================== */
'use strict';

/* ------------------------------------------------------------------ */
/* Icons (24px stroke grid)                                            */
/* ------------------------------------------------------------------ */
const ICONS = {
  'menu': '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
  'search': '<circle cx="11" cy="11" r="7.5"/><path d="m20.5 20.5-4.2-4.2"/>',
  'bell': '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  'mail': '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  'calendar': '<path d="M8 2v4"/><path d="M16 2v4"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M3 10h18"/>',
  'maximize': '<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  'plus': '<path d="M5 12h14"/><path d="M12 5v14"/>',
  'minus': '<path d="M5 12h14"/>',
  'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  'moon': '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  'check': '<path d="M20 6 9 17l-5-5"/>',
  'arrow-up': '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
  'arrow-down': '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',

  'dashboard': '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  'gauge': '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  'truck': '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
  'van': '<path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C21.1 6.8 20.4 6 19.5 6H4.5c-.9 0-1.6.8-1.9 1.8l-1.4 5c-.1.4-.2.8-.2 1.2 0 .4.1.8.2 1.2C1.5 16.3 2 18 2 18h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h6"/><circle cx="17" cy="18" r="2"/>',
  'car': '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  'user': '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  'route': '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  'map-pin': '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  'wrench': '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  'fuel': '<path d="M3 22h12"/><path d="M4 9h10"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
  'alert': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  'package': '<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  'boxes': '<rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
  'inbound': '<path d="M12 17V3"/><path d="m6 11 6 6 6-6"/><path d="M19 21H5"/>',
  'outbound': '<path d="m18 9-6-6-6 6"/><path d="M12 3v14"/><path d="M5 21h14"/>',
  'warehouse': '<path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/><path d="M6 22v-12h12v12"/>',
  'factory': '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>',
  'building': '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>',
  'home': '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  'file-chart': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 18v-2"/><path d="M12 18v-4"/><path d="M16 18v-6"/>',
  'credit-card': '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
  'bar-chart': '<path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/>',
  'settings': '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
  'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  'power': '<path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.77.04"/>',
  'flame': '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  'mouse': '<rect x="5" y="2" width="14" height="20" rx="7"/><path d="M12 6v4"/>',
  'usb': '<circle cx="10" cy="7" r="1"/><circle cx="4" cy="20" r="1"/><path d="M4.7 19.3 19 5"/><path d="m21 3-3 1 2 2Z"/><path d="M9.26 7.68 5 12l2 5"/><path d="m10 14 5 2 3.5-3.5"/><path d="m18 12 1-1 1 1-1 1Z"/>',
  'chair': '<path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z"/><path d="M5 18v2"/><path d="M19 18v2"/>',
  'file': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
  'key': '<path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/><path d="m21 2-9.6 9.6"/><circle cx="7.5" cy="15.5" r="5.5"/>',
  'percent': '<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
};

function icon(name, size = 16, cls = '') {
  const body = ICONS[name] || ICONS['gauge'];
  return `<svg class="ic ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */
const DATA = {
  nav: {
    groups: [
      { id: 'fleet', label: 'Fleet Management', color: 'blue', items: [
        ['Overview', 'gauge'], ['Vehicles', 'truck'], ['Drivers', 'users'], ['Trips', 'route'],
        ['Locations', 'map-pin'], ['Maintenance', 'wrench'], ['Fuel Management', 'fuel'], ['Alerts', 'alert'],
      ]},
      { id: 'warehouse', label: 'Warehouse Management', color: 'orange', items: [
        ['Overview', 'gauge'], ['Inventory', 'boxes'], ['Inbound', 'inbound'], ['Outbound', 'outbound'],
        ['Warehouse', 'warehouse'], ['Suppliers', 'factory'], ['Alerts', 'alert'],
      ]},
      { id: 'realestate', label: 'Real Estate Management', color: 'green', items: [
        ['Overview', 'gauge'], ['Properties', 'building'], ['Tenants', 'user'], ['Leases', 'file-text'],
        ['Maintenance', 'wrench'], ['Payments', 'credit-card'], ['Alerts', 'alert'],
      ]},
    ],
    bottom: [['Reports', 'bar-chart'], ['Notifications', 'bell', 12], ['Settings', 'settings']],
  },

  overview: [
    { sys: 'fleet', color: 'blue', icon: 'truck', title: 'Fleet Overview', kpis: [
      ['Total Vehicles', '128'], ['Active Vehicles', '98'], ['Drivers', '72'], ['Trips (This Week)', '156'], ['Maintenance Due', '8'],
    ]},
    { sys: 'warehouse', color: 'orange', icon: 'package', title: 'Warehouse Overview', kpis: [
      ['Total SKUs', '2,450'], ['In Stock', '1,450'], ['Low Stock', '450'], ['Out of Stock', '250'], ['Inbound Orders', '28'], ['Outbound Orders', '34'],
    ]},
    { sys: 'realestate', color: 'green', icon: 'building', title: 'Real Estate Overview', kpis: [
      ['Total Properties', '42'], ['Occupied', '31'], ['Vacant', '11'], ['Occupancy Rate', '73.8%'], ['Active Leases', '56'],
    ]},
  ],

  vehicleStatus: [
    { label: 'On Road', value: 70, color: 'var(--green-chart)', tone: 'green', icon: 'car' },
    { label: 'Idle', value: 28, color: 'var(--blue-chart)', tone: 'blue', icon: 'clock' },
    { label: 'In Maintenance', value: 20, color: 'var(--amber-chart)', tone: 'amber', icon: 'wrench' },
    { label: 'Inactive', value: 10, color: 'var(--red-chart)', tone: 'red', icon: 'power' },
  ],

  recentTrips: [
    { id: 'TRK-1024', icon: 'truck', from: 'New York', to: 'Boston', status: 'On Road', tone: 'green' },
    { id: 'TRK-1003', icon: 'car', from: 'Chicago', to: 'Detroit', status: 'In Transit', tone: 'blue' },
    { id: 'TRK-1006', icon: 'van', from: 'Houston', to: 'Dallas', status: 'Idle', tone: 'gray' },
    { id: 'TRK-1008', icon: 'truck', from: 'Los Angeles', to: 'Las Vegas', status: 'In Maintenance', tone: 'amber' },
    { id: 'TRK-1011', icon: 'truck', from: 'Miami', to: 'Orlando', status: 'On Road', tone: 'green' },
  ],

  map: {
    places: [
      { id: 'north', name: 'North Depot', x: .14, y: .19, kind: 'depot', color: 'blue', icon: 'warehouse' },
      { id: 'south', name: 'South Depot', x: .32, y: .83, kind: 'depot', color: 'blue', icon: 'warehouse' },
      { id: 'cw', name: 'Central Warehouse', x: .56, y: .54, kind: 'depot', color: 'orange', icon: 'package' },
      { id: 'cust', name: 'Customer Site', x: .64, y: .86, kind: 'site', color: 'green', icon: 'map-pin' },
    ],
    vehicles: [
      { id: 'TRK-1024', type: 'Truck', icon: 'truck', x: .38, y: .30, note: '80 km/h', color: 'blue', moving: true,
        route: [[.38, .30], [.30, .30], [.30, .19], [.14, .19]] },
      { id: 'TRK-1006', type: 'Van', icon: 'van', x: .82, y: .42, note: '45 km/h', color: 'purple', moving: true, side: 'left',
        route: [[.82, .42], [.70, .42], [.70, .54], [.56, .54]] },
      { id: 'TRK-1008', type: 'Truck', icon: 'truck', x: .15, y: .58, note: 'In Maintenance', warn: true, color: 'orange', moving: false,
        route: [[.15, .58], [.15, .72], [.32, .72], [.32, .83]] },
      { id: 'TRK-1003', type: 'Car', icon: 'car', x: .86, y: .70, note: '60 km/h', color: 'green', moving: true, side: 'left',
        route: [[.86, .70], [.86, .86], [.64, .86]] },
    ],
  },

  inventory: [
    { label: 'In Stock', value: 1450, color: 'var(--green-chart)' },
    { label: 'Low Stock', value: 450, color: 'var(--amber-chart)' },
    { label: 'Out of Stock', value: 250, color: 'var(--red-chart)' },
    { label: 'On Order', value: 300, color: 'var(--blue-chart)' },
  ],
  lowStock: [
    { name: 'Wireless Mouse', sku: 'WM-101', stock: 15, level: 'low', icon: 'mouse' },
    { name: 'USB Cable', sku: 'UC-205', stock: 18, level: 'low', icon: 'usb' },
    { name: 'Office Chair', sku: 'OC-301', stock: 10, level: 'critical', icon: 'chair' },
    { name: 'A4 Paper', sku: 'AP-404', stock: 20, level: 'low', icon: 'file' },
  ],

  property: [
    { label: 'Occupied', value: 31, color: 'var(--green-chart)' },
    { label: 'Vacant', value: 11, color: 'var(--vacant)' },
  ],
  leases: [
    { property: 'Sunset Apartments', tenant: 'John Smith', date: 'Jun 15, 2024', days: 15, tone: 'red', thumb: 'apartments' },
    { property: 'Downtown Office Space', tenant: 'ABC Corp', date: 'Jun 28, 2024', days: 28, tone: 'amber', thumb: 'office' },
    { property: 'Greenview Commercial', tenant: 'XYZ Ltd.', date: 'Jul 10, 2024', days: 40, tone: 'green', thumb: 'commercial' },
  ],

  charts: {
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    trips: [18, 26, 22, 30, 24, 20, 16],
    fuel: [420, 610, 520, 700, 560, 470, 380],
    inbound: [32, 45, 38, 50, 42, 30, 20],
    outbound: [28, 40, 35, 44, 48, 36, 24],
    months: ['Jun 2024', 'Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024'],
    expiry: [3, 5, 4, 7, 9, 12],
  },

  alerts: [
    { text: 'Vehicle TRK-1024 maintenance is due', time: 'Today, 09:30 AM', level: 'High', tone: 'red', icon: 'wrench' },
    { text: 'High fuel consumption detected in TRK-1003', time: 'Today, 08:15 AM', level: 'Medium', tone: 'amber', icon: 'flame' },
    { text: 'Driver John Doe exceeded speed limit', time: 'May 18, 04:25 PM', level: 'Medium', tone: 'purple', icon: 'gauge' },
    { text: 'Trip delay: Delivery to New York', time: 'May 18, 03:10 PM', level: 'Low', tone: 'blue', icon: 'clock' },
  ],

  financial: [
    { label: 'Total Revenue', value: '$125,430', delta: '+12.5%', dir: 'up', color: 'var(--blue)', spark: [40, 42, 45, 43, 48, 52, 50, 55, 58, 57, 62, 68] },
    { label: 'Total Expenses', value: '$75,230', delta: '-8.3%', dir: 'down', color: 'var(--purple)', spark: [50, 48, 52, 49, 47, 50, 46, 44, 45, 42, 40, 38] },
    { label: 'Total Profit', value: '$50,200', delta: '+18.7%', dir: 'up', color: 'var(--green-chart)', spark: [20, 22, 21, 25, 27, 26, 30, 33, 32, 36, 38, 42] },
    { label: 'Total Savings', value: '$12,340', delta: '+9.4%', dir: 'up', color: 'var(--orange)', spark: [10, 11, 13, 12, 14, 15, 14, 17, 18, 20, 19, 22] },
  ],

  quickActions: [
    ['Add Vehicle', 'truck', 'blue'], ['Add New Product', 'package', 'orange'], ['Add Property', 'building', 'green'],
    ['Add Lease', 'file-text', 'purple'], ['Add Maintenance', 'wrench', 'cyan'], ['Generate Report', 'file-chart', 'pink'],
  ],
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const $ = (sel, root = document) => root.querySelector(sel);
const fmt = (n) => n.toLocaleString('en-US');
const pct = (v, t, d = 1) => (v / t * 100).toFixed(d) + '%';
const sum = (arr) => arr.reduce((a, b) => a + b, 0);
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function roundedTopRect(x, y, w, h, r) {
  r = Math.min(r, h / 2, w / 2);
  if (h <= 0) return '';
  return `M${x} ${y + r} a${r} ${r} 0 0 1 ${r} -${r} h${w - 2 * r} a${r} ${r} 0 0 1 ${r} ${r} v${h - r} h${-w} z`;
}
function tip(lines) { return lines.join('|').replace(/"/g, '&quot;'); }

/* Replace every [data-icon] placeholder with an inline SVG */
function hydrateIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach((node) => {
    const size = Number(node.dataset.size || 18);
    node.insertAdjacentHTML('afterbegin', icon(node.dataset.icon, size));
    node.removeAttribute('data-icon');
  });
}

/* ------------------------------------------------------------------ */
/* Sidebar                                                             */
/* ------------------------------------------------------------------ */
function renderNav() {
  const nav = $('#nav');
  let html = `<button class="nav-item dashboard active">${icon('dashboard', 17)}<span>Dashboard</span></button>`;
  DATA.nav.groups.forEach((g) => {
    html += `<div class="nav-group" data-color="${g.color}" data-group="${g.id}">
      <button class="nav-group-head" aria-expanded="true"><span>${g.label}</span>${icon('chevron-down', 14, 'chev')}</button>
      <div class="nav-group-items">
        ${g.items.map(([label, ic]) => `<button class="nav-item">${icon(ic, 16)}<span>${label}</span></button>`).join('')}
      </div>
    </div>`;
  });
  html += `<div class="nav-divider"></div>`;
  html += DATA.nav.bottom.map(([label, ic, badge]) =>
    `<button class="nav-item">${icon(ic, 16)}<span>${label}</span>${badge ? `<span class="nav-badge">${badge}</span>` : ''}</button>`
  ).join('');
  nav.innerHTML = html;

  nav.addEventListener('click', (e) => {
    const head = e.target.closest('.nav-group-head');
    if (head) {
      const group = head.parentElement;
      group.classList.toggle('collapsed');
      head.setAttribute('aria-expanded', String(!group.classList.contains('collapsed')));
      return;
    }
    const item = e.target.closest('.nav-item');
    if (item) {
      nav.querySelectorAll('.nav-item.active').forEach((n) => n.classList.remove('active'));
      item.classList.add('active');
    }
  });
}

/* ------------------------------------------------------------------ */
/* Section 1 — overview                                                */
/* ------------------------------------------------------------------ */
function renderOverview() {
  $('#overview').innerHTML = DATA.overview.map((c) => `
    <article class="card overview-card" data-sys="${c.sys}">
      <div class="card-head">
        <div class="card-title"><span class="sys-icon ${c.color}">${icon(c.icon, 14)}</span>${c.title}</div>
        <a href="#" class="link">View All</a>
      </div>
      <div class="kpi-row">
        ${c.kpis.map(([label, value]) => `<div class="kpi"><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div></div>`).join('')}
      </div>
    </article>`).join('');
}

/* ------------------------------------------------------------------ */
/* Donut                                                               */
/* ------------------------------------------------------------------ */
function donutSVG(segs, { size = 96, stroke = 12, value, label }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const total = sum(segs.map((s) => s.value));
  const gap = 2.5;
  let offset = 0;
  const arcs = segs.map((s) => {
    const len = c * s.value / total;
    const dash = Math.max(len - gap, 0.5);
    const out = `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${s.color}" stroke-width="${stroke}"
      stroke-dasharray="${dash} ${c - dash}" stroke-dashoffset="${-(offset + gap / 2)}" data-tip="${tip([s.label, `${fmt(s.value)} · ${pct(s.value, total)}`])}"></circle>`;
    offset += len;
    return out;
  }).join('');
  return `<svg class="donut" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="var(--grid)" stroke-width="${stroke}"></circle>
    <g transform="rotate(-90 ${size / 2} ${size / 2})">${arcs}</g>
    <g class="donut-center">
      <text x="${size / 2}" y="${size / 2 - 1}" class="dv">${value}</text>
      <text x="${size / 2}" y="${size / 2 + 11}" class="dl">${label}</text>
    </g>
  </svg>`;
}
function legendRows(segs, { showPct = true } = {}) {
  const total = sum(segs.map((s) => s.value));
  return segs.map((s) => `<div class="lg-row">
    <span class="lg-dot" style="background:${s.color}"></span>
    <span class="lg-label">${s.label}</span>
    <span class="lg-value">${fmt(s.value)}${showPct ? `<small>(${pct(s.value, total)})</small>` : ''}</span>
  </div>`).join('');
}

/* ------------------------------------------------------------------ */
/* Section 2 — map card                                                */
/* ------------------------------------------------------------------ */
let mapZoomLevel = 1;

function renderMap() {
  const host = $('#mapCanvas');
  const W = host.clientWidth || 460;
  const H = host.clientHeight || 280;
  const rnd = mulberry32(2024);
  const cx = W / 2, cy = H / 2;
  const angle = -8;
  const pad = 140;
  const sx = 42, sy = 36;
  const x0 = -pad, x1 = W + pad, y0 = -pad, y1 = H + pad;

  let blocks = '', minor = '', major = '', parks = '';
  const cols = Math.ceil((x1 - x0) / sx), rows = Math.ceil((y1 - y0) / sy);

  // city blocks (subtle texture) + two parks
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = x0 + i * sx, y = y0 + j * sy;
      if (rnd() < 0.42) blocks += `<rect x="${x + 3}" y="${y + 3}" width="${sx - 6}" height="${sy - 6}" rx="1.5"/>`;
    }
  }
  const parkCells = [[Math.round(cols * 0.28), Math.round(rows * 0.58), 2, 2], [Math.round(cols * 0.72), Math.round(rows * 0.2), 2, 1]];
  parkCells.forEach(([i, j, w, h]) => {
    parks += `<rect x="${x0 + i * sx + 3}" y="${y0 + j * sy + 3}" width="${w * sx - 6}" height="${h * sy - 6}" rx="3"/>`;
  });
  // streets
  for (let i = 0; i < cols; i++) {
    const x = x0 + i * sx;
    (i % 4 === 2 ? major : minor);
    if (i % 4 === 2) major += `M${x} ${y0}V${y1}`; else minor += `M${x} ${y0}V${y1}`;
  }
  for (let j = 0; j < rows; j++) {
    const y = y0 + j * sy;
    if (j % 3 === 1) major += `M${x0} ${y}H${x1}`; else minor += `M${x0} ${y}H${x1}`;
  }
  // street labels inside the rotated grid
  const vMajor = x0 + (Math.round(cols * 0.45) - (Math.round(cols * 0.45) % 4) + 2) * sx;
  const hMajor1 = y0 + (Math.round(rows * 0.35) - (Math.round(rows * 0.35) % 3) + 1) * sy;
  const hMajor2 = y0 + (Math.round(rows * 0.75) - (Math.round(rows * 0.75) % 3) + 1) * sy;
  const labels = `
    <text x="${vMajor + 3}" y="${cy - 40}" transform="rotate(-90 ${vMajor + 3} ${cy - 40})" text-anchor="middle">5th Ave</text>
    <text x="${cx - 120}" y="${hMajor1 - 4}" text-anchor="middle">Main St</text>
    <text x="${cx + 60}" y="${hMajor2 - 4}" text-anchor="middle">Harbor Rd</text>
    <text x="${cx + 140}" y="${hMajor1 - 4}" text-anchor="middle">Park Ave</text>`;

  const river = `M${W * 0.60} -30 C${W * 0.66} ${H * 0.22}, ${W * 0.46} ${H * 0.42}, ${W * 0.52} ${H * 0.62} S${W * 0.74} ${H * 0.92}, ${W * 0.68} ${H + 30}`;
  const highway = `M-20 ${H * 0.74} C${W * 0.28} ${H * 0.6}, ${W * 0.52} ${H * 0.34}, ${W + 20} ${H * 0.1}`;

  const routes = DATA.map.vehicles.map((v) => {
    const d = v.route.map(([fx, fy], i) => `${i ? 'L' : 'M'}${(fx * W).toFixed(1)} ${(fy * H).toFixed(1)}`).join(' ');
    return `<path class="route-casing" d="${d}"/><path class="route ${v.moving ? '' : 'static'}" d="${d}" stroke="var(--${v.color})"/>`;
  }).join('');

  host.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true">
    <rect width="${W}" height="${H}" fill="var(--map-land)"/>
    <g transform="rotate(${angle} ${cx} ${cy})">
      <g fill="var(--map-block)">${blocks}</g>
      <g fill="var(--map-park)">${parks}</g>
      <path d="${minor}" stroke="var(--map-road)" stroke-width="2" fill="none"/>
      <path d="${major}" stroke="var(--map-road-casing)" stroke-width="6" fill="none"/>
      <path d="${major}" stroke="var(--map-road-major)" stroke-width="4" fill="none"/>
      <g font-size="8.5" font-family="var(--font)" fill="var(--map-label)" font-weight="500">${labels}</g>
    </g>
    <path d="${river}" stroke="var(--map-water-bank)" stroke-width="24" fill="none" stroke-linecap="round"/>
    <path d="${river}" stroke="var(--map-water)" stroke-width="18" fill="none" stroke-linecap="round"/>
    <path id="hwPath" d="${highway}" stroke="var(--map-highway-casing)" stroke-width="7" fill="none"/>
    <path d="${highway}" stroke="var(--map-highway)" stroke-width="5" fill="none"/>
    <text font-size="8" font-family="var(--font)" fill="var(--map-label)" font-weight="600" dy="-5"><textPath href="#hwPath" startOffset="22%">I-95</textPath></text>
    <text font-size="8" font-family="var(--font)" fill="var(--map-label)" font-weight="500"><textPath href="#hwPath" startOffset="62%" dy="-5">Riverside Expy</textPath></text>
    <g>${routes}</g>
  </svg>`;

  // markers (HTML overlay, pixel-positioned)
  const markers = [];
  DATA.map.places.forEach((p) => {
    markers.push(`<div class="mk depot ${p.kind === 'site' ? 'site' : ''} ${p.color}" style="left:${(p.x * W).toFixed(1)}px;top:${(p.y * H).toFixed(1)}px">
      <span class="mk-dot">${icon(p.icon, 13)}</span>
      <span class="mk-chip place">${icon('map-pin', 11)}<b>${p.name}</b></span>
    </div>`);
  });
  DATA.map.vehicles.forEach((v) => {
    markers.push(`<div class="mk ${v.color}" style="left:${(v.x * W).toFixed(1)}px;top:${(v.y * H).toFixed(1)}px" data-tip="${tip([`${v.type} · ${v.id}`, v.note])}">
      ${v.moving ? '<span class="mk-pulse"></span>' : ''}
      <span class="mk-dot">${icon(v.icon, 14)}</span>
      <span class="mk-chip ${v.side === 'left' ? 'left' : ''}"><b>${v.type} · ${v.id}</b><small class="${v.warn ? 'warn' : ''}">${v.note}</small></span>
    </div>`);
  });
  $('#mapMarkers').innerHTML = markers.join('') + `<div class="map-scale"><i></i>500 m</div>`;
}

function renderMapLegend() {
  const total = sum(DATA.vehicleStatus.map((s) => s.value));
  $('#mapLegend').innerHTML = DATA.vehicleStatus.map((s) => `
    <div class="ml-item" data-tip="${tip([s.label, `${s.value} vehicles · ${pct(s.value, total)}`])}">
      <span class="ml-icon" style="background:var(--${s.tone}-bg);color:${s.color}">${icon(s.icon, 15)}</span>
      <span><div class="ml-label">${s.label}</div><div class="ml-count">${s.value}</div></span>
    </div>`).join('');
}

function renderVehiclePanel() {
  const total = sum(DATA.vehicleStatus.map((s) => s.value));
  $('#vehicleDonut').innerHTML = donutSVG(DATA.vehicleStatus, { size: 86, stroke: 11, value: fmt(total), label: 'Total' });
  $('#vehicleLegend').innerHTML = legendRows(DATA.vehicleStatus);
  $('#tripList').innerHTML = DATA.recentTrips.map((t) => `
    <div class="trip">
      <span class="trip-ic">${icon(t.icon, 12)}</span>
      <div class="trip-main"><b>${t.id}</b><span>${t.from} → ${t.to}</span></div>
      <span class="status ${t.tone}">${t.status}</span>
    </div>`).join('');
}

/* ------------------------------------------------------------------ */
/* Section 2 — warehouse & real estate summaries                       */
/* ------------------------------------------------------------------ */
function thumbSVG(kind) {
  const sky = { apartments: '#DCEBFA', office: '#E7E3FA', commercial: '#DDF3E6' }[kind];
  const wall = { apartments: '#6B8FD6', office: '#8A7BD6', commercial: '#4FB58A' }[kind];
  const dark = { apartments: '#3B63B8', office: '#5E4EB8', commercial: '#2E8F68' }[kind];
  let body = '';
  if (kind === 'apartments') body = `<rect x="6" y="9" width="26" height="19" fill="${wall}"/><rect x="6" y="9" width="26" height="3" fill="${dark}"/>${[0,1,2].map(i => [0,1].map(j => `<rect x="${9 + i * 8}" y="${14 + j * 6}" width="4" height="3" fill="#fff" opacity=".9"/>`).join('')).join('')}`;
  else if (kind === 'office') body = `<rect x="4" y="5" width="14" height="23" fill="${dark}"/><rect x="18" y="11" width="16" height="17" fill="${wall}"/>${[0,1,2,3].map(j => `<rect x="7" y="${8 + j * 5}" width="8" height="2" fill="#fff" opacity=".8"/>`).join('')}${[0,1,2].map(i => `<rect x="${21 + i * 4.5}" y="15" width="2.5" height="9" fill="#fff" opacity=".8"/>`).join('')}`;
  else body = `<path d="M4 16 19 7l15 9v12H4z" fill="${wall}"/><path d="M4 16 19 7l15 9H4z" fill="${dark}"/><rect x="15" y="19" width="8" height="9" fill="#fff" opacity=".9"/>`;
  return `<svg viewBox="0 0 38 28"><rect width="38" height="28" fill="${sky}"/>${body}</svg>`;
}

function renderSummaries() {
  // Warehouse
  const invTotal = sum(DATA.inventory.map((s) => s.value));
  $('#inventoryDonut').innerHTML = donutSVG(DATA.inventory, { size: 104, stroke: 13, value: fmt(invTotal), label: 'Total SKUs' });
  $('#inventoryLegend').innerHTML = legendRows(DATA.inventory);
  $('#lowStockList').innerHTML = DATA.lowStock.map((i) => `
    <div class="stock-row">
      <span class="stock-ic">${icon(i.icon, 13)}</span>
      <div class="stock-main"><b>${i.name}</b><span>SKU ${i.sku}</span></div>
      <span class="status ${i.level === 'critical' ? 'red' : 'amber'}">${i.level === 'critical' ? 'Critical' : 'Low'}</span>
      <span class="stock-qty ${i.level}">Stock:<b>${i.stock}</b></span>
    </div>`).join('');

  // Real estate
  const propTotal = sum(DATA.property.map((s) => s.value));
  $('#propertyDonut').innerHTML = donutSVG(DATA.property, { size: 104, stroke: 13, value: fmt(propTotal), label: 'Total' });
  $('#propertyLegend').innerHTML = legendRows(DATA.property);
  $('#leaseList').innerHTML = DATA.leases.map((l) => `
    <div class="lease-row">
      <span class="lease-thumb">${thumbSVG(l.thumb)}</span>
      <div class="lease-main"><b>${l.property}</b><span>${l.tenant}</span></div>
      <div class="lease-right"><span class="lease-date">${l.date}</span><span class="status ${l.tone}">${l.days} Days</span></div>
    </div>`).join('');
}

/* ------------------------------------------------------------------ */
/* Section 3 — charts                                                  */
/* ------------------------------------------------------------------ */
function chartFrame(host) {
  return { W: host.clientWidth || 380, H: host.clientHeight || 100 };
}
function yTicks(W, H, m, max, steps, right) {
  let s = '';
  const ih = H - m.t - m.b;
  for (let i = 0; i <= steps; i++) {
    const v = max / steps * i;
    const y = m.t + ih - v / max * ih;
    s += `<line class="${i === 0 ? 'axis' : 'grid'}" x1="${m.l}" x2="${W - m.r}" y1="${y}" y2="${y}"/>`;
    s += `<text class="tick" x="${m.l - 6}" y="${y + 3}" text-anchor="end">${fmt(v)}</text>`;
    if (right) s += `<text class="tick" x="${W - m.r + 6}" y="${y + 3}">${fmt(right.max / steps * i)}${right.unit}</text>`;
  }
  return s;
}

function renderCombo() {
  const host = $('#chartCombo');
  const { W, H } = chartFrame(host);
  const m = { t: 8, r: 34, b: 16, l: 26 };
  const iw = W - m.l - m.r, ih = H - m.t - m.b;
  const { days, trips, fuel } = DATA.charts;
  const yMax = 40, y2Max = 800;
  const y = (v) => m.t + ih - v / yMax * ih;
  const y2 = (v) => m.t + ih - v / y2Max * ih;
  const slot = iw / days.length;
  const bw = Math.min(22, slot * 0.42);

  let s = yTicks(W, H, m, yMax, 4, { max: y2Max, unit: 'L' });
  days.forEach((d, i) => {
    const cx = m.l + slot * (i + 0.5);
    s += `<rect class="hit" x="${m.l + slot * i}" y="${m.t}" width="${slot}" height="${ih}" data-tip="${tip([d, `Trips: ${trips[i]}`, `Fuel: ${fmt(fuel[i])} L`])}"/>`;
    s += `<path class="bar" d="${roundedTopRect(cx - bw / 2, y(trips[i]), bw, ih - (y(trips[i]) - m.t), 4)}" fill="var(--blue)"/>`;
    s += `<text class="tick" x="${cx}" y="${H - 3}" text-anchor="middle">${d}</text>`;
  });
  const pts = fuel.map((v, i) => [m.l + slot * (i + 0.5), y2(v)]);
  s += `<path d="${pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ')}" fill="none" stroke="var(--green-chart)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" pointer-events="none"/>`;
  pts.forEach((p) => { s += `<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="var(--green-chart)" stroke="var(--card)" stroke-width="2" pointer-events="none"/>`; });
  host.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${s}</svg>`;
}

function renderGrouped() {
  const host = $('#chartGrouped');
  const { W, H } = chartFrame(host);
  const m = { t: 8, r: 8, b: 16, l: 26 };
  const iw = W - m.l - m.r, ih = H - m.t - m.b;
  const { days, inbound, outbound } = DATA.charts;
  const yMax = 60;
  const y = (v) => m.t + ih - v / yMax * ih;
  const slot = iw / days.length;
  const bw = Math.min(13, slot * 0.22), gap = 2;

  let s = yTicks(W, H, m, yMax, 3);
  days.forEach((d, i) => {
    const cx = m.l + slot * (i + 0.5);
    s += `<rect class="hit" x="${m.l + slot * i}" y="${m.t}" width="${slot}" height="${ih}" data-tip="${tip([d, `Inbound: ${inbound[i]}`, `Outbound: ${outbound[i]}`])}"/>`;
    s += `<path class="bar" d="${roundedTopRect(cx - bw - gap / 2, y(inbound[i]), bw, ih - (y(inbound[i]) - m.t), 4)}" fill="var(--purple)"/>`;
    s += `<path class="bar" d="${roundedTopRect(cx + gap / 2, y(outbound[i]), bw, ih - (y(outbound[i]) - m.t), 4)}" fill="var(--orange)"/>`;
    s += `<text class="tick" x="${cx}" y="${H - 3}" text-anchor="middle">${d}</text>`;
  });
  host.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${s}</svg>`;
}

function renderArea() {
  const host = $('#chartArea');
  const { W, H } = chartFrame(host);
  const m = { t: 14, r: 14, b: 16, l: 22 };
  const iw = W - m.l - m.r, ih = H - m.t - m.b;
  const { months, expiry } = DATA.charts;
  const yMax = 15;
  const y = (v) => m.t + ih - v / yMax * ih;
  const slot = iw / months.length;
  const pts = expiry.map((v, i) => [m.l + slot * (i + 0.5), y(v)]);
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');

  let s = yTicks(W, H, m, yMax, 3);
  s += `<path d="${line} L${pts[pts.length - 1][0]} ${m.t + ih} L${pts[0][0]} ${m.t + ih} Z" fill="var(--green-chart)" fill-opacity=".12" pointer-events="none"/>`;
  s += `<path d="${line}" fill="none" stroke="var(--green-chart)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" pointer-events="none"/>`;
  months.forEach((mo, i) => {
    s += `<rect class="hit" x="${m.l + slot * i}" y="${m.t}" width="${slot}" height="${ih}" data-tip="${tip([mo, `Expiring leases: ${expiry[i]}`])}"/>`;
    s += `<text class="tick" x="${pts[i][0]}" y="${H - 3}" text-anchor="middle">${mo}</text>`;
  });
  pts.forEach((p, i) => {
    s += `<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="var(--green-chart)" stroke="var(--card)" stroke-width="2" pointer-events="none"/>`;
    s += `<text class="pt-label" x="${p[0]}" y="${p[1] - 8}" text-anchor="middle" pointer-events="none">${expiry[i]}</text>`;
  });
  host.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${s}</svg>`;
}

function sparkSVG(values, color, W, H) {
  const min = Math.min(...values), max = Math.max(...values);
  const x = (i) => 2 + i * (W - 4) / (values.length - 1);
  const y = (v) => 3 + (H - 6) * (1 - (v - min) / Math.max(max - min, 1));
  const line = values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  const last = values.length - 1;
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <path d="${line} L${x(last).toFixed(1)} ${H} L2 ${H} Z" fill="${color}" fill-opacity=".12"/>
    <path d="${line}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${x(last).toFixed(1)}" cy="${y(values[last]).toFixed(1)}" r="3" fill="${color}" stroke="var(--tile)" stroke-width="1.5"/>
  </svg>`;
}

function renderCharts() {
  renderCombo();
  renderGrouped();
  renderArea();
  document.querySelectorAll('.fin-spark').forEach((el, i) => {
    const f = DATA.financial[i];
    el.innerHTML = sparkSVG(f.spark, f.color, el.clientWidth || 90, el.clientHeight || 28);
  });
}

/* ------------------------------------------------------------------ */
/* Section 4 — alerts, financial, quick actions                        */
/* ------------------------------------------------------------------ */
function renderLower() {
  $('#alertList').innerHTML = DATA.alerts.map((a) => `
    <div class="alert-row">
      <span class="alert-ic" style="background:var(--${a.tone}-bg);color:var(--${a.tone})">${icon(a.icon, 14)}</span>
      <div class="alert-main"><b>${a.text}</b><span>${a.time}</span></div>
      <span class="status ${a.tone === 'purple' ? 'amber' : a.tone}">${a.level}</span>
    </div>`).join('');

  $('#finGrid').innerHTML = DATA.financial.map((f) => `
    <div class="fin-tile">
      <div class="fin-label">${f.label}</div>
      <div class="fin-value">${f.value}</div>
      <div class="fin-delta ${f.dir}">${icon(f.dir === 'up' ? 'arrow-up' : 'arrow-down', 11)}${f.delta}</div>
      <div class="fin-spark"></div>
    </div>`).join('');

  $('#quickActions').innerHTML = DATA.quickActions.map(([label, ic, color]) => `
    <button class="qa-btn ${color}" data-action="${label}"><span class="qa-ic">${icon(ic, 15)}</span>${label}</button>`).join('');
}

/* ------------------------------------------------------------------ */
/* Interactions                                                        */
/* ------------------------------------------------------------------ */
function toast(message) {
  const stack = $('#toasts');
  const node = document.createElement('div');
  node.className = 'toast';
  node.innerHTML = `${icon('check', 15)}<span>${message}</span>`;
  stack.appendChild(node);
  setTimeout(() => { node.style.opacity = '0'; node.style.transition = 'opacity .25s'; }, 2200);
  setTimeout(() => node.remove(), 2500);
}

function bindTooltips() {
  const tt = $('#tooltip');
  let current = null;
  document.addEventListener('mousemove', (e) => {
    const target = e.target.closest && e.target.closest('[data-tip]');
    if (!target) { if (current) { current = null; tt.classList.remove('show'); } return; }
    if (target !== current) {
      current = target;
      const [head, ...rest] = target.dataset.tip.split('|');
      tt.innerHTML = `<b>${head}</b>${rest.join('<br>')}`;
      tt.classList.add('show');
    }
    tt.style.left = `${e.clientX}px`;
    tt.style.top = `${e.clientY}px`;
  });
  document.addEventListener('mouseleave', () => tt.classList.remove('show'));
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const btn = $('#themeBtn');
  btn.innerHTML = icon(theme === 'dark' ? 'sun' : 'moon', 18);
  btn.title = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  try { localStorage.setItem('ums-theme', theme); } catch (e) { /* storage unavailable */ }
}

function bindUI() {
  $('#menuBtn').addEventListener('click', () => {
    $('.app').classList.toggle('sidebar-collapsed');
    setTimeout(rerenderSized, 220);
  });
  $('#themeBtn').addEventListener('click', () => {
    applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
  });
  $('#fullscreenBtn').addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
  });
  $('#mapFull').addEventListener('click', () => {
    const card = $('#mapCard');
    if (document.fullscreenElement === card) document.exitFullscreen();
    else card.requestFullscreen && card.requestFullscreen();
  });
  const setZoom = (z) => {
    mapZoomLevel = Math.min(2.2, Math.max(1, z));
    $('#mapZoom').style.transform = `scale(${mapZoomLevel})`;
  };
  $('#zoomIn').addEventListener('click', () => setZoom(mapZoomLevel + 0.25));
  $('#zoomOut').addEventListener('click', () => setZoom(mapZoomLevel - 0.25));

  $('#vehicleFilter').addEventListener('change', (e) => {
    const v = e.target.value;
    document.querySelectorAll('#mapMarkers .mk:not(.depot)').forEach((mk) => {
      const type = mk.querySelector('.mk-chip b').textContent.split(' · ')[0];
      const show = v === 'All Vehicles' || v.startsWith(type);
      mk.style.display = show ? '' : 'none';
    });
  });

  $('#exportBtn').addEventListener('click', () => toast('Report export started — you\'ll be notified when it\'s ready.'));
  $('#dateBtn').addEventListener('click', () => toast('Date range picker (demo)'));
  $('#quickActions').addEventListener('click', (e) => {
    const btn = e.target.closest('.qa-btn');
    if (btn) toast(`${btn.dataset.action} — form opened (demo)`);
  });
  document.querySelectorAll('.link').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));

  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(rerenderSized, 120); });
  document.addEventListener('fullscreenchange', () => setTimeout(rerenderSized, 60));
}

function rerenderSized() {
  renderMap();
  renderCharts();
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */
(function init() {
  let theme = 'light';
  try { theme = localStorage.getItem('ums-theme') || 'light'; } catch (e) { /* ignore */ }
  hydrateIcons();
  applyTheme(theme);
  renderNav();
  renderOverview();
  renderMapLegend();
  renderVehiclePanel();
  renderSummaries();
  renderLower();
  bindUI();
  bindTooltips();
  // sized renders after layout + fonts
  rerenderSized();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(rerenderSized);
})();
