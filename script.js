// PROVIDED: use this collection to generate the entries.
const $creatures = [
  {
    "name": "Moss Dragon",
    "description": "A gentle gardener who grows tiny forests wherever it naps.",
    "image": "assets/moss-dragon.svg",
    "alt": "A green dragon with leafy horns and small wings."
  },
  {
    "name": "Cloud Fox",
    "description": "A sky wanderer collecting soft clouds and lost daydreams.",
    "image": "assets/cloud-fox.svg",
    "alt": "A pale blue fox with pointed ears and a fluffy tail."
  },
  {
    "name": "Ember Salamander",
    "description": "A warm little companion that keeps campfires glowing.",
    "image": "assets/ember-salamander.svg",
    "alt": "An orange salamander with a flame at the end of its tail."
  },
  {
    "name": "Moon Owl",
    "description": "A quiet navigator who reads the stories written in stars.",
    "image": "assets/moon-owl.svg",
    "alt": "A purple owl with a crescent moon on its forehead."
  },
  {
    "name": "Crystal Turtle",
    "description": "A patient explorer carrying a sparkling crystal garden.",
    "image": "assets/crystal-turtle.svg",
    "alt": "A mint green turtle with purple crystals on its shell."
  },
  {
    "name": "Mushroom Sprite",
    "description": "A woodland storyteller with a spotted cap and muddy boots.",
    "image": "assets/mushroom-sprite.svg",
    "alt": "A small cream sprite wearing a red spotted mushroom cap."
  }
]

// YOUR WORK: build these features using the supplied HTML, CSS, and data.
// 1. Select the collection and preference controls.
// 2. Use a loop to generate the creature entries. See START-HERE.md for markup.
// 3. Listen for changes to each preference control and update the appearance.
// 4. Save both selected preferences to Local Storage.
// 5. Check for saved data on load and restore the controls and appearance.
// Add short pseudocode comments before writing each feature.


const body = document.body;
const collection = document.querySelector("#collection");
const themeSelect = document.querySelector("#theme");
const layoutSelect = document.querySelector("#layout");
const statusMessage = document.querySelector("#status");

const STORAGE_KEY = "mtm6302-a4-creature-preferences";


function showMessage(message) {
  statusMessage.textContent = message;
}


function renderCollection() {
  collection.innerHTML = "";

  for (const creature of $creatures) {
    const item = document.createElement("li");
    item.className = "creature";

    const image = document.createElement("img");
    image.src = creature.image;
    image.alt = creature.alt;

    const info = document.createElement("div");
    info.className = "creature-info";

    const name = document.createElement("h3");
    name.textContent = creature.name;

    const description = document.createElement("p");
    description.className = "creature-description";
    description.textContent = creature.description;

    info.append(name, description);
    item.append(image, info);
    collection.append(item);
  }
}


function applyTheme(theme) {
  body.dataset.theme = theme;
}

function applyLayout(layout) {
  collection.dataset.layout = layout;
}


function savePreferences() {
  const preferences = {
    theme: themeSelect.value,
    layout: layoutSelect.value
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  showMessage("Preferences saved.");
}


function handleThemeChange() {
  applyTheme(themeSelect.value);
  savePreferences();
}

function handleLayoutChange() {
  applyLayout(layoutSelect.value);
  savePreferences();
}

themeSelect.addEventListener("change", handleThemeChange);
layoutSelect.addEventListener("change", handleLayoutChange);

function restorePreferences() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData === null) {
    showMessage("No saved preferences yet. Choose a habitat and layout to make this collection yours.");
    return;
  }

  const preferences = JSON.parse(savedData);

  themeSelect.value = preferences.theme;
  layoutSelect.value = preferences.layout;
  applyTheme(themeSelect.value);
  applyLayout(layoutSelect.value);

  showMessage("Welcome back! Your saved preferences were restored.");
}


renderCollection();
restorePreferences();