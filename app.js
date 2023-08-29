//spinner function 
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

//search book function
const searchBook = () => {
    //clear total number of result area
    const totalNum = document.getElementById('total-num');
    totalNum.textContent = '';

    //clear search result
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    //get search item
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //console.log(searchText);

    //clear search field text
    searchField.value = '';

    //if there is no search item
    if (searchText === '') {
        window.alert('Please enter any book name!');
    }
    //if there is any search item
    else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        //console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchBook(data))

        //display spinner
        toggleSpinner('block');
    }

}


//display search book function
const displaySearchBook = data => {
    //console.log(data);

    //get search result
    const searchResult = document.getElementById('search-result');

    //clear data
    searchResult.textContent = '';

    if (data.numFound === 0) {
        toggleSpinner('none');
        //display total number of books
        const totalNum = document.getElementById('total-num');
        totalNum.textContent = '';
        const h3 = document.createElement('h3');
        h3.innerText = `No result found!`;
        totalNum.appendChild(h3);
    } else {
        //display total number of books
        const totalNum = document.getElementById('total-num');
        totalNum.textContent = '';
        const h3 = document.createElement('h3');
        h3.innerText = `Total number of results found : ${data.numFound}`;
        totalNum.appendChild(h3);

        //fetch every book info by forEach loop
        // const dataDocs = data.docs;
        data.docs?.forEach(book => {

            const div = document.createElement('div');
            div.classList.add('col');
            //set the innerHtml
            div.innerHTML = `
            <div class="card mb-3 shadow-lg p-2 bg-info.bg-gradient rounded h-100">
                 <img  src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top h-50" alt="...">
                 <div class="card-body">
                    <h5 class="card-title fs-5 fw-semibold"><span class="text-secondary fw-semibold fs-5">Book Title:</span> ${book.title}</h5>
                    <h6 class="card-text fs-6"><span class="text-secondary fw-semibold fs-6">Author :</span> ${book.author_name}</h6>
                    <h6 class="card-text fs-6"><span class="text-secondary fw-semibold fs-6">Publisher :</span> ${book.publisher}</h6>
                    <h6 class="card-text fs-6"><span class="text-secondary fw-semibold fs-6">First Publish Year :</span> ${book.first_publish_year}</h6>
                 </div>
             </div>`;
            searchResult.appendChild(div);
        });
        //hide spinner
        toggleSpinner('none');
    }
}