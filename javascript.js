if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify({
    "luxz": { "password": "12345", "expired": "2025-12-31" },
    "admin": { "password": "admin123", "expired": "2026-01-01" },
    "you": { "password": "youpower", "expired": "2025-12-31" }
  }));
}

const loginContainer = document.getElementById('loginContainer');
const mainPanel = document.getElementById('mainPanel');
const welcomeText = document.getElementById('welcomeText');
const expiredInfo = document.getElementById('expiredInfo');
const infoText = document.getElementById('info');

function login() {
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();
  if (!user || !pass) return infoText.innerText = "Isi semua kolom terlebih dahulu!";
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (users[user] && users[user].password === pass) {
    localStorage.setItem("currentUser", user);
    showMain(user);
  } else {
    infoText.innerText = "Username atau password salah!";
  }
}

function showMain(user) {
  const users = JSON.parse(localStorage.getItem("users"));
  loginContainer.classList.add('hidden');
  mainPanel.classList.remove('hidden');
  welcomeText.textContent = "Selamat Datang " + user + "!";
  expiredInfo.textContent = "Expired Akun : " + users[user].expired;
}

function logout() {
  localStorage.removeItem('currentUser');
  location.reload();
}

function autoLogin() {
  const savedUser = localStorage.getItem('currentUser');
  const users = JSON.parse(localStorage.getItem("users") || "{}");
  if (savedUser && users[savedUser]) showMain(savedUser);
}
autoLogin();

// AUDIO PLAYLIST
const audioFiles = [
  "https://d.uguu.se/VlZOQNJD.mp3",
  "https://h.uguu.se/haAUYyTZ.mp3",
  "https://d.uguu.se/NJowbVdq.mp3"
];
let currentTrack = 0;
const audio = document.getElementById("bgMusic");

audio.src = audioFiles[currentTrack];
audio.addEventListener("ended", () => {
  currentTrack = (currentTrack + 1) % audioFiles.length;
  audio.src = audioFiles[currentTrack];
  audio.play();
});

function toggleSound() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function nextSong() {
  currentTrack = (currentTrack + 1) % audioFiles.length;
  audio.src = audioFiles[currentTrack];
  audio.play();
}

function changeBackground() {
  const colors = ['#0f0f0f', '#1a1a1a', '#2a2a2a', '#202020', '#121212'];
  document.body.style.background = colors[Math.floor(Math.random() * colors.length)];
}

function showPopup(status, target, sender) {
  document.getElementById('popupStatus').textContent = status;
  document.getElementById('popupTarget').textContent = target + "@s.whatsapp.net";
  document.getElementById('popupSender').textContent = sender;
  const now = new Date();
  document.getElementById('popupDate').textContent =
    now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear() + ', ' + now.toLocaleTimeString();
  document.getElementById('resultPopup').style.display = 'block';
}

function closePopup() {
  document.getElementById('resultPopup').style.display = 'none';
}

function triggerIOSFreeze() {
  const target = document.getElementById("targetInput").value.trim();
  const sender = localStorage.getItem("currentUser") || "unknown";
  if (!target) return alert("Masukkan JID target!");
  fetch(`/api/freeze/ios?target=${encodeURIComponent(target)}`)
    .then(res => res.text())
    .then(response => showPopup(response.toLowerCase().includes("sukses") ? "Sukses" : "Gagal", target, sender))
    .catch(() => showPopup("Error", target, sender));
}

function triggerFreezeInvis() {
  const target = document.getElementById("targetInput").value.trim();
  const sender = localStorage.getItem("currentUser") || "unknown";
  if (!target) return alert("Masukkan JID target!");
  fetch(`/api/freeze/invis?target=${encodeURIComponent(target)}`)
    .then(res => res.text())
    .then(response => showPopup(response.toLowerCase().includes("sukses") ? "Sukses" : "Gagal", target, sender))
    .catch(() => showPopup("Error", target, sender));
}

function triggerTool(tool) {
  const target = document.getElementById("targetInput").value.trim();
  const sender = localStorage.getItem("currentUser") || "unknown";
  if (!target) return alert("Masukkan JID target!");
  fetch(`/api/${tool}?target=${encodeURIComponent(target)}`)
    .then(res => res.text())
    .then(response => showPopup(response.toLowerCase().includes("sukses") ? "Sukses" : "Gagal", target, sender))
    .catch(() => showPopup("Error", target, sender));
}