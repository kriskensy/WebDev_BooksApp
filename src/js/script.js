class BooksList {
  constructor(){
    this.data = dataSource.books;

    this.templateBookSource = document.getElementById('template-book').innerHTML;
    this.templateBook = Handlebars.compile(this.templateBookSource);

    this.favoriteBooks = [];
    this.filters = [];

    this.getElements();
    this.renderBooks();
    this.initActions();
  }

  getElements(){
    this.booksList = document.querySelector('.books-list');
    this.filtersList = document.querySelector('.filters');
  }

  initActions(){
    this.booksList.addEventListener('dblclick', function(event){
      const bookImage = event.target.closest('.book__image');

      if(bookImage){
        event.preventDefault();
        const bookId = bookImage.getAttribute('data-id');
  
        if(!this.favoriteBooks.includes(bookId)){
          bookImage.classList.add('favorite');
          this.favoriteBooks.push(bookId);
        } else {
          bookImage.classList.remove('favorite');
          const index = this.favoriteBooks.indexOf(bookId);
          if(index !== -1){
            this.favoriteBooks.splice(index, 1);
          }
        }
      }
    });

    this.filtersList.addEventListener('click', function(event){
      const filterCondition = event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter';

      if(filterCondition){
        if(event.target.checked){
          this.filters.push(event.target.value);
        } else{
          const index = this.filters.indexOf(event.target.value);

          if(index !== -1){
            this.filters.splice(index, 1);
          }
        }
      }

      this.filterBooks();
    });
  }

  renderBooks(){
    this.booksList.innerHTML = '';

    for(const book of this.data){
      const ratingBgc = this.determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;

      const bookHTML = this.templateBook({
        ...book,
        ratingBgc,
        ratingWidth,
      });

      const bookElementDOM = utils.createDOMFromHTML(bookHTML);
      this.booksList.appendChild(bookElementDOM);
    }
  };

  filterBooks(){
    for(const book of this.data){
      let shouldBeHidden = false;

      for(const filter of this.filters){
        const filterCondition = book.details[filter];

        if(!filterCondition){
          shouldBeHidden = true;
          break;
        }
      }

      const bookItem = document.querySelector(`.book__image[data-id="${book.id}"]`);
      bookItem.classList.toggle('hidden', shouldBeHidden);
  }
}

  determineRatingBgc(rating){
    let background = null;

    if(rating <= 6){
      background = 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
    }
    if(rating > 6 && rating <= 8){
      background = 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%)';
    }
    if(rating > 8 && rating <= 9){
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    }
    if(rating > 9){
      background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%)';
    }

    return background;
  }
}

const app = new BooksList();