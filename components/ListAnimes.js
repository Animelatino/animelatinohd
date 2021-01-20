import React from 'react';
import styles from '../styles/ListAnimes.module.css';
import AnimeCard from './AnimeCard';

const ListAnimes = ({data, title, filters, paginate}) => {
    
    return (
        <div className={styles.box}>
            { title && (
                <h2>{title}</h2>
            )}
            { filters }
            <div className={styles.listAnimes}>
                {data?.map((item, idx) => (
                    <AnimeCard data={item} key={idx} />
                ))}
            </div>
            { paginate }
        </div>
    );
}

export default ListAnimes