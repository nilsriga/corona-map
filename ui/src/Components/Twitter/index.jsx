import React from 'react';

import {
    TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton,
    TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare,
    TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton
} from 'react-twitter-embed';

const twiter = () => {



    return (
        <>
            <TwitterTimelineEmbed
                autoHeight={true}
                theme={'dark'}
                sourceType="SPKCentrs"
                screenName="SPKCentrs"
                options={{ 
                    height: 400 ,
                    width:200
                }}
            />

        </>

    );


};

export default twiter;
