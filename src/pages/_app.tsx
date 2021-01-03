function MyApp({ Component, pageProps }) {
    return (
        <>
            <header>
                <h1>underscore . space</h1>
                <nav>
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <Component {...pageProps} />
            </main>
        </>
    )
}

export default MyApp
