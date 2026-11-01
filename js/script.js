const fitnessForm = document.getElementById("fitness-form");
const ageInput = document.getElementById("age");
const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const activityInput = document.getElementById("activity");
const goalInput = document.getElementById("goal");
const dietInput = document.getElementById("diet");

const resultsSection = document.getElementById("results");
const formError = document.getElementById("form-error");
const editButton = document.getElementById("edit-btn");
const resetButton = document.getElementById("reset-btn");

const resultWeight = document.getElementById("result-weight");
const resultHeight = document.getElementById("result-height");
const resultGoal = document.getElementById("result-goal");
const resultBMI = document.getElementById("result-bmi");
const bmiStatus = document.getElementById("bmi-status");
const welcomeMessage = document.getElementById("welcome-message");

const workoutList = document.getElementById("workout-list");
const mealList = document.getElementById("meal-list");
const wellnessTip = document.getElementById("wellness-tip");

const STORAGE_KEY = "fitmate-profile";

const goalNames = {
  general: "General fitness",
  strength: "Build strength",
  endurance: "Improve endurance",
  flexibility: "Improve flexibility"
};

const workoutPlans = {
  general: [
    "Try a comfortable 15–20 minute walk on most days.",
    "Add simple bodyweight movements such as chair squats or wall push-ups.",
    "Include gentle stretching after movement.",
    "Take short movement breaks if you sit for long periods."
  ],
  strength: [
    "Start with beginner bodyweight movements such as wall push-ups and chair squats.",
    "Allow recovery time between strength sessions.",
    "Focus on controlled movement and comfortable technique.",
    "Increase repetitions or difficulty gradually as you feel ready."
  ],
  endurance: [
    "Begin with a comfortable walk, then gradually increase the duration.",
    "Try easy cycling, swimming, or dancing if available and comfortable.",
    "Use a pace where you can still speak in short sentences.",
    "Build activity gradually and include easier recovery days."
  ],
  flexibility: [
    "Try gentle full-body stretching without forcing any position.",
    "Include comfortable shoulder, hip, and ankle mobility movements.",
    "Consider beginner yoga or a guided mobility routine.",
    "Move slowly, breathe normally, and stop if you feel pain."
  ]
};

const mealPlans = {
  vegetarian: [
    "Breakfast: oats or poha with fruit and curd.",
    "Lunch: roti, dal, seasonal vegetables, and salad.",
    "Snack: fruit, roasted chana, or a handful of nuts.",
    "Dinner: vegetable khichdi or paneer with roti and vegetables."
  ],
  vegan: [
    "Breakfast: oats with fruit, nuts, and fortified plant milk.",
    "Lunch: roti, dal, seasonal vegetables, and salad.",
    "Snack: fruit, roasted chana, or hummus with vegetables.",
    "Dinner: tofu or chickpea curry with rice and vegetables."
  ],
  eggetarian: [
    "Breakfast: boiled eggs with whole-grain toast and fruit.",
    "Lunch: roti, dal, seasonal vegetables, and curd.",
    "Snack: fruit, roasted chana, or nuts.",
    "Dinner: vegetable omelette with roti or a balanced rice bowl."
  ],
  nonveg: [
    "Breakfast: eggs or curd with whole-grain toast and fruit.",
    "Lunch: roti or rice with dal, vegetables, and chicken or fish.",
    "Snack: fruit, roasted chana, or nuts.",
    "Dinner: a balanced meal with vegetables and your preferred protein."
  ]
};

const activityTips = {
  low: "Try adding a few short movement breaks to your day. Start gently and build a routine that feels manageable.",
  moderate: "Keep a steady routine with a mix of enjoyable movement, strength activities, and recovery.",
  high: "Remember to balance active days with enough rest, hydration, and recovery."
};

function getUserData() {
  return {
    age: Number(ageInput.value),
    height: Number(heightInput.value),
    weight: Number(weightInput.value),
    activity: activityInput.value,
    goal: goalInput.value,
    diet: dietInput.value
  };
}

