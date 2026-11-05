import { config, fields, collection, singleton } from "@keystatic/core";

// In development (npm run dev on localhost), always use local filesystem
// In production (deployed on Vercel), always use GitHub mode
const isProduction = process.env.NODE_ENV === "production";
const storageKind: "github" | "local" =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github" ||
  (isProduction && process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE !== "local" && process.env.KEYSTATIC_STORAGE !== "local")
    ? "github"
    : "local";

export default config({
  storage:
    storageKind === "github"
      ? {
          kind: "github",
          repo: {
            owner: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER || "J-Ahmad19",
            name: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO || "belal_portfolio",
          },
        }
      : {
          kind: "local",
        },
  ui: {
    brand: {
      name: "Belal Ashraf · Portfolio Admin",
    },
    navigation: {
      "Personal Information": ["profile"],
      "Industry & Research": ["experience", "research", "education"],
      "Certificates & Recognition": ["credentials", "awards"],
      "Skills & Highlights": ["skills", "stats"],
    },
  },
  singletons: {
    profile: singleton({
      label: "Personal Profile",
      path: "content/profile",
      format: { data: "json" },
      schema: {
        name: fields.text({
          label: "Full Name",
          description: "Your full professional name displayed on the website.",
          validation: { length: { min: 1 } },
        }),
        headline: fields.text({
          label: "Primary Headline",
          description: "Big bold headline in the hero section (e.g. Civil engineer building quality into every pour.)",
          validation: { length: { min: 1 } },
        }),
        sub: fields.text({
          label: "Sub-headline / Bio Summary",
          description: "Brief professional introduction under your headline.",
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        availability: fields.text({
          label: "Availability Status",
          description: "Status badge text (e.g. Available for Site QA/QC & QS Roles)",
          defaultValue: "Available for Site QA/QC & QS",
        }),
        degree: fields.text({
          label: "Degree & University",
          description: "Education badge subtitle (e.g. B.Tech Civil Engineering · Jamia Millia Islamia)",
          defaultValue: "B.Tech Civil Engineering · Jamia Millia Islamia",
        }),
        email: fields.text({
          label: "Email Address",
          description: "Direct contact email address for hiring managers.",
          validation: { length: { min: 1 } },
        }),
        phone: fields.text({
          label: "Phone Number",
          description: "Contact phone number (e.g. +91 7481014674)",
          validation: { length: { min: 1 } },
        }),
        location: fields.text({
          label: "Location",
          description: "City & country (e.g. New Delhi, India)",
          validation: { length: { min: 1 } },
        }),
        linkedin: fields.url({
          label: "LinkedIn Profile URL",
          description: "Full URL to your LinkedIn profile.",
        }),
        profilePhoto: fields.text({
          label: "Profile Photo URL / Path",
          description: "Path to your photo in public folder (e.g. /belal-profile.jpg) or image URL.",
          defaultValue: "/belal-profile.jpg",
        }),
        cvLink: fields.text({
          label: "CV Download Link or Google Drive Link",
          description: "Local path (/Md_Belal_Ashraf_cv.pdf) or Google Drive shareable link. Set the file to 'Anyone with the link can view' before pasting.",
          defaultValue: "/Md_Belal_Ashraf_cv.pdf",
        }),
        trustBadge: fields.text({
          label: "Trust Verification Pill Text",
          description: "Short highlight pill displayed under the hero buttons.",
          defaultValue: "DLF · ONGC · MEPF · IIT Delhi · ASCE Certificates Verified",
        }),
      },
    }),
  },
  collections: {
    stats: collection({
      label: "Stats & Metrics",
      slugField: "id",
      path: "content/stats/*",
      format: { data: "json" },
      schema: {
        id: fields.slug({
          name: {
            label: "Unique Identifier",
            description: "Short key for this stat (e.g. nitrate, boq, attendees, credentials)",
          },
        }),
        label: fields.text({
          label: "Description Label",
          description: "Explanation of what this metric represents.",
          validation: { length: { min: 1 } },
        }),
        value: fields.number({
          label: "Numeric Value",
          description: "The number to count up to (e.g. 96.5, 90, 300, 8)",
          validation: { isRequired: true },
        }),
        decimals: fields.integer({
          label: "Decimal Places",
          description: "Number of decimals to display (0 for integers like 90, 1 for decimals like 96.5).",
          defaultValue: 0,
        }),
        suffix: fields.text({
          label: "Suffix Symbol",
          description: "Symbol immediately following the number (e.g. %, +, cum)",
        }),
        order: fields.integer({
          label: "Display Order",
          description: "Sort order from left to right (1, 2, 3, etc.)",
          defaultValue: 1,
        }),
        visible: fields.checkbox({
          label: "Show on website",
          description: "Uncheck to temporarily hide this metric without deleting it.",
          defaultValue: true,
        }),
      },
    }),

    experience: collection({
      label: "Industry Experience",
      slugField: "id",
      path: "content/experience/*",
      format: { data: "json" },
      schema: {
        id: fields.slug({
          name: {
            label: "Unique Identifier",
            description: "Short key (e.g. dlf, ongc, comfort-design)",
          },
        }),
        organisation: fields.text({
          label: "Company / Organisation Name",
          description: "Name of the company (e.g. DLF Limited, ONGC)",
          validation: { length: { min: 1 } },
        }),
        role: fields.text({
          label: "Role / Designation",
          description: "Your title (e.g. Projects Department Intern)",
          validation: { length: { min: 1 } },
        }),
        location: fields.text({
          label: "Site Location",
          description: "Project location (e.g. Data Center-03, Sector 143A, Noida)",
          validation: { length: { min: 1 } },
        }),
        year: fields.text({
          label: "Year or Date Range",
          description: "e.g. 2026, 2025 - 2026",
          validation: { length: { min: 1 } },
        }),
        bulletPoints: fields.array(
          fields.text({
            label: "Responsibility / Achievement",
            multiline: true,
            description: "Describe what you inspected, verified, calculated, or managed.",
          }),
          {
            label: "Work responsibilities & site achievements",
            itemLabel: (props) => props.value || "New bullet point",
          }
        ),
        certificateLink: fields.text({
          label: "Internship Certificate (Google Drive link)",
          description: "Paste share link. Set file to 'Anyone with the link can view' in Google Drive.",
        }),
        certificateLabel: fields.text({
          label: "Certificate Button Label",
          description: "e.g. DLF Internship Certificate",
        }),
        lorLink: fields.text({
          label: "Letter of Recommendation (Google Drive link)",
          description: "Optional LOR link from this internship.",
        }),
        lorLabel: fields.text({
          label: "LOR Button Label",
          description: "e.g. ONGC Recommendation (LOR)",
        }),
        order: fields.integer({
          label: "Display Order",
          description: "Order on page (1 = topmost).",
          defaultValue: 1,
        }),
        visible: fields.checkbox({
          label: "Show on website",
          description: "Uncheck to hide this internship without deleting.",
          defaultValue: true,
        }),
      },
    }),

    research: collection({
      label: "Research Projects",
      slugField: "id",
      path: "content/research/*",
      format: { data: "json" },
      schema: {
        id: fields.slug({
          name: {
            label: "Unique Identifier",
            description: "Short key (e.g. yamuna-bioreactor)",
          },
        }),
        title: fields.text({
          label: "Project Title",
          description: "Full research title (e.g. Zero-aeration algal-bacterial bioreactor for Yamuna water)",
          validation: { length: { min: 1 } },
        }),
        meta: fields.text({
          label: "Meta Line",
          description: "Context, institution, and advisors (e.g. IIT Delhi Changemakers Bootcamp 2025, with Prof. Jay Dhariwal...)",
          validation: { length: { min: 1 } },
        }),
        description: fields.text({
          label: "Project Description",
          description: "Summary of mechanism, energy savings, and results.",
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        resultRows: fields.array(
          fields.object({
            label: fields.text({ label: "Parameter (e.g. Nitrate)" }),
            range: fields.text({ label: "Reduction Range (e.g. 41.46 to 1.46 ppm)" }),
            percentage: fields.text({ label: "Percentage Reduction (e.g. 96.5%)" }),
          }),
          {
            label: "Experimental Results Grid",
            itemLabel: (props) => props.fields.label.value || "Result row",
          }
        ),
        note: fields.text({
          label: "Media / Recognition Note",
          description: "Highlight box text (e.g. Selected for IIT Delhi Open House 2025 and featured in The Indian Express.)",
        }),
        certificateLink: fields.text({
          label: "Project Certificate (Google Drive link)",
          description: "Set the file to 'Anyone with the link can view' in Google Drive before pasting.",
        }),
        certificateLabel: fields.text({
          label: "Button Label",
          defaultValue: "IIT Delhi Project Certificate",
        }),
        order: fields.integer({
          label: "Display Order",
          defaultValue: 1,
        }),
        visible: fields.checkbox({
          label: "Show on website",
          defaultValue: true,
        }),
      },
    }),

    credentials: collection({
      label: "Verified Credentials",
      slugField: "id",
      path: "content/credentials/*",
      format: { data: "json" },
      schema: {
        id: fields.slug({
          name: {
            label: "Credential Slug / Key",
            description: "Unique slug (e.g. dlf-cert, ongc-cert, ongc-lor, mepf-cert)",
          },
        }),
        title: fields.text({
          label: "Document Title",
          description: "e.g. DLF Internship Certificate, ONGC Letter of Recommendation",
          validation: { length: { min: 1 } },
        }),
        issuer: fields.text({
          label: "Issuing Authority / Organization",
          description: "e.g. DLF Limited · Data Center-03, Noida",
          validation: { length: { min: 1 } },
        }),
        date: fields.text({
          label: "Issue Year / Date",
          description: "e.g. 2026, March 2025",
          validation: { length: { min: 1 } },
        }),
        credentialId: fields.text({
          label: "Credential ID / License Number (optional)",
          description: "e.g. UC-d5c84817-c60f-406f-8a05-3e3535ca2b3a",
        }),
        description: fields.text({
          label: "Short Description",
          description: "Summary of skills, verification details, or project context.",
          multiline: true,
        }),
        category: fields.select({
          label: "Document Category",
          options: [
            { label: "Internship Certificate", value: "Internship Certificate" },
            { label: "Letter of Recommendation", value: "Letter of Recommendation" },
            { label: "Professional Certification", value: "Professional Certification" },
            { label: "Project Certificate", value: "Project Certificate" },
            { label: "Appreciation Certificate", value: "Appreciation Certificate" },
          ],
          defaultValue: "Internship Certificate",
        }),
        driveLink: fields.text({
          label: "Google Drive Shareable Link",
          description: "Set the file to 'Anyone with the link can view' in Google Drive before pasting.",
          validation: { length: { min: 1 } },
        }),
        order: fields.integer({
          label: "Display Order",
          description: "Order in the credentials grid (1, 2, 3...)",
          defaultValue: 1,
        }),
        visible: fields.checkbox({
          label: "Show on website",
          defaultValue: true,
        }),
      },
    }),

    awards: collection({
      label: "Awards & Honors",
      slugField: "id",
      path: "content/awards/*",
      format: { data: "json" },
      schema: {
        id: fields.slug({
          name: {
            label: "Award Key",
            description: "Unique slug (e.g. ongc-lor, edc-ambassador, tedx-appreciation)",
          },
        }),
        title: fields.text({
          label: "Award / Honor Title",
          description: "e.g. Letter of Recommendation, Top Campus Ambassador & LOR",
          validation: { length: { min: 1 } },
        }),
        description: fields.text({
          label: "Description & Context",
          description: "Awarding body, achievements, and impact.",
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        year: fields.text({
          label: "Year / Date",
          description: "e.g. 2026, 2025",
        }),
        driveLink: fields.text({
          label: "Google Drive Link (optional)",
          description: "Direct link to verified letter or certificate. Leave blank if none.",
        }),
        linkText: fields.text({
          label: "Button Text",
          description: "e.g. View ONGC LOR, View Certificate",
        }),
        order: fields.integer({
          label: "Display Order",
          defaultValue: 1,
        }),
        visible: fields.checkbox({
          label: "Show on website",
          defaultValue: true,
        }),
      },
    }),

    skills: collection({
      label: "Skills & Tools",
      slugField: "id",
      path: "content/skills/*",
      format: { data: "json" },
      schema: {
        id: fields.slug({
          name: {
            label: "Category Key",
            description: "e.g. estimation, quality-assurance, structures, tools",
          },
        }),
        groupName: fields.text({
          label: "Skill Group Name",
          description: "e.g. Estimation and costing, Quality assurance, Tools",
          validation: { length: { min: 1 } },
        }),
        skills: fields.array(
          fields.text({
            label: "Skill or tool name",
          }),
          {
            label: "Skills List",
            itemLabel: (props) => props.value || "New skill",
          }
        ),
        certificateLink: fields.text({
          label: "Optional Certificate Link",
          description: "Attach Google Drive link for credentials in this category (e.g. AutoCAD cert).",
        }),
        certificateLabel: fields.text({
          label: "Certificate Link Label",
          description: "e.g. AutoCAD Cert ↗",
        }),
        order: fields.integer({
          label: "Display Order",
          defaultValue: 1,
        }),
        visible: fields.checkbox({
          label: "Show on website",
          defaultValue: true,
        }),
      },
    }),

    education: collection({
      label: "Education",
      slugField: "id",
      path: "content/education/*",
      format: { data: "json" },
      schema: {
        id: fields.slug({
          name: {
            label: "Education Key",
            description: "e.g. btech-civil",
          },
        }),
        degree: fields.text({
          label: "Degree Name",
          description: "e.g. B.Tech in Civil Engineering",
          validation: { length: { min: 1 } },
        }),
        institution: fields.text({
          label: "College / University",
          description: "e.g. Jamia Millia Islamia, New Delhi",
          validation: { length: { min: 1 } },
        }),
        years: fields.text({
          label: "Years / Timeline",
          description: "e.g. 2022 - 2026",
          validation: { length: { min: 1 } },
        }),
        details: fields.text({
          label: "Specialization / Key coursework",
          multiline: true,
        }),
        order: fields.integer({
          label: "Display Order",
          defaultValue: 1,
        }),
        visible: fields.checkbox({
          label: "Show on website",
          defaultValue: true,
        }),
      },
    }),
  },
});
