const archetypes = {
  DTRF: { name: "Strategist", tagline: "Gantt Charts Are My Love Language", description: "Tactical planner, structured leader. Growth: Loosen up.", strengths: ["Planning", "Scope Control"], gap: "Flexibility", mentorMatch: { top: "SARC", score: 4, reason: "Softens rigidity with empathy." }, secondary: null },
  SARC: { name: "Facilitator", tagline: "Team Vibes Over Everything", description: "Empathetic coach, chaos whisperer. Growth: Add structure.", strengths: ["Conflict Resolution"], gap: "Process Rigor", mentorMatch: { top: "DTRF", score: 4, reason: "Adds discipline." }, secondary: null },
  DARC: { name: "Firefighter", tagline: "Chaos Is My Playground", description: "Thrives in crises, urgent action. Growth: Plan ahead.", strengths: ["Crisis Management"], gap: "Prevention", mentorMatch: { top: "STRF", score: 4, reason: "Teaches planning." }, secondary: null },
  STRF: { name: "Guardian", tagline: "Rock in the Storm", description: "Reliable, risk-aware protector. Growth: Take risks.", strengths: ["Risk Awareness"], gap: "Innovation", mentorMatch: { top: "SARE", score: 4, reason: "Inspires boldness." }, secondary: null },
  STRE: { name: "Bureaucrat", tagline: "Process Is King", description: "Efficiency guru, hates waste. Growth: Adapt.", strengths: ["Process Optimization"], gap: "Creativity", mentorMatch: { top: "SAEC", score: 3, reason: "Sparks innovation." }, secondary: null },
  SAEC: { name: "Free Spirit", tagline: "Vibes Over Plans", description: "Creative, unstructured fun. Growth: Discipline.", strengths: ["Innovation"], gap: "Structure", mentorMatch: { top: "DTRC", score: 3, reason: "Drives execution." }, secondary: null },
  DTRC: { name: "Commander", tagline: "Move Fast or Get Out", description: "Decisive, results-driven. Growth: Empathy.", strengths: ["Execution"], gap: "Team Care", mentorMatch: { top: "SARC", score: 4, reason: "Teaches empathy." }, secondary: null },
  SARE: { name: "Visionary", tagline: "Dream Big, Plan Later", description: "Inspires, big-picture thinker. Growth: Execution.", strengths: ["Inspiration"], gap: "Detail Focus", mentorMatch: { top: "DARC", score: 4, reason: "Pushes action." }, secondary: null }
};

const questions = [
  { text: "Project kickoff: Your move?", options: [
    { text: "Sketch milestones, build a roadmap.", archetype: "DTRF", weight: 2 },
    { text: "Gather the team, ensure they feel heard.", archetype: "SARC", weight: 2 },
    { text: "Rally and assign roles fast.", archetype: "DTRC", weight: 2 },
    { text: "Visualize the big picture first.", archetype: "SARE", weight: 2 }
  ]},
  { text: "Chaos hits: You?", options: [
    { text: "Enforce processes to fix it.", archetype: "STRE", weight: 2 },
    { text: "Understand emotions, support the team.", archetype: "SARC", weight: 2 },
    { text: "Take charge and delegate.", archetype: "DTRC", weight: 2 },
    { text: "Embrace it, find new paths.", archetype: "SAEC", weight: 2 }
  ]},
  // Add remaining 14 questions similarly with weights
  { text: "Under pressure, your strength is?", options: [
    { text: "Keeping the engine running.", archetype: "DTRF", weight: 2 },
    { text: "Being the emotional anchor.", archetype: "SARC", weight: 2 },
    { text: "Thriving in crisis.", archetype: "DARC", weight: 2 },
    { text: "Staying optimistic.", archetype: "SARE", weight: 2 }
  ]}
];

const scenarios = [
  { text: "A stakeholder adds a feature 3 months into a 6-month project, delaying it 3 weeks with no buffer. Deadline’s tied to a market opportunity. How do you handle it?", keyTraits: ["Planning", "Stakeholder Management"] },
  { text: "Key resources are 30% less available due to conflicts. How do you address it?", keyTraits: ["Resource Management", "Problem-Solving"] }
];

let currentQuestion = 0;
let answers = {};
let scenarioResponses = {};

