import { AppProps } from "next/dist/next-server/lib/router/router"
import "styles/style.css"
import "prism-theme-night-owl/build/no-italics.css"

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
    <Component {...pageProps} />
)

export default MyApp
