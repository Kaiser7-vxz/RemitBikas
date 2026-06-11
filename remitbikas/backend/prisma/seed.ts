import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@remitbikas.com' },
    update: {},
    create: {
      email: 'admin@remitbikas.com',
      password: await bcrypt.hash('admin123', 10),
      name: 'Admin User',
      role: 'ADMIN',
      verified: true,
      active: true,
    },
  });
  console.log('✓ Created admin user:', admin.id);

  // Create sample citizen users
  const citizen1 = await prisma.user.upsert({
    where: { email: 'citizen@example.com' },
    update: {},
    create: {
      email: 'citizen@example.com',
      password: await bcrypt.hash('citizen123', 10),
      name: 'Ram Kumar',
      role: 'CITIZEN',
      verified: true,
      active: true,
    },
  });

  const citizen2 = await prisma.user.upsert({
    where: { email: 'investor@example.com' },
    update: {},
    create: {
      email: 'investor@example.com',
      password: await bcrypt.hash('investor123', 10),
      name: 'Sita Sharma',
      role: 'CITIZEN',
      verified: true,
      active: true,
    },
  });
  console.log('✓ Created citizen users');

  // Create contractor
  const contractor = await prisma.user.upsert({
    where: { email: 'contractor@example.com' },
    update: {},
    create: {
      email: 'contractor@example.com',
      password: await bcrypt.hash('contractor123', 10),
      name: 'Build Corp',
      role: 'CONTRACTOR',
      verified: true,
      active: true,
    },
  });
  console.log('✓ Created contractor user');

  // Create sample projects
  const project1 = await prisma.project.upsert({
    where: { id: 'proj_sundarijal_flyover' },
    update: {},
    create: {
      id: 'proj_sundarijal_flyover',
      title: 'Sundarijal Flyover',
      description: 'Modern bridge connecting Ward 4 & 5, expected to reduce traffic by 40%.',
      type: 'INFRASTRUCTURE',
      status: 'ONGOING',
      totalBudget: 12200000,
      spentBudget: 8300000,
      location: 'Sundarijal, Kathmandu',
      latitude: 27.7172,
      longitude: 85.3240,
      startDate: new Date('2024-06-01'),
      expectedEndDate: new Date('2025-11-30'),
      completionPercentage: 75,
      fundingCollected: 8300000,
      fundingTarget: 12200000,
      contractor: 'ABC Construction Ltd',
      contractorContact: '+977-1-4500000',
    },
  });
  console.log('✓ Created project 1: Sundarijal Flyover');

  const project2 = await prisma.project.upsert({
    where: { id: 'proj_janak_school' },
    update: {},
    create: {
      id: 'proj_janak_school',
      title: 'Janak Secondary School',
      description: 'Reconstruction of 15 classrooms & smart classroom facility.',
      type: 'EDUCATION',
      status: 'ONGOING',
      totalBudget: 8500000,
      spentBudget: 2975000,
      location: 'Janak Ward 2, Kathmandu',
      latitude: 27.7100,
      longitude: 85.3150,
      startDate: new Date('2024-09-01'),
      expectedEndDate: new Date('2026-03-31'),
      completionPercentage: 40,
      fundingCollected: 2975000,
      fundingTarget: 8500000,
      contractor: 'Build Futures Nepal',
      contractorContact: '+977-1-4501234',
    },
  });
  console.log('✓ Created project 2: Janak Secondary School');

  const project3 = await prisma.project.upsert({
    where: { id: 'proj_water_scheme' },
    update: {},
    create: {
      id: 'proj_water_scheme',
      title: 'Drinking Water Scheme',
      description: 'Piped water supply for 2,500 households, under remittance co-fund.',
      type: 'UTILITIES',
      status: 'ONGOING',
      totalBudget: 22300000,
      spentBudget: 11596000,
      location: 'Multiple Wards, Kathmandu',
      latitude: 27.7050,
      longitude: 85.3200,
      startDate: new Date('2024-07-15'),
      expectedEndDate: new Date('2025-12-31'),
      completionPercentage: 60,
      fundingCollected: 11596000,
      fundingTarget: 22300000,
      contractor: 'Water Solutions Ltd',
      contractorContact: '+977-1-4502000',
    },
  });
  console.log('✓ Created project 3: Drinking Water Scheme');

  // Create milestones for project 1
  await prisma.milestone.create({
    data: {
      projectId: project1.id,
      title: 'Foundation Work',
      description: 'Excavation and foundation laying',
      targetDate: new Date('2024-09-15'),
      status: 'COMPLETED',
      completionPercentage: 100,
    },
  });

  await prisma.milestone.create({
    data: {
      projectId: project1.id,
      title: 'Steel Structure',
      description: 'Main bridge structure assembly',
      targetDate: new Date('2025-02-28'),
      status: 'IN_PROGRESS',
      completionPercentage: 75,
    },
  });

  await prisma.milestone.create({
    data: {
      projectId: project1.id,
      title: 'Finishing & Testing',
      description: 'Final touches and testing',
      targetDate: new Date('2025-11-30'),
      status: 'PENDING',
      completionPercentage: 0,
    },
  });
  console.log('✓ Created milestones for projects');

  // Create sample contributions
  await prisma.contribution.create({
    data: {
      projectId: project1.id,
      userId: citizen1.id,
      amount: 50000,
      paymentMethod: 'BANK_TRANSFER',
      status: 'COMPLETED',
      transactionId: 'TXN-001',
    },
  });

  await prisma.contribution.create({
    data: {
      projectId: project2.id,
      userId: citizen2.id,
      amount: 100000,
      paymentMethod: 'MOBILE_WALLET',
      status: 'COMPLETED',
      transactionId: 'TXN-002',
    },
  });
  console.log('✓ Created sample contributions');

  // Create sample expenses
  await prisma.expense.create({
    data: {
      projectId: project1.id,
      description: 'Steel materials purchase',
      amount: 2500000,
      category: 'MATERIALS',
      date: new Date('2024-11-15'),
    },
  });

  await prisma.expense.create({
    data: {
      projectId: project1.id,
      description: 'Labor cost - November',
      amount: 1200000,
      category: 'LABOR',
      date: new Date('2024-11-30'),
    },
  });
  console.log('✓ Created sample expenses');

  // Create delay analysis
  await prisma.delayAnalysis.create({
    data: {
      projectId: project1.id,
      originalEndDate: new Date('2025-10-15'),
      currentEndDate: new Date('2025-11-30'),
      delayDays: 46,
      delayPercentage: 4.2,
      reasons: ['Weather delays', 'Material shortage', 'Labor unavailability'],
      analysis: 'Minor delays due to monsoon season and supply chain issues',
      riskLevel: 'LOW',
      recommendations: ['Increase labor force', 'Stock up on materials', 'Monitor weather'],
    },
  });
  console.log('✓ Created delay analysis');

  // Create reputation scores
  await prisma.reputationScore.create({
    data: {
      projectId: project1.id,
      score: 92.5,
      transparency: 95,
      timeliness: 90,
      budgetAccuracy: 92,
      publicTrust: 88,
    },
  });
  console.log('✓ Created reputation scores');

  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });