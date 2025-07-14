let value = new ExpantaNum(10);
let rebirths = new ExpantaNum(0);
let transcends = new ExpantaNum(0);
let transcended = new ExpantaNum(0);
let playtime = 0;
let amountUpg1 = new ExpantaNum(0);
let amountUpg2 = new ExpantaNum(0);
let amountUpg3 = new ExpantaNum(0);
let amountUpg4 = new ExpantaNum(0);
let amountUpg5 = new ExpantaNum(0);
let amountUpg1cap = new ExpantaNum(40000);
let amountUpg2cap = new ExpantaNum(15000);
let amountUpg3cap = new ExpantaNum(30000);
let amountUpg4cap = new ExpantaNum(40000);
let amountUpg5cap = new ExpantaNum(10);
let multi = new ExpantaNum(1.001);
let base = new ExpantaNum(10);
let pow = new ExpantaNum(1);
let upg1Cost = new ExpantaNum(3);
let upg2Cost = new ExpantaNum(10);
let upg3Cost = new ExpantaNum(750);
let upg4Cost = new ExpantaNum(1250);
let upg5Cost = new ExpantaNum(5);
const rebirthThreshold = new ExpantaNum("(10^)^9 10");
const transcendThreshold = new ExpantaNum("10^^ee100000");

function updateValue() {
  value = ExpantaNum.tetr(base, ExpantaNum.pow(ExpantaNum.mul(ExpantaNum.slog(value), multi),pow));
}
function obfuscateData(str) {
    const shift = Math.floor(Math.random() * 256);
    let obfuscated = '';
    for (let i = 0; i < str.length; i++) {
        obfuscated += String.fromCharCode(str.charCodeAt(i) + shift);
    }
    return { obfuscatedData: obfuscated, shift: shift };
}

function deobfuscateData(obfuscatedData, shift) {
    let deobfuscated = '';
    for (let i = 0; i < obfuscatedData.length; i++) {
        deobfuscated += String.fromCharCode(obfuscatedData.charCodeAt(i) - shift);
    }
    return deobfuscated;
}

function toBase64(str) {
    try {
        const uint8Array = new TextEncoder().encode(str);
        let base64String = '';
        for (let i = 0; i < uint8Array.length; i++) {
            base64String += String.fromCharCode(uint8Array[i]);
        }
        return btoa(base64String);
    } catch (error) {
        console.error("Error during Base64 encoding:", error);
        return null;
    }
}

function fromBase64(base64) {
    try {
        const decodedData = atob(base64);
        const uint8Array = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; i++) {
            uint8Array[i] = decodedData.charCodeAt(i);
        }
        return new TextDecoder().decode(uint8Array);
    } catch (error) {
        console.error("Error during Base64 decoding:", error);
        return null;
    }
}

function saveGame() {
    const saveData = JSON.stringify({
        value: value.toString(),
        rebirths: rebirths.toString(),
        playtime: playtime.toString(),
        upg1Cost: upg1Cost.toString(),
        upg2Cost: upg2Cost.toString(),
        upg3Cost: upg3Cost.toString(),
        upg4Cost: upg4Cost.toString(),
        upg5Cost: upg5Cost.toString(),
        amountUpg1: amountUpg1.toString(),
        amountUpg2: amountUpg2.toString(),
        amountUpg3: amountUpg3.toString(),
        amountUpg4: amountUpg4.toString(),
        amountUpg5: amountUpg5.toString(),
        amountUpg1cap: amountUpg1cap.toString(),
        amountUpg2cap: amountUpg2cap.toString(),
        amountUpg3cap: amountUpg3cap.toString(),
        amountUpg4cap: amountUpg4cap.toString(),
        amountUpg5cap: amountUpg5cap.toString(),
    });
    const { obfuscatedData, shift } = obfuscateData(saveData);
    const encodedData = toBase64(obfuscatedData);
    localStorage.setItem("afk_save_test", JSON.stringify({ data: encodedData, shift: shift }));
}

function loadGame() {
    const savedData = localStorage.getItem("afk_save_test");
    if (savedData) {
        const parsed = JSON.parse(savedData);
        const decodedData = fromBase64(parsed.data);

        if (decodedData) {
            const deobfuscatedData = deobfuscateData(decodedData, parsed.shift);
            const gameData = JSON.parse(deobfuscatedData);
            value = new ExpantaNum(gameData.value || 10);
            rebirths = new ExpantaNum(gameData.rebirths || 0);
            transcends = new ExpantaNum(gameData.transcends || 0);
            playtime = gameData.playtime || 0;
            upg1Cost = new ExpantaNum(gameData.upg1Cost || 3);
            upg2Cost = new ExpantaNum(gameData.upg2Cost || 10);
            upg3Cost = new ExpantaNum(gameData.upg3Cost || 750);
            upg4Cost = new ExpantaNum(gameData.upg4Cost || 1250);
            upg5Cost = new ExpantaNum(gameData.upg5Cost || 5);
            amountUpg1 = new ExpantaNum(gameData.amountUpg1 || 0);
            amountUpg2 = new ExpantaNum(gameData.amountUpg2 || 0);
            amountUpg3 = new ExpantaNum(gameData.amountUpg3 || 0);
            amountUpg4 = new ExpantaNum(gameData.amountUpg4 || 0);
            amountUpg5 = new ExpantaNum(gameData.amountUpg5 || 0);
            amountUpg1cap = new ExpantaNum(gameData.amountUpg1cap || 40000);
            amountUpg2cap = new ExpantaNum(gameData.amountUpg2cap || 15000);
            amountUpg3cap = new ExpantaNum(gameData.amountUpg3cap || 30000);
            amountUpg4cap = new ExpantaNum(gameData.amountUpg4cap || 40000);
            amountUpg5cap = new ExpantaNum(gameData.amountUpg5cap || 10);
            updateDisplay();
            updateDisplay2();
        }
    }
}

function rebirth() {
  if (value.gte(rebirthThreshold)) {
    const earnedRebirths = value.slog().log10();
    rebirths = rebirths.add(earnedRebirths);
    value = new ExpantaNum(10);
    updateDisplay();
  }
}
function transcend() {
  if (value.gte(transcendThreshold)) {
    const earnedtranscend = value.slog().log10().log10().log10();
    transcends = transcends.add(earnedtranscend);
    value = new ExpantaNum(10);
    rebirths = new ExpantaNum(0);
    transcended = new ExpantaNum(1);
    amountUpg1 = new ExpantaNum(0);
    amountUpg2 = new ExpantaNum(0);
    amountUpg3 = new ExpantaNum(0);
    amountUpg4 = new ExpantaNum(0);
    amountUpg5 = new ExpantaNum(0);
    amountUpg1cap = new ExpantaNum(40000);
    amountUpg2cap = new ExpantaNum(15000);
    amountUpg3cap = new ExpantaNum(30000);
    amountUpg4cap = new ExpantaNum(40000);
    amountUpg5 = new ExpantaNum(10);
    multi = new ExpantaNum(1.001);
    base = new ExpantaNum(10);
    pow = new ExpantaNum(1);
    upg1Cost = new ExpantaNum(3);
    upg2Cost = new ExpantaNum(10);
    upg3Cost = new ExpantaNum(750);
    upg4Cost = new ExpantaNum(1250);
    upg5Cost = new ExpantaNum(5);
    updateDisplay();
  }
}

function buyUpgrade1() {
  if (rebirths.gte(upg1Cost) && amountUpg1.lt(amountUpg1cap)) {
    rebirths = rebirths.sub(upg1Cost);
    amountUpg1 = amountUpg1.add(1);
    upg1Cost = upg1Cost.add(2);
    updateDisplay();
    updateDisplay2();
  }
}

function buyUpgrade2() {
  if (rebirths.gte(upg2Cost) && amountUpg2.lt(amountUpg2cap)) {
    rebirths = rebirths.sub(upg2Cost);
    amountUpg2 = amountUpg2.add(1);
    upg2Cost   = upg2Cost.mul(1.5);
    updateDisplay();
    updateDisplay2();
  }
}
function buyUpgrade3() {
  if (rebirths.gte(upg3Cost) && amountUpg3.lt(amountUpg3cap)) {
    rebirths = rebirths.sub(upg3Cost);
    amountUpg3 = amountUpg3.add(1);
    upg3Cost   = upg3Cost.mul(1.25);
    updateDisplay();
    updateDisplay2();
  }
}
function buyUpgrade4() {
  if (rebirths.gte(upg4Cost) && amountUpg4.lt(amountUpg4cap)) {
    rebirths = rebirths.sub(upg4Cost);
    amountUpg4 = amountUpg4.add(1);
    upg4Cost   = upg4Cost.mul(1.4);
    updateDisplay();
    updateDisplay2();
  }
}
function buyUpgrade5() {
  if (transcend.gte(upg5Cost) && amountUpg5.lt(amountUpg5cap)) {
    transcends = transcends.sub(upg5Cost);
    amountUpg5 = amountUpg5.add(1);
    upg5Cost   = upg5Cost.add(1);
    updateDisplay();
    updateDisplay2();
  }
}
function resetGame() {
  value = new ExpantaNum(10);
  rebirths = new ExpantaNum(0);
  playtime = 0;
  amountUpg1 = new ExpantaNum(0);
  amountUpg2 = new ExpantaNum(0);
  amountUpg3 = new ExpantaNum(0);
  amountUpg4 = new ExpantaNum(0);
  amountUpg5 = new ExpantaNum(0);
  amountUpg1cap = new ExpantaNum(40000);
  amountUpg2cap = new ExpantaNum(15000);
  amountUpg3cap = new ExpantaNum(30000);
  amountUpg4cap = new ExpantaNum(40000);
  amountUpg5 = new ExpantaNum(10);
  multi = new ExpantaNum(1.001);
  base = new ExpantaNum(10);
  pow = new ExpantaNum(1);
  transcends = new ExpantaNum(0);
  upg1Cost = new ExpantaNum(3);
  upg2Cost = new ExpantaNum(10);
  upg3Cost = new ExpantaNum(750);
  upg4Cost = new ExpantaNum(1250);
  upg5Cost = new ExpantaNum(5);
  localStorage.removeItem("afk_save_test");
  saveGame();
  updateDisplay();
  updateDisplay2();
  document.getElementById("playtime").innerText = `Playtime: ${formatTime(playtime)}`;
}
function getSaveString() {
    const saveData = JSON.stringify({
        value: value.toString(),
        rebirths: rebirths.toString(),
        transcends: transcends.toString(),
        playtime: playtime.toString(),
        upg1Cost: upg1Cost.toString(),
        upg2Cost: upg2Cost.toString(),
        upg3Cost: upg3Cost.toString(),
        upg4Cost: upg4Cost.toString(),
        upg5Cost: upg5Cost.toString(),
        amountUpg1: amountUpg1.toString(),
        amountUpg2: amountUpg2.toString(),
        amountUpg3: amountUpg3.toString(),
        amountUpg4: amountUpg4.toString(),
        amountUpg5: amountUpg5.toString(),
        amountUpg1cap: amountUpg1cap.toString(),
        amountUpg2cap: amountUpg2cap.toString(),
        amountUpg3cap: amountUpg3cap.toString(),
        amountUpg4cap: amountUpg4cap.toString(),
        amountUpg5cap: amountUpg5cap.toString(),
        
    });
    const { obfuscatedData, shift } = obfuscateData(saveData);
    const encodedData = toBase64(obfuscatedData);
    return JSON.stringify({ data: encodedData, shift });
}
const saveInput = document.createElement('textarea');
saveInput.id = 'saveInput';
saveInput.placeholder = 'Paste your save string here';
saveInput.rows = 4;
saveInput.cols = 50;
saveInput.style.display = 'none';
saveInput.style.marginTop = '75px';
saveInput.style.backgroundColor = 'black';
saveInput.style.color = 'white';
saveInput.style.border = '1px solid white';
saveInput.style.padding = '5px';
saveInput.style.fontFamily = 'monospace';

const loadButton = document.createElement('button');
loadButton.innerText = "Load Save";
loadButton.id = "loadButton";
loadButton.style.position = 'fixed';
loadButton.style.top = '100px';
loadButton.style.left = '10px';
loadButton.style.backgroundColor = 'black';
loadButton.style.color = 'white';
loadButton.style.border = '1px solid white';
loadButton.style.padding = '5px 10px';
loadButton.style.zIndex = '999';

