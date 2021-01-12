import { AppProps } from "next/dist/next-server/lib/router/router"
import "styles/style.css"
import Head from "next/head"
import "prism-theme-night-owl/build/no-italics.css"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
    <>
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        </Head>
        <Component {...pageProps} />
    </>
)

export default MyApp
