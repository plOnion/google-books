$(function () {

    const main = $(".js-content");
    let index = 0;
    const input = document.querySelector(".filter__input");

    // items[""0""].volumeInfo.title
    // items[""0""].volumeInfo.imageLinks.thumbnail
    // items[""0""].volumeInfo.description
    
    const show = (url)=>{
        $.ajax({
            method: "GET",
            url: url,
            dataType: "json"
        }).done(response => {
            const books = Object.assign([], response);
            console.log(books);
        })
    };

    input.addEventListener("change", ()=>{
        let title = input.value;
        let url = "https://www.googleapis.com/books/v1/volumes?q="+title+"&startIndex="+index;
        show(url);
    })

})