import express from 'express';
import data from '../data/data.json' assert { type: 'json' };

const router = express.Router();

router.get('/', (req, res) => {
    res.json(data);
});

export default router;
