let value = new ExpantaNum(10);
let rebirths = new ExpantaNum(0);
let transcends = new ExpantaNum(0);
let transcended = new ExpantaNum(0);
let multi = new ExpantaNum(1.001);
let base = new ExpantaNum(10);
let pow = new ExpantaNum(1);
let playtime = new ExpantaNum(0);
let amountUpg1 = new ExpantaNum(0);
let amountUpg2 = new ExpantaNum(0);
let amountUpg3 = new ExpantaNum(0);
let amountUpg4 = new ExpantaNum(0);
let amountUpg5 = new ExpantaNum(0);
let amountUpg6 = new ExpantaNum(0);
let amountUpg7 = new ExpantaNum(0);
let amountUpg8 = new ExpantaNum(0);
let amountUpg1cap = new ExpantaNum(40000);
let amountUpg2cap = new ExpantaNum(15000);
let amountUpg3cap = new ExpantaNum(30000);
let amountUpg4cap = new ExpantaNum(40000);
let amountUpg5cap = new ExpantaNum(10);
let amountUpg6cap = new ExpantaNum(5);
let amountUpg7cap = new ExpantaNum(2);
let amountUpg8cap = new ExpantaNum(1);
let upg1Cost = new ExpantaNum(3);
let upg2Cost = new ExpantaNum(10);
let upg3Cost = new ExpantaNum(750);
let upg4Cost = new ExpantaNum(1250);
let upg5Cost = new ExpantaNum(5);
let upg6Cost = new ExpantaNum(10);
let upg7Cost = new ExpantaNum(20);
let upg8Cost = new ExpantaNum(50);
let prevValue = value;
let prevWillGainReb = value.slog().log10();
const dt = 0.02;
const rebirthThreshold = new ExpantaNum("(10^)^9 10");
const transcendThreshold = new ExpantaNum("10^^ee10000");

function updateValue() {
  value = ExpantaNum.tetr(base, ExpantaNum.pow(ExpantaNum.mul(ExpantaNum.slog(value), multi),pow));
}
function calcSmartOomsPerSecond(startValue, endValue, deltaTimeSeconds, maxLayer = 10000, threshold = new ExpantaNum("1000")) {
    if (deltaTimeSeconds <= 0) return { rate: new ExpantaNum(0), layer: 1 };
    function computeRateAtLayer(layer, startVal, endVal, dt) {
        const layers = new ExpantaNum(layer);
        const minVal = ExpantaNum.tetrate(10, layers.sub(1));
        const start = ExpantaNum.max(startVal, minVal);
        const end = ExpantaNum.max(endVal, minVal);
        const startOom = start.iteratedlog(10, layers);
        const endOom = end.iteratedlog(10, layers);
        return endOom.sub(startOom).div(dt);
    }
    const sEnd = endValue.slog();
    const tdt = new ExpantaNum(threshold).mul(deltaTimeSeconds);
    const slogTdt = tdt.slog();
    let candidateLayer = sEnd.sub(slogTdt).ceil();
    candidateLayer = ExpantaNum.min(ExpantaNum.max(candidateLayer, 1), maxLayer).toNumber();

    let finalLayer = candidateLayer;
    let finalRate = computeRateAtLayer(candidateLayer, startValue, endValue, deltaTimeSeconds);
    if (candidateLayer > 1) {
        const prevLayer = candidateLayer - 1;
        const prevRate = computeRateAtLayer(prevLayer, startValue, endValue, deltaTimeSeconds);
        if (prevRate.lte(threshold)) {
            finalLayer = prevLayer;
            finalRate = prevRate;
        }
    }
    if (!finalRate.lte(threshold) && candidateLayer < maxLayer) {
        for (let layer = candidateLayer + 1; layer <= maxLayer; layer++) {
            const rate = computeRateAtLayer(layer, startValue, endValue, deltaTimeSeconds);
            if (rate.lte(threshold)) {
                finalLayer = layer;
                finalRate = rate;
                break;
            }
            if (layer === maxLayer) {
                finalLayer = maxLayer;
                finalRate = rate;
            }
        }
    }
    return { rate: finalRate, layer: finalLayer };
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
        transcends: transcends.toString(),
        transcended: transcended.toString(),
        playtime: playtime.toString(),
        upg1Cost: upg1Cost.toString(),
        upg2Cost: upg2Cost.toString(),
        upg3Cost: upg3Cost.toString(),
        upg4Cost: upg4Cost.toString(),
        upg5Cost: upg5Cost.toString(),
        upg6Cost: upg6Cost.toString(),
        upg7Cost: upg7Cost.toString(),
        upg8Cost: upg8Cost.toString(),
        amountUpg1: amountUpg1.toString(),
        amountUpg2: amountUpg2.toString(),
        amountUpg3: amountUpg3.toString(),
        amountUpg4: amountUpg4.toString(),
        amountUpg5: amountUpg5.toString(),
        amountUpg6: amountUpg6.toString(),
        amountUpg7: amountUpg7.toString(),
        amountUpg8: amountUpg8.toString(),
        amountUpg1cap: amountUpg1cap.toString(),
        amountUpg2cap: amountUpg2cap.toString(),
        amountUpg3cap: amountUpg3cap.toString(),
        amountUpg4cap: amountUpg4cap.toString(),
        amountUpg5cap: amountUpg5cap.toString(),
        amountUpg6cap: amountUpg6cap.toString(),
        amountUpg7cap: amountUpg7cap.toString(),
        amountUpg8cap: amountUpg8cap.toString(),
    });
    const { obfuscatedData, shift } = obfuscateData(saveData);
    const encodedData = toBase64(obfuscatedData);
    localStorage.setItem("afk_save", JSON.stringify({ data: encodedData, shift: shift }));
}

