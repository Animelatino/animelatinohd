import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import { ViewIcon, StarIcon } from './Icons';

const AnimeCard = ({anime}) => {
    return (
        <Link href={`/anime/${anime?.slug}`}>
            <a className="anime">
                <div className="anime-content">
                    <div className="anime-image">
                        <Image className="poster" alt={anime?.title} height="auto" width="auto" layout="responsive" loading={"lazy"} src={'https://image.tmdb.org/t/p/w300'+anime?.poster}/>
                        { anime?.status === 1 && (
                        <div className="estreno">Emisión</div>
                        )}
                        { anime?.totalviews 
                        ?   <div className="views">
			        		    <ViewIcon />
			        		    <span>{ anime?.totalviews }</span>
			        	    </div>
                        :   <div className="anime-rating">
                                <StarIcon />
                                <span>{ anime?.vote_average?.toFixed(1) }</span>
                            </div>
			            }
                        <div className={`anime-type type-${anime?.type?.toLowerCase()}`}>{anime?.type === 'Tv' ? 'Anime' : (anime?.type === 'Movie' ? 'Película' : anime?.type)}</div>
                        <div className="anime-year">{anime?.aired?.slice(0,4)}</div>
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