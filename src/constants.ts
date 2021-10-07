import { join } from "path"
import prism from "@mapbox/rehype-prism"

export const MDX_OPTIONS = { mdxOptions: { rehypePlugins: [prism] } }
export const CONTENT_PATH = join(process.cwd(), "content")