function loadGame() {
    const savedData = localStorage.getItem("afk_save");
    if (savedData) {
        const parsed = JSON.parse(savedData);
        const decodedData = fromBase64(parsed.data);

        if (decodedData) {
            const deobfuscatedData = deobfuscateData(decodedData, parsed.shift);
            const gameData = JSON.parse(deobfuscatedData);
            value = new ExpantaNum(gameData.value || 10);
            rebirths = new ExpantaNum(gameData.rebirths || 0);
            transcends = new ExpantaNum(gameData.transcends || 0);
            transcended = new ExpantaNum(gameData.transcended || 0);
            playtime = gameData.playtime || 0;
            upg1Cost = new ExpantaNum(gameData.upg1Cost || 3);
            upg2Cost = new ExpantaNum(gameData.upg2Cost || 10);
            upg3Cost = new ExpantaNum(gameData.upg3Cost || 750);
            upg4Cost = new ExpantaNum(gameData.upg4Cost || 1250);
            upg5Cost = new ExpantaNum(gameData.upg5Cost || 5);
            upg6Cost = new ExpantaNum(gameData.upg6Cost || 10);
            upg7Cost = new ExpantaNum(gameData.upg7Cost || 20);
            upg8Cost = new ExpantaNum(gameData.upg8Cost || 50);
            amountUpg1 = new ExpantaNum(gameData.amountUpg1 || 0);
            amountUpg2 = new ExpantaNum(gameData.amountUpg2 || 0);
            amountUpg3 = new ExpantaNum(gameData.amountUpg3 || 0);
            amountUpg4 = new ExpantaNum(gameData.amountUpg4 || 0);
            amountUpg5 = new ExpantaNum(gameData.amountUpg5 || 0);
            amountUpg6 = new ExpantaNum(gameData.amountUpg6 || 0);
            amountUpg7 = new ExpantaNum(gameData.amountUpg7 || 0);
            amountUpg8 = new ExpantaNum(gameData.amountUpg8 || 0);
            amountUpg1cap = new ExpantaNum(gameData.amountUpg1cap || 40000);
            amountUpg2cap = new ExpantaNum(gameData.amountUpg2cap || 15000);
            amountUpg3cap = new ExpantaNum(gameData.amountUpg3cap || 30000);
            amountUpg4cap = new ExpantaNum(gameData.amountUpg4cap || 40000);
            amountUpg5cap = new ExpantaNum(gameData.amountUpg5cap || 10);
            amountUpg6cap = new ExpantaNum(gameData.amountUpg6cap || 5);
            amountUpg7cap = new ExpantaNum(gameData.amountUpg7cap || 2);
            amountUpg8cap = new ExpantaNum(gameData.amountUpg8cap || 1);
            updateDisplay();
            updateDisplay2();
        }
    }
}

