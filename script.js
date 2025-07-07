const spins = [];

const redNumbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
const blackNumbers = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];

function addSpin() {
  const input = document.getElementById("spinInput");
  const value = parseInt(input.value);

  if (isNaN(value) || value < 0 || value > 36) {
    alert("Enter a valid number between 0 and 36.");
    return;
  }

  spins.unshift(value); // Add to start
  if (spins.length > 50) spins.pop(); // Keep only last 50

  displaySpins();
  analyzeSpinsWithAI(); // Ask AI for betting suggestion
  input.value = '';
}

function displaySpins() {
  document.getElementById("spinList").textContent = spins.join(', ');
}

async function analyzeSpinsWithAI() {
  const responseBox = document.getElementById("aiSuggestion");
  responseBox.textContent = "Analyzing...";

  const systemPrompt = `
You are a roulette pattern recognition expert. Given the last 50 spins, analyze for repeating patterns in red/black, odd/even, columns, rows, and specific numbers. Suggest a smart betting strategy based on any patterns or streaks found. Be concise and specific.
`;

  const userMessage = `Here are the last 50 spins: ${spins.join(', ')}`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY_HERE" // Replace this later
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await res.json();
    const aiMessage = data.choices[0].message.content.trim();
    responseBox.textContent = aiMessage;

  } catch (err) {
    responseBox.textContent = "AI analysis failed.";
    console.error(err);
  }
}
