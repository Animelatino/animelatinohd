import React, { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/EpisodeCard.module.css';
import { imageEpisode, posterAnime, slugEpisode, slugAnime } from '../helpers/Functions';
import { getFromNow } from '../helpers/Strings';

export default class EpisodeCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { episode } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.holder}>
                    <div className={styles.overlay}>
                        <span className={styles.time}>{ getFromNow(episode?.created_at) }</span>
                        <Link href={slugEpisode(episode?.anime?.slug, episode?.number)}>
                            <a className={styles.play}>
                                <svg viewBox="0 0 24 24"><path d="M8,5.14V19.14L19,12.14L8,5.14Z"></path></svg>
                            </a>
                        </Link>
                        <Link href={slugAnime(episode?.anime?.slug)}>
                            <a className={styles.cover}>
                                <Image
                                    alt={episode?.anime?.title}
                                    height="auto"
                                    width="auto"
                                    layout="responsive"
                                    loading={"lazy"}
                                    style={"position:aboslute"}
                                    src={posterAnime(episode?.anime?.poster) }/>
                            </a>
                        </Link>
                    </div>
                    <Image 
                        className="poster"
                        alt={`${episode?.anime?.title} ${episode?.number}`}
                        height="auto"
                        width="auto"
                        layout="responsive"
                        loading={"lazy"}
                        src={imageEpisode(episode?.anime?.banner) }/>
                </div>
                <div className={styles.text}>
                    <Link href={slugEpisode(episode?.anime?.slug, episode?.number)}>
                        <a className={styles.title}>
                            <div className={styles.limit}>{episode?.anime?.title}</div>
                            <span className={styles.episode}>{`Ep. ${episode?.number}`}</span>
                        </a>
                    </Link>
                </div>
            </div>
        );
    }
}
