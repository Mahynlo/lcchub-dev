# LCCHub-Frontend
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/enriquegiottonini/lcchub-dev/blob/main/README.MD)

As part of a Social Service project at the Computer Science Unit (LCC) of the University of Sonora, 
it was proposed to develop an innovative web portal.
The main objective was to provide LCC students with information related to the program and
with a personalized tracking of their academic trajectory.

## Features
- **Dynamic web platform:** The platform provides a hub of relevant information for LCC students, with updatable content through a Content Management System (CMS).
- **Event section:** Offers details on upcoming and past events, including a calendar and classification of official and community events.
- **I am LCC:** A video gallery of graduates sharing their experiences and achievements after graduation, inspiring current students.
- **Project Exchange:** A dedicated space for sharing job opportunities, internships, and other relevant events for students' professional experience.
- **Student portal:** Integrated with Azure AD, the portal offers students secure access to their academic information, including their progress, approved subjects, accumulated credits, and more (to be defined).
- **Interactive academic progress map:** This tool visualizes the sequence of subjects, showing approved, failed, and re-enrolled ones, helping students plan their academic trajectory.

## Requirements
`node v22.1.0`
`npm 10.7.0`
## Requisitos
- `node v22.1.0`
- `npm 10.7.0`
- Firebase credentials and a firestore database with tables for Students, Subjects, and Curricular Maps as described in [`src/types.ts`](https://github.com/enriquegiottonini/lcchub-dev/blob/main/src/lib/types.ts)
- Servidor web con 
- A web server in `http://localhost:1337` with GET endpoints for Events, SoyLCCVideos, and Proyects Offerings as described in [`src/types.ts`](https://github.com/enriquegiottonini/lcchub-dev/blob/main/src/lib/types.ts)
- AZURE AD credentials from an SPA for access to users in your organization
- An `.env` file with the following information:
```.env
NEXT_PUBLIC_AZURE_CLIENT_ID=xxxx-xx-x
NEXT_PUBLIC_AZURE_AUTHORITY=https://login.microsoftonline.com/xxxx-xx-x
NEXT_PUBLIC_AZURE_REDIRECT_URI=http://localhost:62213/ or https://your-web-domain/dashboard/auth
NEXT_PUBLIC_FIREBASE_API_KEY=xxxx-xx-x
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxx-xx-x
NEXT_PUBLIC_FIREBASE_DATABASE_URL=xxxx-xx-x
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxx-xx-x
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxx-xx-x
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxx-xx-x
NEXT_PUBLIC_FIREBASE_APP_ID=xxxx-xx-x
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=xxxx-xx-x
```

## Usage
`npm run dev` for local development
`npm run build` to build the optimized production version
`npm run start` to run the production version
