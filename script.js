const spins = [];

const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
const blackNumbers = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];

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

function getColor(num) {
  if (redNumbers.includes(num)) return "red";
  if (blackNumbers.includes(num)) return "black";
  return "green";
}

function getColumn(num) {
  for (const [col, nums] of Object.entries(columns)) {
    if (nums.includes(num)) return col;
  }
  return null;
}

function getRow(num) {
  for (const [row, nums] of Object.entries(rows)) {
    if (nums.includes(num)) return row;
  }
  return null;
}

function getStreak(arr) {
  if (arr.length === 0) return { value: null, streak: 0 };
  let streak = 1;
  const val = arr[0];
  for (let i = 1; i < ar
