const renderAlbums = (album) => {
  console.log("ACAAAAA")
    const div = document.getElementById('albumContainer')
    const newDiv = document.createElement('div')

    newDiv.classList.add("relative" ,"w-48", "pt-4")
    console.log(newDiv)
    const img = document.createElement('img')
    img.classList.add('mr-16','cursor-pointer')

    img.src= album.url ? album.url : 'https://imgur.com/0uSALUr.png'
    
    div.appendChild(newDiv)
    newDiv.appendChild(img)

    const p = document.createElement('p')
    p.classList.add('absolute','bottom-0', 'left-0', 'text-white', 'font-medium', 'bg-transp')
    p.textContent = album.canciones.length + " temas"
    newDiv.appendChild(p)

    newDiv.addEventListener('click', ()=>{
      redirect(`${album._id}`)
    })
  }

const getAlbums =  async () => {
    try{
    const response = await axios.get('/band')
    console.log(response.data.data)
    response.data.data.map((album)=> {
      renderAlbums(album)})
    }
    catch(error){
      console.log(error.message)
    }
  }

getAlbums()

const redirect = (albumId) => {
  window.location.href = `/album.html?album=${albumId}`;
}