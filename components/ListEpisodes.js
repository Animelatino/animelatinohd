import React from 'react';
import styles from '../styles/ListEpisodes.module.css';
import EpisodeCard from './EpisodeCard';

const ListEpisodes = ({data, title, slugAnime, imageAnime }) => {
    return (
        <div className={styles.box}>
            { title && (
                <h2>{title}</h2>
            )}
            <div className={styles.listEpisodes}>
                {data?.map((item, idx) => (
                    <EpisodeCard slugAnime={slugAnime} imageAnime={imageAnime} data={item} key={idx} />
                ))}
            </div>
        </div>
    );
}

export default ListEpisodes