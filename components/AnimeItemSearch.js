import React, { Component } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { posterAnime, slugAnime } from '../helpers/Functions';

import styles from '../styles/AnimeItemSearch.module.css';

export default class AnimeItemSearch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;
        return (
            <Link href={slugAnime(data?.slug)}>
                <a className={styles.result} alt={data?.name} title={data?.name}>
                    <div className={styles.image}>
                        <Image 
                            className="poster"
                            alt={data?.name}
                            height={50}
                            width={40}
							quality={95}
                            layout={"intrinsic"}
                            loading={"lazy"}
                            src={posterAnime(data?.poster) }/>
                    </div>
                    <div className={styles.content}>
                        <p className={styles.title}>{data?.name}</p>
                        <p className={styles.type}>{data?.type}</p>
                    </div>
                </a>
            </Link>
        );
    }
}
