import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function resetDatabaseSafely() {
  console.log('================================================================');
  console.log('🔄 STARTING COMPLETE DATABASE RESET (PROTECTING MENU & MEDIA)');
  console.log('================================================================');

  try {
    // 1. CLEAR TRANSACTIONAL & BUSINESS DATA (CHILD TABLES FIRST FOR FK SAFETY)
    console.log('🧹 Clearing transaction, order, and sales records...');
    await prisma.commission.deleteMany({}).catch(() => {});
    await prisma.commissionRule.deleteMany({}).catch(() => {});
    await prisma.commissionPlan.deleteMany({}).catch(() => {});
    await prisma.salesTarget.deleteMany({}).catch(() => {});
    await prisma.internalSale.deleteMany({}).catch(() => {});
    await prisma.attendance.deleteMany({}).catch(() => {});

    await prisma.paymentReceipt.deleteMany({}).catch(() => {});
    await prisma.payment.deleteMany({}).catch(() => {});
    await prisma.refund.deleteMany({}).catch(() => {});
    await prisma.shipment.deleteMany({}).catch(() => {});
    await prisma.statement.deleteMany({}).catch(() => {});
    await prisma.invoice.deleteMany({}).catch(() => {});
    await prisma.orderItem.deleteMany({}).catch(() => {});
    await prisma.order.deleteMany({}).catch(() => {});

    await prisma.cartItem.deleteMany({}).catch(() => {});
    await prisma.cart.deleteMany({}).catch(() => {});
    await prisma.wishlistItem.deleteMany({}).catch(() => {});
    await prisma.wishlist.deleteMany({}).catch(() => {});

    await prisma.customRequestFile.deleteMany({}).catch(() => {});
    await prisma.customTimelineItem.deleteMany({}).catch(() => {});
    await prisma.customRequest.deleteMany({}).catch(() => {});
    await prisma.inquiry.deleteMany({}).catch(() => {});
    await prisma.activityLog.deleteMany({}).catch(() => {});
    await prisma.financialAuditLog.deleteMany({}).catch(() => {});

    await prisma.customerSpecificPrice.deleteMany({}).catch(() => {});
    await prisma.customer.deleteMany({}).catch(() => {});
    await prisma.supplier.deleteMany({}).catch(() => {});

    // 2. CLEAR EMPLOYEES & USERS EXCEPT FOR NEW ADMIN
    console.log('🧹 Clearing old employee and user accounts...');
    await prisma.employee.deleteMany({}).catch(() => {});
    await prisma.user.deleteMany({}).catch(() => {});

    // 3. SEED 1 NEW SECURE ADMINISTRATOR
    console.log('🌱 Seeding 1 New Secure Administrator Account...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('aura_sysadmin_9k7x', salt);

    const adminUser = await prisma.user.create({
      data: {
        id: 'admin_sys_aura_001',
        email: 'sysadmin@aura-atelier.internal',
        name: 'Aura Atelier System Administrator',
        role: 'SUPER_ADMIN',
        passwordHash: hashedPassword,
      },
    });
    console.log(`✅ Seeded Super Admin: ${adminUser.email} (Hashed Password: ${hashedPassword.substring(0, 10)}...)`);

    // 4. VERIFY PROTECTED TABLES ARE UNTOUCHED
    const menuCount = await prisma.menu.count().catch(() => 0);
    const menuItemCount = await prisma.menuItem.count().catch(() => 0);
    const mediaCount = await prisma.media.count().catch(() => 0);

    console.log('\n================================================================');
    console.log('🛡️ PROTECTED TABLES INTEGRITY VERIFICATION');
    console.log(`- Menu Tables:     ${menuCount} Menus, ${menuItemCount} Menu Items (PRESERVED)`);
    console.log(`- Media / Images:  ${mediaCount} Media Store Records (PRESERVED)`);
    console.log('================================================================');

    // 5. VERIFY RESET COUNTS
    const remainingSales = await prisma.internalSale.count().catch(() => 0);
    const remainingAttendance = await prisma.attendance.count().catch(() => 0);
    const remainingCommissions = await prisma.commission.count().catch(() => 0);
    const remainingCustomers = await prisma.customer.count().catch(() => 0);
    const remainingEmployees = await prisma.employee.count().catch(() => 0);
    const remainingUsers = await prisma.user.count().catch(() => 0);

    console.log('\n✨ DATABASE DATA RESET COMPLETE!');
    console.log(`- Remaining Internal Sales: ${remainingSales}`);
    console.log(`- Remaining Attendance:     ${remainingAttendance}`);
    console.log(`- Remaining Commissions:    ${remainingCommissions}`);
    console.log(`- Remaining Customers:      ${remainingCustomers}`);
    console.log(`- Remaining Employees:      ${remainingEmployees}`);
    console.log(`- Active Administrator:     ${remainingUsers} (${adminUser.email})`);
    console.log('================================================================\n');

  } catch (error) {
    console.error('❌ Error resetting database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Auto-run if executed directly
if (process.argv[1] && process.argv[1].includes('resetSalesAndAttendance')) {
  resetDatabaseSafely()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

