const results = document.querySelector(".results")
const searchForm = document.querySelector("header form")
const previousButton = document.querySelector("#previous")
const nextButton = document.querySelector("#next")
let searchQuery = ""
let currentPage = 1;
let totalPages = 0;

async function getData() {
    createSkeleton();
	let res = await fetch("https://nl.openfoodfacts.org/cgi/search.pl?search_terms=" + searchQuery + "&page=" + currentPage + "&json=true")
	return await res.json();
}

function showData(data) {
    totalPages = data.count / data.page_size;
    console.log(data.count + " / " + data.page_size + " = " + totalPages);
    results.textContent = data.count + " results found - Page " + data.page + " of " + Math.ceil(totalPages);
    items.innerHTML = "";
    for (let i = 0; i < data.products.length; i++) {
        // Create div
        const item = document.createElement("div");
        item.id = data.products[i]._id;
        item.classList.add = "item";
        items.appendChild(item);

        // Create image inside div
        const image = document.createElement("img");
        image.src = data.products[i].image_url;
        item.appendChild(image);

        // Create title inside div
        const title = document.createElement("p");
        title.textContent = data.products[i].product_name;
        item.appendChild(title);

        // Create button inside div
        const button = document.createElement("button");
        button.textContent = "Meer info";
        button.id = data.products[i]._id;
        item.appendChild(button);
    }
}

getData()
    .then(data => {
    showData(data)
})

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = event.target.querySelector("input")
    searchQuery = input.value
    currentPage = 1
    getData()
        .then(data => {
        showData(data)
    })
})

previousButton.addEventListener("click", () => {
    console.log("Previous page")
    if (currentPage == "1") {
        currentPage = totalPages
    } else {
        currentPage--
    }
    currentPage = Math.ceil(currentPage)

    getData()
        .then(data => {
        showData(data)
    })
})

nextButton.addEventListener("click", () => {
    console.log("Next page")
    if (currentPage == Math.ceil(totalPages)) {
        currentPage = 1
    } else {
        currentPage++
    }
    currentPage = Math.ceil(currentPage)

    getData()
        .then(data => {
        showData(data)
    })
})

