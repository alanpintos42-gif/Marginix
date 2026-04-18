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
  { label: "Contacto", href: "/#contacto" },
];

const services = [
  {
    icon: Gauge,
    title: "Optimización de precios",
    description:
      "Definimos precios con lógica de margen, competitividad y costo real para que vender más no implique ganar menos.",
  },
  {
    icon: LineChart,
    title: "Rentabilidad en promociones",
    description:
      "Evaluamos descuentos, cupones y campañas para que cada acción comercial tenga sentido económico.",
  },
  {
    icon: Boxes,
    title: "Estrategia de Full",
    description:
      "Decidimos qué enviar, cuánto y cuándo para mejorar rotación, cobertura y rendimiento operativo.",
  },
  {
    icon: BarChart3,
    title: "Buy Box y performance",
    description:
      "Leemos visibilidad, competencia y publicaciones para detectar dónde crecer sin destruir rentabilidad.",
  },
];

const stats = [
  { value: 40, prefix: "+", label: "modelos y análisis de pricing" },
  { value: 4, suffix: "%+", label: "objetivo mínimo de ROI" },
  { value: 15, suffix: " días", label: "lógica operativa para Full" },
  { value: 100, suffix: "%", label: "foco en decisiones accionables" },
];

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description:
      "Revisamos pricing, promociones, competitividad y estructura comercial para detectar fugas de margen.",
  },
  {
    number: "02",
    title: "Plan de acción",
    description:
      "Bajamos hallazgos a prioridades claras: qué corregir primero, qué sostener y dónde está la mayor oportunidad.",
  },
  {
    number: "03",
    title: "Implementación",
    description:
      "Acompañamos la ejecución para que el análisis se transforme en mejores decisiones y resultados concretos.",
  },
];

function useSmartNavbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const isTop = currentY < 32;

      setScrolled(currentY > 20);

      if (isTop) {
        setVisible(true);
      } else if (currentY > lastY.current && currentY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { visible, scrolled };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCard({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.96, filter: "blur(6px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, y: 28, scale: 0.96, filter: "blur(6px)" }
      }
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frame = 0;
    let animationFrame: number;
    const totalFrames = Math.max(1, Math.round(duration * 60));

    const animate = () => {
      frame += 1;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = value * eased;

      setCount(progress >= 1 ? value : nextValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {Number(count).toLocaleString("es-AR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
        <svg
          viewBox="0 0 48 48"
          className="h-6 w-6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 35V13L18 26L24 17L31 28L39 13V35"
            stroke="#10B981"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M30 13H39V22"
            stroke="#34D399"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <div className="text-base font-semibold tracking-tight text-white">
          Marginix
        </div>
        <div className="text-xs text-slate-400">
          Pricing & growth con foco en rentabilidad
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  const { visible, scrolled } = useSmartNavbar();
  const [open, setOpen] = useState(false);

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: visible ? 0 : -110, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 md:px-6 ${
            scrolled
              ? "border-white/10 bg-slate-950/75 shadow-2xl shadow-black/20 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <a href="#inicio" className="shrink-0">
            <LogoMark />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-slate-300 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-400/20"
            >
              Quiero una auditoría
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden"
            aria-label="Abrir menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mx-auto mt-3 max-w-7xl rounded-2xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-4 py-3 text-sm font-semibold text-slate-950"
                >
                  Quiero una auditoría
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </AnimatePresence>
  );
}

function GradientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-[-120px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="absolute right-[-120px] top-[260px] h-[320px] w-[320px] rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="absolute bottom-[-140px] left-[-120px] h-[300px] w-[300px] rounded-full bg-emerald-300/10 blur-3xl" />
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <div className="mb-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-300">{description}</p>
    </div>
  );
}

export default function MarginixLanding() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-300 selection:text-slate-950">
      <Navbar />

      <main className="relative overflow-hidden">
        <GradientBackground />

        <section
          id="inicio"
          className="relative mx-auto max-w-7xl px-4 pb-20 pt-36 md:px-6 md:pb-28 md:pt-40"
        >
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Reveal>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Consultoría especializada en Mercado Libre
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white md:text-6xl md:leading-[1.05]">
                  Maximizamos tu{" "}
                  <span className="text-emerald-300">rentabilidad</span> en
                  Mercado Libre.
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                  Optimizamos precios, promociones, Buy Box y Full para que tu
                  cuenta no solo venda más, sino que gane mejor.
                </p>
              </Reveal>

              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#contacto"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-400/20"
                  >
                    Quiero una auditoría gratis
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#servicios"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Ver servicios
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2} className="relative">
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-400">
                      Señal principal
                    </div>
                    <div className="text-2xl font-semibold text-white">
                      Más margen, no solo más ventas
                    </div>
                  </div>
                  <div className="rounded-2xl bg-emerald-400/15 p-3 text-emerald-300">
                    <LineChart className="h-6 w-6" />
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    ["Pricing", "Decisiones con foco en rentabilidad"],
                    ["Buy Box", "Competitividad sin guerra de precios"],
                    ["Full", "Stock correcto en el canal correcto"],
                    ["Performance", "Crecimiento con criterio de negocio"],
                  ].map(([title, desc], i) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, x: 18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
                      className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
                    >
                      <div className="text-sm font-medium text-white">
                        {title}
                      </div>
                      <div className="mt-1 text-sm leading-6 text-slate-400">
                        {desc}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
          <div className="grid gap-4 md:grid-cols-4">
            {stats.map((item, index) => (
              <AnimatedCard key={item.label} delay={index * 0.08}>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="text-3xl font-semibold tracking-tight text-white">
                    <CountUp
                      value={item.value}
                      prefix={item.prefix || ""}
                      suffix={item.suffix || ""}
                    />
                  </div>
                  <div className="mt-2 text-sm leading-6 text-slate-400">
                    {item.label}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </section>

        <section id="servicios" className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <Reveal>
            <SectionTitle
              eyebrow="Qué ofrecemos"
              title="Optimizamos todo el sistema, no una parte aislada"
              description="La mayoría mira solo ventas, o solo campañas, o solo precio. Marginix conecta pricing, promociones, visibilidad y operación para mejorar el resultado real del negocio."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <AnimatedCard key={service.title} delay={index * 0.09}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                    className="group h-full rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                  >
                    <div className="inline-flex rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-emerald-300 transition duration-300 group-hover:scale-105 group-hover:bg-emerald-400/15">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {service.description}
                    </p>
                  </motion.div>
                </AnimatedCard>
              );
            })}
          </div>
        </section>

        <section id="proceso" className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <Reveal>
              <SectionTitle
                eyebrow="Cómo trabajamos"
                title="Un proceso simple, ejecutivo y orientado a decisiones"
                description="No entramos para sumar ruido operativo. Entramos para encontrar qué está frenando la rentabilidad y convertirlo en acciones concretas."
              />
            </Reveal>

            <div className="space-y-5">
              {steps.map((step, index) => (
                <AnimatedCard key={step.number} delay={index * 0.1}>
                  <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:border-emerald-400/20 hover:bg-white/[0.07]">
                    <div className="flex items-start gap-4">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: index * 0.08 }}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 text-sm font-semibold text-slate-950"
                      >
                        {step.number}
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-slate-400">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <Reveal>
            <div className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-emerald-400/12 via-cyan-300/5 to-white/5 p-8 shadow-2xl shadow-black/10 backdrop-blur-xl md:p-10">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">
                  Diferencial
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  No se trata solo de vender más. Se trata de vender bien.
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-200/90">
                  Muchas cuentas crecen en facturación sin mejorar su resultado
                  real. Marginix existe para ordenar la lógica comercial y hacer
                  que cada precio, cada promoción y cada movimiento en Full
                  tengan más sentido económico.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="contacto" className="mx-auto max-w-7xl px-4 pb-24 pt-8 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div>
                <div className="mb-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-300">
                  Contacto
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Dejanos tus datos y analizamos tu cuenta
                </h2>
                <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">
                  Analizamos tu cuenta de Mercado Libre y detectamos dónde estás perdiendo margen y qué ajustes hacer para mejorar tu rentabilidad.
                </p>

                <div className="mt-8 space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-emerald-400/15 p-2 text-emerald-300">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        Análisis sin costo
                      </div>
                      <div className="mt-1 text-sm leading-6 text-slate-400">
                        Evaluamos tu cuenta y detectamos oportunidades reales para mejorar tu rentabilidad.
                        
                    
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <form
                action="https://formspree.io/f/mnjldoak"
                method="POST"
                className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/10 backdrop-blur-xl md:p-8"
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-200">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      placeholder="Tu nombre"
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-200">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="tuemail@empresa.com"
                      className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Empresa
                  </label>
                  <input
                    type="text"
                    name="empresa"
                    placeholder="Nombre de la empresa"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40"
                  />
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Mensaje
                  </label>
                  <textarea
                    name="mensaje"
                    rows={6}
                    placeholder="Contame brevemente qué estás buscando mejorar"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/40"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-400/20"
                >
                  Analizar mi cuenta ahora
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-8 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <LogoMark />
          </div>
          <div>© {year} Marginix. Maximizamos rentabilidad, no solo ventas.</div>
        </div>
      </footer>
    </div>
  );
}

