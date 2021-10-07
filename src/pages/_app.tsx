import { AppProps } from "next/dist/next-server/lib/router/router"
import "styles/style.css"
import "prism-theme-night-owl/build/no-italics.css"
import React from "react"
import Head from "next/head"
import SocialCard from "components/SocialCard"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    const { meta } = pageProps

    return (
        <>
            <Head>
                <title>
                    underscore.space{meta?.title && ` - ${meta?.title}`}
                </title>
                <SocialCard title={meta?.title} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                    type="image/x-icon"
                />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
