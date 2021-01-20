import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/AnimeCard.module.css';
import { posterAnime, slugAnime } from '../helpers/Functions';

const AnimeCard = ({data}) => {
    return (
        <Link href={slugAnime(data?.slug)}>
            <a className={styles.container}>
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
                <div className={styles.info}>
                    <div className={styles.title}>{data?.title}</div>
                </div>
            </a>
        </Link>
    );
};

export default AnimeCard;