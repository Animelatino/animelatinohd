import React from "react";
import Link from 'next/link';
import Image from 'next/image';

const EpisodeCard = ({episode}) => {
    return (
        <Link href={`/ver/${episode?.anime?.slug}/${episode?.number}`}>
            <a className="episode">
                <div className="episode-content">
                    <div className="episode-image">
                        <Image className="poster" alt={episode?.anime?.title + ' '+episode?.number} height="auto" width="auto" layout="responsive" loading={"lazy"} src={'https://image.tmdb.org/t/p/w300'+episode?.anime?.banner}/>
                        <div className="episode-number">{'Eps. '+episode?.number }</div>
                    </div>
                    <div className="episode-info">
                        <p className="episode-title">{ episode?.anime?.title }</p>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default EpisodeCard;