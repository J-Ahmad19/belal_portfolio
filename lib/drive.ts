/**
 * Utility functions for parsing, validating, and generating Google Drive URLs.
 * Handles share links, open?id= links, Google Docs links, and raw file IDs.
 */

export function extractDriveFileId(url: string | null | undefined): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  // Handles /file/d/ID/view, /d/ID/preview, /document/d/ID/edit, etc.
  const fileDMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch) return fileDMatch[1];

  // Handles open?id=ID, uc?id=ID, etc.
  const idQueryMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idQueryMatch) return idQueryMatch[1];

  // If already a raw ID (usually 28-33 alphanumeric characters)
  if (/^[a-zA-Z0-9_-]{25,}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

export function isDriveUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  return /drive\.google\.com|docs\.google\.com/.test(url) || extractDriveFileId(url) !== null;
}

/**
 * Builds standard view URL that opens directly in Google Drive with toolbar.
 */
export function getDriveViewUrl(urlOrId: string | null | undefined): string {
  if (!urlOrId) return "";
  const id = extractDriveFileId(urlOrId);
  if (id) {
    return `https://drive.google.com/file/d/${id}/view?usp=sharing`;
  }
  return urlOrId;
}

/**
 * Builds embedded preview URL (/preview) suitable for iframes and modals.
 */
export function getDrivePreviewUrl(urlOrId: string | null | undefined): string {
  if (!urlOrId) return "";
  const id = extractDriveFileId(urlOrId);
  if (id) {
    return `https://drive.google.com/file/d/${id}/preview`;
  }
  return urlOrId;
}

