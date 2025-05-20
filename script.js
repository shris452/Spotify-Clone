console.log("welcome to spotify");


//initializing variables
let songindex = 0;
let audioelement = new Audio("songs/1.mp3");

let masterplay = document.getElementById('masterplay');
let progressbar = document.getElementById('progressbar'); 
let gif = document.getElementById('gif'); 
let mastersongname = document.getElementById('mastersongname');
let songitem = Array.from(document.getElementsByClassName('songitem'));


let songs=[
    {songname: "Iktara", filepath: "songs/1.mp3", coverpath: "covers/1.jpeg"},
    {songname: "Aao Milo Chale", filepath: "songs/2.mp3", coverpath: "covers/2.jpeg"},
    {songname: "Tum Se Hi", filepath: "songs/3.mp3", coverpath: "covers/3.jpeg"},
    {songname: "Ye Ishq Hai", filepath: "songs/4.mp3", coverpath: "covers/4.jpeg"},
    {songname: "Mauja hi Mauja", filepath: "songs/5.mp3", coverpath: "covers/5.jpeg"},
    {songname: "Nagada Nagada", filepath: "songs/6.mp3", coverpath: "covers/6.jpeg"},
  
]
let songlistContainer = document.getElementById('songlist');
songlistContainer.innerHTML = songs.map((song, i) => `
    <div class="songitem">
        <img src="${song.coverpath}" alt="cover">
        <span class="songname">${song.songname}</span>
        <div class="songlistplay">
            <span>3:45</span>
            <i id="${i}" class="fas songitemplay fa-circle-play"></i>
        </div>
    </div>
`).join('');



//handle play/pause click
masterplay.addEventListener('click', () => {
    if(audioelement.paused || audioelement.currentTime<=0){
        audioelement.src = songs[songindex].filepath;
        audioelement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioelement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

//listening to events
audioelement.addEventListener('timeupdate', () => {
//update seekbar
progress=parseInt((audioelement.currentTime/audioelement.duration)*100);
    progressbar.value = progress;

})

progressbar.addEventListener('change', () => {
    audioelement.currentTime=progressbar.value*audioelement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let clickedIndex = parseInt(e.target.id);
        if (songindex === clickedIndex && !audioelement.paused) {
            // If the same song is playing, pause it
            audioelement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterplay.classList.remove('fa-circle-pause');
            masterplay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        } else {
            // Play the selected song
            makeAllPlays();
            songindex = clickedIndex;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioelement.src = songs[songindex].filepath;
            audioelement.currentTime = 0;
            audioelement.play();
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-circle-pause');
            mastersongname.innerText = songs[songindex].songname;
            gif.style.opacity = 1;
        }
    });
});

 
document.getElementById('next').addEventListener('click', () => {
    if(songindex>=6){
        songindex = 0;
    }
    else{
        songindex += 1;
    }
    audioelement.src = songs[songindex].filepath;
    mastersongname.innerText = songs[songindex].songname;
    gif.style.opacity = 1;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');    
})

document.getElementById('previous').addEventListener('click', () => { 
    if(songindex<=0){
        songindex = 0;
    }
    else{
        songindex -= 1;
    }
    audioelement.src = songs[songindex].filepath;
    mastersongname.innerText = songs[songindex].songname;
    gif.style.opacity = 1;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');    
}  )