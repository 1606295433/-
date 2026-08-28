/* ─── 轻记 PWA v2 ────────────────────────────────────────── */
(function() {
'use strict';

// ─── Constants ────────────────────────────────────────────
const CATS = {
  expense: [
    { id: 'food',      name: '餐饮', color: '#F59E0B', bg: 'var(--amber-soft)',  icon: '<path d="M3 11h18M5 11V7a2 2 0 0 1 2-2h10v6M7 19h10a2 2 0 0 0 2-2v-6H5v6a2 2 0 0 0 2 2z"/>' },
    { id: 'transport', name: '交通', color: '#2563EB', bg: 'var(--blue-soft)',   icon: '<rect x="3" y="7" width="18" height="10" rx="2"/><path d="M7 11h4M15 11h2"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/>' },
    { id: 'shop',      name: '购物', color: '#EC4899', bg: 'var(--pink-soft)',   icon: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>' },
    { id: 'housing',   name: '住宿', color: '#8B5CF6', bg: 'var(--purple-soft)', icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
    { id: 'rent',      name: '房租', color: '#7C3AED', bg: 'var(--purple-soft)', icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><rect x="9" y="14" width="6" height="8"/>' },
    { id: 'water',     name: '水费', color: '#0EA5E9', bg: 'var(--sky-soft)',    icon: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>' },
    { id: 'electric',  name: '电费', color: '#EAB308', bg: 'var(--amber-soft)',  icon: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>' },
    { id: 'phone',     name: '话费', color: '#6366F1', bg: 'var(--indigo-soft)', icon: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>' },
    { id: 'study',     name: '学习', color: '#14B8A6', bg: 'var(--green-soft)',  icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>' },
    { id: 'fun',       name: '娱乐', color: '#10B981', bg: 'var(--green-soft)',  icon: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>' },
    { id: 'other',     name: '其他', color: '#F97316', bg: 'var(--orange-soft)', icon: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>' }
  ],
  income: [
    { id: 'salary',    name: '工资',   color: '#10B981', bg: 'var(--green-soft)',  icon: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>' },
    { id: 'parttime',  name: '兼职',   color: '#2563EB', bg: 'var(--blue-soft)',   icon: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>' },
    { id: 'bonus',     name: '奖金',   color: '#F59E0B', bg: 'var(--amber-soft)',  icon: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' },
    { id: 'gift',      name: '红包',   color: '#EF4444', bg: 'var(--red-soft)',    icon: '<path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/>' },
    { id: 'transfer',  name: '转账',   color: '#06B6D4', bg: 'var(--cyan-soft)',   icon: '<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>' },
    { id: 'refund',    name: '退款',   color: '#14B8A6', bg: 'var(--green-soft)',  icon: '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>' },
    { id: 'other_in',  name: '其他',   color: '#F97316', bg: 'var(--orange-soft)', icon: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>' }
  ]
};

const PAY_METHODS = [
  { id: 'wechat',  name: '微信',     icon: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>', credit: false },
  { id: 'alipay',  name: '支付宝',   icon: '<circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/>', credit: false },
  { id: 'bank',    name: '银行卡',   icon: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20"/>', credit: false },
  { id: 'cash',    name: '现金',     icon: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>', credit: false },
  { id: 'huabei',      name: '花呗',       icon: '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>', credit: true },
  { id: 'douyin',      name: '抖音月付',   icon: '<circle cx="12" cy="12" r="9"/><path d="M12 6v8"/><circle cx="12" cy="16" r="1"/>', credit: true },
  { id: 'meituan',     name: '美团月付',   icon: '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>', credit: true },
  { id: 'wxcredit',    name: '先用后付',   icon: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', credit: true },
  { id: 'jdbaitiao',   name: '京东白条',   icon: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M12 9v6M9 12h6"/>', credit: true },
  { id: 'creditcard',  name: '信用卡',     icon: '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>', credit: true }
];

const CREDIT_IDS = PAY_METHODS.filter(p => p.credit).map(p => p.id);

const STORAGE_KEY = 'qingji_data';
const USER_KEY    = 'qingji_user';

// ─── Supabase Cloud Sync (个人数据隔离) ──────────────────
const SUPABASE_URL = 'https://itafoblrdrmjalbldoddq.supabase.co';
const SUPABASE_KEY = 'sb_publishable_tuwwaA4uprOoICnSk-YUsA_8eAc_fpo';

let supabase = null;
let userId = '';
let syncTimer = null;

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

function getUserId() {
  if (userId) return userId;
  userId = localStorage.getItem(USER_KEY);
  if (!userId) {
    userId = 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    localStorage.setItem(USER_KEY, userId);
  }
  return userId;
}

// 推送单条记录到云端（按 user_id 隔离）
async function cloudPush(txn) {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('transactions')
      .upsert({
        id: txn.id,
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

// 拉取当前用户的云端数据
async function cloudPull() {
  if (!supabase) return [];
  try {
    const { data: rows, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', getUserId())
      .order('created_at', { ascending: false });
    if (error) { console.warn('Pull failed:', error); return []; }
    return rows || [];
  } catch(e) {
    console.warn('Pull error:', e);
    return [];
  }
}

// 合并云端数据到本地（按 ID 去重）
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
    data.transactions.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
    saveData(data);
  }
  return added;
}

// 全量同步（先推后拉）
async function syncCloud() {
  if (!supabase) { toast('未配置云服务'); return 0; }
  toast('同步中...');
  const data = loadData();
  for (const txn of data.transactions) {
    await cloudPush(txn);
  }
  const rows = await cloudPull();
  const added = mergeCloudData(rows);
  toast(added > 0 ? '同步完成，新增 ' + added + ' 条' : '同步完成');
  return added;
}

// 防抖自动同步
function scheduleSync() {
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    if (supabase) {
      cloudPull().then(rows => {
        const added = mergeCloudData(rows);
        if (added > 0 && currentView === 'home') renderHome();
      });
    }
  }, 2000);
}

// Supabase 建表 SQL（v2 - 个人数据隔离模式）：
/*
-- 如果之前已建表，先删除旧表
-- DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions (
  id TEXT PRIMARY KEY,
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

CREATE INDEX idx_transactions_user ON transactions(user_id);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow_all" ON transactions FOR ALL USING (true) WITH CHECK (true);
*/

// ─── Data Layer ───────────────────────────────────────────
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const d = JSON.parse(raw);
      // 兼容旧数据：补齐新字段
      if (!d.debts) d.debts = [];
      if (!d.savings) d.savings = [];
      if (!d.goals) d.goals = [];
      if (d.groupId !== undefined) delete d.groupId;
      return d;
    }
  } catch(e) {}
  return { transactions: [], budget: 2000, debts: [], savings: [], goals: [] };
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function addTransaction(txn) {
  const data = loadData();
  txn.id = genId();
  txn.createdAt = new Date().toISOString();
  data.transactions.unshift(txn);
  saveData(data);
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
  return PAY_METHODS.find(p => p.id === payId) || { name: payId, icon: '', credit: false };
}

function isCreditPay(payId) {
  return CREDIT_IDS.includes(payId);
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

// 获取信用消费欠款汇总（从交易记录中计算）
function getCreditOutstanding() {
  const data = loadData();
  const map = {};
  data.transactions.forEach(t => {
    if (t.type === 'expense' && isCreditPay(t.payMethod)) {
      if (!map[t.payMethod]) map[t.payMethod] = 0;
      map[t.payMethod] += t.amount;
    }
  });
  return map;
}

// 检查即将到期的还款提醒（7天内）
function getUpcomingDueDates() {
  const data = loadData();
  const now = new Date();
  const weekLater = new Date(now);
  weekLater.setDate(weekLater.getDate() + 7);
  const reminders = [];
  CREDIT_IDS.forEach(cid => {
    const dueDate = data['due_' + cid];
    if (dueDate) {
      const dd = new Date(dueDate);
      if (dd <= weekLater && dd >= now) {
        const days = Math.ceil((dd - now) / (1000 * 60 * 60 * 24));
        const payInfo = getPayInfo(cid);
        reminders.push({ payMethod: cid, name: payInfo.name, dueDate: dueDate, daysLeft: days });
      }
    }
  });
  return reminders;
}

// ─── SVG Icons (reusable) ────────────────────────────────
const ICONS = {
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  cloud: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>',
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
  creditCard: '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
  dollarSign: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  lightbulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>',
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
  const pct = budget > 0 ? Math.min(Math.round(s.expense / budget * 100), 100) : 0;
  const recent = txns.slice(0, 8);

  const header = $('#header');
  header.innerHTML = '<div><h1>轻记</h1></div><div style="display:flex;gap:8px;"><button class="icon-btn" id="btn-bell">' +
    '<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></button></div>';

  const el = $('#view-home');
  el.innerHTML = '';

  // 还款提醒
  const reminders = getUpcomingDueDates();
  if (reminders.length > 0) {
    const reminderSection = h('div', { className: 'pad', style: { marginBottom: '12px' } });
    reminders.forEach(r => {
      reminderSection.appendChild(
        h('div', { className: 'alert-card danger', style: { cursor: 'pointer' }, onClick: () => navigate('more') },
          (() => { const s = document.createElementNS('http://www.w3.org/2000/svg','svg'); s.setAttribute('viewBox','0 0 24 24'); s.innerHTML = ICONS.alertTri; return s; })(),
          h('div', { className: 'alert-text' },
            h('div', { className: 'alert-title' }, r.name + '还款提醒'),
            h('div', { className: 'alert-sub' }, r.daysLeft <= 0 ? '今天到期，请尽快还款！' : '还有 ' + r.daysLeft + ' 天到期（' + r.dueDate + '）')
          )
        )
      );
    });
    el.appendChild(reminderSection);
  }

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
      const payInfo = getPayInfo(t.payMethod);
      listCard.appendChild(
        h('div', { className: 'txn-row', onClick: () => { if(confirm('删除这条记录？')) { deleteTransaction(t.id); renderHome(); }} },
          h('div', { className: 'txn-icon', style: { background: catInfo.bg, color: catInfo.color } },
            (() => { const s = document.createElementNS('http://www.w3.org/2000/svg','svg'); s.setAttribute('viewBox','0 0 24 24'); s.innerHTML = catInfo.icon; return s; })()
          ),
          h('div', {},
            h('div', { className: 'txn-title' }, t.note || catInfo.name),
            h('div', { className: 'txn-sub' }, catInfo.name + ' · ' + payInfo.name + ' · ' + t.date)
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
      onClick: () => submitTransaction()
    }, '确认记账')
  );
}

function submitTransaction() {
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
  // 如果是信用消费，提醒设置还款日期
  if (addState.type === 'expense' && isCreditPay(addState.payMethod)) {
    const payInfo = getPayInfo(addState.payMethod);
    const data = loadData();
    if (!data['due_' + addState.payMethod]) {
      setTimeout(() => {
        if (confirm('您使用了' + payInfo.name + '消费，是否设置还款日期？')) {
          showDueDateModal(addState.payMethod);
        }
      }, 500);
    }
  }
  addState.amount = '0';
  addState.note = '';
  navigate('home');
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
    submitTransaction();
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
      h('p', {}, '暂无数据，开始记账后这里会显示统计')
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

    const centerText = document.createElementNS(svgNS, 'text');
    centerText.setAttribute('x', '21'); centerText.setAttribute('y', '22');
    centerText.setAttribute('text-anchor', 'middle'); centerText.setAttribute('font-size', '5');
    centerText.setAttribute('font-weight', '700'); centerText.setAttribute('fill', 'var(--fg)');
    centerText.setAttribute('font-family', 'var(--mono)');
    centerText.textContent = '¥' + fmt(total);
    svg.appendChild(centerText);

    donutWrap.appendChild(svg);

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

// ─── Money View (v2 - 用户自定义负债/存款/目标/建议) ─────
function renderMoney() {
  const header = $('#header');
  header.innerHTML = '<div><h1>钱袋</h1></div><div></div>';

  const el = $('#view-money');
  el.innerHTML = '';

  const data = loadData();
  const monthTxns = getMonthTxns();
  const monthIncome = monthTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const monthExpense = monthTxns.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const savingsRate = monthIncome > 0 ? Math.round((monthIncome - monthExpense) / monthIncome * 100) : 0;

  // Monthly summary
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

  // ── 我的负债 ──
  const debtsSection = h('div', { className: 'pad', style: { marginBottom: '12px' } });
  debtsSection.appendChild(h('div', { className: 'flex-between', style: { marginBottom: '8px' } },
    h('span', { className: 'section-label', style: { padding: 0, margin: 0 } }, '我的负债'),
    h('button', { className: 'add-debt-btn', onClick: () => showAddDebtModal() }, '+ 添加')
  ));
  if (data.debts.length === 0) {
    debtsSection.appendChild(h('div', { className: 'card', style: { textAlign: 'center', padding: '20px', color: 'var(--muted)', fontSize: '13px' } }, '暂无负债记录'));
  } else {
    data.debts.forEach((debt, idx) => {
      const paidPct = debt.totalAmount > 0 ? Math.round((debt.totalAmount - debt.remainingAmount) / debt.totalAmount * 100) : 0;
      debtsSection.appendChild(
        h('div', { className: 'card debt-card' },
          h('div', { className: 'flex-between', style: { marginBottom: '6px' } },
            h('span', { style: { fontWeight: '600', fontSize: '14px' } }, debt.name),
            h('button', { className: 'del-btn', onClick: () => { if(confirm('删除此负债？')) { const d = loadData(); d.debts.splice(idx, 1); saveData(d); renderMoney(); } } }, '×')
          ),
          h('div', { className: 'debt-detail' },
            h('span', {}, '总额 ¥' + fmt(debt.totalAmount)),
            h('span', {}, ' · 剩余 ¥' + fmt(debt.remainingAmount)),
            debt.monthlyPayment ? h('span', {}, ' · 月供 ¥' + fmt(debt.monthlyPayment)) : null,
            debt.dueDay ? h('span', { style: { color: 'var(--red)' } }, ' · 每月' + debt.dueDay + '日还款') : null
          ),
          h('div', { style: { height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden', marginTop: '8px' } },
            h('div', { style: { height: '100%', width: paidPct + '%', background: 'var(--green)', borderRadius: '2px' } })
          ),
          h('div', { className: 'text-xs text-muted', style: { marginTop: '4px' } }, '已还 ' + paidPct + '%')
        )
      );
    });
  }
  el.appendChild(debtsSection);

  // ── 我的存款 ──
  const savingsSection = h('div', { className: 'pad', style: { marginBottom: '12px' } });
  savingsSection.appendChild(h('div', { className: 'flex-between', style: { marginBottom: '8px' } },
    h('span', { className: 'section-label', style: { padding: 0, margin: 0 } }, '我的存款'),
    h('button', { className: 'add-debt-btn', onClick: () => showAddSavingsModal() }, '+ 添加')
  ));
  if (data.savings.length === 0) {
    savingsSection.appendChild(h('div', { className: 'card', style: { textAlign: 'center', padding: '20px', color: 'var(--muted)', fontSize: '13px' } }, '暂无存款记录'));
  } else {
    data.savings.forEach((sav, idx) => {
      savingsSection.appendChild(
        h('div', { className: 'card debt-card' },
          h('div', { className: 'flex-between', style: { marginBottom: '6px' } },
            h('span', { style: { fontWeight: '600', fontSize: '14px' } }, sav.name),
            h('button', { className: 'del-btn', onClick: () => { if(confirm('删除此存款？')) { const d = loadData(); d.savings.splice(idx, 1); saveData(d); renderMoney(); } } }, '×')
          ),
          h('div', { className: 'debt-detail' },
            h('span', {}, '余额 ¥' + fmt(sav.currentAmount)),
            sav.monthlyDeposit ? h('span', {}, ' · 月存 ¥' + fmt(sav.monthlyDeposit)) : null
          )
        )
      );
    });
  }
  el.appendChild(savingsSection);

  // ── 存款目标 ──
  const goalsSection = h('div', { className: 'pad', style: { marginBottom: '12px' } });
  goalsSection.appendChild(h('div', { className: 'flex-between', style: { marginBottom: '8px' } },
    h('span', { className: 'section-label', style: { padding: 0, margin: 0 } }, '存款目标'),
    h('button', { className: 'add-debt-btn', onClick: () => showAddGoalModal() }, '+ 添加')
  ));
  if (!data.goals || data.goals.length === 0) {
    goalsSection.appendChild(h('div', { className: 'card', style: { textAlign: 'center', padding: '20px', color: 'var(--muted)', fontSize: '13px' } }, '暂无存款目标'));
  } else {
    data.goals.forEach((goal, idx) => {
      const totalSavings = data.savings.reduce((s, v) => s + v.currentAmount, 0);
      const pct = goal.targetAmount > 0 ? Math.min(Math.round(totalSavings / goal.targetAmount * 100), 100) : 0;
      let progressText = '';
      if (goal.targetMonths) {
        const monthlyNeed = goal.targetAmount > 0 ? Math.ceil((goal.targetAmount - totalSavings) / goal.targetMonths) : 0;
        progressText = '需在 ' + goal.targetMonths + ' 个月内存 ¥' + fmt(goal.targetAmount) + '，每月需存 ¥' + fmt(monthlyNeed);
      } else if (goal.monthlyAmount) {
        const monthsNeeded = goal.monthlyAmount > 0 ? Math.ceil((goal.targetAmount - totalSavings) / goal.monthlyAmount) : 0;
        progressText = '每月存 ¥' + fmt(goal.monthlyAmount) + '，约需 ' + monthsNeeded + ' 个月达成';
      }
      goalsSection.appendChild(
        h('div', { className: 'card goal-card' },
          h('div', { className: 'flex-between', style: { marginBottom: '6px' } },
            h('span', { style: { fontWeight: '600', fontSize: '14px' } }, goal.name),
            h('button', { className: 'del-btn', onClick: () => { if(confirm('删除此目标？')) { const d = loadData(); d.goals.splice(idx, 1); saveData(d); renderMoney(); } } }, '×')
          ),
          h('div', { className: 'debt-detail' }, '目标 ¥' + fmt(goal.targetAmount) + ' · 当前 ¥' + fmt(totalSavings)),
          h('div', { style: { height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden', marginTop: '8px' } },
            h('div', { style: { height: '100%', width: pct + '%', background: 'var(--accent)', borderRadius: '2px' } })
          ),
          h('div', { className: 'text-xs', style: { marginTop: '4px', color: 'var(--accent)' } }, pct + '%'),
          progressText ? h('div', { className: 'text-xs text-muted', style: { marginTop: '4px' } }, progressText) : null
        )
      );
    });
  }
  el.appendChild(goalsSection);

  // ── 月度建议 ──
  const recommendations = generateRecommendations(data, monthIncome, monthExpense);
  if (recommendations.length > 0) {
    const recSection = h('div', { className: 'pad', style: { marginBottom: '12px' } });
    recSection.appendChild(h('div', { className: 'section-label', style: { padding: 0, marginBottom: '8px' } }, '本月建议'));
    const recCard = h('div', { className: 'card rec-card' });
    recommendations.forEach(r => {
      recCard.appendChild(
        h('div', { className: 'rec-item' },
          h('span', { className: 'rec-icon' }, r.icon),
          h('span', { className: 'rec-text' }, r.text)
        )
      );
    });
    recSection.appendChild(recCard);
    el.appendChild(recSection);
  }
}

function generateRecommendations(data, monthIncome, monthExpense) {
  const recs = [];
  const netIncome = monthIncome - monthExpense;
  const totalDebtPayment = (data.debts || []).reduce((s, d) => s + (d.monthlyPayment || 0), 0);
  const totalSavingsDeposit = (data.savings || []).reduce((s, v) => s + (v.monthlyDeposit || 0), 0);

  if (monthIncome === 0 && monthExpense === 0) return recs;

  if (monthExpense > monthIncome && monthIncome > 0) {
    recs.push({ icon: '⚠️', text: '本月支出超过收入，请注意控制开支，避免过度依赖信用消费。' });
  }
  if (totalDebtPayment > 0) {
    const debtRatio = Math.round(totalDebtPayment / Math.max(monthIncome, 1) * 100);
    if (debtRatio > 50) {
      recs.push({ icon: '💰', text: '还款占收入比 ' + debtRatio + '%，建议优先还清高息负债，减少非必要消费。' });
    } else {
      recs.push({ icon: '💰', text: '本月需还款 ¥' + fmt(totalDebtPayment) + '，请确保在还款日前准备好资金。' });
    }
  }
  if (netIncome > 0) {
    const savingsRatio = Math.round(netIncome / monthIncome * 100);
    if (savingsRatio >= 30) {
      recs.push({ icon: '🎯', text: '储蓄率达 ' + savingsRatio + '%，理财习惯很好！建议将多余资金按比例分配到存款目标中。' });
    } else if (savingsRatio >= 10) {
      recs.push({ icon: '🎯', text: '储蓄率 ' + savingsRatio + '%，建议尝试将储蓄率提高到 30% 以上。' });
    } else {
      recs.push({ icon: '🎯', text: '储蓄率偏低（' + savingsRatio + '%），建议制定更严格的预算，减少非必要开支。' });
    }
  }
  const creditOutstanding = getCreditOutstanding();
  const totalCredit = Object.values(creditOutstanding).reduce((s, v) => s + v, 0);
  if (totalCredit > 0) {
    recs.push({ icon: '💳', text: '当前信用消费待还 ¥' + fmt(totalCredit) + '，建议及时还款避免利息。' });
  }
  if (recs.length === 0 && monthIncome > 0) {
    recs.push({ icon: '📊', text: '本月收支状况良好，继续保持记账习惯，合理规划财务。' });
  }
  return recs;
}

// ─── Debt / Savings / Goal Modals ────────────────────────
function showAddDebtModal() {
  const overlay = h('div', { className: 'modal-overlay', onClick: e => { if (e.target === overlay) overlay.classList.remove('show'); } });
  const sheet = h('div', { className: 'modal-sheet' });
  sheet.appendChild(h('div', { className: 'modal-handle' }));
  sheet.appendChild(h('div', { className: 'modal-title' }, '添加负债'));

  const nameInput = h('input', { className: 'form-input', placeholder: '负债名称（如：助学贷款）' });
  const totalInput = h('input', { className: 'form-input', type: 'number', placeholder: '总金额' });
  const remainInput = h('input', { className: 'form-input', type: 'number', placeholder: '剩余金额' });
  const monthlyInput = h('input', { className: 'form-input', type: 'number', placeholder: '每月还款金额' });
  const dueDayInput = h('input', { className: 'form-input', type: 'number', placeholder: '还款日（每月几号，如 15）', min: '1', max: '31' });

  sheet.appendChild(h('div', { className: 'form-label' }, '名称'));
  sheet.appendChild(nameInput);
  sheet.appendChild(h('div', { className: 'form-label', style: { marginTop: '10px' } }, '总金额'));
  sheet.appendChild(totalInput);
  sheet.appendChild(h('div', { className: 'form-label', style: { marginTop: '10px' } }, '剩余金额'));
  sheet.appendChild(remainInput);
  sheet.appendChild(h('div', { className: 'form-label', style: { marginTop: '10px' } }, '月供金额'));
  sheet.appendChild(monthlyInput);
  sheet.appendChild(h('div', { className: 'form-label', style: { marginTop: '10px' } }, '还款日'));
  sheet.appendChild(dueDayInput);

  sheet.appendChild(h('button', {
    className: 'btn-primary',
    style: { marginTop: '16px' },
    onClick: () => {
      const name = nameInput.value.trim();
      const total = parseFloat(totalInput.value) || 0;
      const remain = parseFloat(remainInput.value) || total;
      const monthly = parseFloat(monthlyInput.value) || 0;
      const dueDay = parseInt(dueDayInput.value) || 0;
      if (!name) { toast('请输入名称'); return; }
      if (total <= 0) { toast('请输入总金额'); return; }
      const d = loadData();
      d.debts.push({ name, totalAmount: total, remainingAmount: remain, monthlyPayment: monthly, dueDay: dueDay || null });
      saveData(d);
      overlay.classList.remove('show');
      renderMoney();
      toast('负债已添加');
    }
  }, '保存'));

  overlay.appendChild(sheet);
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('show'));
}

function showAddSavingsModal() {
  const overlay = h('div', { className: 'modal-overlay', onClick: e => { if (e.target === overlay) overlay.classList.remove('show'); } });
  const sheet = h('div', { className: 'modal-sheet' });
  sheet.appendChild(h('div', { className: 'modal-handle' }));
  sheet.appendChild(h('div', { className: 'modal-title' }, '添加存款'));

  const nameInput = h('input', { className: 'form-input', placeholder: '存款名称（如：活期存款）' });
  const amountInput = h('input', { className: 'form-input', type: 'number', placeholder: '当前余额' });
  const monthlyInput = h('input', { className: 'form-input', type: 'number', placeholder: '每月存入金额（可选）' });

  sheet.appendChild(h('div', { className: 'form-label' }, '名称'));
  sheet.appendChild(nameInput);
  sheet.appendChild(h('div', { className: 'form-label', style: { marginTop: '10px' } }, '当前余额'));
  sheet.appendChild(amountInput);
  sheet.appendChild(h('div', { className: 'form-label', style: { marginTop: '10px' } }, '每月存入'));
  sheet.appendChild(monthlyInput);

  sheet.appendChild(h('button', {
    className: 'btn-primary',
    style: { marginTop: '16px' },
    onClick: () => {
      const name = nameInput.value.trim();
      const amount = parseFloat(amountInput.value) || 0;
      const monthly = parseFloat(monthlyInput.value) || 0;
      if (!name) { toast('请输入名称'); return; }
      const d = loadData();
      d.savings.push({ name, currentAmount: amount, monthlyDeposit: monthly });
      saveData(d);
      overlay.classList.remove('show');
      renderMoney();
      toast('存款已添加');
    }
  }, '保存'));

  overlay.appendChild(sheet);
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('show'));
}

function showAddGoalModal() {
  const overlay = h('div', { className: 'modal-overlay', onClick: e => { if (e.target === overlay) overlay.classList.remove('show'); } });
  const sheet = h('div', { className: 'modal-sheet' });
  sheet.appendChild(h('div', { className: 'modal-handle' }));
  sheet.appendChild(h('div', { className: 'modal-title' }, '添加存款目标'));

  const nameInput = h('input', { className: 'form-input', placeholder: '目标名称（如：旅行基金）' });
  const targetInput = h('input', { className: 'form-input', type: 'number', placeholder: '目标金额' });
  const monthsInput = h('input', { className: 'form-input', type: 'number', placeholder: '目标月数（多长时间内达成）' });
  const monthlyInput = h('input', { className: 'form-input', type: 'number', placeholder: '每月存入金额（与月数二选一）' });

  sheet.appendChild(h('div', { className: 'form-label' }, '目标名称'));
  sheet.appendChild(nameInput);
  sheet.appendChild(h('div', { className: 'form-label', style: { marginTop: '10px' } }, '目标金额'));
  sheet.appendChild(targetInput);
  sheet.appendChild(h('div', { className: 'form-label', style: { marginTop: '10px' } }, '目标月数'));
  sheet.appendChild(monthsInput);
  sheet.appendChild(h('div', { className: 'form-label', style: { marginTop: '10px' } }, '每月存入金额'));
  sheet.appendChild(monthlyInput);
  sheet.appendChild(h('div', { className: 'text-xs text-muted', style: { marginTop: '6px', textAlign: 'center' } }, '提示：填写目标月数或每月存入金额其中之一即可'));

  sheet.appendChild(h('button', {
    className: 'btn-primary',
    style: { marginTop: '16px' },
    onClick: () => {
      const name = nameInput.value.trim();
      const target = parseFloat(targetInput.value) || 0;
      const months = parseInt(monthsInput.value) || 0;
      const monthly = parseFloat(monthlyInput.value) || 0;
      if (!name) { toast('请输入目标名称'); return; }
      if (target <= 0) { toast('请输入目标金额'); return; }
      const d = loadData();
      if (!d.goals) d.goals = [];
      d.goals.push({ name, targetAmount: target, targetMonths: months || null, monthlyAmount: monthly || null });
      saveData(d);
      overlay.classList.remove('show');
      renderMoney();
      toast('目标已添加');
    }
  }, '保存'));

  overlay.appendChild(sheet);
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('show'));
}

// ─── More View ────────────────────────────────────────────
function renderMore() {
  const header = $('#header');
  header.innerHTML = '<div><h1>更多</h1></div><div></div>';

  const el = $('#view-more');
  el.innerHTML = '';

  const menuData = [
    { icon: 'cloud', color: 'var(--teal)', bg: 'var(--green-soft)', title: '云同步', sub: supabase ? '备份数据到云端' : '未配置云服务', action: () => showCloudSyncModal() },
    { icon: 'creditCard', color: 'var(--red)', bg: 'var(--red-soft)', title: '还款管理', sub: '管理信用消费还款日期', action: () => showRepaymentManage() },
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
}

// ─── Cloud Sync Modal (个人模式) ─────────────────────────
function showCloudSyncModal() {
  const overlay = h('div', { className: 'modal-overlay', onClick: e => { if (e.target === overlay) overlay.classList.remove('show'); } });
  const sheet = h('div', { className: 'modal-sheet' });
  sheet.appendChild(h('div', { className: 'modal-handle' }));
  sheet.appendChild(h('div', { className: 'modal-title' }, '云同步'));

  if (!supabase) {
    sheet.appendChild(h('div', { className: 'text-sm text-muted', style: { textAlign: 'center', padding: '20px' } }, '云服务未配置，请联系管理员设置 Supabase'));
  } else {
    const uid = getUserId();
    sheet.appendChild(h('div', { className: 'code-display' },
      h('div', { className: 'text-xs text-muted', style: { marginBottom: '8px' } }, '我的用户 ID'),
      h('div', { className: 'code-value', style: { fontSize: '16px' } }, uid),
      h('div', { className: 'code-hint' }, '您的数据与此 ID 绑定，换设备后输入 ID 即可恢复数据')
    ));
    sheet.appendChild(h('button', {
      className: 'btn-primary',
      onClick: () => {
        navigator.clipboard.writeText(uid).then(() => toast('用户 ID 已复制'));
      }
    }, '复制用户 ID'));
    sheet.appendChild(h('button', {
      className: 'btn-primary',
      style: { marginTop: '8px', background: 'var(--green)' },
      onClick: async () => {
        overlay.classList.remove('show');
        await syncCloud();
      }
    }, '立即同步'));

    // 恢复数据（输入他人或旧设备的用户ID）
    sheet.appendChild(h('div', { className: 'text-xs text-muted', style: { marginTop: '16px', textAlign: 'center' } }, '或输入旧设备的用户 ID 恢复数据'));
    const restoreInput = h('input', { className: 'form-input', style: { textAlign: 'center', fontFamily: 'var(--mono)', fontSize: '13px', marginTop: '8px' }, placeholder: '输入用户 ID' });
    sheet.appendChild(restoreInput);
    sheet.appendChild(h('button', {
      className: 'btn-primary',
      style: { marginTop: '8px', background: 'var(--amber)' },
      onClick: async () => {
        const inputId = restoreInput.value.trim();
        if (!inputId) { toast('请输入用户 ID'); return; }
        toast('恢复中...');
        try {
          const { data: rows, error } = await supabase
            .from('transactions')
            .select('*')
            .eq('user_id', inputId)
            .order('created_at', { ascending: false });
          if (error) { toast('恢复失败'); return; }
          const localData = loadData();
          const localIds = new Set(localData.transactions.map(t => t.id));
          let added = 0;
          (rows || []).forEach(row => {
            if (!localIds.has(row.id)) {
              localData.transactions.push({
                id: row.id, type: row.type, category: row.category,
                amount: row.amount, payMethod: row.pay_method,
                note: row.note, date: row.date, createdAt: row.created_at
              });
              added++;
            }
          });
          if (added > 0) {
            localData.transactions.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
            saveData(localData);
          }
          toast('恢复完成，新增 ' + added + ' 条记录');
          overlay.classList.remove('show');
          navigate('home');
        } catch(e) {
          toast('恢复失败');
        }
      }
    }, '恢复数据'));
  }

  overlay.appendChild(sheet);
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('show'));
}

// ─── Repayment Management ────────────────────────────────
function showRepaymentManage() {
  const overlay = h('div', { className: 'modal-overlay', onClick: e => { if (e.target === overlay) overlay.classList.remove('show'); } });
  const sheet = h('div', { className: 'modal-sheet' });
  sheet.appendChild(h('div', { className: 'modal-handle' }));
  sheet.appendChild(h('div', { className: 'modal-title' }, '还款管理'));

  const data = loadData();
  const creditOutstanding = getCreditOutstanding();
  let hasAny = false;

  CREDIT_IDS.forEach(cid => {
    const payInfo = getPayInfo(cid);
    const outstanding = creditOutstanding[cid] || 0;
    const dueDate = data['due_' + cid] || '';

    const row = h('div', { className: 'repay-row' },
      h('div', { className: 'repay-info' },
        h('div', { className: 'repay-name' }, payInfo.name),
        h('div', { className: 'repay-amount' }, outstanding > 0 ? '待还 ¥' + fmt(outstanding) : '未使用')
      ),
      h('div', { className: 'repay-date-wrap' },
        h('input', {
          className: 'form-input repay-date',
          type: 'date',
          value: dueDate,
          onChange: e => {
            const d = loadData();
            d['due_' + cid] = e.target.value;
            saveData(d);
            toast(payInfo.name + '还款日期已设置');
          }
        })
      )
    );
    sheet.appendChild(row);
    hasAny = true;
  });

  if (!hasAny) {
    sheet.appendChild(h('div', { className: 'text-sm text-muted', style: { textAlign: 'center', padding: '20px' } }, '暂无信用消费方式'));
  }

  sheet.appendChild(h('div', { className: 'text-xs text-muted', style: { marginTop: '12px', textAlign: 'center' } }, '使用信用消费后请设置还款日期，临近时会在首页提醒'));

  overlay.appendChild(sheet);
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('show'));
}

// 单独设置还款日期的弹窗（记账后触发）
function showDueDateModal(payMethodId) {
  const overlay = h('div', { className: 'modal-overlay', onClick: e => { if (e.target === overlay) overlay.classList.remove('show'); } });
  const sheet = h('div', { className: 'modal-sheet' });
  sheet.appendChild(h('div', { className: 'modal-handle' }));
  const payInfo = getPayInfo(payMethodId);
  sheet.appendChild(h('div', { className: 'modal-title' }, '设置' + payInfo.name + '还款日期'));

  const dateInput = h('input', { className: 'form-input', type: 'date', value: '' });
  sheet.appendChild(h('div', { className: 'form-label' }, '还款日期'));
  sheet.appendChild(dateInput);

  sheet.appendChild(h('button', {
    className: 'btn-primary',
    style: { marginTop: '16px' },
    onClick: () => {
      const d = loadData();
      d['due_' + payMethodId] = dateInput.value;
      saveData(d);
      overlay.classList.remove('show');
      toast('还款日期已设置');
    }
  }, '保存'));

  sheet.appendChild(h('button', {
    className: 'btn-primary',
    style: { marginTop: '8px', background: 'var(--muted)' },
    onClick: () => { overlay.classList.remove('show'); }
  }, '稍后再说'));

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
      reg.update();
      if (reg.waiting) {
        reg.waiting.postMessage('skipWaiting');
      }
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            newWorker.postMessage('skipWaiting');
            setTimeout(() => location.reload(), 500);
          }
        });
      });
    }).catch(() => {});

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
