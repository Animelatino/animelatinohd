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
                            <a className={styles.play} alt={`${anime?.name} ${episode?.number}`} title={`${anime?.name} ${episode?.number}`}>
                                <svg viewBox="0 0 24 24"><path d="M8,5.14V19.14L19,12.14L8,5.14Z"></path></svg>
                            </a>
                        </Link>
                    </div>
                    <Image 
                        className="poster"
                        alt={`${anime?.name} ${episode?.number}`}
                        height="auto"
                        width="auto"
                        layout="responsive"
                        loading={"lazy"}
                        src={imageEpisode(anime?.banner) }/>
                </div>
                <div className={styles.text}>
                    <Link href={slugEpisode(anime?.slug, episode?.number)}>
                        <a className={styles.title} alt={`${anime?.name} ${episode?.number}`} title={`${anime?.name} ${episode?.number}`}>
                            <div className={styles.limit}>{anime?.name}</div>
                            <span className={styles.episode}>
                                <span className={styles.checkView}>
                                    <svg viewBox="0 0 24 24"><g data-name="Layer 2"><path d="M12 5C5 5 2 11 2 12s3 7 10 7 10-6 10-7-3-7-10-7zm0 12c-4 0-7-4-8-5 1-1 4-5 8-5s7 4 8 5c-1 1-4 5-8 5z"></path><path d="M12 8a4 4 0 104 4 4 4 0 00-4-4zm0 6a2 2 0 112-2 2 2 0 01-2 2z"></path></g></svg>
                                </span>
                                {`Ep. ${episode?.number}`}
                            </span>
                        </a>
                    </Link>
                </div>
            </div>
        );
    }
}
