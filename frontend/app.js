const API = 'https://shipment-tracker-backend-r37m.onrender.com';

async function apiGet(path) {
  const res = await fetch(API + path);
  if (!res.ok) throw new Error('Request Failed');
  return res.json();
}

async function apiPost(path, data) {
  const res = await fetch(API + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Request Failed');
  return res.json();
}

async function apiPut(path, data) {
  const res = await fetch(API + path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Request Failed');
  return res.json();
}

function statusClass(status) {
  const map = {
    'Booked': 's-booked',
    'In Transit': 's-transit',
    'Out for Delivery': 's-delivery',
    'Delivered': 's-delivered'
  };
  return map[status] || 's-booked';
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}