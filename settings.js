
// save stuff
window.addEventListener('DOMContentLoaded', () => {
  const loadButton = document.getElementById('loadButton');
  const saveInput = document.getElementById('saveInput');
  const saveButton = document.getElementById('saveButton');

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
        upg9Cost = new ExpantaNum(gameData.upg9Cost || 60);
        amountUpg1 = new ExpantaNum(gameData.amountUpg1 || 0);
        amountUpg2 = new ExpantaNum(gameData.amountUpg2 || 0);
        amountUpg3 = new ExpantaNum(gameData.amountUpg3 || 0);
        amountUpg4 = new ExpantaNum(gameData.amountUpg4 || 0);
        amountUpg5 = new ExpantaNum(gameData.amountUpg5 || 0);
        amountUpg6 = new ExpantaNum(gameData.amountUpg6 || 0);
        amountUpg7 = new ExpantaNum(gameData.amountUpg7 || 0);
        amountUpg8 = new ExpantaNum(gameData.amountUpg8 || 0);
        amountUpg9 = new ExpantaNum(gameData.amountUpg9 || 0);
        amountUpg1cap = new ExpantaNum(gameData.amountUpg1cap || 40000);
        amountUpg2cap = new ExpantaNum(gameData.amountUpg2cap || 15000);
        amountUpg3cap = new ExpantaNum(gameData.amountUpg3cap || 30000);
        amountUpg4cap = new ExpantaNum(gameData.amountUpg4cap || 40000);
        amountUpg5cap = new ExpantaNum(gameData.amountUpg5cap || 10);
        amountUpg6cap = new ExpantaNum(gameData.amountUpg6cap || 5);
        amountUpg7cap = new ExpantaNum(gameData.amountUpg7cap || 2);
        amountUpg8cap = new ExpantaNum(gameData.amountUpg8cap || 1);
        amountUpg9cap = new ExpantaNum(gameData.amountUpg9cap || 10);
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

  saveButton.onclick = () => {
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
      upg9Cost: upg9Cost.toString(),
      amountUpg1: amountUpg1.toString(),
      amountUpg2: amountUpg2.toString(),
      amountUpg3: amountUpg3.toString(),
      amountUpg4: amountUpg4.toString(),
      amountUpg5: amountUpg5.toString(),
      amountUpg6: amountUpg6.toString(),
      amountUpg7: amountUpg7.toString(),
      amountUpg8: amountUpg8.toString(),
      amountUpg9: amountUpg9.toString(),
      amountUpg1cap: amountUpg1cap.toString(),
      amountUpg2cap: amountUpg2cap.toString(),
      amountUpg3cap: amountUpg3cap.toString(),
      amountUpg4cap: amountUpg4cap.toString(),
      amountUpg5cap: amountUpg5cap.toString(),
      amountUpg6cap: amountUpg6cap.toString(),
      amountUpg7cap: amountUpg7cap.toString(),
      amountUpg8cap: amountUpg8cap.toString(),
      amountUpg9cap: amountUpg9cap.toString(),
    });

    const { obfuscatedData, shift } = obfuscateData(saveData);
    const encoded = toBase64(String.fromCharCode(shift) + obfuscatedData);

    navigator.clipboard.writeText(encoded)
      .then(() => alert("Save copied to clipboard!"))
      .catch(() => alert("Failed to copy save."));
  };
});
//reset game
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
  amountUpg9 = new ExpantaNum(0);
  amountUpg1cap = new ExpantaNum(40000);
  amountUpg2cap = new ExpantaNum(15000);
  amountUpg3cap = new ExpantaNum(30000);
  amountUpg4cap = new ExpantaNum(40000);
  amountUpg5cap = new ExpantaNum(10);
  amountUpg6cap = new ExpantaNum(5);
  amountUpg7cap = new ExpantaNum(2);
  amountUpg8cap = new ExpantaNum(1);
  amountUpg9cap = new ExpantaNum(10);
  upg1Cost = new ExpantaNum(3);
  upg2Cost = new ExpantaNum(10);
  upg3Cost = new ExpantaNum(750);
  upg4Cost = new ExpantaNum(1250);
  upg5Cost = new ExpantaNum(5);
  upg6Cost = new ExpantaNum(10);
  upg7Cost = new ExpantaNum(20);
  upg8Cost = new ExpantaNum(50);
  upg9Cost = new ExpantaNum(60);
  localStorage.removeItem("afk_save");
  saveGame();
  updateDisplay();
  updateDisplay2();
  evalcosts();
  document.getElementById("playtime").innerText = `Playtime: ${formatTime(playtime)}`;
}
// calculator
let notationFormat = 'expanta'; // default
document.addEventListener('DOMContentLoaded', function() {
  const calculatorHTML = `
    <div id="calculatormenu" style="display: none; position: fixed; inset-block-start: 20%; inset-inline-start: 20%; inline-size: 400px; background: black; color: white; border: 1px solid white; padding: 20px; z-index: 1000; max-block-size: 80vh; overflow-y: auto;">
      <h3 style="text-align: center;">Calculator</h3>
      <input id="num1" type="text" placeholder="Enter number 1" style="inline-size: 90%; margin-block-end: 10px; background: black; color: white; border: 1px solid white;" />
      <input id="num2" type="text" placeholder="Enter number 2" style="inline-size: 90%; margin-block-end: 10px; background: black; color: white; border: 1px solid white;" />
      <div class="input-group">
        <label for="arrowCount">Number of Arrows:</label>
        <input type="text" id="arrowCount" value="5" min="1" />
        <button onclick="performOperation('Arrows')">Arrow Operation</button>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-block-end: 10px;">
        <button onclick="performOperation('add')"> Add (+)</button>
        <button onclick="performOperation('subtract')"> Subtract (-)</button>
        <button onclick="performOperation('multiply')"> Multiply (×)</button>
        <button onclick="performOperation('divide')"> Divide (÷)</button>
        <button onclick="performOperation('exponentiate')"> Exponent (^) </button>
        <button onclick="performOperation('tetrate')">Tetrate (^^)</button>
        <button onclick="performOperation('pentate')">Pentate (^^^)</button>
        <button onclick="performOperation('hexate')">Hexate (^^^^)</button>
        <button onclick="performOperation('factorial')">factorial</button>
        <button onclick="performOperation('sqrt')">Sqrt √</button> 
        <button onclick="performOperation('cbrt')">Cbrt ∛</button>
        <button onclick="performOperation('log')">log</button>
        <button onclick="performOperation('ln')">ln</button>
        <button onclick="performOperation('logb')">log Base (num2 is base)</button>
        <button onclick="performOperation('slog')">slog (num2 is base)</button>
        <button onclick="performOperation('2slog')"> double slog (base 10)</button>
        <button onclick="performOperation('root')"> root (num2 is root amount)</button>
        <button onclick="performOperation('ssqrt')"> ssqrt</button>
        <button onclick="performOperation('expansion')"> Expansion? idk</button>
      </div>
      <p>Result: <span id="result" style="color: lime;">N/A</span></p>
      <button onclick="closeCalculator()" style="inline-size: 90%; background: black; color: white; border: 1px solid white;">Close</button>
      <button onclick="setNotation('expanta')">ExpantaNum Format (default)</button>
      <button onclick="setNotation('hyper')">Hyper</button>
      <button onclick="setNotation('test')">ExpantaNum's built in notation</button>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', calculatorHTML);

  let E = ExpantaNum;
  let lastOperation = null;

  window.performOperation = function(operation) {
    const num1Str = document.getElementById('num1').value.replace(/,/g, '');
    const num2Str = document.getElementById('num2').value.replace(/,/g, '');
    const arrowCount = E(document.getElementById('arrowCount').value);
    const num1 = E(num1Str);
    const num2 = E(num2Str);
    let result;

    switch (operation) {
      case 'add': result = num1.add(num2); break;
      case 'subtract': result = num1.sub(num2); break;
      case 'multiply': result = num1.mul(num2); break;
      case 'divide': result = num1.div(num2); break;
      case 'exponentiate': result = num1.pow(num2); break;
      case 'tetrate': result = num1.tetr(num2); break;
      case 'pentate': result = num1.pentate(num2); break;
      case 'hexate': result = num1.hexate(num2); break;
      case 'factorial': result = num1.factorial(); break;
      case 'sqrt': result = E(10).pow(num1.log10().div(2)); break;
      case 'cbrt': result = E(10).pow(num1.log10().div(3)); break;
      case 'log': result = num1.log10(); break;
      case 'ln': result = num1.log(); break;
      case 'logb': result = num1.logBase(num2); break;
      case 'slog': result = num1.slog(num2); break;
      case '2slog': result = num1.slog().slog(); break;
      case 'root': result = E(10).pow(num1.log10().div(num2)); break;
      case 'ssqrt': result = num1.ssqrt(); break;
      case 'expansion': result = ExpantaNum.expansion(num1, num2); break;
      case 'Arrows': result = ExpantaNum.arrow(num1, arrowCount, num2); break;
    }

    document.getElementById('result').textContent = notate(result, 6);
    lastOperation = { operation };
  };

  window.openCalculator = () => document.getElementById('calculatormenu').style.display = 'block';
  window.closeCalculator = () => document.getElementById('calculatormenu').style.display = 'none';

  setInterval(() => { if (lastOperation) performOperation(lastOperation.operation); }, 10);

  window.setNotation = function(format) {
    notationFormat = format;
    if (lastOperation) performOperation(lastOperation.operation);
  };

  function notate(expnum, precision = 6) {
    const exp = E(expnum);
    switch (notationFormat) {
      case 'hyper':
        return exp.gte(E.arrow(10, 20, 10))
          ? format(exp, precision, false)
          : exp.toHyperE();
      case 'expanta':
        return format(exp, precision, false);
      case 'test':
        return exp.toString();
    }
  }
// switch tab mechanism
});
    function switchTab(tab) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));

      if (tab === 'game') {
        document.getElementById('game-wrapper').classList.add('active');
        document.querySelectorAll('.tab-button')[0].classList.add('active');
      } else if (tab === 'transcend') {
        document.getElementById('transcend-wrapper').classList.add('active');
        document.querySelectorAll('.tab-button').forEach(btn => {
          if (btn.textContent.includes('Transcend')) btn.classList.add('active');
        });
      } else if (tab === 'settings') {
        document.getElementById('settings-wrapper').classList.add('active');
        document.querySelectorAll('.tab-button').forEach(btn => {
          if (btn.textContent.includes('Settings')) btn.classList.add('active');
        });
      }
    }

    const TRANSCEND_UNLOCK_REQ = ExpantaNum("10^^ee10000");

    function updateTabLockStatus() {
      const buttons = [
        document.getElementById("transcend-tab-button"),
        document.getElementById("transcend-tab-button-2"),
        document.getElementById("transcend-tab-button-3")
      ];

      const unlocked = value.gte(TRANSCEND_UNLOCK_REQ) || transcended.eq(1);
      const label = unlocked ? "Transcend" : "Transcend (Locked - Fee10,000 required)";

      buttons.forEach(btn => {
        if (!btn) return;
        btn.textContent = label;
        btn.classList.toggle("locked", !unlocked);
      });
    }

    function tryOpenTranscend() {
      if (value.gte(TRANSCEND_UNLOCK_REQ) || transcended.eq(1)) {
        switchTab("transcend");
      }
    }

    setInterval(updateTabLockStatus, 20);