function renderQuestion() {
  const quizDiv = document.getElementById('quiz');
  const progress = document.getElementById('progress');
  if (currentQuestion < questions.length) {
    quizDiv.innerHTML = `
      <h2>${questions[currentQuestion].text}</h2>
      ${questions[currentQuestion].options.map((option, index) => `
        <button 
          onclick="handleAnswer('${option.archetype}', ${option.weight})" 
          aria-label="${option.text}"
          tabindex="0"
        >
          ${option.text}
        </button>
      `).join('')}
      <p>Question ${currentQuestion + 1} of ${questions.length + scenarios.length}</p>
    `;
    progress.style.width = `${((currentQuestion + 1) / (questions.length + scenarios.length)) * 100}%`;
  } else if (currentQuestion < questions.length + scenarios.length) {
    quizDiv.classList.add('hidden');
    document.getElementById('scenario').classList.remove('hidden');
    document.getElementById('scenario-answer').value = '';
    document.getElementById('scenario').innerHTML = `
      <h2>${scenarios[currentQuestion - questions.length].text}</h2>
      <textarea id="scenario-answer" placeholder="Enter your response (100-200 words)" rows="5"></textarea>
      <button onclick="submitScenario()">Submit</button>
    `;
  } else {
    showResult();
  }
}

function handleAnswer(archetype, weight) {
  answers[archetype] = (answers[archetype] || 0) + weight;
  currentQuestion++;
  renderQuestion();
}

function submitScenario() {
  const response = document.getElementById('scenario-answer').value;
  if (response.length >= 100 && response.length <= 200) {
    scenarioResponses[currentQuestion - questions.length] = response;
    currentQuestion++;
    document.getElementById('scenario').classList.add('hidden');
    renderQuestion();
  } else {
    alert("Response must be 100-200 words!");
  }
}

function showResult() {
  const quizDiv = document.getElementById('quiz');
  const scenarioDiv = document.getElementById('scenario');
  const resultDiv = document.getElementById('result');
  quizDiv.classList.add('hidden');
  scenarioDiv.classList.add('hidden');
  resultDiv.classList.remove('hidden');

  const scores = Object.entries(answers).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
  const dominant = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b, "DTRF");
  const secondary = Object.keys(scores).filter(k => k !== dominant).reduce((a, b) => scores[a] > scores[b] ? a : b, null);

  // Analyze scenario responses for traits (simplified logic)
  let traits = {};
  for (let i in scenarioResponses) {
    if (scenarios[i].keyTraits.includes("Planning")) traits["Planning"] = true;
    if (scenarios[i].keyTraits.includes("Stakeholder Management")) traits["Stakeholder Management"] = true;
  }

  const result = archetypes[dominant];
  result.secondary = archetypes[secondary] || null;
  result.traits = traits;

  resultDiv.innerHTML = `
    <div class="result-card">
      <h2 class="result-title">${result.name}</h2>
      <p class="result-tagline">${result.tagline}</p>
      <p>${result.description}</p>
      <p class="result-stats">Strengths: ${result.strengths.join(", ")}</p>
      <p>Gap: ${result.gap}</p>
      ${result.secondary ? `<p>Secondary Trait: ${result.secondary.name}</p>` : ""}
      <p>Traits Detected: ${Object.keys(traits).join(", ") || "None"}</p>
      <p>Mentor Match: ${result.mentorMatch.top} (Score: ${result.mentorMatch.score}/5) - ${result.mentorMatch.reason}</p>
      <button onclick="copyResult('${JSON.stringify(result)}')">Copy Results</button>
      <button onclick="resetQuiz()">Retake Test</button>
    </div>
  `;
}

function copyResult(text) {
  navigator.clipboard.writeText(text)
    .then(() => alert("Results copied!"))
    .catch(() => alert("Copy failed!"));
}

function resetQuiz() {
  currentQuestion = 0;
  answers = {};
  scenarioResponses = {};
  document.getElementById('quiz').classList.remove('hidden');
  document.getElementById('scenario').classList.add('hidden');
  document.getElementById('result').classList.add('hidden');
  document.getElementById('progress').style.width = '0%';
  renderQuestion();
}

// Initialize quiz
renderQuestion();

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    const active = document.activeElement;
    if (active.tagName === 'BUTTON' && active.onclick) active.click();
  }
});