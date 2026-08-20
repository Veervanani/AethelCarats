import { Storage } from '@google-cloud/storage';
import path from 'path';
import fs from 'fs';
import prisma from '../prisma';

const BUCKET_NAME = process.env.GCS_BUCKET_NAME || 'floksyjewel-product-media';
const GCP_PROJECT_ID = process.env.GCP_PROJECT_ID || 'floksy-jewels';

let storageInstance: Storage | null = null;

function getStorage(): Storage {
  if (!storageInstance) {
    storageInstance = new Storage({
      projectId: GCP_PROJECT_ID,
    });
  }
  return storageInstance;
}

/**
 * Uploads a buffer or file to Google Cloud Storage.
 * Returns permanent browser-accessible public URL: https://storage.googleapis.com/<bucket>/products/<filename>
 */
export async function uploadToGcs(
  fileBuffer: Buffer,
  originalFilename: string,
  mimeType: string = 'image/png'
): Promise<string> {
  const ext = path.extname(originalFilename) || '.png';
  const cleanBaseName = path.basename(originalFilename, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
  const uniqueName = `products/img_${Date.now()}_${Math.floor(Math.random() * 10000)}_${cleanBaseName}${ext}`;

  try {
    const storage = getStorage();
    const bucket = storage.bucket(BUCKET_NAME);

    // Ensure bucket exists or attempt to create
    try {
      const [exists] = await bucket.exists();
      if (!exists) {
        console.log(`Creating GCS bucket: ${BUCKET_NAME} in project ${GCP_PROJECT_ID}`);
        await bucket.create({
          location: 'EUROPE-WEST1',
          standard: true,
        });
      }
    } catch (bErr: any) {
      console.warn('GCS bucket check/create notice:', bErr.message);
    }

    const file = bucket.file(uniqueName);
    await file.save(fileBuffer, {
      metadata: {
        contentType: mimeType,
        cacheControl: 'public, max-age=31536000',
      },
      resumable: false,
    });

    try {
      await file.makePublic();
    } catch (pErr: any) {
      console.warn('GCS makePublic notice (uniform bucket-level access may be enabled):', pErr.message);
    }

    const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${uniqueName}`;
    console.log(`✅ Uploaded to Google Cloud Storage: ${publicUrl}`);
    return publicUrl;
  } catch (error: any) {
    console.warn('⚠️ GCS upload notice, returning persistent Data-URI fallback:', error.message);

    // Persistent Database Fallback: Convert buffer to data-URI so it is saved directly into Cloud SQL PostgreSQL database
    // This guarantees that images NEVER disappear on Cloud Run container restarts or redeployments!
    const base64 = fileBuffer.toString('base64');
    const safeMime = mimeType || 'image/png';
    return `data:${safeMime};base64,${base64}`;
  }
}

/**
 * Utility function to migrate any existing local /uploads images to Google Cloud Storage
 */
export async function migrateLocalImagesToGcs(): Promise<number> {
  let migratedCount = 0;
  try {
    const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(UPLOADS_DIR)) return 0;

    // 1. Migrate ProductImage table
    const productImages = await prisma.productImage.findMany();
    for (const img of productImages) {
      if (img.url && img.url.startsWith('/uploads/')) {
        const localFileName = path.basename(img.url);
        const localFilePath = path.join(UPLOADS_DIR, localFileName);
        if (fs.existsSync(localFilePath)) {
          const buffer = fs.readFileSync(localFilePath);
          const ext = path.extname(localFileName).toLowerCase();
          const mimeType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : ext === '.webp' ? 'image/webp' : 'image/png';
          const gcsUrl = await uploadToGcs(buffer, localFileName, mimeType);
          await prisma.productImage.update({
            where: { id: img.id },
            data: { url: gcsUrl },
          });
          migratedCount++;
        } else {
          await prisma.productImage.delete({ where: { id: img.id } }).catch(() => {});
        }
      }
    }

    // 2. Migrate Product mainImage & secondaryImage
    const products = await prisma.product.findMany();
    for (const p of products) {
      let mainUrl = p.mainImage;
      let secUrl = p.secondaryImage;
      let updated = false;

      if (mainUrl && mainUrl.startsWith('/uploads/')) {
        const localFileName = path.basename(mainUrl);
        const localFilePath = path.join(UPLOADS_DIR, localFileName);
        if (fs.existsSync(localFilePath)) {
          const buffer = fs.readFileSync(localFilePath);
          const gcsUrl = await uploadToGcs(buffer, localFileName, 'image/png');
          mainUrl = gcsUrl;
          updated = true;
        } else {
          mainUrl = '/assets/floksy_rings_cat.png';
          updated = true;
        }
      }

      if (secUrl && secUrl.startsWith('/uploads/')) {
        const localFileName = path.basename(secUrl);
        const localFilePath = path.join(UPLOADS_DIR, localFileName);
        if (fs.existsSync(localFilePath)) {
          const buffer = fs.readFileSync(localFilePath);
          const gcsUrl = await uploadToGcs(buffer, localFileName, 'image/png');
          secUrl = gcsUrl;
          updated = true;
        } else {
          secUrl = '/assets/floksy_rings_cat_2.png';
          updated = true;
        }
      }

      if (updated) {
        await prisma.product.update({
          where: { id: p.id },
          data: { mainImage: mainUrl, secondaryImage: secUrl },
        });
        migratedCount++;
      }
    }
  } catch (err: any) {
    console.warn('migrateLocalImagesToGcs notice:', err.message);
  }
  return migratedCount;
}
