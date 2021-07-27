fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/song/rad001')
.then((response) => response.json())
.then((data) => {
  const characterList = document.getElementById('character-list-sesion');

  const item = document.createElement('li');
  item.setAttribute('class', 'item-artist-sesion');
  characterList.appendChild(item);

  const musicSong = document.createElement("audio");
  musicSong.setAttribute('crossorigin','anonymous');
  musicSong.setAttribute('src',`${data.audio}`);
  item.appendChild(musicSong);
  item.innerText = musicSong.src;
});