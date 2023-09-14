import { useRef, useState } from 'react';
import './App.css';

function App() {

  const [currentmusicdetails, setCurrentmusicdetails] = useState({
    songName: 'Pop',
    songArtist: 'Micheal Jackson',
    songSrc: './Assets/songs/Michael_Jackson_-_Smooth_Criminal_[NaijaGreen.Com]_.mp3',
    songPhoto: './Assets/images/mic.jpg'
  })
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(0);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLenght, setMusicTotalLenght] = useState('04 : 38');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00')


  const currentAudio = useRef()

  const handleBar = (e)=>{
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100 ;

  }

  

const handleAudioPlay = ()=>{
  if(currentAudio.current.paused)
  {
  currentAudio.current.play();
  setIsAudioPlaying(1)
  }else
  {
  currentAudio.current.pause();
  setIsAudioPlaying(0)
  }
}

const musicAPI = [
{
  songName: 'Pop',
  songArtist: 'Micheal Jackson',
  songSrc: './Assets/songs/Michael_Jackson_-_Smooth_Criminal_[NaijaGreen.Com]_.mp3',
  songPhoto: './Assets/images/mic.jpg'
},
{
  songName: 'Pop',
  songArtist: 'Charlie Puth',
  songSrc: `./Assets/songs/We-Don't-Talk-Anymore---Charlie-Puth(musicdownload.cc).mp3`,
  songPhoto: './Assets/images/cp.jpg'
},
{
  songName: 'Pop',
  songArtist: 'Adam Levine',
  songSrc: './Assets/songs/adam.mp3',
  songPhoto: './Assets/images/adam.jpg'
}
]

const handleNextSong = ()=>{
  
  if(musicIndex >= musicAPI.length - 1)
  {
    let setNumber = 0;
    setMusicIndex(setNumber);
    updateMusic(setNumber);
    
  }else{
    let setNumber = musicIndex + 1;
    setMusicIndex(setNumber);
    updateMusic(setNumber);
    
    
  }
}

const handlePre = ()=> {
  if(musicIndex === 0)
  {
    let setNumber = musicAPI.length - 1;
    setMusicIndex(setNumber);
    updateMusic(setNumber);
    
  }else{
    let setNumber = musicIndex - 1;
    setMusicIndex(setNumber);
    updateMusic(setNumber);
    
    
  }
}

const updateMusic = (number)=>{
  let musicObject = musicAPI[number];
  currentAudio.current.src = musicObject.songSrc;
  currentAudio.current.play();
  setCurrentmusicdetails({
    songName: musicObject.songName,
    songArtist: musicObject.songArtist,
    songSrc: musicObject.songSrc,
    songPhoto: musicObject.songPhoto
  })
  setIsAudioPlaying(1);

}

const handleAudioUpdate = ()=> {
  let min =  Math.floor(currentAudio.current.duration / 60);
  let sec =  Math.floor(currentAudio.current.duration % 60);

  let musicTotalLenght0 = `${min < 10? `0${min}` : min} : ${sec < 10? `0${sec}` : sec}`
  setMusicTotalLenght(musicTotalLenght0);

  let minn =  Math.floor(currentAudio.current.currentTime / 60);
  let secc =  Math.floor(currentAudio.current.currentTime % 60);

  let musicCurrentt= `${minn < 10? `0${minn}` : minn} : ${secc < 10? `0${secc}` : secc}`
  setMusicCurrentTime(musicCurrentt);

  const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
  setAudioProgress(isNaN(progress)? 0 : progress);

}

  return (
    <div className="container">

      <audio src='./Assets/songs/Michael_Jackson_-_Smooth_Criminal_[NaijaGreen.Com]_.mp3' ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdate}></audio>
      <div className="blackscreen"></div>
      <div className="music-container">
        <p className="music-player">Music Player</p>
        <p className="music-head-name">{currentmusicdetails.songName}</p>
        <p className="music-artist-name">{currentmusicdetails.songArtist}</p>
        <img src={currentmusicdetails.songPhoto}  alt="songphoto" id='songimage' />
        <div className="musictimerdiv">
          <p className="audioCT"> {musicCurrentTime}</p>
          <p className="audioTL"> {musicTotalLenght} </p>
        </div>
        <input type="range" className="audiobar" name="audiobar" value={audioProgress} onChange={handleBar} />
<div className="musiccontrolers">
  <i className='fa-solid fa-backward musiccontoler' onClick={handlePre}></i>
  <i className={`fa-solid ${isAudioPlaying? 'fa-pause-circle' : 'fa-circle-play'} playbtn`} onClick={handleAudioPlay}></i>
  <i className='fa-solid fa-forward musiccontoler' onClick={handleNextSong}></i>
</div>

      </div>
      <div className='changebackbtn'>
          Change Background
      </div>
    </div>
  );
}

export default App;
