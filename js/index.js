document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("github-form").addEventListener("submit", handleSearch)
})

function handleSearch (e) {
    e.preventDefault()
    const userSearchEndpoint = "https://api.github.com/search/users?q="
    fetch(`${userSearchEndpoint}${e.target[0].value}`, {
        headers: {
            Accept: "application/vnd.github.v3+json"
        }
    })
        .then((response) => response.json())
        .then((data) => {
            for (let user of data["items"]) {
                const userHeader = document.createElement("h2")
                const userAvatar = document.createElement("img")
                const userURL = document.createElement("a")
                userHeader.innerText = user["login"]
                userURL.innerText = `${user["login"]}'s profile`
                userHeader.setAttribute("id", user["login"])
                userAvatar.setAttribute("src", user["avatar_url"])
                userURL.setAttribute("href", user["html_url"])
                userURL.setAttribute("target","_blank")
                userHeader.addEventListener("click", handleClick)
                document.getElementById("user-list").appendChild(userHeader)
                document.getElementById("user-list").appendChild(userAvatar)
                document.getElementById("user-list").appendChild(userURL)
            }
        })
}

function handleClick (e) {
    const userName = e.target.textContent
    const userRepoList = document.createElement("ul")
    userRepoList.setAttribute("class", userName)
    const userReposEndpoint = "https://api.github.com/users/"
    fetch(`${userReposEndpoint}${e.target.textContent}/repos`, {
        headers: {
            Accept: "application/vnd.github.v3+json"
        }
    })
        .then((response => response.json()))
        .then((data) => {
            for (let repo of data) {
                const userRepo = document.createElement("li")
                userRepo.innerText = repo["full_name"]
                userRepoList.appendChild(userRepo)
            }
            const elem = document.getElementById(userName)
            elem.parentNode.insertBefore(userRepoList, elem.nextSibling)
        })
}