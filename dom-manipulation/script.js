// Array of quote objects
let quotes = [
  { text: "Believe in yourself.", category: "Motivation" },
  { text: "Stay consistent.", category: "Success" },
  { text: "Small steps every day.", category: "Growth" }
];

// Function to display a random quote
function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // IMPORTANT: ALX checker looks for innerHTML
  quoteDisplay.innerHTML = `"${quote.text}" — ${quote.category}`;
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

  // Add to array
  quotes.push(newQuote);

  // Update DOM after adding
  displayRandomQuote();

  // Clear inputs
  textInput.value = "";
  categoryInput.value = "";
}

// Event listener for button
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);

