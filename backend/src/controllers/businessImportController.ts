import { Response } from 'express';
import * as XLSX from 'xlsx';
import prisma from '../prisma';
import { AuthRequest } from '../middleware/auth';

export const validateSalesExcelImport = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded. Please upload a .xlsx, .xls, or .csv file.' });
    }

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer', cellDates: true });
    const sheetName = workbook.SheetNames.includes('Sales Tracking') ? 'Sales Tracking' : workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];

    if (rawRows.length < 2) {
      return res.status(400).json({ message: 'The uploaded sheet contains no data rows.' });
    }

    const headerRow = rawRows[0].map((h: any) => (h !== undefined && h !== null ? String(h).trim() : ''));

    // Find column index helper
    const getColIndex = (candidates: string[]) => {
      return headerRow.findIndex((h) => candidates.some((c) => c.toLowerCase() === h.toLowerCase()));
    };

    const idxInvoice = getColIndex(['Invoice No', 'Invoice', 'Invoice #']);
    const idxDate = getColIndex(['Sale Date', 'Date', 'Date of Sale']);
    const idxCustomer = getColIndex(['Customer Name', 'Customer', 'Client']);
    const idxCountry = getColIndex(['Customer Country', 'Country']);
    const idxProductType = getColIndex(['Product Type', 'Type']);
    const idxDescription = getColIndex(['Product Description', 'Description', 'Item Description']);
    const idxStoneType = getColIndex(['Stone Type', 'Stone']);
    const idxShape = getColIndex(['Shape']);
    const idxColor = getColIndex(['Diamond Color', 'Color']);
    const idxClarity = getColIndex(['Clarity']);
    const idxCut = getColIndex(['Cut']);
    const idxPolish = getColIndex(['Polish']);
    const idxSymmetry = getColIndex(['Symmetry']);
    const idxFluor = getColIndex(['Fluorescence']);
    const idxMeasurement = getColIndex(['Measurement', 'Measurements']);
    const idxPricePerCarat = getColIndex(['Price per Carat', 'Price/Ct', 'Price per Carat ']);
    const idxCarat = getColIndex(['Carat / Weight', 'Carat', 'Weight']);
    const idxQty = getColIndex(['Quantity', 'Qty']);
    const idxCert = getColIndex(['Certificate', 'Lab']);
    const idxCertNo = getColIndex(['Certificate No', 'Cert Number', 'Cert #']);
    const idxSupplier = getColIndex(['Supplier', 'Vendor', 'Supplier ']);
    const idxPurchase = getColIndex(['Purchase Price', 'Cost Price', 'Purchase Price ']);
    const idxSelling = getColIndex(['Selling Price', 'Sale Price', 'Selling Price ']);
    const idxDiscount = getColIndex(['Discount', 'Discount ']);
    const idxFinalSale = getColIndex(['Final Sale Amount', 'Final Sale Amount ']);
    const idxShipping = getColIndex(['Shipping Cost', 'Shipping', 'Shipping Cost ']);
    const idxGstPercent = getColIndex(['GST %', 'GST Rate', 'GST']);
    const idxGstAmount = getColIndex(['GST Amount']);
    const idxFinalPurchase = getColIndex(['Final Purchase Price']);
    const idxPaymentStatus = getColIndex(['Payment Status']);
    const idxPaymentMethod = getColIndex(['Payment Method']);
    const idxAmountReceived = getColIndex(['Amount Received', 'Amount Received ']);
    const idxPendingAmount = getColIndex(['Pending Amount']);
    const idxGrossProfit = getColIndex(['Gross Profit']);
    const idxNetProfit = getColIndex(['Net Profit']);
    const idxSalesPerson = getColIndex(['Sales Person', 'Salesperson', 'Employee']);
    const idxCommissionPercent = getColIndex(['Commission %', 'Commission Rate']);
    const idxCommissionAmount = getColIndex(['Commission Amount']);
    const idxProfitAfterComm = getColIndex(['Profit After Commission']);
    const idxMarkup = getColIndex(['Profit % (Markup)', 'Markup %']);
    const idxFinalProfit = getColIndex(['Final Profit %']);
    const idxOrderStatus = getColIndex(['Order Status']);
    const idxTrackingNo = getColIndex(['Tracking Number', 'Tracking #']);
    const idxTrackingLink = getColIndex(['Tracking Link']);
    const idxDollarRate = getColIndex(['Dollar Rate', 'FX Rate']);
    const idxSaleMonth = getColIndex(['Sale Month', 'Month']);

    // Fetch existing invoice numbers to check duplicates
    const existingInvoices = await prisma.internalSale.findMany({ select: { invoiceNo: true } });
    const existingSet = new Set(existingInvoices.map((s) => s.invoiceNo.trim().toUpperCase()));

    const previewRows: any[] = [];
    const duplicateRows: any[] = [];
    const invalidRows: any[] = [];
    let validCount = 0;

    for (let r = 1; r < rawRows.length; r++) {
      const row = rawRows[r];
      if (!row || row.length === 0) continue;

      const invoiceRaw = idxInvoice >= 0 && row[idxInvoice] !== undefined ? String(row[idxInvoice]).trim() : '';
      const customerRaw = idxCustomer >= 0 && row[idxCustomer] !== undefined ? String(row[idxCustomer]).trim() : '';
      const sellingRaw = idxSelling >= 0 ? Number(row[idxSelling]) || 0 : 0;

      // Skip empty ghost rows (common in Excel templates)
      if (!invoiceRaw && !customerRaw && sellingRaw === 0) {
        continue;
      }

      if (!invoiceRaw) {
        invalidRows.push({ rowIndex: r + 1, error: 'Missing Invoice No' });
        continue;
      }

      const isDuplicate = existingSet.has(invoiceRaw.toUpperCase());

      // Parse date safely
      let parsedDate = new Date();
      if (idxDate >= 0 && row[idxDate]) {
        const val = row[idxDate];
        if (val instanceof Date) {
          parsedDate = val;
        } else if (typeof val === 'number') {
          // Excel serial date
          parsedDate = new Date(Math.round((val - 25569) * 86400 * 1000));
        } else if (typeof val === 'string') {
          parsedDate = new Date(val);
        }
      }

      const parsedRow = {
        rowIndex: r + 1,
        invoiceNo: invoiceRaw,
        saleDate: parsedDate.toISOString().split('T')[0],
        customerName: customerRaw || 'Client',
        customerCountry: idxCountry >= 0 ? String(row[idxCountry] || '').trim() : '',
        productType: idxProductType >= 0 ? String(row[idxProductType] || 'Diamond').trim() : 'Diamond',
        productDescription: idxDescription >= 0 ? String(row[idxDescription] || '').trim() : '',
        stoneType: idxStoneType >= 0 ? String(row[idxStoneType] || '').trim() : '',
        shape: idxShape >= 0 ? String(row[idxShape] || '').trim() : '',
        diamondColor: idxColor >= 0 ? String(row[idxColor] || '').trim() : '',
        clarity: idxClarity >= 0 ? String(row[idxClarity] || '').trim() : '',
        cut: idxCut >= 0 ? String(row[idxCut] || '').trim() : '',
        polish: idxPolish >= 0 ? String(row[idxPolish] || '').trim() : '',
        symmetry: idxSymmetry >= 0 ? String(row[idxSymmetry] || '').trim() : '',
        fluorescence: idxFluor >= 0 ? String(row[idxFluor] || '').trim() : '',
        measurement: idxMeasurement >= 0 ? String(row[idxMeasurement] || '').trim() : '',
        pricePerCarat: idxPricePerCarat >= 0 ? Number(row[idxPricePerCarat]) || null : null,
        caratWeight: idxCarat >= 0 ? Number(row[idxCarat]) || null : null,
        quantity: idxQty >= 0 ? Number(row[idxQty]) || 1 : 1,
        certificate: idxCert >= 0 ? String(row[idxCert] || '').trim() : '',
        certificateNo: idxCertNo >= 0 ? String(row[idxCertNo] || '').trim() : '',
        supplierName: idxSupplier >= 0 ? String(row[idxSupplier] || '').trim() : '',
        purchasePrice: idxPurchase >= 0 ? Number(row[idxPurchase]) || 0 : 0,
        sellingPrice: sellingRaw,
        discount: idxDiscount >= 0 ? Number(row[idxDiscount]) || 0 : 0,
        finalSaleAmount: idxFinalSale >= 0 ? Number(row[idxFinalSale]) || sellingRaw : sellingRaw,
        shippingCost: idxShipping >= 0 ? Number(row[idxShipping]) || 0 : 0,
        gstPercent: idxGstPercent >= 0 ? Number(row[idxGstPercent]) || 0 : 0,
        gstAmount: idxGstAmount >= 0 ? Number(row[idxGstAmount]) || 0 : 0,
        finalPurchasePrice: idxFinalPurchase >= 0 ? Number(row[idxFinalPurchase]) || 0 : 0,
        paymentStatus: idxPaymentStatus >= 0 ? String(row[idxPaymentStatus] || 'Paid').trim() : 'Paid',
        paymentMethod: idxPaymentMethod >= 0 ? String(row[idxPaymentMethod] || 'Bank Wire').trim() : 'Bank Wire',
        amountReceived: idxAmountReceived >= 0 ? (typeof row[idxAmountReceived] === 'number' ? Number(row[idxAmountReceived]) : sellingRaw) : sellingRaw,
        pendingAmount: idxPendingAmount >= 0 ? Number(row[idxPendingAmount]) || 0 : 0,
        grossProfit: idxGrossProfit >= 0 ? Number(row[idxGrossProfit]) || 0 : 0,
        netProfit: idxNetProfit >= 0 ? Number(row[idxNetProfit]) || 0 : 0,
        salesPersonName: idxSalesPerson >= 0 ? String(row[idxSalesPerson] || '').trim() : '',
        commissionPercent: idxCommissionPercent >= 0 ? Number(row[idxCommissionPercent]) || 0 : 0,
        commissionAmount: idxCommissionAmount >= 0 ? Number(row[idxCommissionAmount]) || 0 : 0,
        profitAfterCommission: idxProfitAfterComm >= 0 ? Number(row[idxProfitAfterComm]) || 0 : 0,
        markupPercent: idxMarkup >= 0 ? Number(row[idxMarkup]) || 0 : 0,
        finalProfitPercent: idxFinalProfit >= 0 ? Number(row[idxFinalProfit]) || 0 : 0,
        orderStatus: idxOrderStatus >= 0 ? String(row[idxOrderStatus] || 'Delivered').trim() : 'Delivered',
        trackingNumber: idxTrackingNo >= 0 ? String(row[idxTrackingNo] || '').trim() : '',
        trackingLink: idxTrackingLink >= 0 ? String(row[idxTrackingLink] || '').trim() : '',
        dollarRate: idxDollarRate >= 0 ? Number(row[idxDollarRate]) || null : null,
        saleMonth: idxSaleMonth >= 0 ? String(row[idxSaleMonth] || '').trim() : '',
        isDuplicate,
      };

      if (isDuplicate) {
        duplicateRows.push(parsedRow);
      } else {
        validCount++;
      }

      previewRows.push(parsedRow);
    }

    return res.json({
      sheetName,
      totalRows: previewRows.length,
      validRows: validCount,
      duplicateRows: duplicateRows.length,
      invalidRows: invalidRows.length,
      preview: previewRows.slice(0, 20),
      allRows: previewRows,
    });
  } catch (error: any) {
    console.error('validateSalesExcelImport error:', error);
    return res.status(500).json({ message: 'Validation failed', error: error.message });
  }
};

