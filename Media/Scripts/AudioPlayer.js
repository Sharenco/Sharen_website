document.addEventListener("DOMContentLoaded", function () {
  // Your full player code goes here
  const audioFiles = [
        "Media/Audio/3_am_idea-_afterwork_on_midnight.mp3",
        "Media/Audio/adventura.ogg",
        "Media/Audio/battle_1.ogg",
        "Media/Audio/battle_retro.mp3",
        "Media/Audio/battleE.mp3",
        "Media/Audio/boss_battle_V0.9.mp3",
        "Media/Audio/chill_and_groove.mp3",
        "Media/Audio/first_questV2.mp3",
        "Media/Audio/get_ready.mp3",
        "Media/Audio/good_day_max.ogg",
        "Media/Audio/i_see.mp3",
        "Media/Audio/icy_cave.mp3",
        "Media/Audio/jump_derpy_instrumental.mp3",
        "Media/Audio/nonameyet_V1.1.mp3",
        "Media/Audio/number2.5.mp3",
        "Media/Audio/stinkychillo.mp3",
        "Media/Audio/utopia.mp3"
    ];

    let currentTrack = 0;

    const audio = document.getElementById("audio-player");
    const trackName = document.getElementById("track-name");
    const btn = document.getElementById("player-button");
    const container = document.getElementById("player-container");
    const nextButton = document.getElementById("next-button");

    // Try to restore state from localStorage
    const savedTrack = localStorage.getItem("sharen_player_track");
    const savedTime = localStorage.getItem("sharen_player_time");

    const wasPaused = localStorage.getItem("sharen_player_paused") === "true";

    if (savedTrack !== null) {
    currentTrack = parseInt(savedTrack, 10);
    }



    function loadTrack(index) {
        audio.src = audioFiles[index];
        trackName.textContent = audioFiles[index].split("/").pop();

        // Only restore time if this is the saved track
        if (parseInt(localStorage.getItem("sharen_player_track")) === index) {
            audio.addEventListener("loadedmetadata", () => {
            const time = parseFloat(localStorage.getItem("sharen_player_time"));
            if (!isNaN(time)) {
                audio.currentTime = time;
            }
            audio.play();
            }, { once: true });
        } else {
            audio.play();
        }

        // Save the current track index
        localStorage.setItem("sharen_player_track", index);
    }

    function showPlayerAndPlayIfReady() {
        container.style.display = "block";

        if (audio.src === "") {
            loadTrack(currentTrack);
        }
    }

    btn.addEventListener("click", () => {
        if (container.style.display === "none" || container.style.display === "") {
            showPlayerAndPlayIfReady();
        } else {
            container.style.display = "none";
        }
    });

    nextButton.addEventListener("click", () => {
        currentTrack = (currentTrack + 1) % audioFiles.length;
        loadTrack(currentTrack);
    });

    // Optional: Auto-play next track on end
    audio.addEventListener("ended", () => {
        currentTrack = (currentTrack + 1) % audioFiles.length;
        loadTrack(currentTrack);
    });

    audio.addEventListener("timeupdate", () => {
        localStorage.setItem("sharen_player_time", audio.currentTime);
    });

    audio.addEventListener("pause", () => {
        localStorage.setItem("sharen_player_paused", "true");
    });

    audio.addEventListener("play", () => {
        localStorage.setItem("sharen_player_paused", "false");
    });

    // If a track was saved, start playing and show the player
    if (savedTrack !== null && !wasPaused) {
        showPlayerAndPlayIfReady();
    }
});