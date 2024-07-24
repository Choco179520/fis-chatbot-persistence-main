import { Prisma, PrismaClient } from "@prisma/client";
import { ResponseSet } from "../models/responseSetModel";

const prisma = new PrismaClient();

export const responseSetService = {
  async createResponseSet(data: Omit<ResponseSet, "id">): Promise<ResponseSet> {
    return prisma.responseSet.create({
      data: {
        responses: data.responses as Prisma.InputJsonValue,
      },
    });
  },

  async getResponseSetById(id: number): Promise<ResponseSet | null> {
    return prisma.responseSet.findUnique({
      where: { id },
    });
  },

  async getResponseSet(): Promise<ResponseSet[]> {
    return prisma.responseSet.findMany();
  },

  async updateResponseSetById(
    id: number,
    data: Omit<ResponseSet, "id">
  ): Promise<ResponseSet | null> {
    return await prisma.responseSet.update({
      where: { id },
      data: {
        responses: data.responses as Prisma.InputJsonValue,
      },
    });
  },

  async deleteeResponseSetById(id: number): Promise<ResponseSet | null> {
    return await prisma.responseSet.delete({
      where: { id },
    });
  },
};
