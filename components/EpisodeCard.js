import React, { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    bannerAnime,
    posterAnime,
    slugEpisode,
    slugAnime,
} from '../helpers/Functions';
import { getFromNow } from '../helpers/Strings';

import styles from '../styles/EpisodeCard.module.css';

export default class EpisodeCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { episode } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.coversContainer}>
                    <Link
                        href={slugEpisode(
                            episode?.anime?.slug,
                            episode?.number
                        )}
                        className={styles.imageContainer}
                    >
                        <img
                            src={bannerAnime(episode?.anime?.banner, 'w300')}
                        />
                        <div className={styles.overlay}></div>
                    </Link>
                    <Link
                        href={slugAnime(episode?.anime?.slug)}
                        className={styles.coverAnimeContainer}
                    >
                        <img
                            src={posterAnime(episode?.anime?.poster, 'w154')}
                        />
                    </Link>
                </div>
                <div className={styles.infoContainer}>
                    <Link
                        href={slugEpisode(
                            episode?.anime?.slug,
                            episode?.number
                        )}
                    >
                        <span className={styles.titleEpisodeAnime}>
                            {episode?.anime?.name}
                        </span>
                    </Link>
                    <span className={styles.numberEpisodeAnime}>
                        EP. {episode?.number}
                    </span>
                </div>

                {/* <div className={styles.holder}>
                    <div className={styles.overlay}>
                        <span className={styles.time}>
                            {getFromNow(episode?.created_at)}
                        </span>
                        <Link
                            href={slugEpisode(
                                episode?.anime?.slug,
                                episode?.number
                            )}
                            className={styles.play}
                            alt={`${episode?.anime?.name} ${episode?.number}`}
                            title={`${episode?.anime?.name} ${episode?.number}`}
                        >
                            <svg viewBox="0 0 24 24">
                                <path d="M8,5.14V19.14L19,12.14L8,5.14Z"></path>
                            </svg>
                        </Link>
                        <Link
                            href={slugAnime(episode?.anime?.slug)}
                            className={styles.cover}
                            alt={episode?.anime?.name}
                            title={episode?.anime?.name}
                        >
                            <img
                                alt={episode?.anime?.name}
                                height={73}
                                width={53}
                                quality={95}
                                layout="intrinsic"
                                loading={'lazy'}
                                src={posterAnime(
                                    episode?.anime?.poster,
                                    'w300'
                                )}
                            />
                        </Link>
                    </div>
                    <img
                        alt={`${episode?.anime?.name} ${episode?.number}`}
                        src={bannerAnime(episode?.anime?.banner, 'w300')}
                        width="250px"
                        height="auto"
                        style={{ paddingBottom: 0 }}
                        quality={95}
                        loading={'lazy'}
                    />
                </div>
                <div className={styles.text}>
                    <Link
                        href={slugEpisode(
                            episode?.anime?.slug,
                            episode?.number
                        )}
                        className={styles.title}
                        alt={`${episode?.anime?.name} ${episode?.number}`}
                        title={`${episode?.anime?.name} ${episode?.number}`}
                    >
                        <div className={styles.limit}>
                            {episode?.anime?.name}
                        </div>
                        <span
                            className={styles.episode}
                        >{`Ep. ${episode?.number}`}</span>
                    </Link>
                </div> */}
            </div>
        );
    }
}
