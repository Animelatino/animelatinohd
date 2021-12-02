import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

function DirectLinkAds() {
    const [visible, setVisible] = useState(true);

    const Container = styled.div`
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        background: var(--background-color);
        z-index: 99;
    `;

    return null;

    return (
        <Container onClick={() => setVisible(false)}>
            <script
                data-cfasync="false"
                type="text/javascript"
                src="//putainalen.com/rGdFCpDnfh4/44493"
            ></script>
        </Container>
    );
}

export default DirectLinkAds;
