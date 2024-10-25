import { PrismaClient } from "@prisma/client";
import CatatanType from "../interfaces/CatatanType";

const prismaClient = new PrismaClient();

export default class Catatan {
  static async getAll(): Promise<Catatan[]> {
    try {
      const catatans = await prismaClient.catatan.findMany({ where: { publik: true } });
      if (!catatans) {
        throw new Error("No catatans found");
      }
      return catatans;
    } catch (error) {
      throw error;
    }
  }

  static async getAllByUser(userId: number): Promise<Catatan[]> {
    try {
      const catatans = await prismaClient.catatan.findMany({ where: { userId } });
      if (!catatans) {
        throw new Error("No catatans found");
      }
      return catatans;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id: number): Promise<CatatanType | null> {
    try {
      const catatan = await prismaClient.catatan.findUnique({ where: { id } });
      if (!catatan) {
        throw new Error("Catatan not found");
      }
      return catatan;
    } catch (error) {
      throw error;
    }
  }

  static async search(keyword: string): Promise<Catatan[]> {
    try {
      const catatans = await prismaClient.catatan.findMany({
        where: {
          OR: [
            { judul: { contains: keyword } },
            { isi: { contains: keyword } },
          ],
          publik: true,
        },
      });
      if (!catatans) {
        throw new Error("No catatans found");
      }
      return catatans;
    } catch (error) {
      throw error;
    }
  } 

  static async searchByUser(userId: number, keyword: string): Promise<Catatan[]> {
    try {
      const catatans = await prismaClient.catatan.findMany({
        where: {
          AND: [
            { userId },
            { OR: [{ judul: { contains: keyword } }, { isi: { contains: keyword } }] },
          ],
        },
      });
      if (!catatans) {
        throw new Error("No catatans found");
      }
      return catatans;
    } catch (error) {
      throw error;
    }
  }


  static async create(userId: number, judul: string, isi: string, publik: boolean): Promise<CatatanType> {
    try {
      const catatan = await prismaClient.catatan.create({
        data: { userId, judul, isi, publik },
      });
      return catatan;
    } catch (error) {
      throw error;
    }
  }

  static async update(id: number, judul: string, isi: string, publik: boolean): Promise<CatatanType> {
    try {
      const catatan = await prismaClient.catatan.update({
        where: { id },
        data: { judul, isi, publik },
      });
      if (!catatan) {
        throw new Error("Catatan not found");
      }
      return catatan;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      await prismaClient.catatan.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  static async getUserIdCatatan(id: number): Promise<number> {
    try {
      const catatan = await prismaClient.catatan.findUnique({ where: { id } });
      return catatan?.id as number;
    } catch (error) {
      throw error;
    }
  }
}