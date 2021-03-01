import React, { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { bannerAnime, posterAnime, slugEpisode, slugAnime } from '../helpers/Functions';
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
                <div className={styles.holder}>
                    <div className={styles.overlay}>
                        <span className={styles.time}>{ getFromNow(episode?.created_at) }</span>
                        <Link href={slugEpisode(episode?.anime?.slug, episode?.number)}>
                            <a className={styles.play} alt={`${episode?.anime?.name} ${episode?.number}`} title={`${episode?.anime?.name} ${episode?.number}`}>
                                <svg viewBox="0 0 24 24"><path d="M8,5.14V19.14L19,12.14L8,5.14Z"></path></svg>
                            </a>
                        </Link>
                        <Link href={slugAnime(episode?.anime?.slug)}>
                            <a className={styles.cover} alt={episode?.anime?.name} title={episode?.anime?.name}>
                                <Image
                                    alt={episode?.anime?.name}
                                    height={73}
									width={53}
									quality={95}
									layout="intrinsic"
                                    loading={"lazy"}
                                    src={posterAnime(episode?.anime?.poster) }/>
                            </a>
                        </Link>
                    </div>
                    <Image
                        alt={`${episode?.anime?.name} ${episode?.number}`}
                        src={bannerAnime(episode?.anime?.banner) }
						layout="responsive"
						width="auto"
						height="auto"
						quality={95}
						loading={"lazy"}
						sizes="(max-width: 360px) 22vw,
							   (max-width: 640px) 15vw,
							   (max-width: 800px) 12vw,
							   (max-width: 1024px) 11vw,
							   (max-width: 1280px) 9vw,
							   (max-width: 800px) 192px,
							   (max-width: 1366px) 250px"/>
                </div>
                <div className={styles.text}>
                    <Link href={slugEpisode(episode?.anime?.slug, episode?.number)}>
                        <a className={styles.title} alt={`${episode?.anime?.name} ${episode?.number}`} title={`${episode?.anime?.name} ${episode?.number}`}>
                            <div className={styles.limit}>{episode?.anime?.name}</div>
                            <span className={styles.episode}>{`Ep. ${episode?.number}`}</span>
                        </a>
                    </Link>
                </div>
            </div>
        );
    }
}
