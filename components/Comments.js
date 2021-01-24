import React from 'react';
import { DiscussionEmbed } from 'disqus-react';

const Comments = ({title, url, id}) => {
    return(
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
    )
}
export default Comments