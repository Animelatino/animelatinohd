import React from 'react';
import { DiscussionEmbed } from 'disqus-react';
import styles from '../styles/Comments.module.css';

const Comments = ({title, url, id}) => {
    return(
        <div className={styles.container}>
            <DiscussionEmbed
                shortname={process.env.DISQUS_SHORTNAME}
                config={
                    {
                        url: url,
                        identifier: id,
                        title: title,
                    }
                }
            />
        </div>
    )
}
export default Comments