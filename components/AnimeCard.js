import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/AnimeCard.module.css';
import { posterAnime, slugAnime } from '../helpers/Functions';
import { getYear } from '../helpers/Strings';

const AnimeCard = ({data}) => {
    return (
        <div className={styles.anime}>
            <div className={styles.cover}>
                <Link href={slugAnime(data?.slug)}>
                    <a title={data?.title}>
                        <div className={styles.image}>
                            <Image
                                className="poster"
                                alt={data?.title}
                                height="auto"
                                width="auto"
                                layout="responsive"
                                loading={"lazy"}
                                src={posterAnime(data?.poster)}/>
                        </div>
                    </a>
                </Link>
                <span className={styles.score}>{data?.vote_average}<b>&#9733;</b></span> 
            </div>
            <div className={styles.info}>
                <h3>
                    <Link href={slugAnime(data?.slug)}>
                        <a className={styles.title} title={data?.title}>
                            <span className={styles.limit}>{data?.title}</span>
                        </a>
                    </Link>
                </h3>
                <p className={styles.year}>{ getYear(data?.aired) }</p>
            </div>
      </div>
    );
};

export default AnimeCard;