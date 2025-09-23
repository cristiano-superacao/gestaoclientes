const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.client.deleteMany();
  console.log('🗑️ Cleared existing clients');

  // Sample clients data
  const clients = [
    {
      name: 'João Silva',
      contact: '+55 11 99999-1234',
      email: 'joao.silva@email.com',
      address: 'Rua das Flores, 123 - São Paulo, SP',
      dueDate: new Date('2024-01-15'),
      amount: 1500.00,
      status: 'PENDING'
    },
    {
      name: 'Maria Oliveira',
      contact: '+55 11 88888-5678',
      email: 'maria.oliveira@email.com',
      address: 'Av. Paulista, 456 - São Paulo, SP',
      dueDate: new Date('2023-12-20'),
      amount: 2300.50,
      status: 'OVERDUE'
    },
    {
      name: 'Carlos Santos',
      contact: '+55 11 77777-9012',
      email: 'carlos.santos@email.com',
      address: 'Rua Augusta, 789 - São Paulo, SP',
      dueDate: new Date('2023-11-30'),
      amount: 850.00,
      status: 'PAID'
    },
    {
      name: 'Ana Costa',
      contact: '+55 11 66666-3456',
      email: 'ana.costa@email.com',
      address: 'Rua Oscar Freire, 321 - São Paulo, SP',
      dueDate: new Date('2024-02-10'),
      amount: 1200.75,
      status: 'PENDING'
    },
    {
      name: 'Roberto Lima',
      contact: '+55 11 55555-7890',
      email: 'roberto.lima@email.com',
      address: 'Av. Faria Lima, 654 - São Paulo, SP',
      dueDate: new Date('2023-12-01'),
      amount: 3200.00,
      status: 'OVERDUE'
    },
    {
      name: 'Fernanda Rocha',
      contact: '+55 11 44444-2345',
      email: 'fernanda.rocha@email.com',
      address: 'Rua Consolação, 987 - São Paulo, SP',
      dueDate: new Date('2023-11-15'),
      amount: 750.25,
      status: 'PAID'
    }
  ];

  // Create sample clients
  for (const clientData of clients) {
    await prisma.client.create({
      data: clientData
    });
  }

  console.log(`✅ Created ${clients.length} sample clients`);
  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });