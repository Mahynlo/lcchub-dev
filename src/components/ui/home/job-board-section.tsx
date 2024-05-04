"use client";
import Link from "next/link";
import {
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationContent,
  Pagination,
} from "@/components/ui/pagination";
import { ProyectOffering } from "@/lib/types";
import { useEffect, useState } from "react";

const api = {
  data: [
    {
      id: 1,
      attributes: {
        proyect_title: "Analista de Datos",
        company: "FGJE",
        createdAt: "2024-05-04T19:54:47.615Z",
        updatedAt: "2024-05-04T20:11:47.613Z",
        publishedAt: "2024-05-04T19:54:50.172Z",
        issued: "2024-04-27",
        readmore_manual: null,
        readmore_redirect: null,
        readmore_img: {
          data: {
            id: 8,
            attributes: {
              name: "fgje_job.jpg",
              alternativeText: null,
              caption: null,
              width: 1420,
              height: 1874,
              formats: {
                thumbnail: {
                  name: "thumbnail_fgje_job.jpg",
                  hash: "thumbnail_fgje_job_343964ffa9",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  path: null,
                  width: 118,
                  height: 156,
                  size: 4.18,
                  sizeInBytes: 4181,
                  url: "/uploads/thumbnail_fgje_job_343964ffa9.jpg",
                },
                small: {
                  name: "small_fgje_job.jpg",
                  hash: "small_fgje_job_343964ffa9",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  path: null,
                  width: 379,
                  height: 500,
                  size: 38.66,
                  sizeInBytes: 38655,
                  url: "/uploads/small_fgje_job_343964ffa9.jpg",
                },
                large: {
                  name: "large_fgje_job.jpg",
                  hash: "large_fgje_job_343964ffa9",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  path: null,
                  width: 758,
                  height: 1000,
                  size: 127.59,
                  sizeInBytes: 127594,
                  url: "/uploads/large_fgje_job_343964ffa9.jpg",
                },
                medium: {
                  name: "medium_fgje_job.jpg",
                  hash: "medium_fgje_job_343964ffa9",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  path: null,
                  width: 568,
                  height: 750,
                  size: 87.43,
                  sizeInBytes: 87427,
                  url: "/uploads/medium_fgje_job_343964ffa9.jpg",
                },
              },
              hash: "fgje_job_343964ffa9",
              ext: ".jpg",
              mime: "image/jpeg",
              size: 275.44,
              url: "/uploads/fgje_job_343964ffa9.jpg",
              previewUrl: null,
              provider: "local",
              provider_metadata: null,
              createdAt: "2024-05-04T19:54:07.865Z",
              updatedAt: "2024-05-04T20:11:29.045Z",
            },
          },
        },
      },
    },
    {
      id: 2,
      attributes: {
        proyect_title: "Desarrollador Frontend",
        company: "DGIDT",
        createdAt: "2024-05-04T19:57:24.758Z",
        updatedAt: "2024-05-04T20:12:10.372Z",
        publishedAt: "2024-05-04T19:57:26.401Z",
        issued: "2023-09-04",
        readmore_manual: null,
        readmore_redirect: null,
        readmore_img: {
          data: {
            id: 9,
            attributes: {
              name: "DGIDT.jpg",
              alternativeText: null,
              caption: null,
              width: 1275,
              height: 1650,
              formats: {
                thumbnail: {
                  name: "thumbnail_DGIDT.jpg",
                  hash: "thumbnail_DGIDT_c464687649",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  path: null,
                  width: 120,
                  height: 156,
                  size: 6.65,
                  sizeInBytes: 6646,
                  url: "/uploads/thumbnail_DGIDT_c464687649.jpg",
                },
                small: {
                  name: "small_DGIDT.jpg",
                  hash: "small_DGIDT_c464687649",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  path: null,
                  width: 386,
                  height: 500,
                  size: 43.56,
                  sizeInBytes: 43563,
                  url: "/uploads/small_DGIDT_c464687649.jpg",
                },
                medium: {
                  name: "medium_DGIDT.jpg",
                  hash: "medium_DGIDT_c464687649",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  path: null,
                  width: 580,
                  height: 750,
                  size: 79.73,
                  sizeInBytes: 79728,
                  url: "/uploads/medium_DGIDT_c464687649.jpg",
                },
                large: {
                  name: "large_DGIDT.jpg",
                  hash: "large_DGIDT_c464687649",
                  ext: ".jpg",
                  mime: "image/jpeg",
                  path: null,
                  width: 773,
                  height: 1000,
                  size: 115.48,
                  sizeInBytes: 115484,
                  url: "/uploads/large_DGIDT_c464687649.jpg",
                },
              },
              hash: "DGIDT_c464687649",
              ext: ".jpg",
              mime: "image/jpeg",
              size: 201.25,
              url: "/uploads/DGIDT_c464687649.jpg",
              previewUrl: null,
              provider: "local",
              provider_metadata: null,
              createdAt: "2024-05-04T19:57:15.638Z",
              updatedAt: "2024-05-04T19:57:15.638Z",
            },
          },
        },
      },
    },
    {
      id: 3,
      attributes: {
        proyect_title: "Apprentice Developer",
        company: "Encora",
        createdAt: "2024-05-04T20:13:21.954Z",
        updatedAt: "2024-05-04T20:13:24.880Z",
        publishedAt: "2024-05-04T20:13:24.874Z",
        issued: "2024-02-01",
        readmore_manual: null,
        readmore_redirect:
          "https://careers.encora.com/application?&gh_jid=4352385007",
        readmore_img: {
          data: null,
        },
      },
    },
    {
      id: 4,
      attributes: {
        proyect_title: "Auxiliar de Programación",
        company: "Grupo CORASA",
        createdAt: "2024-05-04T20:19:07.204Z",
        updatedAt: "2024-05-04T20:19:09.179Z",
        publishedAt: "2024-05-04T20:19:09.156Z",
        issued: "2023-06-13",
        readmore_manual:
          "Oferta de empleo para estudiante de LCC en Comercializadora Ortega y Accionistas.\n\nSe solicita un auxiliar de programación. Se requiere que tenga conocimientos básicos de programación, de preferencia con JAVA, spring boot y testing. \n\nPuede ser en modalidad remoto o presencial, se requieren 3-5 horas diarias.\n\nMayores informes\nHeriberto Ortega\nWA: (662) 183 1587\nEmail: hortegag91@grupocorasa.mx",
        readmore_redirect: null,
        readmore_img: {
          data: null,
        },
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: 4,
    },
  },
};

export function JobBoardSection() {
  const proyectOfferings: ProyectOffering[] = api.data.map(
    (proyectOffering: any) => {
      return {
        proyect_title: proyectOffering.attributes.proyect_title,
        company: proyectOffering.attributes.company,
        issued: new Date(proyectOffering.attributes.issued),
        readmore_manual: proyectOffering.attributes.readmore_manual,
        readmore_redirect: proyectOffering.attributes.readmore_redirect,
        readmore_img: proyectOffering.attributes.readmore_img,
      };
    },
  );
  const proyectOfferingsSorted = proyectOfferings.sort(
    (a, b) => b.issued.getTime() - a.issued.getTime(),
  );
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
          {proyectOfferingsSorted
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
                  <span>{proyectOffering.issued.toLocaleDateString("es-MX")}</span>
                </div>

                <Link
                  className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
                  href="#"
                >
                  Más info
                </Link>
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
              {Array.from({ length: proyectOfferings.length / maxProyectsPerPage }).map(
                (_, i) => {
                  const currentPage = i + 1;
                  return (
                    <PaginationItem
                      key={i}
                      onClick={() => setPage(currentPage)}
                    >
                      <PaginationLink>{currentPage}</PaginationLink>
                    </PaginationItem>
                  );
                },
              )}
            </PaginationContent>
            <PaginationNext 
            onClick={() => setPage(page + 1)} 
            aria-disabled={page >= proyectOfferings.length / maxProyectsPerPage}
            tabIndex={page >= proyectOfferings.length / maxProyectsPerPage ? -1 : undefined}
            className={
              page >= proyectOfferings.length / maxProyectsPerPage ? "pointer-events-none opacity-50" : undefined
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
