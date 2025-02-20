import { Request, Response } from "express";
import { responseSetService } from "../services/responseSetService";
import { promises as fs } from "fs";
import * as path from "path";

export const responseSetController = {
  async createResponseSet(req: Request, res: Response): Promise<void> {
    try {
      const { responses } = req.body;
      const newResponseSet = await responseSetService.createResponseSet({
        responses,
      });
      res.status(201).json(newResponseSet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getResponseSet(req: Request, res: Response): Promise<void> {
    try {
      const responseSet = await responseSetService.getResponseSet();
      res.status(200).json(responseSet);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getResponseSetById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const responseSet = await responseSetService.getResponseSetById(id);

      if (responseSet) {
        res.status(200).json(responseSet);
      } else {
        res.status(404).json({ error: "Response set not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async updateResponseSetById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const { responses } = req.body;
      const updateResponseSet = await responseSetService.updateResponseSetById(
        id,
        { responses }
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

  async deleteResponseSetById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const updateResponseSet = await responseSetService.deleteeResponseSetById(
        id
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

  async postResponseImage(req: Request, res: Response): Promise<void> {
    try {
      const { image, nombre } = req.body;
      const buffer = Buffer.from(image, "base64");      
      const filePath = path.join(
        __dirname,
        "./../../../fis-chatbot-api-main/static/images",
        nombre
      );
      console.log(filePath, 'filepath...');
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      return await fs.writeFile(filePath, buffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