function rebirth() {
  if (value.gte(rebirthThreshold)) {
    if (amountUpg8 <= 1){
      
    }
    const earnedRebirths = value.slog().log10();
    rebirths = rebirths.add(earnedRebirths);
    value = new ExpantaNum(10);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function transcend() {
  if (value.gte(transcendThreshold)) {
    const earnedtranscend = value.slog().log10().log10().log10().add(1);
    transcends = transcends.add(earnedtranscend);
    value = new ExpantaNum(10);
    rebirths = new ExpantaNum(0);
    transcended = new ExpantaNum(1);
    amountUpg1 = new ExpantaNum(0);
    amountUpg2 = new ExpantaNum(0);
    amountUpg3 = new ExpantaNum(0);
    amountUpg4 = new ExpantaNum(0);
    amountUpg1cap = new ExpantaNum(40000);
    amountUpg2cap = new ExpantaNum(15000);
    amountUpg3cap = new ExpantaNum(30000);
    amountUpg4cap = new ExpantaNum(40000);
    multi = new ExpantaNum(1.001);
    base = new ExpantaNum(10);
    pow = new ExpantaNum(1);
    upg1Cost = new ExpantaNum(3);
    upg2Cost = new ExpantaNum(10);
    upg3Cost = new ExpantaNum(750);
    upg4Cost = new ExpantaNum(1250);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}

function buyUpgrade1() {
  if (rebirths.gte(upg1Cost) && amountUpg1.lt(amountUpg1cap)) {
    rebirths = rebirths.sub(upg1Cost);
    amountUpg1 = amountUpg1.add(1);
    upg1Cost = upg1Cost.add(2);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}

function buyUpgrade2() {
  if (rebirths.gte(upg2Cost) && amountUpg2.lt(amountUpg2cap)) {
    rebirths = rebirths.sub(upg2Cost);
    amountUpg2 = amountUpg2.add(1);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function buyUpgrade3() {
  if (rebirths.gte(upg3Cost) && amountUpg3.lt(amountUpg3cap)) {
    rebirths = rebirths.sub(upg3Cost);
    amountUpg3 = amountUpg3.add(1);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function buyUpgrade4() {
  if (rebirths.gte(upg4Cost) && amountUpg4.lt(amountUpg4cap)) {
    rebirths = rebirths.sub(upg4Cost);
    amountUpg4 = amountUpg4.add(1);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function buyUpgrade5() {
  if (transcends.gte(upg5Cost) && amountUpg5.lt(amountUpg5cap)) {
    transcends = transcends.sub(upg5Cost);
    amountUpg5 = amountUpg5.add(1);
    upg5Cost   = upg5Cost.add(1);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function buyUpgrade6() {
  if (transcends.gte(upg6Cost) && amountUpg6.lt(amountUpg6cap)) {
    transcends = transcends.sub(upg6Cost);
    amountUpg6 = amountUpg6.add(1);
    upg6Cost   = upg6Cost.mul(1.25);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function buyUpgrade7() {
  if (transcends.gte(upg7Cost) && amountUpg7.lt(amountUpg7cap)) {
    transcends = transcends.sub(upg7Cost);
    amountUpg7 = amountUpg7.add(1);
    upg7Cost   = upg7Cost.mul(2);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function buyUpgrade8() {
  if (transcends.gte(upg8Cost) && amountUpg8.lt(amountUpg8cap)) {
    transcends = transcends.sub(upg8Cost);
    amountUpg8 = amountUpg8.add(1);
    updateDisplay();
    updateDisplay2();
    evalcosts();
  }
}
function resetGame() {
  if (!confirm("Are you sure you want to reset the game? All progress will be lost.")) return;
  value = new ExpantaNum(10);
  rebirths = new ExpantaNum(0);
  multi = new ExpantaNum(1.001);
  base = new ExpantaNum(10);
  pow = new ExpantaNum(1);
  transcends = new ExpantaNum(0);
  transcended = new ExpantaNum(0); 
  playtime = 0;
  amountUpg1 = new ExpantaNum(0);
  amountUpg2 = new ExpantaNum(0);
  amountUpg3 = new ExpantaNum(0);
  amountUpg4 = new ExpantaNum(0);
  amountUpg5 = new ExpantaNum(0);
  amountUpg6 = new ExpantaNum(0);
  amountUpg7 = new ExpantaNum(0);
  amountUpg8 = new ExpantaNum(0);
  amountUpg1cap = new ExpantaNum(40000);
  amountUpg2cap = new ExpantaNum(15000);
  amountUpg3cap = new ExpantaNum(30000);
  amountUpg4cap = new ExpantaNum(40000);
  amountUpg5cap = new ExpantaNum(10);
  amountUpg6cap = new ExpantaNum(5);
  amountUpg7cap = new ExpantaNum(2);
  amountUpg8cap = new ExpantaNum(1);
  upg1Cost = new ExpantaNum(3);
  upg2Cost = new ExpantaNum(10);
  upg3Cost = new ExpantaNum(750);
  upg4Cost = new ExpantaNum(1250);
  upg5Cost = new ExpantaNum(5);
  upg6Cost = new ExpantaNum(10);
  upg7Cost = new ExpantaNum(20);
  upg8Cost = new ExpantaNum(50);
  localStorage.removeItem("afk_save");
  saveGame();
  updateDisplay();
  updateDisplay2();
  evalcosts();
  document.getElementById("playtime").innerText = `Playtime: ${formatTime(playtime)}`;
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
            const gameData = JSON.parse(deob);
            value = new ExpantaNum(gameData.value || 10);
            rebirths = new ExpantaNum(gameData.rebirths || 0);
            transcends = new ExpantaNum(gameData.transcends || 0);
            transcended = new ExpantaNum(gameData.transcended || 0);
            playtime = gameData.playtime || 0;
            upg1Cost = new ExpantaNum(gameData.upg1Cost || 3);
            upg2Cost = new ExpantaNum(gameData.upg2Cost || 10);
            upg3Cost = new ExpantaNum(gameData.upg3Cost || 750);
            upg4Cost = new ExpantaNum(gameData.upg4Cost || 1250);
            upg5Cost = new ExpantaNum(gameData.upg5Cost || 5);
            upg6Cost = new ExpantaNum(gameData.upg6Cost || 10);
            upg7Cost = new ExpantaNum(gameData.upg7Cost || 20);
            upg8Cost = new ExpantaNum(gameData.upg8Cost || 50);
            amountUpg1 = new ExpantaNum(gameData.amountUpg1 || 0);
            amountUpg2 = new ExpantaNum(gameData.amountUpg2 || 0);
            amountUpg3 = new ExpantaNum(gameData.amountUpg3 || 0);
            amountUpg4 = new ExpantaNum(gameData.amountUpg4 || 0);
            amountUpg5 = new ExpantaNum(gameData.amountUpg5 || 0);
            amountUpg6 = new ExpantaNum(gameData.amountUpg6 || 0);
            amountUpg7 = new ExpantaNum(gameData.amountUpg7 || 0);
            amountUpg8 = new ExpantaNum(gameData.amountUpg8 || 0);
            amountUpg1cap = new ExpantaNum(gameData.amountUpg1cap || 40000);
            amountUpg2cap = new ExpantaNum(gameData.amountUpg2cap || 15000);
            amountUpg3cap = new ExpantaNum(gameData.amountUpg3cap || 30000);
            amountUpg4cap = new ExpantaNum(gameData.amountUpg4cap || 40000);
            amountUpg5cap = new ExpantaNum(gameData.amountUpg5cap || 10);
            amountUpg6cap = new ExpantaNum(gameData.amountUpg6cap || 5);
            amountUpg7cap = new ExpantaNum(gameData.amountUpg7cap || 2);
            amountUpg8cap = new ExpantaNum(gameData.amountUpg8cap || 1);
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
        transcended: transcended.toString(),
        playtime: playtime.toString(),
        upg1Cost: upg1Cost.toString(),
        upg2Cost: upg2Cost.toString(),
        upg3Cost: upg3Cost.toString(),
        upg4Cost: upg4Cost.toString(),
        upg5Cost: upg5Cost.toString(),
        upg6Cost: upg6Cost.toString(),
        upg7Cost: upg7Cost.toString(),
        upg8Cost: upg8Cost.toString(),
        amountUpg1: amountUpg1.toString(),
        amountUpg2: amountUpg2.toString(),
        amountUpg3: amountUpg3.toString(),
        amountUpg4: amountUpg4.toString(),
        amountUpg5: amountUpg5.toString(),
        amountUpg6: amountUpg6.toString(),
        amountUpg7: amountUpg7.toString(),
        amountUpg8: amountUpg8.toString(),
        amountUpg1cap: amountUpg1cap.toString(),
        amountUpg2cap: amountUpg2cap.toString(),
        amountUpg3cap: amountUpg3cap.toString(),
        amountUpg4cap: amountUpg4cap.toString(),
        amountUpg5cap: amountUpg5cap.toString(),
        amountUpg6cap: amountUpg6cap.toString(),
        amountUpg7cap: amountUpg7cap.toString(),
        amountUpg8cap: amountUpg8cap.toString(),
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
  for (let i = 1; i < 5; i++) {
    const C = upg1Cost;
    const R = rebirths;
    const step = new ExpantaNum(2);
    const halfStep = step.div(2);
    const b = C.sub(halfStep);
    const disc = b.pow(2).add(R.mul(step).mul(2)).sqrt();
    const Δ = disc.sub(b).div(step).floor();
    const maxBuy = ExpantaNum.min(Δ, amountUpg1cap.sub(amountUpg1));
    if (maxBuy.lte(0)) return;
    const totalCost = maxBuy.mul(
      C.mul(2).add(step.mul(maxBuy.sub(1)))
    ).div(2);
    rebirths = rebirths.sub(totalCost);
    amountUpg1 = amountUpg1.add(maxBuy);
    upg1Cost = upg1Cost.add(step.mul(maxBuy));
    updateDisplay();
    updateDisplay2();
  }
  updateDisplay();
  updateDisplay2();
}

function buyMaxUpgrade2() {
  for (let i = 1; i < 20; i++) {
  const base = new ExpantaNum(10);
  const m = new ExpantaNum(1.5);
  const r = amountUpg7.add(1);
  const k = amountUpg2;
  const A = base.pow(ExpantaNum.div(1, r));
  const B = m.pow(ExpantaNum.div(1, r));
  const R = rebirths;
  const currentCost = A.mul(B.pow(k));
  if (currentCost.gt(R)) return;
  const numerator = R.mul(B.sub(1)).div(currentCost).add(1);
  const Δ = ExpantaNum.log(numerator, B).floor();
  const maxBuy = ExpantaNum.min(Δ, amountUpg2cap.sub(amountUpg2));
  if (maxBuy.lte(0)) return;
  const totalCost = currentCost.mul(B.pow(maxBuy).sub(1)).div(B.sub(1));
  if (totalCost.gt(R)) return;
  rebirths = rebirths.sub(totalCost);
  amountUpg2 = amountUpg2.add(maxBuy);
  evalcosts();
  updateDisplay();
  updateDisplay2();
  }
}

function buyMaxUpgrade3() {
  for (let i = 1; i < 20; i++) {
  const base = new ExpantaNum(750);
  const m = new ExpantaNum(1.25);
  const r = amountUpg7.add(1);
  const k = amountUpg3;
  const A = base.pow(ExpantaNum.div(1, r));
  const B = m.pow(ExpantaNum.div(1, r));
  const R = rebirths;
  const currentCost = A.mul(B.pow(k));
  if (currentCost.gt(R)) return;
  const numerator = R.mul(B.sub(1)).div(currentCost).add(1);
  const Δ = ExpantaNum.log(numerator, B).floor();
  const maxBuy = ExpantaNum.min(Δ, amountUpg3cap.sub(amountUpg3));
  if (maxBuy.lte(0)) return;
  const totalCost = currentCost.mul(B.pow(maxBuy).sub(1)).div(B.sub(1));
  if (totalCost.gt(R)) return;
  rebirths = rebirths.sub(totalCost);
  amountUpg3 = amountUpg3.add(maxBuy);
  evalcosts();
  updateDisplay();
  updateDisplay2();
  }
}

function buyMaxUpgrade4() {
  for (let i = 1; i < 20; i++) {
  const base = new ExpantaNum(1250);
  const m = new ExpantaNum(1.4);
  const r = amountUpg7.add(1);
  const k = amountUpg4;
  const A = base.pow(ExpantaNum.div(1, r));
  const B = m.pow(ExpantaNum.div(1, r));
  const R = rebirths;
  const currentCost = A.mul(B.pow(k));
  if (currentCost.gt(R)) return;
  const numerator = R.mul(B.sub(1)).div(currentCost).add(1);
  const Δ = ExpantaNum.log(numerator, B).floor();
  const maxBuy = ExpantaNum.min(Δ, amountUpg4cap.sub(amountUpg4));
  if (maxBuy.lte(0)) return;
  const totalCost = currentCost.mul(B.pow(maxBuy).sub(1)).div(B.sub(1));
  if (totalCost.gt(R)) return;
  rebirths = rebirths.sub(totalCost);
  amountUpg4 = amountUpg4.add(maxBuy);
  evalcosts();
  updateDisplay();
  updateDisplay2();
  }
}
function clampUpgradesToCaps() {
  if (amountUpg1.gt(amountUpg1cap)) amountUpg1 = amountUpg1cap;
  if (amountUpg2.gt(amountUpg2cap)) amountUpg2 = amountUpg2cap;
  if (amountUpg3.gt(amountUpg3cap)) amountUpg3 = amountUpg3cap;
  if (amountUpg4.gt(amountUpg4cap)) amountUpg4 = amountUpg4cap;
  if (amountUpg5.gt(amountUpg5cap)) amountUpg5 = amountUpg5cap;
  if (amountUpg6.gt(amountUpg6cap)) amountUpg6 = amountUpg6cap;
  if (amountUpg7.gt(amountUpg7cap)) amountUpg7 = amountUpg7cap;
  if (amountUpg8.gt(amountUpg8cap)) amountUpg8 = amountUpg8cap;
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
function evalcap() {
  const original = new ExpantaNum(40000);
  const multiplier = ExpantaNum.pow(1.5, amountUpg6);
  amountUpg4cap = original.mul(multiplier);
}
function evalcosts() {
  const upg2 = new ExpantaNum(10);
  const upg3 = new ExpantaNum(750);
  const upg4 = new ExpantaNum(1250);
  upg2Cost =  ExpantaNum.root(upg2.mul(ExpantaNum.pow(1.5, amountUpg2)), amountUpg7.add(1));
  upg3Cost =  ExpantaNum.root(upg3.mul(ExpantaNum.pow(1.25, amountUpg3)), amountUpg7.add(1));
  upg4Cost =  ExpantaNum.root(upg4.mul(ExpantaNum.pow(1.4, amountUpg4)), amountUpg7.add(1));
}
function autoreb() {
  if (amountUpg8.gt(new ExpantaNum(0))) {
    const earnedRebirths = value.slog().log10();
    rebirths = rebirths.add(earnedRebirths);
  }
}
function updateDisplay() {
  clampUpgradesToCaps();
  autoreb();
  const currentValue    = value;
  const currentWillGain = value.slog().log10();
  const { rate: valueOomsRate, layer: valueOomsLayer } =
    calcSmartOomsPerSecond(prevValue, currentValue, dt, 10001);
  const { rate: willOomsRate, layer: willOomsLayer } =
    calcSmartOomsPerSecond(prevWillGainReb, currentWillGain, dt, 10001);
  let valueOomsText = "";
  if (valueOomsLayer <= 10000) {
    valueOomsText = ` (${format(valueOomsRate, 2)} OoMs^${valueOomsLayer}/s)`;
  }

  let willOomsText = "";
  if (willOomsLayer <= 10000 && (value.slog().log10()) >= 1) {
    willOomsText = ` (${format(willOomsRate, 5)} OoMs^${willOomsLayer}/s)`;
  }

  document.getElementById("value").innerText    = `Value: ${format(value, 3)}${valueOomsText}`;
  document.getElementById("willgainreb").innerText = 
    `Will gain rebirths: ${format(currentWillGain, 3)}${willOomsText}`;
  document.getElementById("willgaintran").innerText = 
    `Will gain transcend: ${format(value.slog().log10().log10().log10().add(1), 3)}`;
  document.getElementById("rebirths").innerText = `Rebirths: ${format(rebirths, 3)}`;
  prevValue        = currentValue;
  prevWillGainReb  = currentWillGain;
  
}

function updateDisplay2() { // this is for more speed incase your device is poor because we dont need to update these ones if they aren't changing
  evalMulti();
  evalBase();
  evalpow();  
  evalcap();
  evalcosts();
  document.getElementById("transcend").innerText = `Transcend: ${format(transcends, 3)}`;
  document.getElementById("upg1Cost").innerText = format(upg1Cost, 3);
  document.getElementById("upg2Cost").innerText = format(upg2Cost, 3);
  document.getElementById("upg3Cost").innerText = format(upg3Cost, 3);
  document.getElementById("upg4Cost").innerText = format(upg4Cost, 3);
  document.getElementById("upg5Cost").innerText = format(upg5Cost, 3);
  document.getElementById("upg6Cost").innerText = format(upg6Cost, 3);
  document.getElementById("upg7Cost").innerText = format(upg7Cost, 3);
  document.getElementById("upg8Cost").innerText = format(upg8Cost, 0);
  document.getElementById("upg1amount").innerText = format(amountUpg1, 0);
  document.getElementById("upg2amount").innerText = format(amountUpg2, 0);
  document.getElementById("upg3amount").innerText = format(amountUpg3, 0);
  document.getElementById("upg4amount").innerText = format(amountUpg4, 0);
  document.getElementById("upg5amount").innerText = format(amountUpg5, 0);
  document.getElementById("upg6amount").innerText = format(amountUpg6, 0);
  document.getElementById("upg7amount").innerText = format(amountUpg7, 0);
  document.getElementById("upg8amount").innerText = format(amountUpg8, 0);
  document.getElementById("upg1cap").innerText = `${format(amountUpg1cap, 0)}`;
  document.getElementById("upg2cap").innerText = `${format(amountUpg2cap, 0)}`;
  document.getElementById("upg3cap").innerText = `${format(amountUpg3cap, 0)}`;
  document.getElementById("upg4cap").innerText = `${format(amountUpg4cap, 0)}`;
  document.getElementById("upg5cap").innerText = `${format(amountUpg5cap, 0)}`;
  document.getElementById("upg6cap").innerText = `${format(amountUpg6cap, 0)}`;
  document.getElementById("upg7cap").innerText = `${format(amountUpg7cap, 0)}`;
  document.getElementById("upg8cap").innerText = `${format(amountUpg8cap, 0)}`;
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
