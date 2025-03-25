{
  'use strict';

  //prepare references
  const templateBookSource = document.getElementById('template-book').innerHTML;
  const booksList = document.querySelector('.books-list');

  //compile template
  const templateBook = Handlebars.compile(templateBookSource);

  const filters = [];
  const filtersList = document.querySelector('.filters');

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
          const index = favoriteBooks.indexOf(bookId);
          if(index !== -1){
            favoriteBooks.splice(index, 1);
          }
        }
      }
    });

    filtersList.addEventListener('click', function(event){
      //prepare condition
      const filterCondition = event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter';

      if(filterCondition){
        console.log('event.target.value: ', event.target.value);

        //check checkbox value
        if(event.target.checked){
          filters.push(event.target.value);
        } else{
          //find index of value to remove
          const index = filters.indexOf(event.target.value);
          //remove it
          if(index !== -1){
            filters.splice(index, 1);
          }
        }
      }
      console.log('filters: ', filters);
      filterBooks();
    });
  };

  const filterBooks = function(){

    //for every dataSource.books item
    for(const book of dataSource.books){
      //flag for show / hide books
      let shouldBeHidden = false;

      //for every filter
      for(const filter of filters){
        //create filter condition for every book -> iterate for every filter
        const filterCondition = book.details[filter];
        //change flag if condition is not met
        if(!filterCondition){
          shouldBeHidden = true;
          break;
        }
      }
      //find book__image for a book
      const bookItem = document.querySelector(`.book__image[data-id="${book.id}"]`);
      //toggle hidden class
      bookItem.classList.toggle('hidden', shouldBeHidden);
    }
  };

  renderBooks();
  initActions();
}