const { PrismaClient } = require('@prisma/client');

// Database connection configuration with cloud provider optimizations
const prisma = new PrismaClient({
  // Connection pool optimization for cloud databases
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Logging configuration
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  // Error formatting
  errorFormat: 'pretty',
});

// Graceful shutdown handling
process.on('beforeExit', async () => {
  console.log('🔌 Disconnecting from database...');
  await prisma.$disconnect();
});

process.on('SIGINT', async () => {
  console.log('🔌 Disconnecting from database...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🔌 Disconnecting from database...');
  await prisma.$disconnect();
  process.exit(0);
});

module.exports = prisma;