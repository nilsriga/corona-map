import React from 'react';
import { Embed, Segment, Container } from 'semantic-ui-react'
import "./main.css"

const SKPCMap = () => {

    return (

        <Embed
            url='https://spkc.maps.arcgis.com/apps/webappviewer/index.html?id=593bb3ab785341d5b64de7df14125f21'
            active={true}
        />

    )

}
export default SKPCMap;
