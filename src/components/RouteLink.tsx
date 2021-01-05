import Link from "next/link"

const RouteLink: React.FC<{ href: string }> = ({ href, children }) => (
    <Link href={href}>
        <a target="_self">{children}</a>
    </Link>
)

export default RouteLink
