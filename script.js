const spins = [];

const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
const blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

const columns = {
  "1st Column": [1, 4, 7, 10, 2, 5, 8, 11, 3, 6, 9, 12],
  "2nd Column": [13, 16, 19, 22, 14, 17, 20, 23, 15, 18, 21, 24],
  "3rd Column": [25, 28, 31, 34, 26, 29, 32, 35, 27, 30, 33, 36]
};

const rows = {
  "Top Row": [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
  "Middle Row": [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
  "Bottom Row": [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]
};

function addSpin() {
  const input = document.getElementById("spinInput");
  const value = Number(input.value);

  if (input.value === "" || value < 0 || value > 36) {
    alert("Enter a valid number between 0 and 36.");
    return;
  }

  spins.unshift(value);

  if (spins.length > 50) {
    spins.pop();
  }

  input.value = "";

  displaySpins();
  updateTrackers();
}

function displaySpins() {
  const spinList = document.getElementById("spinList");
  spinList.innerHTML = "";

  spins.forEach((num) => {
    const span = document.createElement("span");
    span.textContent = num + " ";

    if (redNumbers.includes(num)) {
      span.style.color = "red";
    } else if (blackNumbers.includes(num)) {
      span.style.color = "black";
    } else {
      span.style.color = "green";
    }

    span.style.fontWeight = "bold";
    span.style.marginRight = "8px";
    spinList.appendChild(span);
  });
}

function updateTrackers() {
  updateUnhitNumbers();
  updateColumnHits();
  updateRowHits();
  updateStreakInfo();
  updateBettingAdvice();
}

function updateUnhitNumbers() {
  const allNumbers = Array.from({ length: 37 }, (_, i) => i);
  const unhit = allNumbers.filter((num) => !spins.includes(num));

  document.getElementById("unhitNumbers").textContent = unhit.join(", ");
}

function updateColumnHits() {
  document.getElementById("columnHits").innerHTML = Object.entries(columns)
    .map(([name, numbers]) => `${name}: ${countHits(numbers)} hits`)
    .join("<br>");
}

function updateRowHits() {
  document.getElementById("rowHits").innerHTML = Object.entries(rows)
    .map(([name, numbers]) => `${name}: ${countHits(numbers)} hits`)
    .join("<br>");
}

function updateStreakInfo() {
  const latest = spins[0];

  document.getElementById("streakInfo").textContent =
    `Latest spin: ${latest} | Row: ${getSection(latest, rows)} | Column: ${getSection(latest, columns)}`;
}

function updateBettingAdvice() {
  const rowStats = Object.entries(rows).map(([name, numbers]) => ({
    name,
    hits: countHits(numbers)
  }));

  const columnStats = Object.entries(columns).map(([name, numbers]) => ({
    name,
    hits: countHits(numbers)
  }));

  rowStats.sort((a, b) => a.hits - b.hits);
  columnStats.sort((a, b) => a.hits - b.hits);

  const coldestRow = rowStats[0];
  const coldestColumn = columnStats[0];

  document.getElementById("bettingAdvice").innerHTML = `
    Bet suggestion:<br>
    <strong>${coldestRow.name}</strong> — ${coldestRow.hits} hits<br>
    <strong>${coldestColumn.name}</strong> — ${coldestColumn.hits} hits
  `;
}

function countHits(numbers) {
  return spins.filter((spin) => numbers.includes(spin)).length;
}

function getSection(number, group) {
  if (number === 0) return "Zero";

  for (const [name, numbers] of Object.entries(group)) {
    if (numbers.includes(number)) {
      return name;
    }
  }

  return "Unknown";
}
