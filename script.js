 //calculate time to display

 const trackList = [
    {title: "Music 1", singer: "Artist 1", track: "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3", trackImage: "https://img.freepik.com/free-vector/modern-mosaic-wallpaper-rose-gold-black_53876-58064.jpg?size=626&ext=jpg&ga=GA1.2.958418818.1610361415"},
    {title: "Music 2", singer: "Artist 2", track: "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/remember%20the%20old%20days.mp3", trackImage: "https://img.freepik.com/free-vector/abstract-colorful-topographic-map-design-vector_1035-14092.jpg?size=626&ext=jpg&ga=GA1.2.958418818.1610361415"},
    {title: "Music 3", singer: "Artist 3", track: "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/Director.mp3", trackImage: "https://img.freepik.com/free-vector/background-pattern-design_1181-130.jpg?size=338&ext=jpg&ga=GA1.2.958418818.1610361415"},
]

var trackId = 0;

const titleTrack = document.querySelector("#title");
const singer = document.querySelector("#singer");
const trackimage = document.querySelector(".track-image"); 
console.log(titleTrack.textContent , singer.textContent, trackimage.src)


        const getTimeCodeFromNum = (e) => {
            let sec = parseInt(e);
            let mins = parseInt(e/60);
            sec -= mins*60;
            const hrs = parseInt(mins/60);
            mins -= hrs*60;

            if(hrs === 0)
            return `${mins}:${String(sec%60).padStart(2,0)}`;
            else
            return `${String(hrs).padStart(2,0)}:${mins}:${String(sec%60).padStart(2,0)}`;
        } 
//variable to select audioPlayer
        const audioPlayer = document.querySelector(".audio-block");
        var audio = new Audio(trackList[trackId].track);
        console.dir(audio);
        
//load audio and set volume
        audio.addEventListener("loadeddata", ()=>{
            audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(audio.duration);
            audio.volume = 0.80;
        }, false);
//to skip around song time from timeline positioning
        const timeline = audioPlayer.querySelector(".timeline");
        timeline.addEventListener("click", e=>{
            const timelineWidth = window.getComputedStyle(timeline).width;
            const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
            audio.currentTime = timeToSeek;
        }, false);
//check audio percentage and update time accordingly
        setInterval(()=>{
            const progressBar = audioPlayer.querySelector(".progress");
            progressBar.style.width = audio.currentTime / audio.duration *100 + "%";
            audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(audio.currentTime);
        }, 500)
//toggle play pause click
        const icon = audioPlayer.querySelector(".controls .play-toggle i");
        const playBt = audioPlayer.querySelector(".controls .play-toggle");
        const rotateTrack = audioPlayer.querySelector(".track-image");

        const state = ()=>{
            if(audio.paused){
                playBt.classList.remove("play");
                playBt.classList.add("pause")
                rotateTrack.classList.add("rotate");
                icon.classList.add("fa-pause")
                icon.classList.remove("fa-play")
                audio.play();
            }else{
                playBt.classList.remove("pause");
                playBt.classList.add("play");
                rotateTrack.classList.remove("rotate");
                icon.classList.add("fa-play");
                icon.classList.remove("fa-pause");
                audio.pause();
            }
        }
        playBt.addEventListener("click", ()=>{state()}, false);
//previous and next clicks
        const back =  audioPlayer.querySelector(".backward");
        const next =  audioPlayer.querySelector(".forward");
        var songIndex = 0;
        
        
        const prevSong = () =>
        {   
            audio.pause();
            trackId = ((trackId - 1)+trackList.length) % 3;
            console.log(trackId);
            titleTrack.innerHTML=trackList[trackId].title;
            singer.textContent=trackList[trackId].singer;
            trackimage.src = trackList[trackId].trackImage;
            rotateTrack.classList.remove("rotate");
            //icon.classList.add("fa-play")
            //icon.classList.remove("fa-pause")
            icon.classList.add("fa-pause")
            icon.classList.remove("fa-play")
            audio.src=trackList[trackId].track;
            console.dir(audio);
            audio.play();
            rotateTrack.classList.add("rotate");
        }

        const nextSong = () =>
        {
            audio.pause();
            trackId = (trackId + 1) % 3;
            console.log(trackId);
            titleTrack.textContent=trackList[trackId].title;
            singer.textContent=trackList[trackId].singer;
            trackimage.src=trackList[trackId].trackImage;
            rotateTrack.classList.remove("rotate");
            //icon.classList.add("fa-play")
            //icon.classList.remove("fa-pause")
            icon.classList.add("fa-pause")
            icon.classList.remove("fa-play")
            audio.src=trackList[trackId].track;
            console.dir(audio);
            audio.play();
            rotateTrack.classList.add("rotate");
        }

        back.addEventListener('click', prevSong);
        next.addEventListener('click', nextSong);
