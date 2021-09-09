import { FC } from "react"

interface SocialCardProps {
    title: string
}

const DESCIRIPTION = "underscore.space - a JavaScript blog by Colin Tindle"

const SocialCard: FC<SocialCardProps> = ({ title = "Home" }) => (
    <>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={DESCIRIPTION} />
        <meta name="twitter:card" content="summary" />
        <meta name="og:image" content="https://underscore.space/colon.png" />
        <meta name="theme-color" content="#ff69b4" />
    </>
)

export default SocialCard
