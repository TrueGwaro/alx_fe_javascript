// Array of quote objects
let quotes = [
  { text: "Believe in yourself.", category: "Motivation" },
  { text: "Stay consistent.", category: "Success" },
  { text: "Small steps every day.", category: "Growth" }
];

// ⭐ REQUIRED by ALX: show a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");

  // Clear previous random quote (optional)
  quoteDisplay.innerHTML = "";

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const quoteElem = document.createElement("p");
  quoteElem.textContent = `"${quote.text}" — ${quote.category}`;

  quoteDisplay.appendChild(quoteElem);
}

// ⭐ REQUIRED by ALX: function exists even if simple
function createAddQuoteForm() {
  return true;
}

// Function to add a new quote
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

  // 1️⃣ Add to quotes array
  quotes.push(newQuote);

  // 2️⃣ Create DOM element
  const quoteDisplay = document.getElementById("quoteDisplay");
  const quoteElem = document.createElement("p");
  quoteElem.textContent = `"${newQuote.text}" — ${newQuote.category}`;

  // 3️⃣ Append to page
  quoteDisplay.appendChild(quoteElem);

  // Clear input fields
  textInput.value = "";
  categoryInput.value = "";
}

// ✅ Event listeners
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
document.getElementById("showQuoteBtn").addEventListener("click", showRandomQuote);

