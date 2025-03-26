{
  'use strict';

  //prepare references
  const templateBookSource = document.getElementById('template-book').innerHTML;
  const booksList = document.querySelector('.books-list');

  //compile template
  const templateBook = Handlebars.compile(templateBookSource);

  const favoriteBooks = [];

  const filters = [];
  const filtersList = document.querySelector('.filters');

  //create render function
  const renderBooks = function(){
    //clear booksList
    booksList.innerHTML = '';

    //for every book from dataSource.books
    for(const book of dataSource.books){
      //rating for every book
      const ratingBgc = determineRatingBgc(book.rating);
      //convert to %
      const ratingWidth = book.rating * 10;
      //generate html from data and template
      const bookHTML = templateBook({
        ...book,
        ratingBgc,
        ratingWidth,
      });
      //create DOM from html
      const bookElementDOM = utils.createDOMFromHTML(bookHTML);
      //add generated DOM as child to bookList
      booksList.appendChild(bookElementDOM);
    }
  };

  const initActions = function(){

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

  const determineRatingBgc = function(rating){
    //set rating variable
    let background = null;

    //check rating
    if(rating <= 6){
      background = 'linear-gradient(to bottom,  \#fefcea 0%, #f1da36 100%)';
    }
    if(rating > 6 && rating <= 8){
      background = 'linear-gradient(to bottom,  \#b4df5b 0%, #b4df5b 100%)';
    }
    if(rating > 8 && rating <= 9){
      background = 'linear-gradient(to bottom,  \#299a0b 0%, #299a0b 100%)';
    }
    if(rating > 9){
      background = 'linear-gradient(to bottom,  \#ff0084 0%, #ff0084 100%)';
    }

    return background;
  };

  renderBooks();
  initActions();
}