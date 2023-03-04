const searchHistory = localStorage.getItem('searchHistory') ? JSON.parse(localStorage.getItem('searchHistory')) : [];
const searchHistoryList = document.getElementById('search-history');

searchHistory.forEach(searchTerm => {
  const listItem = document.createElement('li');
  const link = document.createElement('a');
  const timestamp = new Date().toLocaleString();
  link.textContent = searchTerm;
  link.classList.add('search-history-link');
  link.href = `index.html?q=${encodeURIComponent(searchTerm)}`;
  link.textContent += ` (searched on: ${timestamp})`;
  listItem.appendChild(link);
  searchHistoryList.appendChild(listItem);
});

  

const clearButton = document.getElementById('clear-history');
clearButton.addEventListener('click', () => {
  localStorage.removeItem('searchHistory');
  searchHistoryList.innerHTML = '';
});
const backButton = document.querySelector('#back-btn');
backButton.addEventListener('click', () => {
window.location.href = 'index.html';
});