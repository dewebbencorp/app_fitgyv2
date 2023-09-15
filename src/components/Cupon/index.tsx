import "./cupon.css";
export const Cupon = () => {
  return (
    <>
      <div className="main-cupon-container">
        <div className="cupon-container">
          <div className="head-cupon">
            <h1>The Fit Bar</h1>
            <h2>MENÚ</h2>
          </div>
          <div className="video-container">
            <video
              src="https://187.188.16.29:4431/webservice-app2/assets/media/bg_cupon.mp4"
              autoPlay
              loop
            />
          </div>
        </div>

        <div className="btn-generate ">
          <div className="btn-up-dta">
            <img src="#" /> <p> Generar</p>
          </div>
        </div>
      </div>
    </>
  );
};
