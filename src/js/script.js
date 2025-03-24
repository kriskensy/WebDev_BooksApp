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

    booksList.addEventListener('dblclick', function(event){
      // const bookImage = event.target.offsetParent.classList.contains('.book__image');
      const bookImage = event.target.closest('.book__image');

      if(bookImage){
        event.preventDefault();
        //select book id from data-id attributte
        const bookId = bookImage.getAttribute('data-id');
  
        if(!favoriteBooks.includes(bookId)){
          //add favorite class to clicked item
          bookImage.classList.add('favorite');
          //add this id to favoriteBooks
          favoriteBooks.push(bookId);
        } else {
          //remove favorite class from clicked item
          bookImage.classList.remove('favorite');
          //remove this id from favoriteBooks
          favoriteBooks.pop(bookId);
        }
        console.log('bookImage: ', bookImage);
        console.log('event.target: ', event.target);
        console.log('favoriteBooks: ', favoriteBooks);
      }
    });


    // //select all .book__image elements
    // const bookImages = booksList.querySelectorAll('.book__image');
    // //for all .book__image elements
    // for(const item of bookImages){
    //   item.addEventListener('dblclick', function(event){
    //     //prevent default
    //     event.preventDefault();
    //     //select book id from data-id attributte
    //     const bookId = item.getAttribute('data-id');

    //     if(!favoriteBooks.includes(bookId)){
    //     //add favorite class to clicked item
    //     item.classList.add('favorite');
    //     //add this id to favoriteBooks
    //     favoriteBooks.push(bookId);
    //     } else {
    //     //remove favorite class from clicked item
    //     item.classList.remove('favorite');
    //     //remove this id from favoriteBooks
    //     favoriteBooks.pop(bookId);
    //     }
    //     console.log('item: ', item);
    //     console.log('event.target: ', event.target);
    //     console.log('favoriteBooks: ', favoriteBooks);
    //   });
    // }
  };

  renderBooks();
  initActions();
}