function validateUserData(userData) {
  if (!Number.isFinite(userData.age) || userData.age < 13 || userData.age > 100) {
    return "Please enter an age between 13 and 100.";
  }

  if (!Number.isFinite(userData.height) || userData.height < 100 || userData.height > 250) {
    return "Please enter a height between 100 and 250 cm.";
  }

  if (!Number.isFinite(userData.weight) || userData.weight < 25 || userData.weight > 300) {
    return "Please enter a weight between 25 and 300 kg.";
  }

  if (!goalNames[userData.goal] || !mealPlans[userData.diet] || !activityTips[userData.activity]) {
    return "Please select an option for every field.";
  }

  return "";
}

function calculateBMI(height, weight) {
  const heightInMetres = height / 100;
  return weight / (heightInMetres * heightInMetres);
}

function getBMICategory(bmi) {
  if (bmi < 18.5) {
    return "Below the adult reference range";
  }

  if (bmi < 25) {
    return "Within the adult reference range";
  }

  if (bmi < 30) {
    return "Above the adult reference range";
  }

  return "Higher adult BMI range";
}

function addListItems(listElement, items) {
  listElement.innerHTML = "";

  items.forEach(function(item) {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    listElement.appendChild(listItem);
  });
}

function displayStats(userData) {
  resultWeight.textContent = userData.weight;
  resultHeight.textContent = userData.height;
  resultGoal.textContent = goalNames[userData.goal];

  if (userData.age < 18) {
    resultBMI.textContent = "N/A";
    bmiStatus.textContent = "Adult BMI categories do not apply";
    return;
  }

  const bmi = calculateBMI(userData.height, userData.weight);
  resultBMI.textContent = bmi.toFixed(1);
  bmiStatus.textContent = getBMICategory(bmi);
}

function generateFitnessPlan(userData) {
  displayStats(userData);
  addListItems(workoutList, workoutPlans[userData.goal]);
  addListItems(mealList, mealPlans[userData.diet]);
  wellnessTip.textContent = activityTips[userData.activity];
  welcomeMessage.textContent = "Your plan is ready.";
  resultsSection.classList.remove("hidden");
  resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function saveUserData(userData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  } catch (error) {
    formError.textContent = "Your browser could not save the plan. You can still use the suggestions for this session.";
    formError.classList.remove("hidden");
  }
}

function loadUserData() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (!savedData) {
      return null;
    }

    const userData = JSON.parse(savedData);

    if (!userData || typeof userData !== "object") {
      return null;
    }

    const errorMessage = validateUserData(userData);

    if (errorMessage) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return userData;
  } catch (error) {
    return null;
  }
}

function fillForm(userData) {
  ageInput.value = userData.age;
  heightInput.value = userData.height;
  weightInput.value = userData.weight;
  activityInput.value = userData.activity;
  goalInput.value = userData.goal;
  dietInput.value = userData.diet;
}

fitnessForm.addEventListener("submit", function(event) {
  event.preventDefault();

  formError.classList.add("hidden");
  const userData = getUserData();
  const errorMessage = validateUserData(userData);

  if (errorMessage) {
    formError.textContent = errorMessage;
    formError.classList.remove("hidden");
    return;
  }

  saveUserData(userData);
  generateFitnessPlan(userData);
});

editButton.addEventListener("click", function() {
  resultsSection.classList.add("hidden");
  document.getElementById("planner").scrollIntoView({ behavior: "smooth" });
});

resetButton.addEventListener("click", function() {
  const shouldReset = window.confirm("Are you sure you want to reset your FitMate plan?");

  if (!shouldReset) {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    formError.textContent = "The saved plan could not be removed from this browser.";
    formError.classList.remove("hidden");
  }

  fitnessForm.reset();
  resultsSection.classList.add("hidden");
  formError.classList.add("hidden");
  document.getElementById("planner").scrollIntoView({ behavior: "smooth" });
});

const savedUserData = loadUserData();

if (savedUserData) {
  fillForm(savedUserData);
  generateFitnessPlan(savedUserData);
}
