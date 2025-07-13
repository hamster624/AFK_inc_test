let value = new ExpantaNum(10);
let rebirths = new ExpantaNum(0);
let playtime = 0;
let amountUpg1 = new ExpantaNum(0);
let amountUpg2 = new ExpantaNum(0);
let amountUpg3 = new ExpantaNum(0);
let amountUpg4 = new ExpantaNum(0);
let multi = new ExpantaNum(1.001);
let base = new ExpantaNum(10);
let pow = new ExpantaNum(1);
let upg1Cost = new ExpantaNum(3);
let upg2Cost = new ExpantaNum(10);
let upg3Cost = new ExpantaNum(750);
let upg4Cost = new ExpantaNum(1250);

const rebirthThreshold = new ExpantaNum("(10^)^9 10");
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
        multi: multi.toString(),
        base: base.toString(),
        pow: pow.toString(),
        playtime: playtime.toString(),
        upg1Cost: upg1Cost.toString(),
        upg2Cost: upg2Cost.toString(),
        upg3Cost: upg3Cost.toString(),
        upg4Cost: upg4Cost.toString(),
        amountUpg1: amountUpg1.toString(),
        amountUpg2: amountUpg2.toString(),
        amountUpg3: amountUpg3.toString(),
        amountUpg4: amountUpg4.toString(),
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
            multi = new ExpantaNum(gameData.multi || 1.001);
            base = new ExpantaNum(gameData.base || 10);
            pow = new ExpantaNum(gameData.pow || 1);
            playtime = gameData.playtime || 0;
            upg1Cost = new ExpantaNum(gameData.upg1Cost || 3);
            upg2Cost = new ExpantaNum(gameData.upg2Cost || 10);
            upg3Cost = new ExpantaNum(gameData.upg3Cost || 750);
            upg4Cost = new ExpantaNum(gameData.upg4Cost || 1250);
            amountUpg1 = new ExpantaNum(gameData.amountUpg1 || 0);
            amountUpg2 = new ExpantaNum(gameData.amountUpg2 || 0);
            amountUpg3 = new ExpantaNum(gameData.amountUpg3 || 0);
            amountUpg4 = new ExpantaNum(gameData.amountUpg4 || 0);
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

function buyUpgrade1() {
  if (rebirths.gte(upg1Cost)) {
    rebirths = rebirths.sub(upg1Cost);
    amountUpg1 = amountUpg1.add(1);
    upg1Cost = upg1Cost.add(2);
    updateDisplay();
    updateDisplay2();
  }
}

function buyUpgrade2() {
  if (rebirths.gte(upg2Cost)) {
    rebirths = rebirths.sub(upg2Cost);
    amountUpg2 = amountUpg2.add(1);
    upg2Cost   = upg2Cost.mul(1.5);
    updateDisplay();
    updateDisplay2();
  }
}
function buyUpgrade3() {
  if (rebirths.gte(upg3Cost)) {
    rebirths = rebirths.sub(upg3Cost);
    amountUpg3 = amountUpg3.add(1);
    upg3Cost   = upg3Cost.mul(1.25);
    updateDisplay();
    updateDisplay2();
  }
}
function buyUpgrade4() {
  if (rebirths.gte(upg4Cost)) {
    rebirths = rebirths.sub(upg4Cost);
    amountUpg4 = amountUpg4.add(1);
    upg4Cost   = upg4Cost.mul(1.4);
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
  multi = new ExpantaNum(1.001);
  base = new ExpantaNum(10);
  pow = new ExpantaNum(1);
  upg1Cost = new ExpantaNum(3);
  upg2Cost = new ExpantaNum(10);
  upg3Cost = new ExpantaNum(750);
  upg4Cost = new ExpantaNum(750);
  localStorage.removeItem("afk_save");
  saveGame();
  updateDisplay();
}
function getSaveString() {
    const saveData = JSON.stringify({
        value: value.toString(),
        rebirths: rebirths.toString(),
        playtime: playtime.toString(),
        multi: multi.toString(),
        base: base.toString(),
        pow: pow.toString(),
        upg1Cost: upg1Cost.toString(),
        upg2Cost: upg2Cost.toString(),
        upg3Cost: upg3Cost.toString(),
        upg4Cost: upg4Cost.toString(),
        amountUpg1: amountUpg1.toString(),
        amountUpg2: amountUpg2.toString(),
        amountUpg3: amountUpg3.toString(),
        amountUpg4: amountUpg4.toString(),
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
            multi = new ExpantaNum(data.multi || 1.001);
            base = new ExpantaNum(data.base || 10);
            pow = new ExpantaNum(data.pow || 1);
            upg1Cost = new ExpantaNum(data.upg1Cost || 3);
            upg2Cost = new ExpantaNum(data.upg2Cost || 10);
            upg3Cost = new ExpantaNum(data.upg3Cost || 750);
            upg4Cost = new ExpantaNum(data.upg4Cost || 1250);
            amountUpg1 = new ExpantaNum(data.amountUpg1 || 0);
            amountUpg2 = new ExpantaNum(data.amountUpg2 || 0);
            amountUpg3 = new ExpantaNum(data.amountUpg3 || 0);
            amountUpg4 = new ExpantaNum(data.amountUpg4 || 0);

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
        playtime: playtime.toString(),
        multi: multi.toString(),
        base: base.toString(),
        pow: pow.toString(),
        upg1Cost: upg1Cost.toString(),
        upg2Cost: upg2Cost.toString(),
        upg3Cost: upg3Cost.toString(),
        upg4Cost: upg4Cost.toString(),
        amountUpg1: amountUpg1.toString(),
        amountUpg2: amountUpg2.toString(),
        amountUpg3: amountUpg3.toString(),
        amountUpg4: amountUpg4.toString(),
    });
    const { obfuscatedData, shift } = obfuscateData(saveData);
    const encoded = toBase64(String.fromCharCode(shift) + obfuscatedData);

    navigator.clipboard.writeText(encoded).then(() => {
        alert("Save copied to clipboard!");
    }).catch(() => {
        alert("Failed to copy save.");
    });
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
  pow = ExpantaNum.mul(original.add(upg1),10000).ceil().div(10000);
}
function updateDisplay() {
  document.getElementById("value").innerText    = `Value: ${format(value, 3)}`;
  document.getElementById("rebirths").innerText = `Rebirths: ${format(rebirths, 3)}`;
  document.getElementById("willgainreb").innerText = `Will gain rebirths: ${format(value.slog().log10(), 3)}`;
}
function updateDisplay2() { // this is for more speed incase your device is poor because we dont need to update these ones if they aren't changing
  evalMulti();
  evalBase();
  evalpow();
  document.getElementById("upg1Cost").innerText = format(upg1Cost, 3);
  document.getElementById("upg2Cost").innerText = format(upg2Cost, 3);
  document.getElementById("upg3Cost").innerText = format(upg3Cost, 3);
  document.getElementById("upg4Cost").innerText = format(upg4Cost, 3);
  document.getElementById("upg1amount").innerText = format(amountUpg1, 0);
  document.getElementById("upg2amount").innerText = format(amountUpg2, 0);
  document.getElementById("upg3amount").innerText = format(amountUpg3, 0);
  document.getElementById("upg4amount").innerText = format(amountUpg4, 0);
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