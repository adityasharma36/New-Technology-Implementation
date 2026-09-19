import { Client } from "@elastic/elasticsearch";
import { serverConfig } from "./server.config";
import { createComplainIndex } from "../repository/eSearch.respository";

export const esClient = new Client({
        node: serverConfig.ELASTICSEARCH_NODE,

        auth: {
            username: serverConfig.ELASTICSEARCH_USERNAME,
            password: serverConfig.ELASTICSEARCH_PASSWORD,
        },

        tls: {
            rejectUnauthorized: false,
        },
});
export async function esClientConnection() {


    try {
        const response = await esClient.ping();

        console.log("Elasticsearch connected successfully ", response);
        await createComplainIndex();


    } catch (error) {
        console.error("Elasticsearch connection failed ", error);
    }
}