
import { Request, Response } from "express";

import {
    createComplainService,
    createIndexService,
    getcomplainService,
    searchDocument,
    updateCompalinService,
} from "../services/eSearch.service";



export async function createComplainIndexController(
  res: Response
) {
    try {
        const response = await createComplainService();

        return res.status(200).json({
            success: true,
            message: "Complaint index created successfully",
            data: response,
        });
    } catch (error) {
        console.error("Error creating complaint index:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create complaint index",
        });
    }
}


export async function createComplainDocumentController(
    req: Request,
    res: Response
) {
    try {
        console.log(req.body)
        const { docs, id } = req.body;
        console.log(docs,id)

        const response = await createIndexService({
            docs,
            id,
        });

        return res.status(201).json({
            success: true,
            message: "Complaint document indexed successfully",
            data: response,
        });
    } catch (error) {
        console.error("Error indexing complaint document:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to index complaint document",
        });
    }
}



export async function getComplainDocumentController(
    req: Request,
    res: Response
) {
    try {
        const { id } = req.body;

        const response = await getcomplainService(id);

        return res.status(200).json({
            success: true,
            message: "Complaint document fetched successfully",
            data: response,
        });
    } catch (error) {
        console.error("Error getting complaint document:", error);

        return res.status(404).json({
            success: false,
            message: "Complaint document not found",
        });
    }
}


export async function searchComplainController(
    req: Request,
    res: Response
) {
    try {
        const { heading } = req.query;
        console.log(heading);

        if (typeof heading !== "string" || !heading.trim()) {
            return res.status(400).json({
                success: false,
                message: "Heading is required",
            });
        }

        const response = await searchDocument(heading);

        return res.status(200).json({
            success: true,
            message: "Complaint search successful",
            data: response,
        });
    } catch (error) {
        console.error("Error searching complaint:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to search complaint",
        });
    }
}


export async function updateComplainController(
    req: Request,
    res: Response
) {
    try {

        const { description,id } = req.body;

        if (!description || typeof description !== "string") {
            return res.status(400).json({
                success: false,
                message: "Description is required",
            });
        }
        if(!id){
            throw new Error('id not present');
        }

        const response = await updateCompalinService(
            id,
            description
        );

        return res.status(200).json({
            success: true,
            message: "Complaint updated successfully",
            data: response,
        });
    } catch (error) {
        console.error("Error updating complaint:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update complaint",
        });
    }
}