let textareaVisible = false;
loadButton.onclick = () => {
    if (!textareaVisible) {
        saveInput.style.display = 'block';
        textareaVisible = true;
        saveInput.focus();
    } else {
        const input = saveInput.value.trim();
        if (!input) {
            alert("Please paste your save string in the textarea first.");
            saveInput.style.display = 'none';
            textareaVisible = false;
            saveInput.value = '';
            return;
        }

        try {
            const decoded = fromBase64(input);
            const shift = decoded.charCodeAt(0);
            const obfuscated = decoded.slice(1);
            const deob = deobfuscateData(obfuscated, shift);
            const data = JSON.parse(deob);

            value = new ExpantaNum(data.value || 10);
            rebirths = new ExpantaNum(data.rebirths || 0);
            playtime = new ExpantaNum(data.playtime || 0);
            upg1Cost = new ExpantaNum(data.upg1Cost || 3);
            upg2Cost = new ExpantaNum(data.upg2Cost || 10);
            upg3Cost = new ExpantaNum(data.upg3Cost || 750);
            upg4Cost = new ExpantaNum(data.upg4Cost || 1250);
            upg5Cost = new ExpantaNum(data.upg5Cost || 5);
            amountUpg1 = new ExpantaNum(data.amountUpg1 || 0);
            amountUpg2 = new ExpantaNum(data.amountUpg2 || 0);
            amountUpg3 = new ExpantaNum(data.amountUpg3 || 0);
            amountUpg4 = new ExpantaNum(data.amountUpg4 || 0);
            amountUpg5 = new ExpantaNum(data.amountUpg5 || 0);
            amountUpg1cap = new ExpantaNum(data.amountUpg1cap || 40000);
            amountUpg2cap = new ExpantaNum(data.amountUpg2cap || 15000);
            amountUpg3cap = new ExpantaNum(data.amountUpg3cap || 30000);
            amountUpg4cap = new ExpantaNum(data.amountUpg4cap || 40000);
            amountUpg5cap = new ExpantaNum(data.amountUpg5cap || 10);

            updateDisplay();
            updateDisplay2();
            saveGame();
            alert("Save loaded successfully!");
        } catch (e) {
            alert("Invalid or corrupted save.");
        }

        saveInput.style.display = 'none';
        textareaVisible = false;
        saveInput.value = '';
    }
};

document.body.appendChild(loadButton);

const updateTextareaPosition = () => {
    const rect = loadButton.getBoundingClientRect();
    saveInput.style.position = 'fixed';
    saveInput.style.top = (rect.bottom + 5) + 'px';
    saveInput.style.left = rect.left + 'px';
    saveInput.style.zIndex = '999';
};
updateTextareaPosition();
window.addEventListener('resize', updateTextareaPosition);
document.body.appendChild(saveInput);

const saveButton = document.createElement('button');
saveButton.innerText = "Copy Save";
saveButton.id = "SaveButton";
saveButton.style.position = 'fixed';
saveButton.style.top = '150px';
saveButton.style.left = '10px';
saveButton.style.backgroundColor = 'black';
saveButton.style.color = 'white';
saveButton.style.border = '1px solid white';
saveButton.style.padding = '5px 10px';
saveButton.style.zIndex = '999';
saveButton.onclick = copyGameSave;
document.body.appendChild(saveButton);

