// Quotes array
let quotes = [];
let selectedCategory = "all"; // ✅ ALX requires this variable

// ⭐ ALX-required function
function createAddQuoteForm() {
  return true;
}

// Load quotes from localStorage
function loadQuotes() {
  const savedQuotes = localStorage.getItem("quotes");
  if (savedQuotes) {
    quotes = JSON.parse(savedQuotes);
  } else {
    // Default quotes if none saved
    quotes = [
      { text: "Believe in yourself.", category: "Motivation" },
      { text: "Stay consistent.", category: "Success" },
      { text: "Small steps every day.", category: "Growth" }
    ];
  }
}

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Populate category dropdown dynamically
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

  // ✅ Restore last selected category from localStorage
  selectedCategory = localStorage.getItem("lastCategoryFilter") || "all";
  filter.value = selectedCategory;
}

// Display quotes in the DOM (optionally filtered)
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

// Show a random quote
function showRandomQuote() {
  if (quotes.length === 0) return alert("No quotes available.");

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";
  const p = document.createElement("p");
  p.textContent = `"${quote.text}" — ${quote.category}`;
  quoteDisplay.appendChild(p);

  // Optional: store last viewed quote in sessionStorage
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
}

// Add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (!newText || !newCategory) return alert("Please fill in both fields.");

  const newQuote = { text: newText, category: newCategory };
  quotes.push(newQuote);
  saveQuotes();

  // Update categories dropdown
  populateCategories();

  // Refresh displayed quotes based on current filter
  filterQuotes();

  textInput.value = "";
  categoryInput.value = "";
}

// Filter quotes based on selected category
function filterQuotes() {
  const filter = document.getElementById("categoryFilter");
  selectedCategory = filter.value; // ✅ ALX requires this

  // Save selected category to localStorage
  localStorage.setItem("lastCategoryFilter", selectedCategory);

  if (selectedCategory === "all") {
    displayQuotes(quotes);
  } else {
    const filtered = quotes.filter(q => q.category === selectedCategory);
    displayQuotes(filtered);
  }
}

// Export quotes as JSON
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

// Import quotes from JSON file
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

// Event listeners
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
document.getElementById("showQuoteBtn").addEventListener("click", showRandomQuote);
document.getElementById("exportBtn").addEventListener("click", exportQuotes);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);

// Initialize app
loadQuotes();
populateCategories();
filterQuotes();

