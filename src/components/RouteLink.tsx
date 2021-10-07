import Link from "next/link"
import { FC } from "react"

const RouteLink: FC<{ href: string }> = ({ href, children }) => (
    <Link href={href}>
        <a target="_self">{children}</a>
    </Link>
)

export default RouteLink
