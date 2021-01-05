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
                <script
                    async
                    defer
                    data-domain="underscore.space"
                    src="https://stats.underscore.space/js/plausible.js"
                ></script>
            </Head>
            <div className="flex flex-col max-w-3xl mx-auto h-full">
                <header className="w-full border-b-4 mb-4 p-3 text-lg text-center">
                    <h1>underscore.space</h1>
                </header>
                <nav className="border-b-2 px-2 pb-4">
                    <ul className="mb-2">
                        <li>
                            <RouteLink href="/">Home</RouteLink>
                        </li>
                        <li>
                            <RouteLink href="/about-me">About Me</RouteLink>
                        </li>
                    </ul>
                    <details open>
                        <summary>Blog</summary>
                        <ul>
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
