import { Router } from 'express';
import auth from '../middleware/auth.js';
import admin from '../middleware/admin.js';
import validateObjectId from '../middleware/validateObjectId.js';
import {
  getAll,
  getOne,
  create,
} from '../controllers/rentals.js';

const router = Router();

router.get('/', [auth, admin], getAll);
router.post('/', auth, create);
router.get('/:id', [auth, validateObjectId], getOne);

export default router;
