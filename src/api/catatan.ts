import express from 'express';

const router = express.Router();
type Request = express.Request;

type Catatan = {
    id: number;
    judul: string;
    isi: string;
}

// Index route 
router.get<{}, Catatan[]>('/', (req, res, next) => {
    // Mock data
    const catatan: Catatan[] = [
        {id: 1, judul: 'Judul Catatan 1', isi: 'Isi Catatan 1'},
        {id: 2, judul: 'Judul Catatan 2', isi: 'Isi Catatan 2'},
    ];

    res.json(catatan);
});

// Search route
router.get<{}, Catatan[]>('/search', (req: Request, res, next) => {
    const keyword = req.query.keyword as string;

    // Mock data
    const catatan: Catatan[] = [
        {id: 1, judul: 'Judul Catatan 1', isi: 'Isi Catatan 1'},
        {id: 2, judul: 'Judul Catatan 2', isi: 'Isi Catatan 2'},
    ];

    const foundCatatan = catatan.filter((c) => c.judul.toLowerCase().includes(keyword.toLowerCase()));

    res.json(foundCatatan);
});

// GetByID route
router.get<{}, Catatan>('/:id', (req: Request, res, next) => {
    const catatanId = parseInt(req.params.id);

    // Mock data
    const catatan: Catatan[] = [
        {id: 1, judul: 'Judul Catatan 1', isi: 'Isi Catatan 1'},
        {id: 2, judul: 'Judul Catatan 2', isi: 'Isi Catatan 2'},
    ];

    const foundCatatan = catatan.find((c) => c.id === catatanId);

    if (!foundCatatan) {
        throw new Error("404");
        
    }

    res.json(foundCatatan);
});

// Create route
router.post<{}, Catatan>('/', (req: Request, res, next) => {
    const { judul, isi } = req.body;

    const newCatatan: Catatan = {
        id: Math.floor(Math.random() * 1000) + 1,
        judul,
        isi,
    };

    res.status(201).json(newCatatan);
}); 

// Update route
router.put<{}, Catatan>('/:id', (req: Request, res, next) => {
    const catatanId = parseInt(req.params.id);
    const { judul, isi } = req.body;

    // Mock data
    const catatan: Catatan[] = [
        {id: 1, judul: 'Judul Catatan 1', isi: 'Isi Catatan 1'},
        {id: 2, judul: 'Judul Catatan 2', isi: 'Isi Catatan 2'},
    ];

    const foundCatatanIndex = catatan.findIndex((c) => c.id === catatanId);

    if (foundCatatanIndex === -1) {
        throw new Error("404");
    }

    catatan[foundCatatanIndex] = {
        id: catatanId,
        judul,
        isi,
    }

    res.json(catatan[foundCatatanIndex]);
});


// Delete route
router.delete<{}, Catatan>('/:id', (req: Request, res, next) => {
    const catatanId = parseInt(req.params.id);

    // Mock data
    const catatan: Catatan[] = [
        {id: 1, judul: 'Judul Catatan 1', isi: 'Isi Catatan 1'},
        {id: 2, judul: 'Judul Catatan 2', isi: 'Isi Catatan 2'},
    ];

    const foundCatatanIndex = catatan.findIndex((c) => c.id === catatanId);

    if (foundCatatanIndex === -1) {
        throw new Error("404");
    }

    catatan.splice(foundCatatanIndex, 1);

    res.status(204).send();
});





export default router;