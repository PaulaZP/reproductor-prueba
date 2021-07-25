function apiArtist(){
    fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/gorillaz')
    .then((response) => response.json())
    .then((data) => {

        for (let i = 0; i < data.length; i++) {

            const characterList = document.getElementById('character-list-sesion');
    
            const item = document.createElement('li');
            item.setAttribute('class', 'item-artist-sesion');
            characterList.appendChild(item);
    
            const audio = document.createElement('audio');
            audio.setAttribute('src', `${data[i].audio}`);
            audio.setAttribute('id', 'music');
            item.appendChild(audio);
            console.log(`${data[i].audio}`)
        }
    });
}

/*traer el audio */
let music = document.querySelectorAll('#music audio src');
console.log("soy music",music)

var holding = false;
var track = document.getElementById('track');
var progress = document.getElementById('progress');
var play = document.getElementById('play');
var next = document.getElementById('next');
var prev = document.getElementById('prev');
var current_track = 0;
var song, audio, duration;
var playing = false;
var songs = [
    {
        url: "https://cetav.s3.us-east-2.amazonaws.com/rhinestone-eyes.mp3"
    },
    {
        url: "https://cetav.s3.us-east-2.amazonaws.com/kansas.mp3"
    },
    {
        url: "https://cetav.s3.us-east-2.amazonaws.com/momentary-bliss.mp3"
    },
    {
        url: "https://cetav.s3.us-east-2.amazonaws.com/feel-good-inc.mp3"
    },
    {
        url: "https://cetav.s3.us-east-2.amazonaws.com/shes-my-collar.mp3"
    },
    {
        url: "https://cetav.s3.us-east-2.amazonaws.com/19-2000.mp3"
    }
];

window.addEventListener('load', init(), false);

function init() {
    song = songs[current_track];
    audio = new Audio();
    audio.src = song.url;
}


audio.addEventListener('timeupdate', updateTrack, false);
audio.addEventListener('loadedmetadata', function () {
    duration = this.duration;
}, false);

window.onmousemove = function (e) {
    e.preventDefault();
    if (holding) seekTrack(e);
}

window.onmouseup = function (e) {
    holding = false;
    console.log(holding);
}

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
    current_track = current_track % (songs.length);
    song = songs[current_track];
    audio.src = song.url;
}

function prevTrack() {
    current_track--;
    current_track = (current_track == -1 ? (songs.length - 1) : current_track);
    song = songs[current_track];
    audio.src = song.url;
}

apiArtist();