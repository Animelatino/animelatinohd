import React, { PureComponent } from 'react';

class AdsScript extends PureComponent {

    componentDidMount () {
        const script = document.createElement("script");
        script.type = "application/javascript";
        script.setAttribute("data-idzone", "3572730");
        script.src = "https://a.exdynsrv.com/nativeads-v2.js";
        script.async = true;
        const div = document.getElementById('ads_inline');
        div.appendChild(script);
    }
    
    render() {
        return (
            <div id={'ads_inline'}></div>
        )
    }
}

export default AdsScript