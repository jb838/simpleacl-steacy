"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import {
  PhoneCall,
  MessageSquare,
  Bot,
  Calendar,
  ArrowRight,
  Check,
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    sector: "",
    problem: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const { error } = await supabase.from("leads").insert([
      {
        name: form.name,
        company: form.company,
        phone: form.phone,
        email: form.email,
        sector: form.sector,
        problem: form.problem,
        status: "new",
      },
    ]);

    setLoading(false);

    if (error) {
      setError("Erreur lors de l’envoi. Vérifiez Supabase.");
      console.error(error);
      return;
    }

    setSuccess(true);
    setForm({
      name: "",
      company: "",
      phone: "",
      email: "",
      sector: "",
      problem: "",
    });
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-xl font-bold tracking-tight">SIMPLE ACL</div>

          <a
            href="#rdv"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/80"
          >
            Audit gratuit
          </a>
        </div>
      </nav>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_40%)]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-5xl"
        >
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
            STECY • Réceptionniste IA 24h/24
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Vous perdez des clients chaque jour sans le savoir.
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-white/70 md:text-xl">
            Stecy répond automatiquement à vos appels, WhatsApp et prospects
            entrants afin d’éviter les pertes de chiffre d’affaires.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#rdv"
              className="flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-white/80"
            >
              Recevoir mon audit gratuit
              <ArrowRight size={18} />
            </a>

            <a
              href="#demo"
              className="rounded-full border border-white/10 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Voir la démo
            </a>
          </div>
        </motion.div>
      </section>

      <section id="demo" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              icon: PhoneCall,
              title: "Réponse aux appels",
              text: "Stecy répond automatiquement à vos prospects entrants.",
            },
            {
              icon: MessageSquare,
              title: "WhatsApp IA",
              text: "Qualification automatique des demandes clients.",
            },
            {
              icon: Bot,
              title: "Relances intelligentes",
              text: "Ne laissez plus aucun devis sans suivi.",
            },
            {
              icon: Calendar,
              title: "Prise de rendez-vous",
              text: "Stecy transforme les demandes en rendez-vous.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <feature.icon size={32} className="mb-6" />
              <h3 className="text-2xl font-semibold">{feature.title}</h3>
              <p className="mt-4 text-white/60">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-white/40">
                Dashboard STECY
              </p>

              <h2 className="mt-3 max-w-3xl text-3xl font-bold md:text-5xl">
                Votre entreprise continue de répondre même hors horaires.
              </h2>
            </div>

            <div className="w-fit rounded-full bg-green-500/20 px-4 py-2 text-green-400">
              En ligne
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              { title: "Appels traités", value: "17" },
              { title: "Prospects qualifiés", value: "9" },
              { title: "Rendez-vous pris", value: "3" },
              { title: "Devis relancés", value: "12" },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-black p-6"
              >
                <p className="text-sm text-white/50">{item.title}</p>
                <p className="mt-4 text-5xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="rounded-3xl border border-white/10 bg-[#0f0f0f] p-8">
          <p className="mb-8 text-center text-sm uppercase tracking-[0.3em] text-white/40">
            Démonstration Stecy
          </p>

          <div className="space-y-4">
            <div className="max-w-sm rounded-2xl bg-white/10 p-4 text-white">
              Bonjour, je souhaite un devis pour une climatisation.
            </div>

            <div className="ml-auto max-w-sm whitespace-pre-line rounded-2xl bg-green-500 p-4 text-black">
              Bonjour 👋{"\n\n"}Je vais vous aider.{"\n\n"}Dans quelle ville
              êtes-vous situé ?
            </div>

            <div className="max-w-sm rounded-2xl bg-white/10 p-4 text-white">
              Cergy.
            </div>

            <div className="ml-auto max-w-sm whitespace-pre-line rounded-2xl bg-green-500 p-4 text-black">
              Parfait.{"\n\n"}Quel type de logement est concerné ?
            </div>

            <div className="max-w-sm rounded-2xl bg-white/10 p-4 text-white">
              Une maison.
            </div>

            <div className="ml-auto max-w-sm whitespace-pre-line rounded-2xl bg-green-500 p-4 text-black">
              Merci.{"\n\n"}Un technicien peut vous rappeler aujourd’hui.
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-10">
            <h2 className="text-3xl font-bold">Avant</h2>
            <ul className="mt-8 space-y-4 text-white/70">
              <li>❌ Appels manqués</li>
              <li>❌ WhatsApp oubliés</li>
              <li>❌ Prospects jamais relancés</li>
              <li>❌ Temps perdu</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-green-500/20 bg-green-500/5 p-10">
            <h2 className="text-3xl font-bold">Après</h2>
            <ul className="mt-8 space-y-4 text-white/70">
              <li>✅ Réponses instantanées</li>
              <li>✅ Qualification automatique</li>
              <li>✅ Relances automatiques</li>
              <li>✅ Plus de rendez-vous</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-black p-12 text-center">
          <h2 className="text-4xl font-bold md:text-6xl">
            Stecy travaille pendant votre sommeil.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-white/60 md:text-xl">
            Pendant que vous êtes occupé, Stecy répond aux prospects, qualifie
            les demandes et transforme vos opportunités en rendez-vous.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Installation en 72h</h2>
          <p className="mt-4 text-white/60">
            Une solution simple pour arrêter de perdre des prospects.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            {
              name: "Starter",
              price: "97€/mois",
              features: ["WhatsApp IA", "Capture prospects", "Notifications"],
            },
            {
              name: "Business",
              price: "297€/mois",
              features: [
                "Standard IA",
                "Relances automatiques",
                "CRM intelligent",
              ],
            },
            {
              name: "Domination",
              price: "Sur mesure",
              features: [
                "Multi-sites",
                "Automatisations avancées",
                "IA personnalisée",
              ],
            },
          ].map((plan, i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <p className="mt-4 text-4xl font-bold">{plan.price}</p>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 text-white/70"
                  >
                    <Check size={18} />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#rdv"
                className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-semibold text-black"
              >
                Commencer
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="rdv" className="mx-auto max-w-4xl px-6 py-32">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
          <h2 className="text-center text-4xl font-bold md:text-5xl">
            Recevez votre audit anti-perte de clients
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-white/60">
            Remplissez ce formulaire. Nous analysons vos points de perte :
            appels, WhatsApp, relances, devis et prospects oubliés.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 grid gap-4">
            <input
              required
              placeholder="Votre nom"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-xl border border-white/10 bg-black px-5 py-4 text-white outline-none"
            />

            <input
              placeholder="Entreprise"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="rounded-xl border border-white/10 bg-black px-5 py-4 text-white outline-none"
            />

            <input
              required
              placeholder="Téléphone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="rounded-xl border border-white/10 bg-black px-5 py-4 text-white outline-none"
            />

            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-xl border border-white/10 bg-black px-5 py-4 text-white outline-none"
            />

            <input
              placeholder="Secteur d’activité"
              value={form.sector}
              onChange={(e) => setForm({ ...form, sector: e.target.value })}
              className="rounded-xl border border-white/10 bg-black px-5 py-4 text-white outline-none"
            />

            <textarea
              placeholder="Quel est votre principal problème aujourd’hui ?"
              value={form.problem}
              onChange={(e) => setForm({ ...form, problem: e.target.value })}
              className="min-h-32 rounded-xl border border-white/10 bg-black px-5 py-4 text-white outline-none"
            />

            <button
              disabled={loading}
              className="mt-4 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-white/80 disabled:opacity-50"
            >
              {loading ? "Envoi en cours..." : "Recevoir mon audit gratuit"}
            </button>

            {success && (
              <p className="text-center text-green-400">
                Demande envoyée. Nous revenons vers vous rapidement.
              </p>
            )}

            {error && <p className="text-center text-red-400">{error}</p>}
          </form>
        </div>
      </section>
      <footer className="border-t border-white/10 px-6 py-10">
  <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
    <div>
      <p className="font-semibold text-white">SIMPLE ACL</p>
      <p className="mt-2">
        Stecy, réceptionniste IA 24h/24 pour ne plus perdre de clients.
      </p>
    </div>

    <div className="space-y-2 md:text-right">
      <p>
        Email :{" "}
        <a
          href="mailto:contact@simpleacl.com"
          className="text-white hover:underline"
        >
          contact@simpleacl.com
        </a>
      </p>

      <p>
        Téléphone :{" "}
        <a href="tel:+33185520084" className="text-white hover:underline">
          01 85 52 00 84
        </a>
      </p>

      <p className="text-white/40">
        © 2026 SIMPLE ACL. Tous droits réservés.
      </p>
    </div>
  </div>
</footer>
    </main>
  );
}
