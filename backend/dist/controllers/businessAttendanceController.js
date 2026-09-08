"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthlyAttendanceReport = exports.manualAttendanceEntry = exports.employeeCheckOut = exports.employeeCheckIn = exports.getTodayAttendanceSummary = exports.getAttendanceList = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getAttendanceList = async (req, res) => {
    try {
        const employeeId = req.query.employeeId || '';
        const department = req.query.department || '';
        const status = req.query.status || '';
        const dateStr = req.query.date || '';
        const monthStr = req.query.month || ''; // e.g. "2026-08"
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.max(1, Math.min(100, Number(req.query.limit) || 25));
        const skip = (page - 1) * limit;
        const where = {};
        if (employeeId && employeeId !== 'ALL') {
            where.employeeId = employeeId;
        }
        if (status && status !== 'ALL') {
            where.status = status;
        }
        if (department && department !== 'ALL') {
            where.employee = { department };
        }
        if (dateStr) {
            const targetDate = new Date(dateStr);
            const startOfDay = new Date(targetDate.setUTCHours(0, 0, 0, 0));
            const endOfDay = new Date(targetDate.setUTCHours(23, 59, 59, 999));
            where.date = { gte: startOfDay, lte: endOfDay };
        }
        else if (monthStr) {
            const [year, month] = monthStr.split('-').map(Number);
            const startOfMonth = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
            const endOfMonth = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));
            where.date = { gte: startOfMonth, lte: endOfMonth };
        }
        const [total, records] = await Promise.all([
            prisma_1.default.attendance.count({ where }),
            prisma_1.default.attendance.findMany({
                where,
                skip,
                take: limit,
                orderBy: { date: 'desc' },
                include: {
                    employee: {
                        select: {
                            id: true,
                            employeeCode: true,
                            fullName: true,
                            email: true,
                            department: true,
                            designation: true,
                        },
                    },
                },
            }),
        ]);
        return res.json({
            records,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    }
    catch (error) {
        console.error('getAttendanceList error:', error);
        return res.status(500).json({ message: 'Error fetching attendance', error: error.message });
    }
};
exports.getAttendanceList = getAttendanceList;
const getTodayAttendanceSummary = async (req, res) => {
    try {
        const today = new Date();
        const startOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0));
        const endOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));
        const totalActiveEmployees = await prisma_1.default.employee.count({
            where: { status: 'ACTIVE' },
        });
        const todayAttendances = await prisma_1.default.attendance.findMany({
            where: { date: { gte: startOfDay, lte: endOfDay } },
            include: {
                employee: {
                    select: {
                        id: true,
                        employeeCode: true,
                        fullName: true,
                        department: true,
                        designation: true,
                    },
                },
            },
        });
        let present = 0;
        let absent = 0;
        let late = 0;
        let leave = 0;
        let halfDay = 0;
        todayAttendances.forEach((a) => {
            if (a.status === 'PRESENT')
                present++;
            else if (a.status === 'ABSENT')
                absent++;
            else if (a.status === 'LEAVE')
                leave++;
            else if (a.status === 'HALF_DAY')
                halfDay++;
            if (a.lateStatus)
                late++;
        });
        // Unrecorded active employees are implicitly not checked in yet
        const recordedEmployeeIds = new Set(todayAttendances.map((a) => a.employeeId));
        const unrecordedCount = Math.max(0, totalActiveEmployees - recordedEmployeeIds.size);
        return res.json({
            totalEmployees: totalActiveEmployees,
            present,
            absent: absent + unrecordedCount,
            late,
            leave,
            halfDay,
            todayRecords: todayAttendances,
        });
    }
    catch (error) {
        console.error('getTodayAttendanceSummary error:', error);
        return res.status(500).json({ message: 'Error fetching today attendance summary', error: error.message });
    }
};
exports.getTodayAttendanceSummary = getTodayAttendanceSummary;
const employeeCheckIn = async (req, res) => {
    try {
        let employeeId = req.body.employeeId;
        // If no employeeId provided, find by authenticated user
        if (!employeeId && req.user) {
            const emp = await prisma_1.default.employee.findFirst({
                where: { OR: [{ userId: req.user.id }, { email: req.user.email }] },
            });
            if (emp)
                employeeId = emp.id;
        }
        if (!employeeId) {
            return res.status(400).json({ message: 'Employee ID required for check-in.' });
        }
        const now = new Date();
        const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
        // Check if check-in is after 9:30 AM local time for late status
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const lateStatus = hours > 9 || (hours === 9 && minutes > 30);
        const record = await prisma_1.default.attendance.upsert({
            where: {
                employeeId_date: {
                    employeeId,
                    date: startOfDay,
                },
            },
            create: {
                employeeId,
                date: startOfDay,
                checkInTime: now,
                status: 'PRESENT',
                lateStatus,
                notes: req.body.notes || 'Self Check-in',
            },
            update: {
                checkInTime: now,
                status: 'PRESENT',
                lateStatus,
                notes: req.body.notes || undefined,
            },
        });
        return res.json({ message: 'Checked in successfully', record });
    }
    catch (error) {
        console.error('employeeCheckIn error:', error);
        return res.status(500).json({ message: 'Check-in failed', error: error.message });
    }
};
exports.employeeCheckIn = employeeCheckIn;
const employeeCheckOut = async (req, res) => {
    try {
        let employeeId = req.body.employeeId;
        if (!employeeId && req.user) {
            const emp = await prisma_1.default.employee.findFirst({
                where: { OR: [{ userId: req.user.id }, { email: req.user.email }] },
            });
            if (emp)
                employeeId = emp.id;
        }
        if (!employeeId) {
            return res.status(400).json({ message: 'Employee ID required for check-out.' });
        }
        const now = new Date();
        const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
        const existing = await prisma_1.default.attendance.findUnique({
            where: {
                employeeId_date: {
                    employeeId,
                    date: startOfDay,
                },
            },
        });
        if (!existing || !existing.checkInTime) {
            return res.status(400).json({ message: 'No check-in record found for today. Please check in first.' });
        }
        const diffMs = now.getTime() - new Date(existing.checkInTime).getTime();
        const workingHours = Math.max(0, Number((diffMs / (1000 * 60 * 60)).toFixed(2)));
        const updated = await prisma_1.default.attendance.update({
            where: { id: existing.id },
            data: {
                checkOutTime: now,
                workingHours,
                notes: req.body.notes ? `${existing.notes || ''} | ${req.body.notes}` : existing.notes,
            },
        });
        return res.json({ message: 'Checked out successfully', record: updated });
    }
    catch (error) {
        console.error('employeeCheckOut error:', error);
        return res.status(500).json({ message: 'Check-out failed', error: error.message });
    }
};
exports.employeeCheckOut = employeeCheckOut;
const manualAttendanceEntry = async (req, res) => {
    try {
        const { employeeId, date, checkInTime, checkOutTime, workingHours, status = 'PRESENT', lateStatus = false, notes, } = req.body;
        if (!employeeId || !date) {
            return res.status(400).json({ message: 'Employee ID and Date are required.' });
        }
        const targetDate = new Date(date);
        const startOfDay = new Date(Date.UTC(targetDate.getUTCFullYear(), targetDate.getUTCMonth(), targetDate.getUTCDate(), 0, 0, 0));
        const checkIn = checkInTime ? new Date(checkInTime) : null;
        const checkOut = checkOutTime ? new Date(checkOutTime) : null;
        let computedHours = workingHours !== undefined ? Number(workingHours) : 0;
        if (checkIn && checkOut && !workingHours) {
            const diffMs = checkOut.getTime() - checkIn.getTime();
            computedHours = Math.max(0, Number((diffMs / (1000 * 60 * 60)).toFixed(2)));
        }
        const record = await prisma_1.default.attendance.upsert({
            where: {
                employeeId_date: {
                    employeeId,
                    date: startOfDay,
                },
            },
            create: {
                employeeId,
                date: startOfDay,
                checkInTime: checkIn,
                checkOutTime: checkOut,
                workingHours: computedHours,
                status,
                lateStatus: Boolean(lateStatus),
                isManualEntry: true,
                modifiedByUserId: req.user?.id || 'Admin',
                notes: notes ? notes.trim() : null,
            },
            update: {
                checkInTime: checkIn,
                checkOutTime: checkOut,
                workingHours: computedHours,
                status,
                lateStatus: Boolean(lateStatus),
                isManualEntry: true,
                modifiedByUserId: req.user?.id || 'Admin',
                notes: notes ? notes.trim() : null,
            },
        });
        await prisma_1.default.activityLog.create({
            data: {
                userId: req.user?.id || 'SYSTEM',
                action: 'MANUAL_ATTENDANCE_CORRECTION',
                object: 'Attendance System',
                newValue: `Manual entry for employee ${employeeId} on ${date}: status=${status}, hours=${computedHours}`,
            },
        });
        return res.json({ message: 'Attendance record saved', record });
    }
    catch (error) {
        console.error('manualAttendanceEntry error:', error);
        return res.status(500).json({ message: 'Failed to record attendance', error: error.message });
    }
};
exports.manualAttendanceEntry = manualAttendanceEntry;
const getMonthlyAttendanceReport = async (req, res) => {
    try {
        const monthStr = req.query.month || new Date().toISOString().slice(0, 7); // e.g. "2026-08"
        const [year, month] = monthStr.split('-').map(Number);
        const startOfMonth = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0));
        const endOfMonth = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999));
        const daysInMonth = new Date(year, month, 0).getDate();
        const employees = await prisma_1.default.employee.findMany({
            where: { status: 'ACTIVE' },
            select: {
                id: true,
                employeeCode: true,
                fullName: true,
                department: true,
                designation: true,
            },
            orderBy: { fullName: 'asc' },
        });
        const attendances = await prisma_1.default.attendance.findMany({
            where: {
                date: { gte: startOfMonth, lte: endOfMonth },
            },
        });
        const attendanceMap = {};
        employees.forEach((emp) => {
            attendanceMap[emp.id] = {};
        });
        attendances.forEach((att) => {
            const day = new Date(att.date).getUTCDate();
            if (!attendanceMap[att.employeeId]) {
                attendanceMap[att.employeeId] = {};
            }
            attendanceMap[att.employeeId][day] = att;
        });
        const reportData = employees.map((emp) => {
            const days = attendanceMap[emp.id] || {};
            let presentCount = 0;
            let absentCount = 0;
            let leaveCount = 0;
            let halfDayCount = 0;
            let lateCount = 0;
            let totalHours = 0;
            for (let d = 1; d <= daysInMonth; d++) {
                const record = days[d];
                if (record) {
                    if (record.status === 'PRESENT')
                        presentCount++;
                    else if (record.status === 'ABSENT')
                        absentCount++;
                    else if (record.status === 'LEAVE')
                        leaveCount++;
                    else if (record.status === 'HALF_DAY')
                        halfDayCount++;
                    if (record.lateStatus)
                        lateCount++;
                    totalHours += record.workingHours || 0;
                }
            }
            return {
                employee: emp,
                days,
                summary: {
                    present: presentCount,
                    absent: absentCount,
                    leave: leaveCount,
                    halfDay: halfDayCount,
                    late: lateCount,
                    totalHours: Number(totalHours.toFixed(1)),
                    avgDailyHours: presentCount > 0 ? Number((totalHours / presentCount).toFixed(1)) : 0,
                },
            };
        });
        return res.json({
            month: monthStr,
            daysInMonth,
            report: reportData,
        });
    }
    catch (error) {
        console.error('getMonthlyAttendanceReport error:', error);
        return res.status(500).json({ message: 'Error generating monthly report', error: error.message });
    }
};
exports.getMonthlyAttendanceReport = getMonthlyAttendanceReport;
