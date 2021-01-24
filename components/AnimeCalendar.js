import React from "react";
import Link from 'next/link';
import styles from '../styles/AnimeCalendar.module.css';
import { bannerAnime, slugAnime, isNowEpisode } from '../helpers/Functions';
import { getFromNow } from '../helpers/Strings';

const AnimeCalendar = ({data}) => {
    return (
        <Link href={slugAnime(data?.slug)}>
            <a className={styles.item}>
                <div className={styles.content} style={{ backgroundImage: "url("+`${bannerAnime(data?.banner)}`+")"}}>
                    <div className={styles.text}>
                        <p>{ isNowEpisode(data?.date) ? `Episodio ${data?.lastEpisode} ${getFromNow(data?.date)}` : `Episodio ${parseInt(data?.lastEpisode + 1)}` }</p>
                        <h1>
                            <div className={styles.limit}>{ data?.title }</div>
                        </h1>
                    </div>
                    <div className={styles.overlay}></div>
                </div>
            </a>
        </Link>
    );
};

export default AnimeCalendar;