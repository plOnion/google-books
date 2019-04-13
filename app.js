$(function () {

    const main = $(".js-content");
    const booksList = document.querySelector(".js-content");
    let index = 0;
    let title = "";
    const input = document.querySelector(".filter__input");
    let url = "";

    const showBooks = (books) => {
        books.items.forEach(book => {
            let desc = "";
            let placeholderImage = "book_placeholder.png";
            let pict = "";

            if (book.searchInfo == undefined) {
                desc = "Brak opisu";
            } else {
                desc = book.searchInfo.textSnippet;
            }

            if (book.volumeInfo.imageLinks == undefined){
                pict = placeholderImage;
            } else {
                pict = book.volumeInfo.imageLinks.thumbnail;
            }
                
            main.append(`<div class='book'>
                    <div class="book__cover"><img src= ${pict} /></div>
                    <div>
                        <h2 class='book__title'> ${book.volumeInfo.title} </h2>
                        <div class='book__description'>
                            ${desc}
                        </div>
                    </div>
                    </div>`);
        });
    };

    const showMore = () =>{
        window.onscroll = function(ev) {
            if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight){
            index = index + 10;
            url = "https://www.googleapis.com/books/v1/volumes?q="+title+"&startIndex="+index;
            show(url);
            }
        }
    }

    const show = (url)=>{
        $.ajax({
            method: "GET",
            url: url,
            dataType: "json"
        }).done(response => {
            const books = Object.assign([], response);
            showBooks(books);
        })
    };

    input.addEventListener("change", ()=>{
        if (booksList.hasChildNodes()) {
            booksList.innerHTML = "";
          }
        title = input.value;
        url = "https://www.googleapis.com/books/v1/volumes?q="+title+"&startIndex="+index;
        
        show(url);
        showMore();
    })

})