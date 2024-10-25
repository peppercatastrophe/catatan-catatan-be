import express from 'express';
import jwt from "jsonwebtoken";
import CatatanController from '../controllers/catatan';

const router = express.Router();
type Request = express.Request;

type Catatan = {
  id: number;
  judul: string;
  isi: string;
}

// Index home route 
router.get<{}, Catatan[]>('/', CatatanController.IndexHome);

// Index user route
router.get<{}, Catatan[]>('/user', CatatanController.IndexUser)

// Search by current user
router.get<{}, Catatan[]>('/user/search', CatatanController.SearchByUser);

// Search route
router.get<{}, Catatan[]>('/search', CatatanController.Search);

// GetByID route
router.get<{}, Catatan>('/:id', CatatanController.GetById);

// Create route
router.post<{}, Catatan>('/', CatatanController.Create);

// Update route
router.put<{}, Catatan>('/:id', CatatanController.Update);

// Delete route
router.delete<{}, Catatan>('/:id', CatatanController.Delete);

export default router;
