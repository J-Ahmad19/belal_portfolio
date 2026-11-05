# Belal Ashraf Portfolio · Owner & Admin Guide

Welcome to your portfolio admin guide! This guide explains in simple, plain English how to update, add, reorder, hide, and delete any content on your website without writing a single line of code.

---

## Table of Contents
1. [How to Access the Admin Panel](#1-how-to-access-the-admin-panel)
2. [Admin Dashboard Overview](#2-admin-dashboard-overview)
3. [How to Add a New Internship / Experience](#3-how-to-add-a-new-internship--experience)
4. [How to Edit Responsibilities & Bullet Points](#4-how-to-edit-responsibilities--bullet-points)
5. [How to Add Certificates & Documents with Google Drive Links](#5-how-to-add-certificates--documents-with-google-drive-links)
6. [How to Change the Order of Items](#6-how-to-change-the-order-of-items)
7. [How to Temporarily Hide an Item Without Deleting It](#7-how-to-temporarily-hide-an-item-without-deleting-it)
8. [How to Delete an Item](#8-how-to-delete-an-item)
9. [How to Update Your CV / Resume](#9-how-to-update-your-cv--resume)
10. [Updating Your Profile & Availability](#10-updating-your-profile--availability)
11. [Troubleshooting: "Why aren't my changes visible yet?"](#11-troubleshooting-why-arent-my-changes-visible-yet)

---

## 1. How to Access the Admin Panel

### Locally on Your Computer
1. Open your terminal in the project folder and start the website:
   ```bash
   npm run dev
   ```
2. Open your web browser and visit:
   ```
   http://localhost:3000/admin
   ```
   *(This automatically directs you to your Keystatic admin panel at `/keystatic`).*

### On Your Live Website (Vercel)
1. Go to:
   ```
   https://your-portfolio-domain.com/admin
   ```
2. Click **"Sign in with GitHub"**.
3. Log in with your authorized GitHub account. You now have full access to create, edit, or delete content.

---

## 2. Admin Dashboard Overview

The dashboard groups your portfolio into intuitive sections:

```
┌────────────────────────────────────────────────────────┐
│  BELAL ASHRAF · PORTFOLIO ADMIN                        │
├────────────────────────────────────────────────────────┤
│  Personal Information                                  │
│  └─ Personal Profile (Headline, bio, phone, photo, CV) │
│                                                        │
│  Industry & Research                                   │
│  ├─ Industry Experience (DLF, ONGC, etc.)              │
│  ├─ Research Projects (Bioreactor, metrics, etc.)      │
│  └─ Education (Jamia Millia Islamia)                   │
│                                                        │
│  Certificates & Recognition                            │
│  ├─ Verified Credentials (Drive links & categories)    │
│  └─ Awards & Honors (LORs, TEDx, ASCE, features)       │
│                                                        │
│  Skills & Highlights                                   │
│  ├─ Skills & Tools (AutoCAD, QA/QC, etc.)              │
│  └─ Stats & Metrics (Big impact numbers)               │
└────────────────────────────────────────────────────────┘
```

---

## 3. How to Add a New Internship / Experience

1. In the sidebar, click **Industry Experience**.
2. Click the yellow/black **"Add entry"** button in the top right.
3. Fill out the fields:
   - **Unique Identifier**: Short name in lowercase (e.g. `l-and-t`, `tata-projects`).
   - **Company / Organisation Name**: e.g. `Larsen & Toubro`.
   - **Role / Designation**: e.g. `Site QA/QC Engineer`.
   - **Site Location**: e.g. `Noida International Airport`.
   - **Year or Date Range**: e.g. `2026` or `Jun 2026 - Present`.
   - **Work responsibilities & site achievements**: Click **"Add"** to create a bullet point. Add as many bullet points as you want.
   - **Internship Certificate (Google Drive link)**: *(Optional)* Paste your certificate link.
   - **Certificate Button Label**: e.g. `L&T Experience Certificate`.
   - **Display Order**: Number `1` puts it at the very top.
   - **Show on website**: Checked.
4. Click **Save** in the top right. Your new experience is saved!

---

## 4. How to Edit Responsibilities & Bullet Points

1. Go to **Industry Experience** and click on the company you wish to edit (e.g. `DLF Limited`).
2. Scroll to the **"Work responsibilities & site achievements"** section.
3. Click directly on any text block to edit wording, numbers, or technical IS codes.
4. To remove a bullet point, click the trash can icon next to that bullet.
5. To add a new bullet, click **"Add"** at the bottom of the list.
6. Click **Save**.

---

## 5. How to Add Certificates & Documents with Google Drive Links

All certificates, LORs, and project validations are hosted securely on Google Drive.

### Step-by-Step Guide:
1. **Upload your file** (PDF or high-res image) to Google Drive.
2. **Right-click the file** in Google Drive and click **Share** -> **Share**.
3. Under **General access**, change it from *Restricted* to:
   > **"Anyone with the link"** (Role: **Viewer**)
   *(Crucial: If left restricted, visitors will see a Google permission error).*
4. Click **"Copy link"**.
5. Return to the admin panel:
   - To add it to the **Credentials Grid**, go to **Verified Credentials** -> click **Add entry**.
   - Paste the link into the **Google Drive Shareable Link** field.
   - Example valid links accepted:
     - `https://drive.google.com/file/d/1A11mJLZ4ih8WxOiX5XT-LyCv6AWmJYtg/view?usp=sharing`
     - `https://drive.google.com/open?id=1A11mJLZ4ih8WxOiX5XT-LyCv6AWmJYtg`
   - Select the document category (*Internship Certificate*, *Letter of Recommendation*, *Professional Certification*, etc.).
6. Click **Save**.
7. On the live site, visitors will see a **"View Doc"** button that opens the certificate in a new tab, and a **"Preview"** button that opens a clean modal viewer right on the page!

---

## 6. How to Change the Order of Items

Every collection item has an **"Order"** field:
- **Order = 1**: Appears first (topmost or leftmost).
- **Order = 2**: Appears second.
- **Order = 3**: Appears third, and so on.

To reorder:
1. Open the item you want to move.
2. Change the number in **"Display Order"** (e.g. from `3` to `1`).
3. Click **Save**.

---

## 7. How to Temporarily Hide an Item Without Deleting It

If an internship is confidential, pending verification, or you want to temporarily streamline your portfolio:
1. Click on the item.
2. Uncheck the **"Show on website"** box.
3. Click **Save**.
The item will immediately disappear from the public portfolio, but will stay safely in your admin panel so you can turn it back on whenever you want!

---

## 8. How to Delete an Item

1. Open the collection containing the item.
2. Click on the item to view it.
3. Look at the top right header (or bottom of the page) and click the red **"Delete"** button.
4. Confirm deletion. The file is removed.

---

## 9. How to Update Your CV / Resume

You have two simple ways to update your CV:

### Method A (Direct File Replacement - Recommended)
1. Name your new CV file: `Md_Belal_Ashraf_cv.pdf`.
2. Place it into the `public/` folder of your project, replacing the old file.
3. All download buttons on the site will automatically serve this new PDF.

### Method B (Google Drive Link)
1. Upload your new CV to Google Drive and set sharing to **"Anyone with the link can view"**.
2. Go to **Personal Profile** in the admin.
3. Paste the link into the **"CV Download Link or Google Drive Link"** field.
4. Click **Save**.

---

## 10. Updating Your Profile & Availability

In the admin under **Personal Profile**, you can update:
- **Full Name**
- **Headline**: The main banner text on the homepage.
- **Sub-headline**: Your elevator pitch / professional intro.
- **Availability Status**: e.g., `Available for Site QA/QC & QS` or `Working at DLF Limited`.
- **Contact Info**: Phone, email, location, and LinkedIn URL.
- **Trust Verification Pill**: Text displayed below hero buttons.

---

## 11. Troubleshooting: "Why aren't my changes visible yet?"

- **In Local Development (`localhost:3000`)**:
  - Changes save instantly to your local `/content` files. Refresh the homepage tab to see your edits.
- **On Live Production (Vercel)**:
  - When you click **Save** in GitHub mode, Keystatic creates a git commit on your GitHub repository.
  - Vercel automatically detects the commit and redeploys the site in approximately **45 to 90 seconds**.
  - Next.js is configured with **Incremental Static Regeneration (ISR)**, refreshing page content automatically every 60 seconds.
  - If your update isn't visible right away, please wait about a minute and hard-refresh your browser (`Cmd + Shift + R` on Mac, `Ctrl + F5` on Windows).

