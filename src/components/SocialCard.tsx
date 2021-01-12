interface SocialCardProps {
    title: string
}

const DESCIRIPTION = "underscore.space - a JavaScript blog by Colin Tindle"

const SocialCard: React.FC<SocialCardProps> = ({ title = "Home" }) => (
    <>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={DESCIRIPTION} />
        <meta name="twitter:card" content="summary" />
        <meta name="og:image" content="/colon.png" />
        <meta
            name="twitter:image"
            content="https://dev.underscore.space/colon.png"
        />
        <meta name="theme-color" content="#ff69b4" />
    </>
)

export default SocialCard
