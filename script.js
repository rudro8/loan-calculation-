/* =========================================
   LOAN MANAGEMENT APP — CORE LOGIC
   Locked Baseline Compatible
========================================= */

/* ---------- STORAGE KEYS ---------- */
const STORAGE_KEY = "loan_app_data_v1";

/* ---------- GLOBAL STATE ---------- */
let state = {
  members: [],
  activeMemberId: null
};

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  renderDashboard();
});

/* ---------- STORAGE ---------- */
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    state = JSON.parse(data);
  }
}

/* ---------- DASHBOARD ---------- */
function renderDashboard() {
  const totalCapital = state.members.reduce((s, m) => s + m.loanAmount, 0);
  const totalCollected = state.members.reduce((s, m) => s + m.collectedAmount, 0);
  const totalRemaining = totalCapital - totalCollected;

  setText("totalCapital", totalCapital);
  setText("totalCollected", totalCollected);
  setText("totalRemaining", totalRemaining);

  renderMemberList();
}

/* ---------- MEMBER LIST ---------- */
function renderMemberList() {
  const list = document.getElementById("memberList");
  if (!list) return;

  list.innerHTML = "";

  state.members.forEach(m => {
    const div = document.createElement("div");
    div.className = "member-item";
    div.onclick = () => openMember(m.id);

    div.innerHTML = `
      <h4>${m.name}</h4>
      <p>Loan: ৳${m.loanAmount}</p>
      <p>Remaining: ৳${m.loanAmount - m.collectedAmount}</p>
    `;
    list.appendChild(div);
  });
}

/* ---------- ADD MEMBER ---------- */
function addMember(form) {
  const member = {
    id: Date.now(),
    name: form.name.value.trim(),
    mobile: form.mobile.value.trim(),
    loanAmount: +form.loanAmount.value,
    loanType: form.loanType.value, // installment | profit
    totalInstallments: +form.totalInstallments.value || 0,
    profitRate: +form.profitRate.value || 0,
    collectedAmount: 0,
    records: []
  };

  state.members.push(member);
  saveState();
  renderDashboard();
  alert("Member added successfully");
  form.reset();
}

/* ---------- OPEN MEMBER ---------- */
function openMember(id) {
  state.activeMemberId = id;
  saveState();
  renderMemberProfile();
}

/* ---------- MEMBER PROFILE ---------- */
function renderMemberProfile() {
  const member = getActiveMember();
  if (!member) return;

  setText("spName", member.name);
  setText("spMobile", member.mobile);
  setText("spLoan", member.loanAmount);
  setText("spType", member.loanType);

  renderRecords();
}

/* ---------- RECORDS ---------- */
function renderRecords() {
  const member = getActiveMember();
  const tbody = document.getElementById("recordTable");
  if (!tbody) return;

  tbody.innerHTML = "";

  member.records.forEach((r, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${r.date}</td>
      <td>${r.amount}</td>
      <td>${member.loanAmount - r.totalCollected}</td>
    `;
    tbody.appendChild(tr);
  });
}

/* ---------- ADD RECORD ---------- */
function addRecord(form) {
  const member = getActiveMember();
  if (!member) return;

  const amount = +form.amount.value;
  member.collectedAmount += amount;

  member.records.push({
    date: new Date().toLocaleDateString("en-GB"),
    amount,
    totalCollected: member.collectedAmount
  });

  saveState();
  renderMemberProfile();
  renderDashboard();
  form.reset();
}

/* ---------- HELPERS ---------- */
function getActiveMember() {
  return state.members.find(m => m.id === state.activeMemberId);
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

/* ---------- BACK NAV ---------- */
function goBack() {
  history.back();
}জদ
window.submitMemberForm = submitMemberForm;
window.goHome = goHome; //
/* ========= EXPOSE TO WINDOW ========= */
window.submitMemberForm = submitMemberForm;
window.submitPayment = submitPayment;
window.closeAccount = closeAccount;
window.goHome = goHome;
