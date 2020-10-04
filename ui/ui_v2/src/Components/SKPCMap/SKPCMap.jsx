import React from 'react';
import { Embed } from 'semantic-ui-react'
import "./SKPCMap.css"

const SKPCMap = () => {

    return (

        <Embed
            url='https://spkc.maps.arcgis.com/apps/webappviewer/index.html?id=593bb3ab785341d5b64de7df14125f21'
            active={true}
        />

    )

}
export default SKPCMap;
