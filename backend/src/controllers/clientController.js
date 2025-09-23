const prisma = require('../config/database');

// Get all clients
const getAllClients = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 50 } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const where = {};
    
    // Filter by status
    if (status && ['PENDING', 'PAID', 'OVERDUE'].includes(status)) {
      where.status = status;
    }
    
    // Search functionality
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { contact: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: [
          { status: 'asc' },
          { dueDate: 'asc' },
          { createdAt: 'desc' }
        ]
      }),
      prisma.client.count({ where })
    ]);
    
    res.json({
      clients,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clients', details: error.message });
  }
};

// Get client by ID
const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const client = await prisma.client.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch client', details: error.message });
  }
};

// Create new client
const createClient = async (req, res) => {
  try {
    const { name, contact, dueDate, amount, email, address } = req.body;
    
    // Validation
    if (!name || !contact || !dueDate || !amount) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'contact', 'dueDate', 'amount']
      });
    }
    
    // Check if amount is valid
    if (isNaN(amount) || amount < 0) {
      return res.status(400).json({ error: 'Amount must be a positive number' });
    }
    
    // Parse and validate date
    const parsedDueDate = new Date(dueDate);
    if (isNaN(parsedDueDate.getTime())) {
      return res.status(400).json({ error: 'Invalid due date format' });
    }
    
    // Determine status based on due date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    parsedDueDate.setHours(0, 0, 0, 0);
    
    let status = 'PENDING';
    if (parsedDueDate < today) {
      status = 'OVERDUE';
    }
    
    const client = await prisma.client.create({
      data: {
        name: name.trim(),
        contact: contact.trim(),
        dueDate: parsedDueDate,
        amount: parseFloat(amount),
        email: email?.trim() || null,
        address: address?.trim() || null,
        status
      }
    });
    
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create client', details: error.message });
  }
};

// Update client
const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contact, dueDate, amount, email, address, status } = req.body;
    
    // Check if client exists
    const existingClient = await prisma.client.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!existingClient) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    const updateData = {};
    
    if (name !== undefined) updateData.name = name.trim();
    if (contact !== undefined) updateData.contact = contact.trim();
    if (email !== undefined) updateData.email = email?.trim() || null;
    if (address !== undefined) updateData.address = address?.trim() || null;
    
    if (amount !== undefined) {
      if (isNaN(amount) || amount < 0) {
        return res.status(400).json({ error: 'Amount must be a positive number' });
      }
      updateData.amount = parseFloat(amount);
    }
    
    if (dueDate !== undefined) {
      const parsedDueDate = new Date(dueDate);
      if (isNaN(parsedDueDate.getTime())) {
        return res.status(400).json({ error: 'Invalid due date format' });
      }
      updateData.dueDate = parsedDueDate;
    }
    
    if (status !== undefined) {
      if (!['PENDING', 'PAID', 'OVERDUE'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status. Must be PENDING, PAID, or OVERDUE' });
      }
      updateData.status = status;
    }
    
    const client = await prisma.client.update({
      where: { id: parseInt(id) },
      data: updateData
    });
    
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update client', details: error.message });
  }
};

// Delete client
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.client.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.status(500).json({ error: 'Failed to delete client', details: error.message });
  }
};

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalClients,
      paidClients,
      pendingClients,
      overdueClients,
      totalAmount,
      paidAmount,
      pendingAmount,
      overdueAmount
    ] = await Promise.all([
      prisma.client.count(),
      prisma.client.count({ where: { status: 'PAID' } }),
      prisma.client.count({ where: { status: 'PENDING' } }),
      prisma.client.count({ where: { status: 'OVERDUE' } }),
      prisma.client.aggregate({ _sum: { amount: true } }),
      prisma.client.aggregate({ _sum: { amount: true }, where: { status: 'PAID' } }),
      prisma.client.aggregate({ _sum: { amount: true }, where: { status: 'PENDING' } }),
      prisma.client.aggregate({ _sum: { amount: true }, where: { status: 'OVERDUE' } })
    ]);
    
    res.json({
      clients: {
        total: totalClients,
        paid: paidClients,
        pending: pendingClients,
        overdue: overdueClients
      },
      amounts: {
        total: totalAmount._sum.amount || 0,
        paid: paidAmount._sum.amount || 0,
        pending: pendingAmount._sum.amount || 0,
        overdue: overdueAmount._sum.amount || 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats', details: error.message });
  }
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getDashboardStats
};