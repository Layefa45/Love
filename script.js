/* =========================
   💕 EDIT THESE ARRAYS 💕
   Put your own details here.
========================== */

// QUIZ (3 questions; change freely)
const QUIZ = [
  {
    q: "Our first inside joke was about…",
    options: ["That gas guy ex", "Pride guy in my compound", "How you bought lip gloss just to talk to me"],
    answer: 2// 0,1,2 index
  },
  {
    q: "Ideal cozy night together:",
    options: ["Movie + popcorn", "eating + sleeping(active kind)", "Walk + sleeping"],
    answer: 1
  },
  {
    q: "Song that reminds me of you:",
    options: ["Perfect-Ed Sheeran", "Lucky star-Eva Noblezada", "Can't help falling in love- Elvis Presley"],
    answer: 1
  }
];

// Compliments (make these yours)
const COMPLIMENTS = [
  "You make ordinary moments feel like soft sunsets.",
  "Your smile is my favorite notification.",
  "I’m my calmest when I’m with you.",
  "You’re handsome, kind, and low-key magical.",
  "I love how your brain works—smart + thoughtful is dangerous 😌",
  "You’re my safe place and my adventure.",
  "Every day, I choose you. On purpose.",
  "You look extra datable today, FYI."
];

// Voucher rewards (customize)
const VOUCHERS = [
  "Full body massage (no rush).",
  "Movie night: your pick + snacks on me.",
  "Homemade dinner by me.",
  "24 hours of random kisses.",
  "Let's have a baby..",
  "You control the playlist all day.",
  "Breakfast in bed + a hug tax.",
  "I write you a love letter."
];

/* =========================
   App Logic
========================== */
const $ = s => document.querySelector(s);
const app = $("#app");

// Hearts burst
function popHearts(x, y, n=10){
  for(let i=0;i<n;i++){
    const span = document.createElement("span");
    span.className = "heart";
    span.textContent = ["💖","💘","💝","💕","💗"][Math.floor(Math.random()*5)];
    span.style.left = (x + (Math.random()*40-20)) + "px";
    span.style.top = (y + (Math.random()*20-10)) + "px";
    span.style.fontSize = (14 + Math.random()*12) + "px";
    app.appendChild(span);
    setTimeout(()=> span.remove(), 1800);
  }
}
app.addEventListener("click", e => popHearts(e.clientX, e.clientY, 8));

// Names
const bfNameInput = $("#bfName");
const meNameInput = $("#meName");
const bfNameLabel = $("#bfNameLabel");
const meNameLabel = $("#meNameLabel");
const saved = JSON.parse(localStorage.getItem("love-app")||"{}");
if(saved.bfName){ bfNameLabel.textContent = saved.bfName; bfNameInput.value = saved.bfName }
if(saved.meName){ meNameLabel.textContent = saved.meName; meNameInput.value = saved.meName }
$("#saveNames").onclick = () => {
  const bf = bfNameInput.value.trim() || "My Love";
  const me = meNameInput.value.trim() || "Me";
  bfNameLabel.textContent = bf;
  meNameLabel.textContent = me;
  localStorage.setItem("love-app", JSON.stringify({...saved, bfName:bf, meName:me}));
};
$("#clearNames").onclick = () => {
  bfNameInput.value = ""; meNameInput.value = "";
  bfNameLabel.textContent = "My Love"; meNameLabel.textContent = "Me";
  localStorage.setItem("love-app", JSON.stringify({...saved, bfName:null, meName:null}));
};

// Quiz render
const quizBox = $("#quizBox");
const quizResult = $("#quizResult");
function renderQuiz(){
  quizBox.innerHTML = "";
  QUIZ.forEach((item, idx) => {
    const wrap = document.createElement("div");
    wrap.style.marginBottom = "10px";
    const h = document.createElement("div");
    h.innerHTML = `<strong>Q${idx+1}.</strong> ${item.q}`;
    h.style.margin = "6px 0";
    wrap.appendChild(h);
    item.options.forEach((opt, i) => {
      const lbl = document.createElement("label");
      lbl.className = "opt";
      lbl.innerHTML = `<input type="radio" name="q${idx}" value="${i}" style="margin-right:8px"> ${opt}`;
      wrap.appendChild(lbl);
    });
    quizBox.appendChild(wrap);
  });
}
renderQuiz();

