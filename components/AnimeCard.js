import React, { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { posterAnime, slugAnime, nFormatter } from '../helpers/Functions';
import { getYear } from '../helpers/Strings';

import styles from '../styles/AnimeCard.module.css';

export default class AnimeCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;
        return (
            <div className={styles.anime}>
                <div className={styles.cover}>
                    <Link href={slugAnime(data?.slug)}>
                        <a title={data?.name} alt={data?.name}>
                            <div className={styles.image}>
                                <Image
                                    alt={data?.name}
                                    src={posterAnime(data?.poster)}
									layout="responsive"
									width="auto"
									height="auto"                                    
									quality={95}
                                    loading={"lazy"}
									sizes="(max-width: 360px) 22vw,
										   (max-width: 480px) 14vw,
										   (max-width: 640px) 11vw,
										   (max-width: 1024px) 9vw,
										   (max-width: 1280px) 6vw,
                                           (max-width: 800px) 140px,
										   (max-width: 1366px) 182px, 250px"/>
                                {data?.number && (
                                    <div className={styles.numCountLat}>{`${data?.number} ${data?.number > 1 ? 'Episodios'  : 'Episodio'}`}</div>
                                )}
                            </div>
                        </a>
                    </Link>
                    <span className={styles.score}>{data?.totalviews &&(<span><svg viewBox="0 0 24 24"><g data-name="Layer 2"><path d="M12 5C5 5 2 11 2 12s3 7 10 7 10-6 10-7-3-7-10-7zm0 12c-4 0-7-4-8-5 1-1 4-5 8-5s7 4 8 5c-1 1-4 5-8 5z"></path><path d="M12 8a4 4 0 104 4 4 4 0 00-4-4zm0 6a2 2 0 112-2 2 2 0 01-2 2z"></path></g></svg></span>)} {data?.vote_average || nFormatter(data?.totalviews,1) }{data?.vote_average &&(<b>&#9733;</b>)}</span> 
                </div>
                <div className={styles.info}>
                    <h3>
                        <Link href={slugAnime(data?.slug)}>
                            <a className={styles.title} alt={data?.name} title={data?.name}>
                                <span className={styles.limit}>{data?.name}</span>
                            </a>
                        </Link>
                    </h3>
                    <p className={styles.year}>{ getYear(data?.aired) }</p>
                </div>
            </div>
        );
    }
}
