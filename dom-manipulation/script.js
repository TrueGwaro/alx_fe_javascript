// Quotes array
let quotes = [];

// ⭐ ALX-required functions
function createAddQuoteForm() {
  return true;
}

// Load quotes from localStorage on page load
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

// Show a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";

  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const quoteElem = document.createElement("p");
  quoteElem.textContent = `"${quote.text}" — ${quote.category}`;

  quoteDisplay.appendChild(quoteElem);

  // Optional: save last viewed quote to sessionStorage
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
}

// Add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText === "" || newCategory === "") {
    alert("Please fill in both fields.");
    return;
  }

  const newQuote = { text: newText, category: newCategory };
  quotes.push(newQuote);
  saveQuotes(); // Save to localStorage

  // Update DOM
  const quoteDisplay = document.getElementById("quoteDisplay");
  const quoteElem = document.createElement("p");
  quoteElem.textContent = `"${newQuote.text}" — ${newQuote.category}`;
  quoteDisplay.appendChild(quoteElem);

  // Clear inputs
  textInput.value = "";
  categoryInput.value = "";
}

// Export quotes as JSON
function exportQuotes() {
  const data = JSON.stringify(quotes, null, 2); // pretty print
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
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (!Array.isArray(importedQuotes)) throw new Error("Invalid JSON format");
      quotes.push(...importedQuotes);
      saveQuotes();
      alert("Quotes imported successfully!");
      displayAllQuotes(); // Optional: show imported quotes
    } catch (err) {
      alert("Failed to import quotes: " + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Optional: display all quotes in the DOM
function displayAllQuotes() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = "";
  quotes.forEach(q => {
    const quoteElem = document.createElement("p");
    quoteElem.textContent = `"${q.text}" — ${q.category}`;
    quoteDisplay.appendChild(quoteElem);
  });
}

// Event listeners
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
document.getElementById("showQuoteBtn").addEventListener("click", showRandomQuote);
document.getElementById("exportBtn").addEventListener("click", exportQuotes);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);

// Initialize
loadQuotes();
displayAllQuotes();

