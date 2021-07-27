import { song1, prueba } from "./music.js";

const fetchSong = await prueba(song1);

function ListSong(event) {
    for (let i = 0; i < fetchSong.length; i++) {
        const characterList = document.getElementById('character-list-sesion');

        const item = document.createElement('li');
        item.setAttribute('class', 'item-artist-sesion');
        characterList.appendChild(item);

        const musicSong = document.querySelectorAll("#audio");
        musicSong.setAttribute('crossorigin', 'anonymous');
        musicSong.setAttribute('src', `${fetchSong[i].audio}`);
        item.appendChild(musicSong);
        item.innerText = musicSong.src;

    }

    const pruebaSongs = document.querySelectorAll('#audio');
    console.log(pruebaSongs[0]); 

    var holding = false;
    var track = document.getElementById('track');
    var progress = document.getElementById('progress');
    var play = document.getElementById('play');
    var next = document.getElementById('next');
    var prev = document.getElementById('prev');
    var current_track = 0;
    var song, audio, duration;
    var playing = false;

    window.addEventListener('load', init(), false);

    function init() {
        song = musicSong[current_track];
        audio = new Audio();
        audio.src = musicSong.src;
    }


    audio.addEventListener('timeupdate', updateTrack, false);

    audio.addEventListener('loadedmetadata', function () {
        duration = this.duration;
    }, false);

    track.onmousedown = function (e) {
        holding = true;
        seekTrack(e);
        console.log(holding);
    }

    play.onclick = function () {
        playing ? audio.pause() : audio.play();
    }

    audio.addEventListener("pause", function () {
        play.innerHTML = '<img class="pad" src="./img/play.png" />';
        playing = false;
    }, false);

    audio.addEventListener("playing", function () {
        play.innerHTML = '<img src="./img/pause.png" />';
        playing = true;
    }, false);

    next.addEventListener("click", nextTrack, false);
    prev.addEventListener("click", prevTrack, false);


    function updateTrack() {
        curtime = audio.currentTime;
        percent = Math.round((curtime * 100) / duration);
        progress.style.width = percent + '%';
        handler.style.left = percent + '%';
    }

    function seekTrack(e) {
        event = e || window.event;
        var x = e.pageX - player.offsetLeft - track.offsetLeft;
        percent = Math.round((x * 100) / track.offsetWidth);
        if (percent > 100) percent = 100;
        if (percent < 0) percent = 0;
        progress.style.width = percent + '%';
        handler.style.left = percent + '%';
        audio.play();
        audio.currentTime = (percent * duration) / 100
    }
    function nextTrack() {
        current_track++;
        current_track = current_track % (musicSong.length);
        song = musicSong[current_track];
        audio.src = musicSong.src;
    }

    function prevTrack() {
        current_track--;
        current_track = (current_track == -1 ? (musicSong.length - 1) : current_track);
        song = musicSong[current_track];
        audio.src = musicSong.src;
    }
}


ListSong();