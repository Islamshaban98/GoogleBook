const search = document.querySelector("#search");
const form = document.querySelector("form");
const book_div = document.querySelector(".book");
const remove = document.querySelector("button");

remove.addEventListener("click", (e) => {
  e.preventDefault();
  book_div.textContent = "";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const word = search.value;

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${word}`, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {

      res.items.forEach((item) => {

        const title = item.volumeInfo.title;
        const title_h1 = document.createElement("h1");
        title_h1 .textContent = title;
        title_h1.classList.add('bookTitle')
        book_div.appendChild(title_h1);
        
        const publisher = item.volumeInfo.publisher;
        const publisher_par = document.createElement("p");
        publisher_par.textContent = publisher;
        publisher_par.classList.add('publisher');
        book_div.appendChild(publisher_par);
        
        const publishedDate = item.volumeInfo.publishedDate;
        const publishedDate_par = document.createElement("p");
        publishedDate_par.textContent = publishedDate;
        publishedDate_par.classList.add('date');
        book_div.appendChild(publishedDate_par);

        
        const url = item.volumeInfo.imageLinks.thumbnail;
        const img = document.createElement("img");
        img.src = url;
        img.classList.add('imgStyle');
        book_div.appendChild(img);

        const description = item.volumeInfo.description;
        const description_par = document.createElement("p");
        description_par.textContent = description;
        description_par.classList.add('descriptionStyle');
        book_div.appendChild(description_par);


      });
    })
    .catch(console.log);
});
