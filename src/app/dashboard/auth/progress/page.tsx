"use client";

import { useMsal } from "@azure/msal-react";
export default function Page() {
  const { accounts } = useMsal();
  const student = accounts[0];
  return (
    <div>
      <p>{student.username}</p>
      <p>{student.name}</p>
    </div>
  );
}
