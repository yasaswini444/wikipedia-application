let searchContainer = document.getElementById("searchResults");
let searchEle = document.getElementById("searchInput");
let spin = document.getElementById("spinner");

function createAppend(result) {
    let {
        description,
        link,
        title
    } = result;
    let displayContainer = document.createElement("div");
    displayContainer.classList.add("result-item");
    searchContainer.appendChild(displayContainer);

    let headingLink = document.createElement("a");
    headingLink.href = link;
    headingLink.textContent = title;
    headingLink.classList.add("result-title");
    displayContainer.appendChild(headingLink);

    let brLine = document.createElement("br");
    headingLink.appendChild(brLine);

    let urlLink = document.createElement("a");
    urlLink.href = link;
    urlLink.textContent = link;
    urlLink.classList.add("result-url");
    headingLink.appendChild(urlLink);
    let brLine2 = document.createElement("br");
    urlLink.appendChild(brLine2);

    let desc = document.createElement("p");
    desc.textContent = description;
    desc.classList.add("link-description");
    urlLink.appendChild(desc);

}

function searchDisplay(searchResults) {
    for (let result of searchResults) {
        spin.classList.add("d-none");
        createAppend(result);
    }
}

function user(event) {
    if (event.key === "Enter") {
        let text = searchEle.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + text;
        let options = {
            method: "GET"
        };
        spin.classList.remove("d-none");
        searchContainer.textContent = "";
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                searchDisplay(search_results);
            });
    }
}

searchEle.addEventListener("keydown", user);