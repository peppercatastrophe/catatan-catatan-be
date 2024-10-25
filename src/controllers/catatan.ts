import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import CatatanType from "../interfaces/CatatanType";
import CatatanModel from "../models/catatan";

function getUserIdFromToken(req: Request): number {
  const authToken = req.header("Authorization");
  const jwtToken = authToken?.split(" ")[1];
  if (!jwtToken) {
    return 0;
  }
  const jwtClaims = jwt.decode(jwtToken) as jwt.JwtPayload;
  const userId = jwtClaims.id as number;
  return userId;
}

export default class CatatanController {
  static async IndexHome(req: Request, res: Response) {
    const catatans = await CatatanModel.getAll();

    res.json(catatans);
  }

  static async IndexUser(req: Request, res: Response) {
    const userId = getUserIdFromToken(req);

    const catatans= await CatatanModel.getAllByUser(userId);
    return res.json(catatans);
  }

  static async GetById(req: Request, res: Response) {
    const catatanId = parseInt(req.params.id);
    const userId = getUserIdFromToken(req);

    const catatan = await CatatanModel.getById(catatanId);
    if (!catatan) {
      throw new Error("Not Found");
    }

    if (catatan.publik === false && userId !== catatan.userId) {
      throw new Error("Forbidden");
    }

    res.json(catatan);
  } 

  static async Search(req: Request, res: Response) {
    const keyword = req.query.keyword as string;

    const catatans = await CatatanModel.search(keyword);

    res.json(catatans);
  } 

  static async SearchByUser(req: Request, res: Response) {
    const userId = getUserIdFromToken(req);
    const keyword = req.query.keyword as string;

    const catatans = await CatatanModel.searchByUser(userId, keyword);

    res.json(catatans);
  }

  static async Create(req: Request, res: Response, next: NextFunction) {
    const userId = getUserIdFromToken(req);

    const { judul, isi, publik } = req.body;

    const newCatatan = await CatatanModel.create(userId, judul, isi, publik);

    res.status(201).json(newCatatan);
  }

  static async Update(req: Request, res: Response, next: NextFunction) {
    console.log("masuk update catatan");
    const catatanId = parseInt(req.params.id);
    const { judul, isi, publik } = req.body;
    const userId = getUserIdFromToken(req);

    const catatanUserId = await CatatanModel.getUserIdCatatan(catatanId);
    console.log("userId: ", userId, " catatanUserId: ", catatanUserId);
    if (userId!== catatanUserId) {
      throw new Error("Forbidden");
    }

    const updatedCatatan = await CatatanModel.update(catatanId, judul, isi, publik);

    res.json(updatedCatatan);
  }

  static async Delete(req: Request, res: Response, next: NextFunction) {
    const catatanId = parseInt(req.params.id);

    const userId = getUserIdFromToken(req);

    const catatanUserId = await CatatanModel.getUserIdCatatan(catatanId);
    if (userId!== catatanUserId) {
      throw new Error("Forbidden");
    }

    await CatatanModel.delete(catatanId);

    res.status(204).send();
  }
}