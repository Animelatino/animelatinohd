import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="es">
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="theme-color" content="#000000" />
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="robots" content="index, follow" />
                    <link
                        rel="preload"
                        href="/fonts/Roboto_Condensed/RobotoCondensed-Light.ttf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/Roboto_Condensed/RobotoCondensed-Regular.ttf"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/Roboto_Condensed/RobotoCondensed-Bold.ttf"
                        as="font"
                        crossOrigin=""
                    />
                    <script
                        async
                        src="https://arc.io/widget.min.js#R2yjvhvV"
                    ></script>
                    <script src="/disableClick.js"></script>
                </Head>
                <body className={'mob_ad'}>
                    <Main />
                    <NextScript />
                    <script src="/popAds.js"></script>
                    <script id="chatBroEmbedCode" src="/chat.js"></script>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
