
import { esClient } from "../configs/elastic.config";
import { DocumentDto } from "../dtos/document.dtos";
import { Complain_Index } from "../utils/helpers/index.helper";

export async function createComplainIndex(){
    const exist = await esClient.indices.exists({
        index:Complain_Index
    })
    if(!exist){
             return await esClient.indices.create({index:Complain_Index});
    }
    console.log('createComplainIndex initialized')
    return exist;
}
export async function indexingCompalingDocument(dou:DocumentDto,id:string){
    console.log(dou);
    const ele = await esClient.index({
        index:Complain_Index,
        id:id,
        document:dou
    })
    return ele;
}

export async function gettingComplainDocument(id:string){
    const docs = await esClient.get({
        index:Complain_Index,
        id:id
    })
    return docs;
}

export async function  searchDocumentComplain(heading:string){
    const respose = await esClient.search({
        index:Complain_Index,
        query:{
            match:{
                heading:heading
            }
        }
    })
    return respose
}
export async function updateComplainDocu(id:string,dis:string){
    const response = await esClient.update({
        index:Complain_Index,
        id:id,
        doc:{
            description:dis
        }
    })
    return response
}