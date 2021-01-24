import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { imageAnimeSearch, slugAnime } from '../helpers/Functions';
import styles from '../styles/AnimeItemSearch.module.css';

const AnimeItemSearch = ({data}) => {
    return (
        <Link href={slugAnime(data?.slug)}>
            <a className={styles.result}>
                <div className={styles.image}>
                    <Image 
                        className="poster"
                        alt={data?.title}
                        height="auto"
                        width="auto"
                        layout="responsive"
                        loading={"lazy"}
                        src={imageAnimeSearch(data?.poster) }/>
                </div>
                <div className={styles.content}>
                    <p className={styles.title}>{data?.title}</p>
                    <p className={styles.type}>{data?.type}</p>
                </div>
            </a>
        </Link>
    )
}

export default AnimeItemSearch;