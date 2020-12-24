import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            <Html lang="es">
                <Head>
                    <link rel="icon" href="/images/favicon.ico"/>
                    <script async src="https://arc.io/widget.min.js#R2yjvhvV"></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument