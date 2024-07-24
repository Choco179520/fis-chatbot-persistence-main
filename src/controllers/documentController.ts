import { Request, Response } from "express";
import { documentService } from "../services/documentService";

export const documentController = {
  async createDocument(req: Request, res: Response): Promise<void> {
    try {
      const { title, utterances, response_set_id } = req.body;
      const newDocument = await documentService.createDocument({
        title,
        utterances,
        response_set_id,
      });
      res.status(201).json(newDocument);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getDocumentById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const document = await documentService.getDocumentById(id);
      res.status(200).json(document);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getAllDocuments(req: Request, res: Response): Promise<void> {
    try {
      const documents = await documentService.getAllDocuments();
      res.status(200).json(documents);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getDocumentByTitle(req: Request, res: Response): Promise<void> {
    try {
      const { title } = req.params;
      const documents = await documentService.getDocumentsByTitle(title);

      if (documents) {
        res.status(200).json(documents);
      } else {
        res.status(404).json({ error: "Documents not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async updateDocumentById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const { utterances } = req.body;
      const updateResponseSet = await documentService.updateResponseSetById(
        id,
        utterances
      );
      if (updateResponseSet) {
        res.status(200).json(updateResponseSet);
      } else {
        res.status(404).json({ error: "Response set not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteDocumentById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const updateResponseSet = await documentService.deleteResponseSetById(
        id,
      );
      if (updateResponseSet) {
        res.status(200).json(updateResponseSet);
      } else {
        res.status(404).json({ error: "Response set not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
