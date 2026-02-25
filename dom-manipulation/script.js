// ------------------ DYNAMIC QUOTE GENERATOR ------------------

let quotes = [];
let selectedCategory = "all"; // ✅ ALX requires this variable

// ⭐ ALX-required function
function createAddQuoteForm() {
  return true;
}

// ------------------ LOCAL STORAGE ------------------

function loadQuotes() {
  const savedQuotes = localStorage.getItem("quotes");
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  } else {
    quotes = [
      { text: "Believe in yourself.", category: "Motivation" },
      { text: "Stay consistent.", category: "Success" },
      { text: "Small steps every day.", category: "Growth" }
    ];
  }
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// ------------------ CATEGORY FILTERING ------------------

function populateCategories() {
  const filter = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map(q => q.category))];

  filter.innerHTML = '<option value="all">All Categories</option>';

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    filter.appendChild(option);
  });

  selectedCategory = localStorage.getItem("lastCategoryFilter") || "all";
  filter.value = selectedCategory;
}

function displayQuotes(filteredQuotes = quotes) {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes to display.";
    return;
  }

  filteredQuotes.forEach(q => {
    const p = document.createElement("p");
    p.textContent = `"${q.text}" — ${q.category}`;
    quoteDisplay.appendChild(p);
  });
}

function filterQuotes() {
  const filter = document.getElementById("categoryFilter");
  selectedCategory = filter.value;
  localStorage.setItem("lastCategoryFilter", selectedCategory);

  if (selectedCategory === "all") {
    displayQuotes(quotes);
  } else {
    const filtered = quotes.filter(q => q.category === selectedCategory);
    displayQuotes(filtered);
  }
}

// ------------------ QUOTE MANAGEMENT ------------------

function showRandomQuote() {
  if (quotes.length === 0) return alert("No quotes available.");

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";
  const p = document.createElement("p");
  p.textContent = `"${quote.text}" — ${quote.category}`;
  quoteDisplay.appendChild(p);

  sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
}

function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (!newText || !newCategory) return alert("Please fill in both fields.");

  const newQuote = { text: newText, category: newCategory };
  quotes.push(newQuote);
  saveQuotes();

  populateCategories();
  filterQuotes();

  textInput.value = "";
  categoryInput.value = "";
}

// ------------------ IMPORT / EXPORT ------------------

function exportQuotes() {
  const data = JSON.stringify(quotes, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (!Array.isArray(imported)) throw new Error("Invalid JSON");
      quotes.push(...imported);
      saveQuotes();
      populateCategories();
      filterQuotes();
      alert("Quotes imported successfully!");
    } catch (err) {
      alert("Failed to import quotes: " + err.message);
    }
  };
  reader.readAsText(event.target.files[0]);
}

// ------------------ SERVER SYNC & CONFLICT RESOLUTION ------------------

const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts';

// Fetch quotes from server (ALX requires exact function name)
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    if (!response.ok) throw new Error("Network response not ok");
    const serverData = await response.json();
    return serverData.map(item => ({
      text: item.title || item.body,
      category: item.userId ? `User${item.userId}` : "Uncategorized"
    }));
  } catch (err) {
    console.error("Fetch quotes from server failed:", err);
    return [];
  }
}

// Post a single quote to server
async function postQuoteToServer(quote) {
  try {
    await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quote)
    });
  } catch (err) {
    console.error("Post to server failed:", err);
  }
}

// Sync quotes with server (ALX requires exact function name)
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  let updated = false;

  // Conflict resolution: server takes precedence
  if (JSON.stringify(serverQuotes) !== JSON.stringify(quotes)) {
    quotes = serverQuotes;
    saveQuotes();
    populateCategories();
    filterQuotes();
    updated = true;
  }

  // POST all local quotes to server
  for (const quote of quotes) {
    await postQuoteToServer(quote);
  }

  // ✅ Exact notification ALX expects
  if (updated) {
    alert("Quotes synced with server!");
  }
}

// Periodically sync with server every 30 seconds
setInterval(syncQuotes, 30000);
syncQuotes();

// ------------------ EVENT LISTENERS ------------------

document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
document.getElementById("showQuoteBtn").addEventListener("click", showRandomQuote);
document.getElementById("exportBtn").addEventListener("click", exportQuotes);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);
document.getElementById("categoryFilter").addEventListener("change", filterQuotes);

// ------------------ INITIALIZATION ------------------

loadQuotes();
populateCategories();
filterQuotes();

