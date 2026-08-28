/* ─── 轻记 PWA ─────────────────────────────────────────── */
(function() {
'use strict';

// ─── Constants ────────────────────────────────────────────
const CATS = {
  expense: [
    { id: 'food',      name: '餐饮', color: '#F59E0B', bg: 'var(--amber-soft)',  icon: '<path d="M3 11h18M5 11V7a2 2 0 0 1 2-2h10v6M7 19h10a2 2 0 0 0 2-2v-6H5v6a2 2 0 0 0 2 2z"/>' },
    { id: 'transport', name: '交通', color: '#2563EB', bg: 'var(--blue-soft)',   icon: '<rect x="3" y="7" width="18" height="10" rx="2"/><path d="M7 11h4M15 11h2"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/>' },
    { id: 'shop',      name: '购物', color: '#EC4899', bg: 'var(--pink-soft)',   icon: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>' },
    { id: 'study',     name: '学习', color: '#14B8A6', bg: 'var(--green-soft)',  icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>' },
    { id: 'fun',       name: '娱乐', color: '#10B981', bg: 'var(--green-soft)',  icon: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>' },
    { id: 'other',     name: '其他', color: '#F97316', bg: 'var(--orange-soft)', icon: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>' }
  ],
  income: [
    { id: 'salary',   name: '工资',   color: '#10B981', bg: 'var(--green-soft)', icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' },
    { id: 'parttime', name: '兼职',   color: '#2563EB', bg: 'var(--blue-soft)',  icon: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>' },
    { id: 'bonus',    name: '奖金',   color: '#F59E0B', bg: 'var(--amber-soft)', icon: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' },
    { id: 'gift',     name: '红包',   color: '#EF4444', bg: 'var(--red-soft)',   icon: '<path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/>' },
    { id: 'refund',   name: '退款',   color: '#14B8A6', bg: 'var(--green-soft)', icon: '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>' },
    { id: 'other_in', name: '其他',   color: '#F97316', bg: 'var(--orange-soft)',icon: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>' }
  ]
};

const PAY_METHODS = [
  { id: 'wechat',  name: '微信',   icon: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>' },
  { id: 'alipay',  name: '支付宝', icon: '<circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/>' },
  { id: 'bank',    name: '银行卡', icon: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20"/>' },
  { id: 'cash',    name: '现金',   icon: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>' }
];

const STORAGE_KEY = 'qingji_data';
const USER_KEY    = 'qingji_user';

// ─── Supabase Cloud Sync ─────────────────────────────────
// 使用说明：
// 1. 打开 https://supabase.com 注册免费账号
// 2. 创建新项目，复制 Project URL 和 anon/public key
// 3. 在 SQL Editor 中运行下方建表语句
// 4. 将 URL 和 KEY 填入下面两行
const SUPABASE_URL = 'https://你的项目ID.supabase.co';
const SUPABASE_KEY = '你的anon_key';

let supabase = null;
let userId = '';
let syncTimer = null;

// 初始化 Supabase 客户端
function initSupabase() {
  if (SUPABASE_URL.includes('你的项目') || !window.supabase) return null;
  try {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    return supabase;
  } catch(e) {
    console.warn('Supabase init failed:', e);
    return null;
  }
}

// 获取或生成用户 ID
function getUserId() {
  if (userId) return userId;
  userId = localStorage.getItem(USER_KEY);
  if (!userId) {
    userId = 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    localStorage.setItem(USER_KEY, userId);
  }
  return userId;
}

// 云端推送：将本地新记录上传
async function cloudPush(txn) {
  if (!supabase) return false;
  const data = loadData();
  if (!data.groupId) return false;
  try {
    const { error } = await supabase
      .from('transactions')
      .upsert({
        id: txn.id,
        group_id: data.groupId,
        user_id: getUserId(),
        type: txn.type,
        category: txn.category,
        amount: txn.amount,
        pay_method: txn.payMethod,
        note: txn.note,
        date: txn.date,
        created_at: txn.createdAt || new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    if (error) { console.warn('Push failed:', error); return false; }
    return true;
  } catch(e) {
    console.warn('Push error:', e);
    return false;
  }
}

// 云端拉取：从云端下载同组数据并合并
async function cloudPull() {
  if (!supabase) return [];
  const data = loadData();
  if (!data.groupId) return [];
  try {
    const { data: rows, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('group_id', data.groupId)
      .order('created_at', { ascending: false });
    if (error) { console.warn('Pull failed:', error); return []; }
    return rows || [];
  } catch(e) {
    console.warn('Pull error:', e);
    return [];
  }
}

// 合并云端数据到本地（按 ID 去重，保留本地数据）
function mergeCloudData(cloudRows) {
  const data = loadData();
  const localIds = new Set(data.transactions.map(t => t.id));
  let added = 0;
  cloudRows.forEach(row => {
    if (!localIds.has(row.id)) {
      data.transactions.push({
        id: row.id,
        type: row.type,
        category: row.category,
        amount: row.amount,
        payMethod: row.pay_method,
        note: row.note,
        date: row.date,
        createdAt: row.created_at
      });
      added++;
    }
  });
  if (added > 0) {
    // 按日期排序
    data.transactions.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    saveData(data);
  }
  return added;
}

// 执行同步（先推后拉）
async function syncCloud() {
  if (!supabase) { toast('未配置云服务'); return 0; }
  const data = loadData();
  if (!data.groupId) { toast('请先创建或加入团体'); return 0; }
  toast('同步中...');
  // 推送所有本地记录
  for (const txn of data.transactions) {
    await cloudPush(txn);
  }
  // 拉取云端记录
  const rows = await cloudPull();
  const added = mergeCloudData(rows);
  toast(added > 0 ? '同步完成，新增 ' + added + ' 条' : '同步完成');
  return added;
}

// 防抖自动同步
function scheduleSync() {
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    if (supabase && loadData().groupId) {
      cloudPull().then(rows => {
        const added = mergeCloudData(rows);
        if (added > 0 && currentView === 'home') renderHome();
      });
    }
  }, 2000);
}

// Supabase 建表 SQL（在 Supabase SQL Editor 中运行）：
/*
CREATE TABLE transactions (
  id TEXT PRIMARY KEY,
  group_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  category TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  pay_method TEXT,
  note TEXT,
  date TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 按团体查询的索引
CREATE INDEX idx_transactions_group ON transactions(group_id);
CREATE INDEX idx_transactions_user ON transactions(user_id);

-- 开启 Row Level Security（可选，增强安全性）
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- 允许匿名读写（适合小群私密使用）
CREATE POLICY "allow_all" ON transactions FOR ALL USING (true) WITH CHECK (true);
*/

// ─── Data Layer ───────────────────────────────────────────
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  // First launch: seed with sample data
  const data = { transactions: [], budget: 2000, groupId: null, nickname: '' };
  seedSampleData(data);
  return data;
}

function seedSampleData(data) {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const samples = [
    { type: 'income',  category: 'parttime', amount: 800,  payMethod: 'wechat', note: '兼职收入',       date: y+'-'+m+'-25' },
    { type: 'income',  category: 'gift',     amount: 200,  payMethod: 'wechat', note: '生日红包',       date: y+'-'+m+'-20' },
    { type: 'expense', category: 'food',     amount: 15,   payMethod: 'wechat', note: '午餐 · 食堂',   date: y+'-'+m+'-'+d },
    { type: 'expense', category: 'transport',amount: 50,   payMethod: 'alipay', note: '地铁充值',       date: y+'-'+m+'-'+d },
    { type: 'expense', category: 'shop',     amount: 89,   payMethod: 'alipay', note: '淘宝 · 文具',   date: y+'-'+m+'-'+String(Math.max(1,now.getDate()-1)).padStart(2,'0') },
    { type: 'expense', category: 'study',    amount: 45,   payMethod: 'wechat', note: '考研资料',       date: y+'-'+m+'-'+String(Math.max(1,now.getDate()-1)).padStart(2,'0') },
    { type: 'expense', category: 'food',     amount: 32,   payMethod: 'wechat', note: '晚餐 · 外卖',   date: y+'-'+m+'-'+String(Math.max(1,now.getDate()-2)).padStart(2,'0') },
    { type: 'expense', category: 'fun',      amount: 35,   payMethod: 'wechat', note: '电影票',         date: y+'-'+m+'-'+String(Math.max(1,now.getDate()-3)).padStart(2,'0') },
    { type: 'expense', category: 'food',     amount: 18,   payMethod: 'alipay', note: '早餐 · 包子',   date: y+'-'+m+'-'+String(Math.max(1,now.getDate()-3)).padStart(2,'0') },
    { type: 'expense', category: 'transport',amount: 12,   payMethod: 'alipay', note: '共享单车月卡',   date: y+'-'+m+'-'+String(Math.max(1,now.getDate()-4)).padStart(2,'0') },
    { type: 'expense', category: 'food',     amount: 28,   payMethod: 'wechat', note: '奶茶 · 蜜雪',   date: y+'-'+m+'-'+String(Math.max(1,now.getDate()-5)).padStart(2,'0') },
    { type: 'expense', category: 'other',    amount: 100,  payMethod: 'bank',   note: '班费',           date: y+'-'+m+'-'+String(Math.max(1,now.getDate()-6)).padStart(2,'0') },
    { type: 'expense', category: 'shop',     amount: 159,  payMethod: 'alipay', note: '运动鞋',         date: y+'-'+m+'-10' },
    { type: 'expense', category: 'food',     amount: 42,   payMethod: 'wechat', note: '聚餐 AA',       date: y+'-'+m+'-08' },
    { type: 'expense', category: 'study',    amount: 68,   payMethod: 'alipay', note: '网课会员',       date: y+'-0'+Math.max(1,now.getMonth())+'-28' },
  ];
  samples.forEach(s => {
    s.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    s.createdAt = new Date(s.date).toISOString();
    data.transactions.push(s);
  });
  saveData(data);
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function addTransaction(txn) {
  const data = loadData();
  txn.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  txn.createdAt = new Date().toISOString();
  data.transactions.unshift(txn);
  saveData(data);
  // 云同步：推送新记录 + 拉取他人数据
  cloudPush(txn);
  scheduleSync();
  return txn;
}

function deleteTransaction(id) {
  const data = loadData();
  data.transactions = data.transactions.filter(t => t.id !== id);
  saveData(data);
}

function getMonthTxns(month) {
  const data = loadData();
  if (!month) month = currentMonth();
  return data.transactions.filter(t => t.date && t.date.startsWith(month));
}

function currentMonth() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
}

function calcSummary(txns) {
  let income = 0, expense = 0;
  txns.forEach(t => {
    if (t.type === 'income') income += t.amount;
    else expense += t.amount;
  });
  return { income, expense, balance: income - expense };
}

function calcCatBreakdown(txns, type) {
  const map = {};
  txns.filter(t => t.type === type).forEach(t => {
    if (!map[t.category]) map[t.category] = 0;
    map[t.category] += t.amount;
  });
  return Object.entries(map)
    .map(([cat, amount]) => ({ cat, amount }))
    .sort((a, b) => b.amount - a.amount);
}

// ─── Helpers ──────────────────────────────────────────────
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }
function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  if (attrs) Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'className') el.className = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
    else el.setAttribute(k, v);
  });
  children.flat().forEach(c => {
    if (c == null) return;
    el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return el;
}

function fmt(n) {
  return n.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function getCatInfo(catId, type) {
  const list = type === 'income' ? CATS.income : CATS.expense;
  return list.find(c => c.id === catId) || { name: catId, color: '#64748B', bg: 'var(--bg)', icon: '' };
}

function getPayInfo(payId) {
  return PAY_METHODS.find(p => p.id === payId) || { name: payId, icon: '' };
}

function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 1800);
}

function todayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

// ─── SVG Icons (reusable) ────────────────────────────────
const ICONS = {
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  chevronR: '<polyline points="9 18 15 12 9 6"/>',
  pieChart: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
  trending: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  wallet: '<path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/>',
  alertTri: '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  alertCirc: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  barChart: '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>',
  refresh: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
};

function svgIcon(name, size) {
  size = size || 17;
  return '<svg viewBox="0 0 24 24" width="'+size+'" height="'+size+'" style="stroke:currentColor;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;">' + (ICONS[name]||'') + '</svg>';
}

// ─── Router ───────────────────────────────────────────────
let currentView = 'home';

function navigate(view) {
  currentView = view;
  $$('.view').forEach(v => v.classList.remove('active'));
  const el = $('#view-' + view);
  if (el) el.classList.add('active');
  $$('.tab').forEach(t => t.classList.toggle('active', t.dataset.view === view));
  renderView(view);
  window.scrollTo(0, 0);
}

function renderView(view) {
  switch(view) {
    case 'home':  renderHome(); break;
    case 'add':   renderAdd(); break;
    case 'stats': renderStats(); break;
    case 'money': renderMoney(); break;
    case 'more':  renderMore(); break;
  }
}

// ─── Home View ────────────────────────────────────────────
function renderHome() {
  const month = currentMonth();
  const txns = getMonthTxns(month);
  const s = calcSummary(txns);
  const data = loadData();
  const budget = data.budget || 2000;
  const pct = Math.min(Math.round(s.expense / budget * 100), 100);
  const recent = txns.slice(0, 8);

  const header = $('#header');
  header.innerHTML = '<div><h1>轻记</h1></div><div style="display:flex;gap:8px;"><button class="icon-btn" id="btn-bell">' +
    '<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></button></div>';

  const el = $('#view-home');
  el.innerHTML = '';

  // Summary Card
  const monthLabel = new Date().getFullYear() + '年' + (new Date().getMonth()+1) + '月';
  el.appendChild(
    h('div', { className: 'pad', style: { marginBottom: '12px' } },
      h('div', { className: 'summary-card' },
        h('div', { className: 'month' }, h('span', {}, monthLabel + '账单')),
        h('div', { className: 'summary-grid' },
          h('div', { className: 'summary-item' },
            h('div', { className: 'label' }, '收入'),
            h('div', { className: 'value sm' }, '¥' + fmt(s.income))
          ),
          h('div', { className: 'summary-item' },
            h('div', { className: 'label' }, '支出'),
            h('div', { className: 'value' }, '¥' + fmt(s.expense))
          ),
          h('div', { className: 'summary-item' },
            h('div', { className: 'label' }, '结余'),
            h('div', { className: 'value sm' }, '¥' + fmt(s.balance))
          )
        )
      )
    )
  );

  // Budget Ring
  const dashLen = Math.round(175.9 * pct / 100);
  const ringColor = pct > 90 ? 'var(--red)' : pct > 70 ? 'var(--amber)' : 'var(--accent)';
  el.appendChild(
    h('div', { className: 'pad', style: { marginBottom: '12px' } },
      h('div', { className: 'card budget-card' },
        (() => {
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('width', '72'); svg.setAttribute('height', '72');
          svg.setAttribute('viewBox', '0 0 72 72');
          svg.style.flexShrink = '0';
          svg.innerHTML = '<circle cx="36" cy="36" r="28" fill="none" stroke="var(--border)" stroke-width="6"/>' +
            '<circle cx="36" cy="36" r="28" fill="none" stroke="'+ringColor+'" stroke-width="6" stroke-dasharray="'+dashLen+' 176" stroke-linecap="round" transform="rotate(-90 36 36)"/>' +
            '<text x="36" y="34" text-anchor="middle" font-size="14" font-weight="700" fill="var(--fg)" font-family="var(--mono)">'+pct+'%</text>' +
            '<text x="36" y="46" text-anchor="middle" font-size="8" fill="var(--muted)">已使用</text>';
          return svg;
        })(),
        h('div', { className: 'info' },
          h('div', { className: 'title' }, '月度预算'),
          h('div', { className: 'detail' }, '已花 ¥' + fmt(s.expense) + ' / 预算 ¥' + fmt(budget)),
          h('div', { className: 'warn' }, '剩余 ¥' + fmt(budget - s.expense) + ' · 注意控制开支')
        )
      )
    )
  );

  // Alerts
  const alerts = [];
  const catBreakdown = calcCatBreakdown(txns, 'expense');
  catBreakdown.forEach(c => {
    const catBudget = budget * 0.3;
    if (c.amount > catBudget * 0.85) {
      const catInfo = getCatInfo(c.cat, 'expense');
      alerts.push({ type: 'warn', title: catInfo.name + '支出已达预算 85%', sub: '本月' + catInfo.name + ' ¥' + fmt(c.amount) });
    }
  });
  txns.filter(t => t.type === 'expense' && t.amount >= 80).slice(0, 1).forEach(t => {
    const catInfo = getCatInfo(t.category, 'expense');
    alerts.push({ type: 'danger', title: '单笔消费超过 ¥80 提醒', sub: catInfo.name + ' ¥' + fmt(t.amount) });
  });
  if (pct > 70) {
    alerts.push({ type: 'info', title: '本月支出已超过 70%', sub: '建议适当控制非必要消费' });
  }

  if (alerts.length > 0) {
    const alertSection = h('div', { className: 'pad', style: { marginBottom: '12px' } });
    alertSection.appendChild(h('div', { className: 'section-label', style: { padding: 0, marginBottom: '8px' } }, '预警提示'));
    alerts.slice(0, 3).forEach(a => {
      const iconName = a.type === 'warn' ? 'alertTri' : a.type === 'danger' ? 'alertCirc' : 'alertTri';
      alertSection.appendChild(
        h('div', { className: 'alert-card ' + a.type },
          (() => { const s = document.createElementNS('http://www.w3.org/2000/svg','svg'); s.setAttribute('viewBox','0 0 24 24'); s.innerHTML = ICONS[iconName]; return s; })(),
          h('div', { className: 'alert-text' },
            h('div', { className: 'alert-title' }, a.title),
            h('div', { className: 'alert-sub' }, a.sub)
          )
        )
      );
    });
    el.appendChild(alertSection);
  }

  // Recent Transactions
  el.appendChild(h('div', { className: 'section-label' }, '最近交易'));
  const listCard = h('div', { className: 'card txn-list' });
  if (recent.length === 0) {
    listCard.appendChild(h('div', { className: 'empty-state' },
      (() => { const s = document.createElementNS('http://www.w3.org/2000/svg','svg'); s.setAttribute('viewBox','0 0 24 24'); s.innerHTML = ICONS.pieChart; return s; })(),
      h('p', {}, '还没有记录，点击下方 + 开始记账')
    ));
  } else {
    recent.forEach(t => {
      const catInfo = getCatInfo(t.category, t.type);
      const isExpense = t.type === 'expense';
      listCard.appendChild(
        h('div', { className: 'txn-row', onClick: () => { if(confirm('删除这条记录？')) { deleteTransaction(t.id); renderHome(); }} },
          h('div', { className: 'txn-icon', style: { background: catInfo.bg, color: catInfo.color } },
            (() => { const s = document.createElementNS('http://www.w3.org/2000/svg','svg'); s.setAttribute('viewBox','0 0 24 24'); s.innerHTML = catInfo.icon; return s; })()
          ),
          h('div', {},
            h('div', { className: 'txn-title' }, t.note || catInfo.name),
            h('div', { className: 'txn-sub' }, catInfo.name + ' · ' + t.date)
          ),
          h('span', { className: 'txn-amount num ' + (isExpense ? 'expense' : 'income') },
            (isExpense ? '-' : '+') + '¥' + fmt(t.amount))
        )
      );
    });
  }
  el.appendChild(h('div', { className: 'pad' }, listCard));
}

// ─── Add View ─────────────────────────────────────────────
let addState = { type: 'expense', category: 'food', amount: '0', payMethod: 'wechat', note: '', date: todayStr() };

function renderAdd() {
  const header = $('#header');
  header.innerHTML = '<div><h1>记一笔</h1></div><div></div>';

  const el = $('#view-add');
  el.innerHTML = '';

  // Amount display
  el.appendChild(
    h('div', { className: 'amount-display' },
      h('span', { className: 'currency' }, '¥'),
      h('span', { className: 'num', id: 'amount-num' }, addState.amount)
    )
  );

  // Type toggle
  const seg = h('div', { className: 'seg-ctrl' });
  ['expense', 'income'].forEach(type => {
    const btn = h('button', {
      className: 'seg-btn' + (addState.type === type ? ' active' : ''),
      onClick: () => { addState.type = type; addState.category = type === 'expense' ? 'food' : 'salary'; renderAdd(); }
    }, type === 'expense' ? '支出' : '收入');
    seg.appendChild(btn);
  });
  el.appendChild(seg);

  // Category grid
  const cats = CATS[addState.type];
  const grid = h('div', { className: 'cat-grid' });
  cats.forEach(c => {
    const item = h('div', {
      className: 'cat-item' + (addState.category === c.id ? ' selected' : ''),
      onClick: () => { addState.category = c.id; renderAdd(); }
    },
      (() => { const s = document.createElementNS('http://www.w3.org/2000/svg','svg'); s.setAttribute('viewBox','0 0 24 24'); s.style.color = addState.category === c.id ? 'var(--accent)' : c.color; s.innerHTML = c.icon; return s; })(),
      h('span', { style: { color: addState.category === c.id ? 'var(--accent)' : 'var(--fg)' } }, c.name)
    );
    grid.appendChild(item);
  });
  el.appendChild(grid);

  // Payment method
  el.appendChild(h('div', { className: 'section-label' }, '付款方式'));
  const payGrid = h('div', { className: 'pay-grid' });
  PAY_METHODS.forEach(p => {
    const item = h('div', {
      className: 'pay-item' + (addState.payMethod === p.id ? ' selected' : ''),
      onClick: () => { addState.payMethod = p.id; renderAdd(); }
    },
      (() => { const s = document.createElementNS('http://www.w3.org/2000/svg','svg'); s.setAttribute('viewBox','0 0 24 24'); s.style.color = addState.payMethod === p.id ? 'var(--accent)' : 'var(--muted)'; s.innerHTML = p.icon; return s; })(),
      h('span', { style: { color: addState.payMethod === p.id ? 'var(--accent)' : 'var(--fg)' } }, p.name)
    );
    payGrid.appendChild(item);
  });
  el.appendChild(payGrid);

  // Note
  el.appendChild(
    h('div', { className: 'form-group' },
      h('label', { className: 'form-label' }, '备注'),
      h('input', { className: 'form-input', type: 'text', placeholder: '添加备注（可选）', value: addState.note, onInput: e => addState.note = e.target.value })
    )
  );

  // Date
  el.appendChild(
    h('div', { className: 'form-group' },
      h('label', { className: 'form-label' }, '日期'),
      h('input', { className: 'form-input', type: 'date', value: addState.date, onInput: e => addState.date = e.target.value })
    )
  );

  // Numpad
  el.appendChild(buildNumpad());

  // Submit button
  el.appendChild(
    h('button', {
      className: 'btn-primary',
      onClick: () => {
        const amount = parseFloat(addState.amount);
        if (!amount || amount <= 0) { toast('请输入金额'); return; }
        addTransaction({
          type: addState.type,
          category: addState.category,
          amount: amount,
          payMethod: addState.payMethod,
          note: addState.note,
          date: addState.date
        });
        toast('记录成功');
        addState.amount = '0';
        addState.note = '';
        navigate('home');
      }
    }, '确认记账')
  );
}

function buildNumpad() {
  const wrap = h('div', { style: { padding: '0 16px 12px' } });
  const grid = h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' } });
  const keys = ['1','2','3','⌫','4','5','6','+','7','8','9','0','00','.','-','确认'];

  keys.forEach(k => {
    const isConfirm = k === '确认';
    const isOp = k === '⌫' || k === '+' || k === '-' || k === '.';
    const btn = h('button', {
      style: {
        padding: '12px 0',
        fontSize: isConfirm ? '13px' : '18px',
        fontWeight: '600',
        fontFamily: isConfirm ? 'var(--font)' : 'var(--mono)',
        background: isConfirm ? 'var(--accent)' : isOp ? 'var(--bg)' : 'var(--surface)',
        color: isConfirm ? '#fff' : 'var(--fg)',
        border: isConfirm ? 'none' : '1px solid var(--border)',
        borderRadius: '10px',
        cursor: 'pointer',
        gridColumn: isConfirm ? 'span 4' : ''
      },
      onClick: () => handleNumKey(k)
    }, k);
    grid.appendChild(btn);
  });
  wrap.appendChild(grid);
  return wrap;
}

function handleNumKey(key) {
  if (key === '确认') {
    const amount = parseFloat(addState.amount);
    if (!amount || amount <= 0) { toast('请输入金额'); return; }
    addTransaction({
      type: addState.type,
      category: addState.category,
      amount: amount,
      payMethod: addState.payMethod,
      note: addState.note,
      date: addState.date
    });
    toast('记录成功');
    addState.amount = '0';
    addState.note = '';
    navigate('home');
    return;
  }
  if (key === '⌫') {
    addState.amount = addState.amount.length > 1 ? addState.amount.slice(0, -1) : '0';
  } else if (key === '.' && addState.amount.includes('.')) {
    return;
  } else if (addState.amount === '0' && key !== '.') {
    addState.amount = key;
  } else {
    addState.amount += key;
  }
  const numEl = $('#amount-num');
  if (numEl) numEl.textContent = addState.amount;
}

// ─── Stats View ───────────────────────────────────────────
let statsPeriod = 'month';

function renderStats() {
  const header = $('#header');
  header.innerHTML = '<div><h1>统计</h1></div><div></div>';

  const el = $('#view-stats');
  el.innerHTML = '';

  // Period tabs
  const tabs = h('div', { className: 'stats-tabs' });
  ['week', 'month', 'year'].forEach(p => {
    tabs.appendChild(h('button', {
      className: 'stats-tab' + (statsPeriod === p ? ' active' : ''),
      onClick: () => { statsPeriod = p; renderStats(); }
    }, p === 'week' ? '本周' : p === 'month' ? '本月' : '本年'));
  });
  el.appendChild(tabs);

  // Get data for period
  let txns;
  const now = new Date();
  if (statsPeriod === 'week') {
    const data = loadData();
    const weekAgo = new Date(now); weekAgo.setDate(weekAgo.getDate() - 7);
    txns = data.transactions.filter(t => new Date(t.date) >= weekAgo);
  } else if (statsPeriod === 'month') {
    txns = getMonthTxns();
  } else {
    const data = loadData();
    const year = now.getFullYear().toString();
    txns = data.transactions.filter(t => t.date && t.date.startsWith(year));
  }

  const s = calcSummary(txns);
  const breakdown = calcCatBreakdown(txns, 'expense');
  const total = breakdown.reduce((sum, b) => sum + b.amount, 0);

  if (txns.length === 0) {
    el.appendChild(h('div', { className: 'empty-state', style: { paddingTop: '60px' } },
      (() => { const s = document.createElementNS('http://www.w3.org/2000/svg','svg'); s.setAttribute('viewBox','0 0 24 24'); s.innerHTML = ICONS.barChart; return s; })(),
      h('p', {}, '暂无数据')
    ));
    return;
  }

  // Summary row
  el.appendChild(
    h('div', { className: 'pad', style: { paddingTop: '12px', paddingBottom: '12px' } },
      h('div', { className: 'card', style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'center' } },
        h('div', {},
          h('div', { className: 'text-xs text-muted' }, '收入'),
          h('div', { className: 'num fw-600', style: { color: 'var(--green)', fontSize: '16px', marginTop: '4px' } }, '¥' + fmt(s.income))
        ),
        h('div', {},
          h('div', { className: 'text-xs text-muted' }, '支出'),
          h('div', { className: 'num fw-600', style: { fontSize: '16px', marginTop: '4px' } }, '¥' + fmt(s.expense))
        ),
        h('div', {},
          h('div', { className: 'text-xs text-muted' }, '结余'),
          h('div', { className: 'num fw-600', style: { color: s.balance >= 0 ? 'var(--green)' : 'var(--red)', fontSize: '16px', marginTop: '4px' } }, '¥' + fmt(s.balance))
        )
      )
    )
  );

  // Donut chart
  if (breakdown.length > 0) {
    const donutCard = h('div', { className: 'pad', style: { marginBottom: '12px' } },
      h('div', { className: 'card' },
        h('div', { style: { fontSize: '13px', fontWeight: '600', marginBottom: '12px' } }, '支出构成')
      )
    );
    const donutWrap = h('div', { className: 'donut-wrap' });

    // SVG donut
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100'); svg.setAttribute('height', '100');
    svg.setAttribute('viewBox', '0 0 42 42');
    svg.style.flexShrink = '0';
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', '21'); circle.setAttribute('cy', '21');
    circle.setAttribute('r', '15.915'); circle.setAttribute('fill', 'var(--bg)');
    svg.appendChild(circle);

    let offset = 0;
    breakdown.forEach(b => {
      const catInfo = getCatInfo(b.cat, 'expense');
      const pct = (b.amount / total * 100);
      const dash = document.createElementNS(svgNS, 'circle');
      dash.setAttribute('cx', '21'); dash.setAttribute('cy', '21');
      dash.setAttribute('r', '15.915'); dash.setAttribute('fill', 'none');
      dash.setAttribute('stroke', catInfo.color); dash.setAttribute('stroke-width', '4');
      dash.setAttribute('stroke-dasharray', pct + ' ' + (100 - pct));
      dash.setAttribute('stroke-dashoffset', -offset);
      svg.appendChild(dash);
      offset += pct;
    });

    // Center text
    const centerText = document.createElementNS(svgNS, 'text');
    centerText.setAttribute('x', '21'); centerText.setAttribute('y', '22');
    centerText.setAttribute('text-anchor', 'middle'); centerText.setAttribute('font-size', '5');
    centerText.setAttribute('font-weight', '700'); centerText.setAttribute('fill', 'var(--fg)');
    centerText.setAttribute('font-family', 'var(--mono)');
    centerText.textContent = '¥' + fmt(total);
    svg.appendChild(centerText);

    donutWrap.appendChild(svg);

    // Legend
    const legend = h('div', { className: 'donut-legend' });
    breakdown.forEach(b => {
      const catInfo = getCatInfo(b.cat, 'expense');
      const pct = Math.round(b.amount / total * 100);
      legend.appendChild(
        h('div', { className: 'legend-item' },
          h('span', { className: 'legend-dot', style: { background: catInfo.color } }),
          h('span', {}, catInfo.name),
          h('span', { className: 'legend-pct' }, pct + '%')
        )
      );
    });
    donutWrap.appendChild(legend);
    donutCard.firstChild.appendChild(donutWrap);
    el.appendChild(donutCard);
  }

  // Ranking
  if (breakdown.length > 0) {
    el.appendChild(h('div', { className: 'section-label' }, '消费排行'));
    const rankCard = h('div', { className: 'card rank-list' });
    const maxAmount = breakdown[0].amount;
    breakdown.forEach((b, i) => {
      const catInfo = getCatInfo(b.cat, 'expense');
      rankCard.appendChild(
        h('div', { className: 'rank-row' },
          h('span', { className: 'rank-num' }, String(i + 1)),
          h('span', { className: 'rank-name' }, catInfo.name),
          h('div', { className: 'rank-bar-bg' },
            h('div', { className: 'rank-bar-fill', style: { width: (b.amount/maxAmount*100)+'%', background: catInfo.color } })
          ),
          h('span', { className: 'rank-amount' }, '¥' + fmt(b.amount))
        )
      );
    });
    el.appendChild(h('div', { className: 'pad' }, rankCard));
  }
}

// ─── Money View ───────────────────────────────────────────
function renderMoney() {
  const header = $('#header');
  header.innerHTML = '<div><h1>钱袋</h1></div><div></div>';

  const el = $('#view-money');
  el.innerHTML = '';

  const data = loadData();
  const year = new Date().getFullYear().toString();
  const yearTxns = data.transactions.filter(t => t.date && t.date.startsWith(year));
  const yearIncome = yearTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const yearExpense = yearTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const monthTxns = getMonthTxns();
  const monthIncome = monthTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const monthExpense = monthTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const savingsRate = monthIncome > 0 ? Math.round((monthIncome - monthExpense) / monthIncome * 100) : 0;

  // Summary cards
  el.appendChild(
    h('div', { className: 'money-summary' },
      h('div', { className: 'money-card', style: { background: 'var(--green-soft)', borderColor: 'var(--green)' } },
        h('div', { className: 'label' }, '本月收入'),
        h('div', { className: 'value num', style: { color: 'var(--green)' } }, '¥' + fmt(monthIncome))
      ),
      h('div', { className: 'money-card', style: { background: 'var(--red-soft)', borderColor: 'var(--red)' } },
        h('div', { className: 'label' }, '本月支出'),
        h('div', { className: 'value num', style: { color: 'var(--red)' } }, '¥' + fmt(monthExpense))
      )
    )
  );

  // Savings rate
  el.appendChild(
    h('div', { className: 'pad', style: { marginBottom: '12px' } },
      h('div', { className: 'card' },
        h('div', { className: 'flex-between', style: { marginBottom: '8px' } },
          h('span', { style: { fontSize: '13px', fontWeight: '600' } }, '储蓄率'),
          h('span', { className: 'num fw-600', style: { fontSize: '18px', color: savingsRate >= 0 ? 'var(--green)' : 'var(--red)' } }, savingsRate + '%')
        ),
        h('div', { style: { height: '6px', background: 'var(--border)', borderRadius: '3px', overflow: 'hidden' } },
          h('div', { style: { height: '100%', width: Math.max(0, savingsRate) + '%', background: 'var(--green)', borderRadius: '3px', transition: 'width 0.3s' } })
        ),
        h('div', { className: 'text-xs text-muted', style: { marginTop: '6px' } }, '净结余 ¥' + fmt(monthIncome - monthExpense))
      )
    )
  );

  // Income sources
  const incomeBreakdown = calcCatBreakdown(monthTxns, 'income');
  if (incomeBreakdown.length > 0) {
    el.appendChild(h('div', { className: 'section-label' }, '本月收入来源'));
    const listCard = h('div', { className: 'card', style: { margin: '0 16px 12px', padding: '4px 14px' } });
    incomeBreakdown.forEach(b => {
      const catInfo = getCatInfo(b.cat, 'income');
      listCard.appendChild(
        h('div', { className: 'sav-row' },
          h('div', { className: 'sav-icon', style: { background: catInfo.bg, color: catInfo.color } },
            (() => { const s = document.createElementNS('http://www.w3.org/2000/svg','svg'); s.setAttribute('viewBox','0 0 24 24'); s.innerHTML = catInfo.icon; return s; })()
          ),
          h('div', { className: 'sav-info' },
            h('div', { className: 'sav-name' }, catInfo.name),
            h('div', { className: 'sav-progress' }, '¥' + fmt(b.amount))
          ),
          h('span', { className: 'num fw-600', style: { color: 'var(--green)', fontSize: '14px' } }, '+¥' + fmt(b.amount))
        )
      );
    });
    el.appendChild(listCard);
  }

  // Savings goals
  el.appendChild(h('div', { className: 'section-label' }, '存款目标'));
  const goalsCard = h('div', { className: 'card', style: { margin: '0 16px 16px', padding: '4px 14px' } });
  const goals = [
    { name: '应急基金', current: 800, target: 2000, color: 'var(--green)' },
    { name: '旅行基金', current: 350, target: 1500, color: 'var(--accent)' },
    { name: '数码产品', current: 1200, target: 3000, color: 'var(--teal)' }
  ];
  goals.forEach(g => {
    const pct = Math.round(g.current / g.target * 100);
    goalsCard.appendChild(
      h('div', { className: 'sav-row' },
        h('div', { className: 'sav-icon', style: { background: 'var(--blue-soft)', color: 'var(--accent)' } },
          (() => { const s = document.createElementNS('http://www.w3.org/2000/svg','svg'); s.setAttribute('viewBox','0 0 24 24'); s.innerHTML = ICONS.target; return s; })()
        ),
        h('div', { className: 'sav-info' },
          h('div', { className: 'sav-name' }, g.name),
          h('div', { className: 'sav-progress' }, '¥' + fmt(g.current) + ' / ¥' + fmt(g.target))
        ),
        h('div', {},
          h('div', { className: 'sav-bar', style: { width: '60px' } },
            h('div', { className: 'sav-bar-fill', style: { width: pct + '%', background: g.color } })
          ),
          h('div', { className: 'text-xs text-muted', style: { textAlign: 'center', marginTop: '2px' } }, pct + '%')
        )
      )
    );
  });
  el.appendChild(goalsCard);
}

// ─── More View ────────────────────────────────────────────
function renderMore() {
  const header = $('#header');
  header.innerHTML = '<div><h1>更多</h1></div><div></div>';

  const el = $('#view-more');
  el.innerHTML = '';

  const menuData = [
    { icon: 'users', color: 'var(--accent)', bg: 'var(--accent-soft)', title: '共享账本', sub: '和同学AA制记账', action: () => showGroupModal() },
    { icon: 'refresh', color: 'var(--teal)', bg: 'var(--green-soft)', title: '云同步', sub: supabase ? '同步数据到云端' : '未配置云服务', action: () => syncCloud() },
    { icon: 'calendar', color: 'var(--teal)', bg: 'var(--green-soft)', title: '每周统计', sub: '周度收支对比分析', action: () => navigate('stats') },
    { icon: 'pieChart', color: 'var(--pink)', bg: 'var(--pink-soft)', title: '每月综合分析', sub: '月度全方位财务报告', action: () => navigate('stats') },
    { icon: 'download', color: 'var(--green)', bg: 'var(--green-soft)', title: '导出数据', sub: '备份记账数据到文件', action: () => exportData() },
    { icon: 'upload', color: 'var(--amber)', bg: 'var(--amber-soft)', title: '导入数据', sub: '从备份文件恢复数据', action: () => importData() },
    { icon: 'settings', color: 'var(--muted)', bg: 'var(--bg)', title: '设置', sub: '预算、主题、关于', action: () => showSettings() }
  ];

  const menuList = h('div', { className: 'menu-list' });
  menuData.forEach(m => {
    menuList.appendChild(
      h('div', { className: 'menu-item', onClick: m.action },
        h('div', { className: 'menu-icon', style: { background: m.bg, color: m.color } },
          (() => { const s = document.createElementNS('http://www.w3.org/2000/svg','svg'); s.setAttribute('viewBox','0 0 24 24'); s.innerHTML = ICONS[m.icon]; return s; })()
        ),
        h('div', { className: 'menu-text' },
          h('div', { className: 'menu-title' }, m.title),
          h('div', { className: 'menu-sub' }, m.sub)
        ),
        h('span', { className: 'menu-arrow' }, '›')
      )
    );
  });
  el.appendChild(h('div', { className: 'card', style: { margin: '16px', padding: '0 14px' } }, menuList));

  // Group info
  const data = loadData();
  if (data.groupId) {
    el.appendChild(
      h('div', { className: 'pad' },
        h('div', { className: 'card', style: { textAlign: 'center' } },
          h('div', { className: 'text-xs text-muted', style: { marginBottom: '4px' } }, '当前团体码'),
          h('div', { className: 'num fw-600', style: { fontSize: '20px', color: 'var(--accent)', letterSpacing: '0.1em' } }, data.groupId),
          h('div', { className: 'text-xs text-muted', style: { marginTop: '6px' } }, '分享此码给室友加入')
        )
      )
    );
  }
}

// ─── Group Modal ──────────────────────────────────────────
function showGroupModal() {
  const data = loadData();
  const overlay = h('div', { className: 'modal-overlay', onClick: e => { if (e.target === overlay) overlay.classList.remove('show'); } });
  const sheet = h('div', { className: 'modal-sheet' });
  sheet.appendChild(h('div', { className: 'modal-handle' }));
  sheet.appendChild(h('div', { className: 'modal-title' }, '共享账本'));

  if (data.groupId) {
    sheet.appendChild(
      h('div', { className: 'code-display' },
        h('div', { className: 'code-value' }, data.groupId),
        h('div', { className: 'code-hint' }, '将此码分享给室友，他们输入后即可同步数据')
      )
    );
    sheet.appendChild(h('button', {
      className: 'btn-primary',
      style: { marginTop: '8px' },
      onClick: () => {
        navigator.clipboard.writeText(data.groupId).then(() => toast('团体码已复制'));
        overlay.classList.remove('show');
      }
    }, '复制团体码'));
    sheet.appendChild(h('button', {
      className: 'btn-primary',
      style: { marginTop: '8px', background: 'var(--red)' },
      onClick: () => {
        if (confirm('确定退出当前团体？')) {
          const d = loadData(); d.groupId = null; saveData(d);
          overlay.classList.remove('show');
          renderMore();
          toast('已退出团体');
        }
      }
    }, '退出团体'));
  } else {
    sheet.appendChild(h('div', { className: 'text-sm text-muted', style: { textAlign: 'center', marginBottom: '12px' } }, '创建新团体或输入室友分享的团体码'));
    sheet.appendChild(h('button', {
      className: 'btn-primary',
      style: { marginBottom: '8px' },
      onClick: () => {
        const code = Math.random().toString(36).slice(2, 8).toUpperCase();
        const d = loadData(); d.groupId = code; saveData(d);
        overlay.classList.remove('show');
        renderMore();
        toast('团体已创建：' + code);
        syncCloud();
      }
    }, '创建新团体'));
    const input = h('input', { className: 'form-input', style: { textAlign: 'center', fontFamily: 'var(--mono)', fontSize: '16px', letterSpacing: '0.1em', marginBottom: '8px' }, placeholder: '输入6位团体码', maxLength: '6' });
    sheet.appendChild(input);
    sheet.appendChild(h('button', {
      className: 'btn-primary',
      style: { background: 'var(--green)' },
      onClick: () => {
        const code = input.value.trim().toUpperCase();
        if (code.length < 4) { toast('请输入有效团体码'); return; }
        const d = loadData(); d.groupId = code; saveData(d);
        overlay.classList.remove('show');
        renderMore();
        toast('已加入团体：' + code);
        syncCloud();
      }
    }, '加入团体'));
  }

  overlay.appendChild(sheet);
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('show'));
}

// ─── Settings ─────────────────────────────────────────────
function showSettings() {
  const data = loadData();
  const overlay = h('div', { className: 'modal-overlay', onClick: e => { if (e.target === overlay) overlay.classList.remove('show'); } });
  const sheet = h('div', { className: 'modal-sheet' });
  sheet.appendChild(h('div', { className: 'modal-handle' }));
  sheet.appendChild(h('div', { className: 'modal-title' }, '设置'));

  // Budget setting
  const budgetInput = h('input', { className: 'form-input', type: 'number', value: String(data.budget || 2000), style: { marginBottom: '12px' } });
  sheet.appendChild(h('div', { className: 'form-label' }, '月度预算（元）'));
  sheet.appendChild(budgetInput);

  sheet.appendChild(h('button', {
    className: 'btn-primary',
    onClick: () => {
      const d = loadData();
      d.budget = parseInt(budgetInput.value) || 2000;
      saveData(d);
      overlay.classList.remove('show');
      toast('预算已更新');
      if (currentView === 'home') renderHome();
    }
  }, '保存设置'));

  // Clear data
  sheet.appendChild(h('button', {
    className: 'btn-primary',
    style: { marginTop: '8px', background: 'var(--red)' },
    onClick: () => {
      if (confirm('确定清除所有数据？此操作不可恢复！')) {
        localStorage.removeItem(STORAGE_KEY);
        overlay.classList.remove('show');
        toast('数据已清除');
        navigate('home');
      }
    }
  }, '清除所有数据'));

  overlay.appendChild(sheet);
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('show'));
}

// ─── Export / Import ──────────────────────────────────────
function exportData() {
  const data = loadData();
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = '轻记备份_' + todayStr() + '.json';
  a.click();
  URL.revokeObjectURL(url);
  toast('数据已导出');
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.transactions) {
          saveData(data);
          toast('数据已导入');
          navigate('home');
        } else {
          toast('文件格式不正确');
        }
      } catch(e) {
        toast('导入失败：文件格式错误');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// ─── Init ─────────────────────────────────────────────────
function init() {
  // Initialize cloud sync
  initSupabase();
  getUserId();

  // Tab navigation
  $$('.tab').forEach(tab => {
    tab.addEventListener('click', e => {
      e.preventDefault();
      navigate(tab.dataset.view);
    });
  });

  // Register service worker with update detection
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(reg => {
      // Check for updates on each page load
      reg.update();
      // When a new SW is waiting, tell it to activate immediately
      if (reg.waiting) {
        reg.waiting.postMessage('skipWaiting');
      }
      // Detect new SW installation
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content available, activate it
            newWorker.postMessage('skipWaiting');
            // Reload to get new content
            setTimeout(() => location.reload(), 500);
          }
        });
      });
    }).catch(() => {});

    // Reload when the controlling SW changes (new version activated)
    let reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (reloading) return;
      reloading = true;
      location.reload();
    });
  }

  // Initial render
  renderHome();
}

document.addEventListener('DOMContentLoaded', init);

})();
