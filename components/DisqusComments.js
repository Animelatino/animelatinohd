import React from 'react';
import { DiscussionEmbed } from 'disqus-react';

const DisqusComments = ({title, url, id}) => {
    return(
        <div className="Comments">
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
export default DisqusComments