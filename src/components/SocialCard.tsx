interface SocialCardProps {
    description: string
}

const SocialCard: React.FC<SocialCardProps> = ({
    description = "Tech Blog by Colin Tindle",
}) => (
    <>
        <meta property="og:title" content="underscore.space" />
        <meta property="og:url" content="https://underscore.space" />
        <meta property="og:description" content={description} />

        <meta name="twitter:card" content="summary" />
        <meta property="twitter:title" content="underscore.space" />

        <meta name="twitter:description" content={description} />
    </>
)

export default SocialCard