function copyGameSave() {
    const saveData = JSON.stringify({
        value: value.toString(),
        rebirths: rebirths.toString(),
        transcends: transcends.toString(),
        playtime: playtime.toString(),
        upg1Cost: upg1Cost.toString(),
        upg2Cost: upg2Cost.toString(),
        upg3Cost: upg3Cost.toString(),
        upg4Cost: upg4Cost.toString(),
        upg5Cost: upg5Cost.toString(),
        amountUpg1: amountUpg1.toString(),
        amountUpg2: amountUpg2.toString(),
        amountUpg3: amountUpg3.toString(),
        amountUpg4: amountUpg4.toString(),
        amountUpg5: amountUpg5.toString(),
        amountUpg1cap: amountUpg1cap.toString(),
        amountUpg2cap: amountUpg2cap.toString(),
        amountUpg3cap: amountUpg3cap.toString(),
        amountUpg4cap: amountUpg4cap.toString(),
        amountUpg5cap: amountUpg5cap.toString(),
        
    });
    const { obfuscatedData, shift } = obfuscateData(saveData);
    const encoded = toBase64(String.fromCharCode(shift) + obfuscatedData);

    navigator.clipboard.writeText(encoded).then(() => {
        alert("Save copied to clipboard!");
    }).catch(() => {
        alert("Failed to copy save.");
    });
}
function buyMaxUpgrade1() {
  // Linear cost: current cost C, step = 2, sum S(Δ) = Δ*(2C + (Δ-1)*step)/2 <= rebirths
  const C = upg1Cost;
  const R = rebirths;
  const step = new ExpantaNum(2);
  // Solve quadratic: (step/2)Δ^2 + (C - step/2)Δ - R <= 0
  // Δ = floor( [ -(C - s/2) + sqrt((C - s/2)^2 + 2*step*R) ] / step )
  const halfStep = step.div(2);
  const b = C.sub(halfStep);
  const disc = b.pow(2).add(R.mul(step).mul(2)).sqrt();
  const Δ = disc.sub(b).div(step).floor();
  const maxBuy = ExpantaNum.min(Δ, amountUpg1cap.sub(amountUpg1));
  if (maxBuy.lte(0)) return;
  // Total cost: maxBuy*(2C + (maxBuy-1)*step)/2
  const totalCost = maxBuy.mul(
    C.mul(2).add(step.mul(maxBuy.sub(1)))
  ).div(2);
  rebirths = rebirths.sub(totalCost);
  amountUpg1 = amountUpg1.add(maxBuy);
  upg1Cost = upg1Cost.add(step.mul(maxBuy));
  updateDisplay();
  updateDisplay2();
}

function buyMaxUpgrade2() {
  // Geometric cost: C * 1.5^n, sum S(Δ) = C*(m^Δ -1)/(m-1) <= R
  const C = upg2Cost;
  const R = rebirths;
  const m = new ExpantaNum(1.5);
  // Δ = floor( log(1 + R*(m-1)/C) / log(m) )
  const numerator = R.mul(m.sub(1)).div(C).add(1);
  const Δ = ExpantaNum.log(numerator, m).floor();
  const maxBuy = ExpantaNum.min(Δ, amountUpg2cap.sub(amountUpg2));
  if (maxBuy.lte(0)) return;
  // Total cost = C*(m^maxBuy -1)/(m-1)
  const totalCost = C.mul(m.pow(maxBuy).sub(1)).div(m.sub(1));
  rebirths = rebirths.sub(totalCost);
  amountUpg2 = amountUpg2.add(maxBuy);
  upg2Cost = upg2Cost.mul(m.pow(maxBuy));
  updateDisplay();
  updateDisplay2();
}

function buyMaxUpgrade3() {
  const C = upg3Cost;
  const R = rebirths;
  const m = new ExpantaNum(1.25);
  const numerator = R.mul(m.sub(1)).div(C).add(1);
  const Δ = ExpantaNum.log(numerator, m).floor();
  const maxBuy = ExpantaNum.min(Δ, amountUpg3cap.sub(amountUpg3));
  if (maxBuy.lte(0)) return;
  const totalCost = C.mul(m.pow(maxBuy).sub(1)).div(m.sub(1));
  rebirths = rebirths.sub(totalCost);
  amountUpg3 = amountUpg3.add(maxBuy);
  upg3Cost = upg3Cost.mul(m.pow(maxBuy));
  updateDisplay();
  updateDisplay2();
}

function buyMaxUpgrade4() {
  // Geometric cost: factor = 1.4
  const C = upg4Cost;
  const R = rebirths;
  const m = new ExpantaNum(1.4);
  const numerator = R.mul(m.sub(1)).div(C).add(1);
  const Δ = ExpantaNum.log(numerator, m).floor();
  const maxBuy = ExpantaNum.min(Δ, amountUpg4cap.sub(amountUpg4));
  if (maxBuy.lte(0)) return;
  const totalCost = C.mul(m.pow(maxBuy).sub(1)).div(m.sub(1));
  rebirths = rebirths.sub(totalCost);
  amountUpg4 = amountUpg4.add(maxBuy);
  upg4Cost = upg4Cost.mul(m.pow(maxBuy));
  updateDisplay();
  updateDisplay2();
}

