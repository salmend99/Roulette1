const spins = [];

const columns = {
  col1: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
  col2: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
  col3: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]
};

const rows = {
  row1: Array.from({ length: 12 }, (_, i) => i + 1),
  row2: Array.from({ length: 12 }, (_, i) => i + 13),
  row3: Array.from({ length: 12 }, (_, i) => i + 25)
};

function addSpin() {
  const input = document.getElementById("spinInput");
  const num = parseInt(input.value);
  if (!isNaN(num) && num >= 0 && num <= 36) {
    spins.unshift(num);
    if (spins.length > 30) spins.pop();
    updateDisplay();
    input.value = "";
  }
}

function countHits(group) {
  const result = {};
  Object.entries(group).forEach(([key, numbers]) => {
    result[key] = spins.filter(n => numbers.includes(n)).length;
  });
  return result;
}

function getUnhitNumbers() {
  const allNumbers = Array.from({ length: 37 }, (_, i) => i);
  return allNumbers.filter(n => !spins.includes(n));
}

function updateDisplay() {
  document.getElementById("spinList").textContent = spins.join(", ") || "No spins yet.";

  const colHits = countHits(columns);
  const rowHits = countHits(rows);

  const colList = document.getElementById("columnHits");
  colList.innerHTML = "";
  Object.entries(colHits).forEach(([key, count]) => {
    const li = document.createElement("li");
    li.textContent = `${key.toUpperCase()}: ${count}`;
    colList.appendChild(li);
  });

  const rowList = document.getElementById("rowHits");
  rowList.innerHTML = "";
  Object.entries(rowHits).forEach(([key, count]) => {
    const li = document.createElement("li");
    li.textContent = `${key.toUpperCase()}: ${count}`;
    rowList.appendChild(li);
  });

  const unhit = getUnhitNumbers();
  document.getElementById("unhitNumbers").textContent = unhit.join(", ") || "All numbers hit.";
}
