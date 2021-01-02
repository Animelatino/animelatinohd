import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import { ViewIcon } from './Icons';

const AnimeCard = ({anime}) => {
    return (
        <Link href={`/${anime?.slug}`}>
            <a className="anime">
                <div className="anime-content">
                    <div className="anime-image">
                        <Image className="poster" alt={anime?.title} height="auto" width="auto" layout="responsive" loading={"lazy"} src={'https://image.tmdb.org/t/p/w300'+anime?.poster}/>
                        { anime?.status === 1 && (
                        <div className="estreno">Emisión</div>
                        )}
			            { anime?.totalviews && (
			        	<div className="views">
			        		<ViewIcon />
			        		<span>{ anime?.totalviews }</span>
			        	</div>
			            )}
                    </div>
                    <div className="anime-info">
                        <p className="anime-title">{ (anime?.title?.length > 55 ? (anime?.title?.slice(0,55) + '...') : anime?.title) }</p>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default AnimeCard;