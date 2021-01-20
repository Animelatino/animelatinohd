import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/EpisodeCard.module.css';
import { imageEpisode, slugEpisode } from '../helpers/Functions';
import moment from 'moment';
moment.locale('es');

const EpisodeCard = ({data, slugAnime, imageAnime}) => {
    return (
        <Link href={slugEpisode(data?.anime?.slug || slugAnime, data?.number)}>
            <a className={styles.container}>
                <div className={styles.image}>
                    <Image 
                        className="poster"
                        alt={`${data?.anime?.title} ${data?.number}`}
                        height="auto"
                        width="auto"
                        layout="responsive"
                        loading={"lazy"}
                        src={imageEpisode(data?.anime?.banner || imageAnime) }/>
                </div>
                <div className={styles.info}>
                    <div className={styles.title}>{data?.anime?.title}</div>
                    <div className={styles.number}>{`Eps. ${data?.number}`}</div>
                    <div className={styles.extra}>
                        <span className={styles.views}>{`${data?.views} visualizaciones`}</span>
                        <span className={styles.date}>{moment(data?.created_at?.slice(0,10)).fromNow()}</span>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default EpisodeCard;