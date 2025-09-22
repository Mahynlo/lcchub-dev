import { useState } from "react";

export default function SubjectAccordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-md shadow mb-2">
      <button
        className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {isOpen && (
        <div className="px-4 py-2 bg-white border-t">{children}</div>
      )}
    </div>
  );
}
