export interface ContentFile {
    name: string
}

export interface ContentFolder extends ContentFile {
    files: ContentFile[]
}
