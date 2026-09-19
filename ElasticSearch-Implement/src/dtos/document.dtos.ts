
export interface DocumentDto{
    heading:string,
    description:string
}
export type EsearchDto = {
    docs:DocumentDto,
    id:string
}