const searchText = document.getElementById('search-field');
const booksContainer = document.getElementById('book-container');
const totalResult = document.getElementById('total-result');

// fetch data
const loadData = () => {
    const url = `https://openlibrary.org/search.json?q=${searchText.value}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayBooks(data))
}


// display books 
const displayBooks = data => {
    
    // clear results
    booksContainer.textContent='';
    searchText.value ='';
    totalResult.innerHTML = '';
    const books = data.docs;
    totalResult.classList.remove('d-none');
    if(books.length === 0){
      const section = document.createElement('section');
      section.innerHTML = `
      <h2 class="text-center text-white">Total results: No result Found</h2>
    `;
      totalResult.appendChild(section);
    }
    else {
      const section = document.createElement('section');
      section.innerHTML = `
      <h2 class="text-center text-white">Total results: ${data.numFound}</h2>
    `;
      totalResult.appendChild(section);
    }
    
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col-md-3');
        div.innerHTML = `
         <div class="card h-100 my-3 p-3">
            <img src='https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg' class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${book.text[1]}</h5>
              <p class="card-text">Author Name: ${book.author_name[0]}</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Originally Published: ${book.publish_date[0]}</small>
              <br>
              <small class="text-muted">Publisher: ${book.publisher[0]}</small>
            </div>
          </div>
    `;
    booksContainer.appendChild(div);
  });
}

