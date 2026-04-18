"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Gauge,
  LineChart,
  Menu,
  X,
  Mail,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Qué hacemos", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];

// 🔥 función global para scroll limpio
const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
  });
};

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 px-4 pt-4">
      <div className="mx-auto max-w-7xl flex justify-between items-center bg-slate-950/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("inicio");
          }}
        >
          Marginix
        </a>

        <nav className="hidden md:flex gap-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(item.href.replace("#", ""));
              }}
              className="text-slate-300 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("contacto");
            }}
            className="bg-emerald-400 px-4 py-2 rounded-xl text-slate-950 font-semibold"
          >
            Quiero una auditoría
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="mt-2 bg-slate-950 p-4 rounded-xl md:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                scrollToId(item.href.replace("#", ""));
              }}
              className="block py-2 text-slate-300"
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              scrollToId("contacto");
            }}
            className="block mt-3 bg-emerald-400 text-slate-950 text-center py-2 rounded-xl"
          >
            Quiero una auditoría
          </a>
        </div>
      )}
    </header>
  );
}

export default function Page() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <Navbar />

      <section id="inicio" className="pt-40 text-center">
        <h1 className="text-5xl font-bold">
          Maximizamos tu rentabilidad en Mercado Libre
        </h1>

        <div className="mt-6">
          <a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("contacto");
            }}
            className="bg-emerald-400 px-6 py-3 rounded-xl text-slate-950 font-semibold"
          >
            Quiero una auditoría gratis
          </a>
        </div>
      </section>

      <section id="contacto" className="mt-40 text-center">
        <h2 className="text-3xl font-semibold">
          Dejanos tus datos y analizamos tu cuenta
        </h2>

        <form
          action="https://formspree.io/f/mnjldoak"
          method="POST"
          className="mt-8 max-w-md mx-auto"
        >
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            className="w-full p-3 mb-3 rounded bg-slate-800"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 mb-3 rounded bg-slate-800"
          />
          <textarea
            name="mensaje"
            placeholder="Mensaje"
            className="w-full p-3 mb-3 rounded bg-slate-800"
          />

          <button className="bg-emerald-400 px-6 py-3 rounded text-slate-950 font-semibold w-full">
            Analizar mi cuenta ahora
          </button>
        </form>
      </section>

      <footer className="mt-40 text-center text-slate-400 pb-10">
        © {year} Marginix
      </footer>
    </div>
  );
}
