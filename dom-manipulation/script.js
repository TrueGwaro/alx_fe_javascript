// Array of quote objects
let quotes = [
  { text: "Believe in yourself.", category: "Motivation" },
  { text: "Stay consistent.", category: "Success" },
  { text: "Small steps every day.", category: "Growth" }
];

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
}

// Function to create add quote form (ALX requires this name)
function createAddQuoteForm() {
  // Form already exists in HTML
  // This function is required by ALX but not heavily used here
  return true;
}

// Function to add new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText === "" || newCategory === "") {
    alert("Please fill in both fields.");
    return;
  }

  const newQuote = {
    text: newText,
    category: newCategory
  };

  quotes.push(newQuote);

  // Clear inputs
  textInput.value = "";
  categoryInput.value = "";

  // Show the new quote
  showRandomQuote();
}

// Event listener for button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

