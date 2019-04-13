$(function () {

    const main = $(".js-content");
    let index = 0;
    const input = document.querySelector(".filter__input");

    // items[""0""].volumeInfo.title
    // items[""0""].volumeInfo.imageLinks.thumbnail
    // items[""0""].volumeInfo.description

    const showBooks = (books) => {
        books.items.forEach(book => {
            main.append(`<div class='book'>
                    <div class="book__cover"><img src= ${book.volumeInfo.imageLinks.thumbnail} /></div>
                    <div style="width: 80%">
                        <h2 class='book__title'> ${book.volumeInfo.title} </h2>
                        <div class='book__description'>
                            ${book.volumeInfo.description}
                        </div>
                    </div>
                    </div>`);
        });
    };
    
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
        let title = input.value;
        let url = "https://www.googleapis.com/books/v1/volumes?q="+title+"&startIndex="+index;
        show(url);
    })

})