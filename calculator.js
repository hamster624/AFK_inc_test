let notationFormat = 'expanta'; // default

document.addEventListener('DOMContentLoaded', function() {
  // inject calculator UI
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

  // perform operations
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
  const calculatorButtonHTML = `
    <button id="calculatorButton" onclick="openCalculator()" style="position: fixed; inset-block-start: 55px; inset-inline-start: 10px; background: black; color: white; border: 1px solid white; padding: 10px; z-index: 1000;">
      Calculator
    </button>
  `;
  document.body.insertAdjacentHTML('beforeend', calculatorButtonHTML);
});