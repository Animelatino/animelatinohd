import React, { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { imageEpisode, slugEpisode } from '../helpers/Functions';

import styles from '../styles/EpisodeCard.module.css';

export default class AnimeEpisodeCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { anime, episode } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.holder}>
                    <div className={styles.overlay}>
                        <Link href={slugEpisode(anime?.slug, episode?.number)}>
                            <a className={styles.play}>
                                <svg viewBox="0 0 24 24"><path d="M8,5.14V19.14L19,12.14L8,5.14Z"></path></svg>
                            </a>
                        </Link>
                    </div>
                    <Image 
                        className="poster"
                        alt={`${anime?.title} ${episode?.number}`}
                        height="auto"
                        width="auto"
                        layout="responsive"
                        loading={"lazy"}
                        src={imageEpisode(anime?.banner) }/>
                </div>
                <div className={styles.text}>
                    <Link href={slugEpisode(anime?.slug, episode?.number)}>
                        <a className={styles.title}>
                            <div className={styles.limit}>{anime?.title}</div>
                            <span className={styles.episode}>{`Ep. ${episode?.number}`}</span>
                        </a>
                    </Link>
                </div>
            </div>
        );
    }
}
