const redirect = (albumId) => {
  window.location.href = `/album.html?album=${albumId}`;
};

const createSongs = (cancion, album) => {
  const contenedorDeCanciones = document.getElementById(
    "contenedorDeCanciones"
  );

  const div = document.createElement("div");
  div.classList.add(
    "grid",
    "grid-cols-4",
    "bg-black",
    "border-solid",
    "rounded-xl",
    "mt-2",
    "py-1.5",
    "items-center",
    "text-center"
  );

  const song = document.createElement("p");
  const duration = document.createElement("p");
  const trash = document.createElement("p");
  const icon = document.createElement("p");

  song.textContent = cancion.nombreCancion;
  duration.textContent = cancion.duracionCancion;
  trash.textContent = "🗑️";
  icon.textContent = "🎵";

  trash.addEventListener("click", function () {
    deleteSong(album._id, album, song.textContent);
  });

  div.appendChild(song);
  div.appendChild(duration);
  div.appendChild(trash);
  div.appendChild(icon);

  contenedorDeCanciones.appendChild(div);
};

const albumId = window.location.href.split("album=")[1];

const addSongButton = document.getElementById('add-song')
addSongButton.setAttribute('href', `/add-canciones.html?album=${albumId}`)


const getSongs = async (id) => {
  try {
    const response = await axios.get("/band/" + id);
    let album = response.data.data.titulo;
    let descripcion = response.data.data.descripcion;

    const titulo = document.getElementById("album");
    const descrip = document.getElementById("descripcion");
    titulo.textContent = album
    descrip.textContent = descripcion

    response.data.data.canciones.map((song) => {
      createSongs(song, response.data.data);
    });
  } catch (error) {
    console.log(error.message);
  }
};

getSongs(albumId);


const deleteSong = async (albumId, albumToUse, song) => {
  const songsToReturn = albumToUse.canciones.filter(
    (cancion) => cancion.nombreCancion !== song
  );
  albumToUse.canciones = songsToReturn;
  try {
    await axios.put(`/band/${albumId}`, albumToUse);
    await swal({
      title: "Success!",
      text: "You deleted a song",
      icon: "success",
      confirmButtonText: "Ok",
    });
    redirect(`${albumId}`);
  } catch (error) {
    swal({
      title: "Error!",
      text: "Failed to delete this song",
      icon: "error",
      confirmButtonText: "Cool",
    });
  }
};


const deleteAlbumButton = document.getElementById('delete-album')
deleteAlbumButton.addEventListener("click", async function (event) {
  event.preventDefault();
  await deleteAlbum(albumId);
});

const deleteAlbum = async (albumId) => {

  try {
    await axios.delete(`/band/${albumId}`);
    await swal({
      title: "Success!",
      text: "You deleted a album",
      icon: "success",
      confirmButtonText: "Ok",
    });
    window.location.href = "/index.html"
  } catch (error) {
    swal({
      title: "Error!",
      text: "Failed to delete this album",
      icon: "error",
      confirmButtonText: "Cool",
    });
  }
};