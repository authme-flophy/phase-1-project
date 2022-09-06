// we fetch the data from the iTunes api


fetch("https://itunes.apple.com/us/rss/topalbums/limit=20/json")
.then(response => response.json())
.then(data => {

  const albumList = data.feed.entry
  albumList.forEach(element => {
    
    const albumCard = document.createElement("div")
    albumCard.classList.add("card")

    const albumCover = document.createElement("img")
    albumCover.setAttribute("src", element["im:image"][2].label)

    const albumTitle = document.createElement("h2")
    albumTitle.id = "title"
    albumTitle.textContent = element["im:name"].label

    const artist = document.createElement("p")
    artist.id = "artist"
    artist.textContent = element["im:artist"].label

    albumCard.appendChild(albumCover)
    albumCard.appendChild(albumTitle)
    albumCard.appendChild(artist)

    document.getElementsByClassName("container")[0].appendChild(albumCard)
  
  
  });
})