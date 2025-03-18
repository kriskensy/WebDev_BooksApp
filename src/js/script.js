{
  'use strict';

  //prepare references
  const templateBookSource = document.getElementById('template-book').innerHTML;
  const booksList = document.querySelector('.books-list');

  //compile template
  const templateBook = Handlebars.compile(templateBookSource);

  //create render function
  const renderBooks = function(){
    //clear booksList
    booksList.innerHTML = '';

    //for every book from dataSource.books
    for(const book of dataSource.books){
      //generate html from data and template
      const bookHTML = templateBook(book);
      //create DOM from html
      const bookElementDOM = utils.createDOMFromHTML(bookHTML);
      //add generated DOM as child to bookList
      booksList.appendChild(bookElementDOM);
    }
  };

  const initActions = function(){
    const favoriteBooks = [];
    //select all .book__image elements
    const bookImages = booksList.querySelectorAll('.book__image');

    //for all .book__image elements
    for(const item of bookImages){
      item.addEventListener('dblclick', function(event){
        //prevent default
        event.preventDefault();
        //add favorite class to clicked item
        event.target.classList.add('favorite');
        //select book id from data-id attributte
        const bookId = event.target.getAttribute('data-id');
        //add this id to favoriteBooks
        if(!favoriteBooks.includes(bookId)){
          favoriteBooks.push(bookId);
        }
        console.log('favoriteBooks: ', favoriteBooks);
      });
    }
  };

  renderBooks();
  initActions();
}