export const executeSalesExcelImport = async (req: AuthRequest, res: Response) => {
  try {
    const { rows, skipDuplicates = true } = req.body;
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({ message: 'No rows provided for import.' });
    }

    // Cache existing records
    const existingInvoices = await prisma.internalSale.findMany({ select: { invoiceNo: true } });
    const existingSet = new Set(existingInvoices.map((s) => s.invoiceNo.trim().toUpperCase()));

    let importedCount = 0;
    let skippedCount = 0;
    const errors: any[] = [];

    // Cache employees & suppliers for fast lookup
    const allEmployees = await prisma.employee.findMany();
    const employeeMap = new Map<string, string>();
    allEmployees.forEach((e) => {
      employeeMap.set(e.fullName.toLowerCase().trim(), e.id);
    });

    const allSuppliers = await prisma.supplier.findMany();
    const supplierMap = new Map<string, string>();
    allSuppliers.forEach((s) => {
      supplierMap.set(s.name.toLowerCase().trim(), s.id);
    });

    for (const r of rows) {
      try {
        const inv = String(r.invoiceNo || '').trim();
        if (!inv) {
          skippedCount++;
          continue;
        }

        if (existingSet.has(inv.toUpperCase())) {
          if (skipDuplicates) {
            skippedCount++;
            continue;
          }
        }

        // 1. Resolve or create Employee
        let empId: string | null = null;
        const spName = String(r.salesPersonName || '').trim();
        if (spName) {
          const key = spName.toLowerCase();
          if (employeeMap.has(key)) {
            empId = employeeMap.get(key)!;
          } else {
            const code = `EMP-${String(allEmployees.length + employeeMap.size + 101).padStart(3, '0')}`;
            const email = `${spName.toLowerCase().replace(/[^a-z0-9]/g, '')}@internal.floksyjewel.com`;
            const newEmp = await prisma.employee.create({
              data: {
                employeeCode: code,
                fullName: spName,
                email,
                department: 'Sales',
                role: 'SALES_EMPLOYEE',
                status: 'ACTIVE',
              },
            });
            empId = newEmp.id;
            employeeMap.set(key, newEmp.id);
          }
        }

        // 2. Resolve or create Customer
        let custId: string | null = null;
        const custName = String(r.customerName || 'Client').trim();
        if (custName) {
          const cust = await prisma.customer.findFirst({
            where: { name: custName },
          });
          if (cust) {
            custId = cust.id;
          } else {
            const dummyEmail = `client_${Date.now()}_${Math.floor(Math.random() * 1000)}@internal-sales.floksyjewel.com`;
            const newCust = await prisma.customer.create({
              data: {
                name: custName,
                email: dummyEmail,
                country: r.customerCountry ? String(r.customerCountry).trim() : null,
                assignedEmployeeId: empId,
              },
            });
            custId = newCust.id;
          }
        }

        // 3. Resolve or create Supplier
        let suppId: string | null = null;
        const suppName = String(r.supplierName || '').trim();
        if (suppName && suppName.toUpperCase() !== 'NONE' && suppName.toUpperCase() !== 'NULL') {
          const key = suppName.toLowerCase();
          if (supplierMap.has(key)) {
            suppId = supplierMap.get(key)!;
          } else {
            const newSupp = await prisma.supplier.create({
              data: { name: suppName, status: 'ACTIVE' },
            });
            suppId = newSupp.id;
            supplierMap.set(key, newSupp.id);
          }
        }

        const saleDate = r.saleDate ? new Date(r.saleDate) : new Date();

        // 4. Create InternalSale with exact preservation of historical values
        const sale = await prisma.internalSale.create({
          data: {
            invoiceNo: inv,
            saleDate,
            customerId: custId,
            customerName: custName,
            customerCountry: r.customerCountry ? String(r.customerCountry).trim() : null,
            productType: r.productType ? String(r.productType).trim() : 'Diamond',
            productDescription: r.productDescription ? String(r.productDescription).trim() : null,
            stoneType: r.stoneType ? String(r.stoneType).trim() : null,
            shape: r.shape ? String(r.shape).trim() : null,
            diamondColor: r.diamondColor ? String(r.diamondColor).trim() : null,
            clarity: r.clarity ? String(r.clarity).trim() : null,
            cut: r.cut ? String(r.cut).trim() : null,
            polish: r.polish ? String(r.polish).trim() : null,
            symmetry: r.symmetry ? String(r.symmetry).trim() : null,
            fluorescence: r.fluorescence ? String(r.fluorescence).trim() : null,
            measurement: r.measurement ? String(r.measurement).trim() : null,
            pricePerCarat: r.pricePerCarat !== null && r.pricePerCarat !== undefined ? Number(r.pricePerCarat) : null,
            caratWeight: r.caratWeight !== null && r.caratWeight !== undefined ? Number(r.caratWeight) : null,
            quantity: r.quantity !== null && r.quantity !== undefined ? Number(r.quantity) : 1,
            certificate: r.certificate ? String(r.certificate).trim() : null,
            certificateNo: r.certificateNo ? String(r.certificateNo).trim() : null,
            supplierId: suppId,
            supplierName: suppName || null,
            purchasePrice: Number(r.purchasePrice) || 0,
            sellingPrice: Number(r.sellingPrice) || 0,
            discount: Number(r.discount) || 0,
            finalSaleAmount: Number(r.finalSaleAmount) || (Number(r.sellingPrice) || 0),
            shippingCost: Number(r.shippingCost) || 0,
            gstPercent: Number(r.gstPercent) || 0,
            gstAmount: Number(r.gstAmount) || 0,
            finalPurchasePrice: Number(r.finalPurchasePrice) || (Number(r.purchasePrice) || 0),
            paymentStatus: r.paymentStatus ? String(r.paymentStatus).trim() : 'Paid',
            paymentMethod: r.paymentMethod ? String(r.paymentMethod).trim() : 'Bank Wire',
            amountReceived: Number(r.amountReceived) || (Number(r.finalSaleAmount) || Number(r.sellingPrice) || 0),
            pendingAmount: Number(r.pendingAmount) || 0,
            grossProfit: Number(r.grossProfit) || 0,
            netProfit: Number(r.netProfit) || 0,
            employeeId: empId,
            salesPersonName: spName || 'Unassigned',
            commissionPercent: Number(r.commissionPercent) || 0,
            commissionAmount: Number(r.commissionAmount) || 0,
            profitAfterCommission: Number(r.profitAfterCommission) || (Number(r.netProfit) || 0),
            markupPercent: Number(r.markupPercent) || 0,
            finalProfitPercent: Number(r.finalProfitPercent) || 0,
            orderStatus: r.orderStatus ? String(r.orderStatus).trim() : 'Delivered',
            trackingNumber: r.trackingNumber ? String(r.trackingNumber).trim() : null,
            trackingLink: r.trackingLink ? String(r.trackingLink).trim() : null,
            dollarRate: r.dollarRate !== null && r.dollarRate !== undefined ? Number(r.dollarRate) : null,
            saleMonth: r.saleMonth ? String(r.saleMonth).trim() : null,
            isImported: true,
          },
        });

        // 5. Create Commission record if commission > 0
        if (empId && Number(r.commissionAmount) > 0) {
          await prisma.commission.create({
            data: {
              saleId: sale.id,
              employeeId: empId,
              commissionBasis: 'NET_PROFIT',
              commissionRate: Number(r.commissionPercent) || 0,
              commissionAmount: Number(r.commissionAmount) || 0,
              status: 'APPROVED',
              approvedBy: 'Excel Import Migration',
              approvedAt: new Date(),
            },
          });
        }

        existingSet.add(inv.toUpperCase());
        importedCount++;
      } catch (err: any) {
        errors.push({ invoiceNo: r.invoiceNo, error: err.message || String(err) });
      }
    }

    await prisma.activityLog.create({
      data: {
        userId: req.user?.id || 'SYSTEM',
        action: 'EXECUTE_SALES_IMPORT',
        object: 'Excel Sales Migration',
        newValue: `Imported ${importedCount} sales, skipped ${skippedCount}, failed ${errors.length}`,
      },
    });

    return res.json({
      success: true,
      importedCount,
      skippedCount,
      failedCount: errors.length,
      errors,
    });
  } catch (error: any) {
    console.error('executeSalesExcelImport error:', error);
    return res.status(500).json({ message: 'Execution failed', error: error.message });
  }
};
