export interface BlogPageProps {
    content: string
    menuPaths: {
        path: string
        current: boolean
        titleHtml: any
    }[]
    meta: any
}
