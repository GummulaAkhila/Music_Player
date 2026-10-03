// ================= SONG DATA =================

const songs = [

    {
        title: "Summer Vibes",
        artist: "Melody Artist",
        src: "song1.mp3",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=700&q=80"
    },

    {
        title: "Midnight Dreams",
        artist: "Luna Sky",
        src: "song2.mp3",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=700&q=80"
    },

    {
        title: "Lost In Music",
        artist: "Neon Beats",
        src: "song3.mp3",
        image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=700&q=80"
    },

    {
        title: "Ocean Lights",
        artist: "Dream Waves",
        src: "song4.mp3",
        image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=700&q=80"
    }

];


// ================= ELEMENTS =================

const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");

const progressBar =
    document.getElementById("progressBar");

const volumeBar =
    document.getElementById("volumeBar");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const songTitle =
    document.getElementById("songTitle");

const songArtist =
    document.getElementById("songArtist");

const albumImage =
    document.getElementById("albumImage");

const playlistSongs =
    document.querySelectorAll(".playlist-song");

const autoplay =
    document.getElementById("autoplay");

const musicPlayer =
    document.querySelector(".music-player");

const favoriteBtn =
    document.getElementById("favoriteBtn");


// ================= VARIABLES =================

let songIndex = 0;

let isPlaying = false;


// ================= LOAD SONG =================

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;

    songArtist.textContent = song.artist;

    albumImage.src = song.image;

    audio.src = song.src;

    audio.load();


    // Update active playlist item

    playlistSongs.forEach((item) => {

        item.classList.remove("active");

    });

    playlistSongs[index].classList.add("active");

}


// ================= PLAY =================

function playSong() {

    audio.play();

    isPlaying = true;

    playBtn.textContent = "❚❚";

    musicPlayer.classList.add("playing");

}


// ================= PAUSE =================

function pauseSong() {

    audio.pause();

    isPlaying = false;

    playBtn.textContent = "▶";

    musicPlayer.classList.remove("playing");

}


// ================= PLAY / PAUSE =================

playBtn.addEventListener("click", () => {

    if (isPlaying) {

        pauseSong();

    } else {

        playSong();

    }

});


// ================= NEXT =================

function nextSong() {

    songIndex++;

    if (songIndex >= songs.length) {

        songIndex = 0;

    }

    loadSong(songIndex);

    playSong();

}


nextBtn.addEventListener("click", nextSong);


// ================= PREVIOUS =================

function previousSong() {

    songIndex--;

    if (songIndex < 0) {

        songIndex = songs.length - 1;

    }

    loadSong(songIndex);

    playSong();

}


prevBtn.addEventListener(
    "click",
    previousSong
);


// ================= AUTOPLAY =================

audio.addEventListener("ended", () => {

    if (autoplay.checked) {

        nextSong();

    } else {

        pauseSong();

    }

});


// ================= PROGRESS =================

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) {
        return;
    }

    const progress =
        (audio.currentTime / audio.duration) * 100;

    progressBar.value = progress;

    currentTime.textContent =
        formatTime(audio.currentTime);

});


audio.addEventListener("loadedmetadata", () => {

    duration.textContent =
        formatTime(audio.duration);

});


// ================= CHANGE PROGRESS =================

progressBar.addEventListener("input", () => {

    if (!audio.duration) {
        return;
    }

    audio.currentTime =
        (progressBar.value / 100) *
        audio.duration;

});


// ================= VOLUME =================

volumeBar.addEventListener("input", () => {

    audio.volume = volumeBar.value;

});


// Set initial volume

audio.volume = 0.8;


// ================= FORMAT TIME =================

function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    const minutes =
        Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60);

    return (
        minutes +
        ":" +
        (seconds < 10 ? "0" : "") +
        seconds
    );

}


// ================= PLAYLIST CLICK =================

playlistSongs.forEach((item) => {

    item.addEventListener("click", () => {

        songIndex =
            Number(item.dataset.index);

        loadSong(songIndex);

        playSong();

    });

});


// ================= FAVORITE =================

favoriteBtn.addEventListener("click", () => {

    if (favoriteBtn.textContent === "♡") {

        favoriteBtn.textContent = "♥";

        favoriteBtn.style.color = "#ec4899";

    } else {

        favoriteBtn.textContent = "♡";

        favoriteBtn.style.color = "#aaa";

    }

});


// ================= KEYBOARD =================

document.addEventListener("keydown", (event) => {

    if (event.code === "Space") {

        event.preventDefault();

        if (isPlaying) {

            pauseSong();

        } else {

            playSong();

        }

    }

    if (event.code === "ArrowRight") {

        nextSong();

    }

    if (event.code === "ArrowLeft") {

        previousSong();

    }

});


// ================= INITIAL SONG =================

loadSong(songIndex);