$("#resetQuiz").onclick = () => { renderQuiz(); quizResult.style.display = "none" };

$("#submitQuiz").onclick = () => {
  let score = 0;
  QUIZ.forEach((item, idx) => {
    const chosen = quizBox.querySelector(`input[name="q${idx}"]:checked`);
    if(chosen && Number(chosen.value) === item.answer) score++;
  });
  const passed = score === QUIZ.length;
  quizResult.style.display = "block";
  if(passed){
    quizResult.innerHTML = `
      <div class="center">✅ <strong>Perfect!</strong> You got <span class="score">${score}/${QUIZ.length}</span></div>
      <div style="height:8px"></div>
      <div>Dear <strong>${bfNameLabel.textContent}</strong>,<br/>
      I’m grateful for you—today and every day. Thank you for being my favorite human. 💞<br/><br/>
      — ${meNameLabel.textContent}</div>`;
  }else{
    quizResult.innerHTML = `Almost! You scored <span class="score">${score}/${QUIZ.length}</span>. Try again 🥺👉👈`;
  }
};

// Compliments
const complimentBox = $("#compliment");
const complimentBtn = $("#newCompliment");
const complimentsCount = $("#complimentsCount");
let count = Number(localStorage.getItem("compliments-count")||0);
complimentsCount.textContent = count;
function randomFrom(arr){ return arr[Math.floor(Math.random()*arr.length)] }
function showCompliment(){
  const text = randomFrom(COMPLIMENTS);
  complimentBox.textContent = text;
  count++; complimentsCount.textContent = count;
  localStorage.setItem("compliments-count", count);
}
complimentBtn.onclick = showCompliment;
$("#copyCompliment").onclick = async () => {
  try{
    await navigator.clipboard.writeText(complimentBox.textContent.trim());
    alert("Copied! Paste it in a chat 😘");
  }catch(e){ alert("Couldn’t copy—select the text and copy manually.") }
};

// Spinner
const spinBtn = $("#spin");
const spinItem = $("#spinItem");
const spinner = $("#spinner");
const savedVouchersCount = $("#savedVouchersCount");
let savedVouchers = JSON.parse(localStorage.getItem("saved-vouchers")||"[]");
savedVouchersCount.textContent = savedVouchers.length;

function spin(){
  let i=0, spins = 28 + Math.floor(Math.random()*10);
  const tick = () => {
    spinItem.textContent = VOUCHERS[i % VOUCHERS.length];
    i++;
    if(i<=spins){ setTimeout(tick, 80 + i*4) }
    else { popHearts(spinner.getBoundingClientRect().left + spinner.offsetWidth/2, spinner.getBoundingClientRect().top, 14) }
  };
  tick();
}
spinBtn.onclick = spin;

$("#saveVoucher").onclick = ()=>{
  const v = spinItem.textContent.trim();
  if(!v || v==="Tap “Spin a treat”"){ alert("Spin first, love!"); return; }
  savedVouchers.push({ text:v, when: new Date().toISOString() });
  localStorage.setItem("saved-vouchers", JSON.stringify(savedVouchers));
  savedVouchersCount.textContent = savedVouchers.length;
  alert("Saved! You can view it anytime.");
};
$("#showVouchers").onclick = ()=>{
  if(!savedVouchers.length) return alert("No vouchers yet. Spin one!");
  const list = savedVouchers.map((v,i)=> `${i+1}. ${v.text}`).join("\n");
  alert("Saved vouchers:\n\n"+list);
};
$("#clearVouchers").onclick = ()=>{
  if(confirm("Clear all saved vouchers?")){
    savedVouchers = [];
    localStorage.setItem("saved-vouchers","[]");
    savedVouchersCount.textContent = 0;
  }
};
