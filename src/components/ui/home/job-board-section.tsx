"use client";

import {
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  Pagination,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ProyectOffering } from "@/lib/types";
import { useState } from "react";
import Link from "next/link";


interface JobBoardSectionProps {
  proyectOfferings: ProyectOffering[];

}
export function JobBoardSection( {proyectOfferings}: JobBoardSectionProps) {
  const maxProyectsPerPage = 4;
  const [page, setPage] = useState(1);
  return (
    <section className="bg-white py-12 md:py-16 dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 text-center">
          <div>
            <span className="bg-green-500 rounded-lg text-3xl font-bold text-slate-50">
              Bolsa de Proyectos
            </span>
          </div>
          <p className="text-gray-700">
            Encuentra las últimas oportunidades de proyectos de nuestra
            comunidad.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 grid-cols-1 md:grid-cols-4">
          {proyectOfferings
            .slice((page - 1) * maxProyectsPerPage, page * maxProyectsPerPage)
            .map((proyectOffering, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
              >
                <h3 className="mb-2 text-lg font-semibold">
                  {proyectOffering.proyect_title}
                </h3>
                <div className="mb-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <BuildingIcon className="mr-2 h-4 w-4" />
                  <span>{proyectOffering.company}</span>
                </div>
                <div className="mb-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>
                    {proyectOffering.issued.toLocaleDateString("es-MX")}
                  </span>
                </div>
                <div>
                  {proyectOffering.readmore_redirect ||
                  proyectOffering.readmore_img ? (
                    <Button>
                      <Link
                        href={
                          proyectOffering.readmore_redirect ||
                          proyectOffering.readmore_img
                        }
                        target="_blanc"
                      >
                        Ver más
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Ver más</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>
                              {proyectOffering.proyect_title}
                            </DialogTitle>
                            <DialogClose />
                          </DialogHeader>
                          <DialogDescription>
                            {proyectOffering.readmore_manual}
                          </DialogDescription>
                        </DialogContent>
                      </Dialog>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className="mt-8">
          <Pagination>
            <PaginationPrevious
              onClick={() => setPage(page - 1)}
              aria-disabled={page <= 1}
              tabIndex={page <= 1 ? -1 : undefined}
              className={
                page <= 1 ? "pointer-events-none opacity-50" : undefined
              }
            />
            <PaginationContent>
              {Array.from({
                length: Math.ceil(proyectOfferings.length / maxProyectsPerPage),
              }).map((_, i) => {
                const currentPage = i + 1;
                return (
                  <PaginationItem key={i} onClick={() => setPage(currentPage)}>
                    <PaginationLink>{currentPage}</PaginationLink>
                  </PaginationItem>
                );
              })}
            </PaginationContent>
            <PaginationNext
              onClick={() => setPage(page + 1)}
              aria-disabled={
                page >= proyectOfferings.length / maxProyectsPerPage
              }
              tabIndex={
                page >= proyectOfferings.length / maxProyectsPerPage
                  ? -1
                  : undefined
              }
              className={
                page >= proyectOfferings.length / maxProyectsPerPage
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
            />
          </Pagination>
        </div>
      </div>
    </section>
  );
}

function BuildingIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
