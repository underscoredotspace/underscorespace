import { AppProps } from "next/dist/next-server/lib/router/router"
import Head from "next/head"
import RouteLink from "components/RouteLink"
import "styles/style.css"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
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
            <div className="flex flex-col max-w-3xl mx-auto h-full">
                <header className="flex items-center justify-center fixed h-16 w-full max-w-3xl border-b-4 mb-4 px-3 text-lg text-center bg-white">
                    <h1 className="text-3xl font-serif font-black tracking-widest">
                        underscore.space
                    </h1>
                </header>
                <nav className="border-b-2 px-2 pb-4 mt-16">
                    <ul className="mb-2 mt-4">
                        <li>
                            <RouteLink href="/">Home</RouteLink>
                        </li>
                        <li>
                            <RouteLink href="/about-me">About Me</RouteLink>
                        </li>
                    </ul>
                    <details open>
                        <summary>Blog</summary>
                        <ul className="list-disc list-inside ml-4">
                            {/* <li>
                                <RouteLink href="/wtf-is-a-strim-stram">
                                    Teardown of my web app with face-detection
                                </RouteLink>
                            </li> */}
                            <li>
                                <RouteLink href="/async-await">
                                    A nice <code>async/await</code> pattern
                                </RouteLink>
                            </li>
                        </ul>
                    </details>
                </nav>
                <main className="px-2 mb-4 max-w-full">
                    <article className="prose max-w-none">
                        <base target="_blank" />
                        <Component {...pageProps} />
                    </article>
                </main>
            </div>
        </>
    )
}

export default MyApp
