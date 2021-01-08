import { AppProps } from "next/dist/next-server/lib/router/router"
import "styles/style.css"
import Head from "next/head"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
    <>
        <Head>
            <title>underscore.space</title>
            <meta charSet="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <link
                href="https://unpkg.com/prism-theme-night-owl@1.4.0/build/no-italics.css"
                rel="stylesheet"
            />
        </Head>
        <Component {...pageProps} />
    </>
)

export default MyApp
