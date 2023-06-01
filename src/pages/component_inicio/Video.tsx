import './css/video.css';
const Video = () =>{
 return (
    <div className="video">
      <iframe width="360" height="220" src="https://www.youtube.com/embed/couK2hOTrno" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
    </div>
 );
}
export default Video;