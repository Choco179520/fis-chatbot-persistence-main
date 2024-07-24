import { Prisma, PrismaClient } from "@prisma/client";
import { Document } from "../models/documentModel";

const prisma = new PrismaClient();

export const documentService = {
  async createDocument(data: Omit<Document, "id">): Promise<Document> {
    return prisma.document.create({
      data: {
        title: data.title,
        utterances: data.utterances as Prisma.InputJsonValue,
        response_set_id: data.response_set_id,
      },
    });
  },

  async getDocumentById(id: number): Promise<Document | null> {
    return prisma.document.findUnique({
      where: { id },
    });
  },

  async getAllDocuments(): Promise<Document[]> {
    return prisma.document.findMany();
  },

  async getDocumentsByTitle(title: string): Promise<Document[] | null> {
    return prisma.document.findMany({
      where: { title },
    });
  },

  async updateResponseSetById(
    id: number,
    data: Omit<Document, "id">
  ): Promise<Document | null> {
    return await prisma.document.update({
      where: { id },
      data: {
        utterances: data as Prisma.InputJsonValue,
      },
    });
  },

  async deleteResponseSetById(id: number): Promise<Document | null> {
    return await prisma.document.delete({
      where: { id },
    });
  },
};
