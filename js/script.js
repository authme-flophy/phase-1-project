
fetch("http://localhost:3000/favourite-songs")
.then(response => response.json())
.then(data => data.forEach(element => {
  // Obtaining the favourite songs list from the DOM
  const container = document.getElementById("favourite-songs")
  const newFavourite = document.createElement("li")
  newFavourite.classList.add("collection-item")
  newFavourite.textContent = `${element.album} - ${element.artist}`
  container.appendChild(newFavourite)
}))

// we fetch the data from the iTunes api
fetch("https://itunes.apple.com/us/rss/topalbums/limit=20/json")
.then(response => response.json())
.then(data => {

  const albumList = data.feed.entry
  albumList.forEach(element => {
    
    // creating the album card to hold the album information
    const albumCard = document.createElement("div")
    albumCard.classList.add("card")

    

    // creating the img tag with the album image link
    const albumCover = document.createElement("img")
    albumCover.setAttribute("src", element["im:image"][2].label)

    // creating the h2 tag with the album title as text content
    const albumTitle = document.createElement("h2")
    albumTitle.id = "title"
    albumTitle.textContent = element["im:name"].label

    // creating the p tag with the artist as the text content
    const artist = document.createElement("p")
    artist.id = "artist"
    artist.textContent = element["im:artist"].label

    // creating a container that will hold the favourite and like buttons
    const buttonContainer = document.createElement("div")
    buttonContainer.id = "button-container"

    // creating the favourite button and adding a materialize class to it
    const favourite = document.createElement("button")
    favourite.classList.add("waves-effect", "waves-light", "btn", "yellow", "accent-3")
    favourite.id = "favourite-button"
    favourite.textContent = "★"

    // adding the favourite and like buttons to the button container
    buttonContainer.appendChild(favourite)
    
    // adding the img, h2, p and button container to the album card
    albumCard.appendChild(albumCover)
    albumCard.appendChild(albumTitle)
    albumCard.appendChild(artist)
    albumCard.appendChild(buttonContainer)

    // appending the complete card to the container div in the DOM

    document.getElementsByClassName("container")[0].appendChild(albumCard)
  
  
  });
})

document.addEventListener("click", event => {
  // console.log(event.target.id);
  if (event.target.id === "favourite-button") {
    event.preventDefault()
    // Obtaining the favourite songs list from the DOM
    const container = document.getElementById("favourite-songs")

    // Obtaining the artist and album name from the card whose favourite button has been clicked
    const albumName = event.target.parentNode.parentNode.childNodes[1].textContent
    const artistName = event.target.parentNode.parentNode.childNodes[2].textContent


    // I am creating a new list item with the artist name and album name
    const newFavourite = document.createElement("li")
    newFavourite.classList.add("collection-item")
    newFavourite.textContent = `${albumName} - ${artistName}`

    // Appending the created list item to the favourite songs list in the DOM
    container.appendChild(newFavourite)

    // Sending a POST request to the local server to store the favourites
    fetch("http://localhost:3000/favourite-songs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept : "application/json",
      },
      body: JSON.stringify({
        album: `${albumName}`,
        artist: `${artistName}`,
      }),
    })


  }
})


document.addEventListener("click", event => {
  if (event.target.className === "card") {
    event.target.classList.add("purple", "lighten-4")
  }
})