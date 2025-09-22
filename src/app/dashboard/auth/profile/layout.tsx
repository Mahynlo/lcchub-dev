"use client";

import { CacheSubjectProvider } from "./SubjectCache";
import { ProfileLayout } from "./ProfileLayout";
import { CurriculumProvider } from "./CurriculumContext";

export default function ProfileLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    
    <CacheSubjectProvider>     
        <ProfileLayout>
          <CurriculumProvider>
          {children}
          </CurriculumProvider>
        </ProfileLayout>
    </CacheSubjectProvider>
  );
}
