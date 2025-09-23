const express = require('express');
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getDashboardStats
} = require('../controllers/clientController');

const router = express.Router();

// Dashboard stats endpoint
router.get('/stats', getDashboardStats);

// CRUD endpoints
router.get('/', getAllClients);
router.get('/:id', getClientById);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

module.exports = router;