import { EsearchDto } from "../dtos/document.dtos";
import { createComplainIndex, gettingComplainDocument, indexingCompalingDocument, searchDocumentComplain, updateComplainDocu } from "../repository/eSearch.respository";

export async function createComplainService(){

    const response = await createComplainIndex();

    return response;
}
export async function createIndexService(data:EsearchDto){
    const {docs,id} = data;

    const response = await indexingCompalingDocument(docs,id);

    return response;
}
export async function getcomplainService(id:string){
    const response = await gettingComplainDocument(id);

    return response;
}

export async function searchDocument(heading:string){
    const response = await searchDocumentComplain(heading);

    return response;
}

export async function updateCompalinService(id:string,des:string){
    const response = await updateComplainDocu(id,des);

    return response;
}