function clampUpgradesToCaps() {
  if (amountUpg1.gt(amountUpg1cap)) amountUpg1 = amountUpg1cap;
  if (amountUpg2.gt(amountUpg2cap)) amountUpg2 = amountUpg2cap;
  if (amountUpg3.gt(amountUpg3cap)) amountUpg3 = amountUpg3cap;
  if (amountUpg4.gt(amountUpg4cap)) amountUpg4 = amountUpg4cap;
  if (amountUpg5.gt(amountUpg5cap)) amountUpg5 = amountUpg5cap;
}

function evalMulti() {
  const original = new ExpantaNum(1.001);
  const upg1 = amountUpg1.mul(new ExpantaNum(0.001));
  const upg2 = amountUpg2.mul(new ExpantaNum(0.004));
  multi = ExpantaNum.mul(original.add(upg1).add(upg2),1000).ceil().div(1000); // Yeah there wasnt an easier way to round it i think idk
}
function evalBase() {
  const original = new ExpantaNum(10);
  const upg1 = amountUpg3.mul(new ExpantaNum(1));
  base = ExpantaNum.mul(original.add(upg1),10).ceil().div(10);
}
function evalpow() {
  const original = new ExpantaNum(1);
  const upg1 = amountUpg4.mul(new ExpantaNum(0.0001));
  pow = ExpantaNum.mul(original.add(upg1).add(amountUpg5),10000).ceil().div(10000);
}
function updateDisplay() {
  clampUpgradesToCaps();
  document.getElementById("value").innerText    = `Value: ${format(value, 3)}`;
  document.getElementById("rebirths").innerText = `Rebirths: ${format(rebirths, 3)}`;
  document.getElementById("transcend").innerText = `Transcend: ${format(transcends, 3)}`;
  document.getElementById("willgainreb").innerText = `Will gain rebirths: ${format(value.slog().log10(), 3)}`;
  document.getElementById("willgaintran").innerText = `Will gain transcend: ${format(value.slog().log10().log10().log10(), 3)}`;
}
function updateDisplay2() { // this is for more speed incase your device is poor because we dont need to update these ones if they aren't changing
  evalMulti();
  evalBase();
  evalpow();
  document.getElementById("upg1Cost").innerText = format(upg1Cost, 3);
  document.getElementById("upg2Cost").innerText = format(upg2Cost, 3);
  document.getElementById("upg3Cost").innerText = format(upg3Cost, 3);
  document.getElementById("upg4Cost").innerText = format(upg4Cost, 3);
  document.getElementById("upg5Cost").innerText = format(upg5Cost, 3);
  document.getElementById("upg1amount").innerText = format(amountUpg1, 0);
  document.getElementById("upg2amount").innerText = format(amountUpg2, 0);
  document.getElementById("upg3amount").innerText = format(amountUpg3, 0);
  document.getElementById("upg4amount").innerText = format(amountUpg4, 0);
  document.getElementById("upg5amount").innerText = format(amountUpg5, 0);
  document.getElementById("upg1cap").innerText = `${format(amountUpg1cap, 0)}`;
  document.getElementById("upg2cap").innerText = `${format(amountUpg2cap, 0)}`;
  document.getElementById("upg3cap").innerText = `${format(amountUpg3cap, 0)}`;
  document.getElementById("upg4cap").innerText = `${format(amountUpg4cap, 0)}`;
  document.getElementById("upg5cap").innerText = `${format(amountUpg5cap, 0)}`;
  document.getElementById("Multi").innerText = `Multi: ${format(multi, 3)}`;
  document.getElementById("Base").innerText = `Base: ${format(base, 1)}`;
  document.getElementById("pow").innerText = `Power: ${format(pow, 4)}`;
  document.getElementById("Formula").innerText = `Formula: Value = ${format(base, 1)}↑↑((slog(value)×${format(multi, 3)})↑${format(pow, 4)})`;
}
function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

setInterval(() => {
  document.getElementById("playtime").innerText = `Playtime: ${formatTime(playtime)}`;
}, 1000);

setInterval(() => {
  updateValue();
  updateDisplay();
}, 20);
setInterval(() => {
    saveGame();
  }, 500);
setInterval(() => {
  playtime++;
}, 1000);
window.onload = () => {
  updateDisplay();
  updateDisplay2();
  loadGame();
  document.getElementById("playtime").innerText = `Playtime: ${formatTime(playtime)}`;
};
