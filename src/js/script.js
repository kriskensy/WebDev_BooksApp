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
  }

  renderBooks();
}