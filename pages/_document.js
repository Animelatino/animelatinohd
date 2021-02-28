import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="es">
                <Head>
                    <link rel="icon" href="/favicon.ico"/>
                    <meta name="theme-color" content="#000000"/>
                    <link rel="manifest" href="/manifest.json"/>
                    <meta name="robots" content="index, follow"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap" rel="stylesheet"/>
                    <script type="module" src='/pwabuilder-sw-register.js'></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
                <footer>
                    <script id="chatBroEmbedCode" src="/chat.js"></script>
                </footer>
            </Html>
        )
    }
}

export default MyDocument