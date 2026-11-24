export interface StoredCertFile {
  id: string;
  fileName: string;
  mimeType: string;
  blob: Blob;
  updatedAt: number;
}

const DB_NAME = 'josafat_cv_cert_docs';
const STORE_NAME = 'cert_files';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB unavailable'));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error('Failed to open IndexedDB'));
  });
}

export async function saveCertFile(
  id: string,
  file: File
): Promise<StoredCertFile> {
  const db = await openDB();
  const record: StoredCertFile = {
    id,
    fileName: file.name,
    mimeType: file.type || 'application/octet-stream',
    blob: file,
    updatedAt: Date.now(),
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(record);
    tx.oncomplete = () => resolve(record);
    tx.onerror = () => reject(tx.error ?? new Error('Failed to save file'));
  });
}

export async function getAllCertFiles(): Promise<Record<string, StoredCertFile>> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => {
      const map: Record<string, StoredCertFile> = {};
      for (const item of req.result as StoredCertFile[]) {
        map[item.id] = item;
      }
      resolve(map);
    };
    req.onerror = () => reject(req.error ?? new Error('Failed to load files'));
  });
}

export async function deleteCertFile(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error('Failed to delete file'));
  });
}

export async function clearAllCertFiles(): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error('Failed to clear files'));
  });
}
