import React from 'react';
import s from './VideoSection.module.css';

const VideoSection = () => {
  return (
    <div className={s.videoSectionWrap}>
      <h2>Top Pokemons</h2>
      <div className={s.videoWrap}>
        <iframe
          className={s.iframe}
          width="460"
          height="215"
          src="https://www.youtube.com/embed/ISmyyg4A6qI?si=-jEw6Fnr_nEcKisr"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <iframe
          className={s.iframe}
          width="460"
          height="215"
          src="https://www.youtube.com/embed/uVnyGnAdzwI?si=nOkDzP6s-RcHcqov"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <iframe
          className={s.iframe}
          width="460"
          height="215"
          src="https://www.youtube.com/embed/3N35h6B3VT8?si=W0n-46dmCkKFXsqc"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoSection;
