const searchInput = document.querySelector('input[type="text"]');
const searchButton = document.querySelector('#btn');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayBooks(data.items);
        saveSearchTerm(searchTerm);
      })
      .catch(error => console.error(error));
  }
});

function displayBooks(books) {
    const resultsContainer = document.createElement('div');
    resultsContainer.setAttribute('id', 'results-container');
    books.forEach(book => {
      const bookContainer = document.createElement('div');
      bookContainer.setAttribute('class', 'book-container');
      
      const thumbnail = document.createElement('img');
      thumbnail.setAttribute('src', book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150');
  
      const title = document.createElement('h3');
      title.textContent = `Title: ${book.volumeInfo.title}`;
      
  
      const authors = document.createElement('p');
      authors.textContent = `Author: ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown author'}`;

      const description = document.createElement('p');
      description.textContent = book.volumeInfo.description || 'No description available';

  
      bookContainer.append(thumbnail, title, authors, description);
      resultsContainer.appendChild(bookContainer);
    });
    document.body.appendChild(resultsContainer);
  }

  const historyButton = document.querySelector('#history-btn');
  historyButton.addEventListener('click', () => {
  window.location.href = 'history.html';
});


function saveSearchTerm(searchTerm) {
  const searchHistory = localStorage.getItem('searchHistory') ? JSON.parse(localStorage.getItem('searchHistory')) : [];
  if (!searchHistory.includes(searchTerm)) {
    searchHistory.push(searchTerm);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }
}
