import React from 'react';

import { TwitterTimelineEmbed } from 'react-twitter-embed';

const twiter = () => {



    return (
        <>
            <TwitterTimelineEmbed
                noHeader
                noFooter
                transparent
                noScrollbar
                autoHeight={true}
                theme={'dark'}
                sourceType="SPKCentrs"
                screenName="SPKCentrs"
                options={{
                    height: 400,
                    width: 200
                }}
            />

        </>

    );


};

export default twiter;
