import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="es">
                <Head>
                    <link rel="icon" href="/images/favicon.ico"/>
                    <link rel="manifest" href="/manifest.json"/>
                    <meta name="theme-color" content="#000000"/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
                <footer>
                    <script id="chatBroEmbedCode" src="/chat.js"></script>
                    <script async src="https://arc.io/widget.min.js#R2yjvhvV"></script>
                </footer>
            </Html>
        )
    }
}

export default MyDocument