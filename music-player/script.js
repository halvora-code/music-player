const audio = document.querySelector(".audio-player");
const playButton = document.querySelector(".play-button");
const nextButton = document.querySelector(".next-button");
const previousButton = document.querySelector(".previous-button");
const songTitle = document.querySelector(".song-title");
const songArtist = document.querySelector(".song-artist");
const albumArt = document.querySelector(".album-art");
const currentTimeDisplay = document.querySelector(".current-time");
const durationDisplay = document.querySelector(".duration");
const progressBar = document.querySelector(".progress-bar");

function formatTime(seconds) {
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = Math.floor(seconds % 60);

    return minutes + ":" + String(remainingSeconds).padStart(2, "0");
}

audio.addEventListener("loadedmetadata", function() {
    durationDisplay.textContent = formatTime(audio.duration);
    progressBar.max = audio.duration;
});

audio.addEventListener("timeupdate", function() {
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
    progressBar.value = audio.currentTime;
});

progressBar.addEventListener("input", function () {
    audio.currentTime = progressBar.value;
});

const songs = [
    {
    title: "Chill RnB",
    artist: "danyvin",
    source: "music/song1.mp3",
    cover: "covers/greenstar.jpg"
    },
    {
        title:"Night Summer Lounge",
        artist:"Bransboynd",
        source:"music/song2.mp3",
        cover: "covers/cover2.jpg"
    },
    {
        title:"Once in Paris",
        artist:"Pumpupthemind",
        source:"music/song3.mp3",
        cover: "covers/cover3.jpg"
        
    }
];

let currentSongIndex = 0;
loadSong(currentSongIndex);

function loadSong(index) {
    const song = songs[index];
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    audio.src = song.source;
    albumArt.src = song.cover;
}

function nextSong() {
    currentSongIndex++;

    if(currentSongIndex>= songs.length) {
        currentSongIndex = 0;
    }

        loadSong(currentSongIndex);
}

nextButton.addEventListener("click", nextSong);

function previousSong() {
    currentSongIndex--;

    if(currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;

    }

    loadSong(currentSongIndex);
}

previousButton.addEventListener("click", previousSong);


playButton.addEventListener("click", function() {
    if (audio.paused) {
        audio.play();
        playButton.textContent = "Pause";
    } else {
        audio.pause();
        playButton.textContent = "play";
    }
});
