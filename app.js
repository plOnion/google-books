$(function () {

    const main = $(".js-content");
    let index = 0;
    let title = "";
    const input = document.querySelector(".filter__input");

    // items[""0""].volumeInfo.title
    // items[""0""].volumeInfo.imageLinks.thumbnail
    // items[""0""].volumeInfo.description

    const showBooks = (books) => {
        books.items.forEach(book => {

            if (book.volumeInfo.description == undefined) {
                book.volumeInfo.description = "Brak opisu" }
                
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

const showMore = () =>{
    window.onscroll = function(ev) {
        if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight){
        index = index + 10;
        let url = "https://www.googleapis.com/books/v1/volumes?q="+title+"&startIndex="+index;
        show(url);
    }
}}
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
        title = input.value;
        let url = "https://www.googleapis.com/books/v1/volumes?q="+title+"&startIndex="+index;
        show(url);
        showMore();
    })

})