const archetypes = {
  DTRF: { name: "Architect", tagline: "Blueprints Over Bullsh*t", description: "Master planner, loves structure. Needs to chill.", stats: { structure: 90, chaos: 10 }, mentorMatch: "SAEC (Explorer): Grounds their chaos." },
  DTRC: { name: "Commander", tagline: "Get It Done or Get Out", description: "Decisive leader, moves fast. Needs empathy.", stats: { leadership: 85, empathy: 20 }, mentorMatch: "SARC (Empath): Teaches people skills." },
  STRE: { name: "Optimizer", tagline: "Process is King", description: "Efficiency guru, hates waste. Needs flexibility.", stats: { process: 80, innovation: 15 }, mentorMatch: "SAEC (Explorer): Sparks creativity." },
  SARC: { name: "Empath", tagline: "Heart of the Team", description: "Nurturing, conflict-averse. Needs timelines.", stats: { empathy: 90, structure: 30 }, mentorMatch: "DTRF (Architect): Adds rigor." },
  STRF: { name: "Stabilizer", tagline: "Rock in the Storm", description: "Reliable, protective. Needs to take risks.", stats: { reliability: 85, risk: 20 }, mentorMatch: "SARE (Visionary): Inspires boldness." },
  DARC: { name: "Challenger", tagline: "Born for Chaos", description: "Thrives in crises. Needs process.", stats: { urgency: 90, planning: 25 }, mentorMatch: "STRF (Stabilizer): Teaches calm." },
  SARE: { name: "Visionary", tagline: "Dream Big, Plan Later", description: "Inspires, abstracts. Needs execution.", stats: { vision: 85, execution: 20 }, mentorMatch: "DARC (Challenger): Drives action." },
  SAEC: { name: "Explorer", tagline: "Vibes Over Plans", description: "Creative, anti-routine. Needs grounding.", stats: { creativity: 90, structure: 15 }, mentorMatch: "DTRF (Architect): Adds discipline." }
};

const questions = [
  { text: "When a project kicks off, you:", options: [
    { text: "Map out every milestone with a detailed plan.", archetype: "DTRF" },
    { text: "Rally the team with a big-picture vision.", archetype: "SARE" }
  ]},
  { text: "In a crisis, you:", options: [
    { text: "Jump in and solve it fast.", archetype: "DARC" },
    { text: "Check in with the team’s emotions.", archetype: "SARC" }
  ]},
  { text: "Your ideal team:", options: [
    { text: "Has clear roles and processes.", archetype: "STRE" },
    { text: "Experiments and breaks rules.", archetype: "SAEC" }
  ]},
  { text: "You lead by:", options: [
    { text: "Giving clear orders and deadlines.", archetype: "DTRC" },
    { text: "Supporting and empowering others.", archetype: "STRF" }
  ]},
  { text: "Your planning style:", options: [
    { text: "Detailed Gantt charts and timelines.", archetype: "DTRF" },
    { text: "Flexible, adapting as you go.", archetype: "SAEC" }
  ]},
  { text: "Under pressure, you:", options: [
    { text: "Thrive and make quick calls.", archetype: "DARC" },
    { text: "Keep everyone calm and aligned.", archetype: "SARC" }
  ]},
  { text: "Your weakness:", options: [
    { text: "Over-controlling processes.", archetype: "STRE" },
    { text: "Lack of follow-through.", archetype: "SARE" }
  ]},
  { text: "Your work vibe:", options: [
    { text: "Decisive and results-driven.", archetype: "DTRC" },
    { text: "Reliable and supportive.", archetype: "STRF" }
  ]}
];

let currentQuestion = 0;
let answers = [];

function renderQuestion() {
  const quizDiv = document.getElementById('quiz');
  if (currentQuestion < questions.length) {
    quizDiv.innerHTML = `
      <h2>${questions[currentQuestion].text}</h2>
      ${questions[currentQuestion].options.map((option, index) => `
        <button onclick="handleAnswer('${option.archetype}')">
          ${option.text}
        </button>
      `).join('')}
      <p>Question ${currentQuestion + 1} of ${questions.length}</p>
    `;
  } else {
    showResult();
  }
}

function handleAnswer(archetype) {
  answers.push(archetype);
  currentQuestion++;
  renderQuestion();
}

function showResult() {
  const quizDiv = document.getElementById('quiz');
  const resultDiv = document.getElementById('result');
  quizDiv.classList.add('hidden');
  resultDiv.classList.remove('hidden');

  const counts = answers.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
  const dominant = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  const result = archetypes[dominant];

  resultDiv.innerHTML = `
    <h2 class="result-title">${result.name}</h2>
    <p class="result-tagline">${result.tagline}</p>
    <p>${result.description}</p>
    <p class="result-stats">Stats: Structure ${result.stats.structure}%, Chaos ${result.stats.chaos}%</p>
    <p>Mentor Match: ${result.mentorMatch}</p>
    <button onclick="resetQuiz()">Retake Test</button>
  `;
}

function resetQuiz() {
  currentQuestion = 0;
  answers = [];
  document.getElementById('quiz').classList.remove('hidden');
  document.getElementById('result').classList.add('hidden');
  renderQuestion();
}

// Initialize quiz
renderQuestion();