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

const PHONE_DISPLAY = "01 85 52 00 84";
const PHONE_LINK = "tel:+33185520084";
const AI_HOURLY_RATE = 10;

const features = [
  {
    icon: PhoneCall,
    title: "Réponse aux appels",
    text: "Stecy accueille vos prospects même lorsque vous n’êtes pas disponible.",
  },
  {
    icon: MessageSquare,
    title: "Messages qualifiés",
    text: "Elle récupère les informations utiles pour comprendre la demande.",
  },
  {
    icon: Bot,
    title: "Transcription intelligente",
    text: "Les messages vocaux peuvent être transcrits et envoyés automatiquement.",
  },
  {
    icon: Calendar,
    title: "Prise de contact rapide",
    text: "Vous recevez un lead clair pour rappeler au bon moment.",
  },
];

const dashboardItems = [
  { title: "Appels traités", value: "17" },
  { title: "Prospects qualifiés", value: "9" },
  { title: "Rendez-vous pris", value: "3" },
  { title: "Devis relancés", value: "12" },
];

const plans = [
  {
    name: "Starter",
    price: "97€/mois",
    basePrice: 97,
    features: ["Démo vocale", "Capture prospects", "Notifications email"],
  },
  {
    name: "Business",
    price: "297€/mois",
    basePrice: 297,
    features: ["Standard IA", "Relances automatiques", "CRM intelligent"],
  },
  {
    name: "Domination",
    price: "Sur mesure",
    basePrice: null,
    features: ["Multi-sites", "Automatisations avancées", "IA personnalisée"],
  },
];

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    sector: "",
    problem: "",
    inboundHours: "",
    outboundHours: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const inboundHours = Number(form.inboundHours) || 0;
  const outboundHours = Number(form.outboundHours) || 0;
  const totalCallHours = inboundHours + outboundHours;
  const estimatedAiCost = totalCallHours * AI_HOURLY_RATE;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      setLoading(false);
      setError("Configuration Supabase manquante.");
      return;
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { error } = await supabase.from("leads").insert([
      {
        name: form.name,
        company: form.company,
        phone: form.phone,
        email: form.email,
        sector: form.sector,
        problem: form.problem,
        inbound_hours: inboundHours,
        outbound_hours: outboundHours,
        estimated_total_hours: totalCallHours,
        estimated_ai_cost: estimatedAiCost,
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
      inboundHours: "",
      outboundHours: "",
    });
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-xl font-bold tracking-tight">SIMPLE ACL</div>

          <div className="flex items-center gap-3">
            <a
              href={PHONE_LINK}
              className="hidden text-sm text-white/60 transition hover:text-white md:block"
            >
              {PHONE_DISPLAY}
            </a>

            <a
              href="#rdv"
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/80"
            >
              Tester Stecy
            </a>
          </div>
        </div>
      </nav>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_42%)]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-6xl"
        >
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
            STECY • L’assistante IA qui répond quand vous ne pouvez pas
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Ne perdez plus jamais un client parce que vous n’avez pas répondu à
            temps.
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg text-white/70 md:text-xl">
            Stecy accueille vos appels, qualifie vos prospects et transmet les
            demandes importantes pour que vous repreniez la main au bon moment.
          </p>

          <div className="mt-10 flex justify-center">
            <a
              href="#rdv"
              className="flex items-center gap-2 rounded-full bg-white px-9 py-5 text-lg font-semibold text-black transition hover:bg-white/80"
            >
              Tester Stecy gratuitement
              <ArrowRight size={20} />
            </a>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-white/50">
              Démo vocale disponible maintenant
            </p>

            <a
              href={PHONE_LINK}
              className="mt-2 inline-block text-2xl font-bold text-white transition hover:underline"
            >
              Appelez Stecy : {PHONE_DISPLAY}
            </a>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 text-sm text-white/50 md:flex-row">
            <span>✅ Démo vocale réelle</span>
            <span className="hidden md:block">•</span>
            <span>✅ Message transcrit automatiquement</span>
            <span className="hidden md:block">•</span>
            <span>✅ Lead reçu par email</span>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-3xl font-bold">24h/24</p>
              <p className="mt-2 text-sm text-white/50">
                réponse aux prospects
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-3xl font-bold">72h</p>
              <p className="mt-2 text-sm text-white/50">
                installation possible
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-3xl font-bold">10€/h</p>
              <p className="mt-2 text-sm text-white/50">
                consommation IA refacturée
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="demo" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
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
            {dashboardItems.map((item) => (
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

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-[#0f0f0f] p-8">
            <p className="mb-8 text-sm uppercase tracking-[0.3em] text-white/40">
              Démo conversation
            </p>

            <div className="space-y-4">
              <div className="max-w-sm rounded-2xl bg-white/10 p-4 text-white">
                Bonjour, je souhaite un devis pour une climatisation.
              </div>

              <div className="ml-auto max-w-sm whitespace-pre-line rounded-2xl bg-green-500 p-4 text-black">
                Bonjour 👋{"\n\n"}Je vais vous aider. Dans quelle ville
                êtes-vous situé ?
              </div>

              <div className="max-w-sm rounded-2xl bg-white/10 p-4 text-white">
                Cergy. C’est pour une maison.
              </div>

              <div className="ml-auto max-w-sm whitespace-pre-line rounded-2xl bg-green-500 p-4 text-black">
                Très bien.{"\n\n"}Votre demande est prioritaire. Un conseiller
                peut vous rappeler aujourd’hui.
              </div>

              <div className="max-w-sm rounded-2xl bg-white/10 p-4 text-white">
                Oui, idéalement cet après-midi.
              </div>

              <div className="ml-auto max-w-sm whitespace-pre-line rounded-2xl bg-green-500 p-4 text-black">
                Parfait.{"\n\n"}Votre demande est enregistrée. L’équipe reçoit
                votre fiche prospect maintenant.
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="mb-8 text-sm uppercase tracking-[0.3em] text-white/40">
              Fiche prospect générée
            </p>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black p-5">
                <p className="text-sm text-white/40">Statut</p>
                <p className="mt-2 text-2xl font-bold text-green-400">
                  Prospect chaud
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black p-5">
                <p className="text-sm text-white/40">Besoin détecté</p>
                <p className="mt-2 text-white/80">
                  Devis climatisation pour maison à Cergy
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black p-5">
                <p className="text-sm text-white/40">Action recommandée</p>
                <p className="mt-2 text-white/80">
                  Rappel aujourd’hui + proposition de rendez-vous
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black p-5">
                <p className="text-sm text-white/40">Résultat</p>
                <p className="mt-2 text-white/80">
                  Lead qualifié, résumé envoyé, relance prête.
                </p>
              </div>
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
            Pendant que vous êtes occupé, Stecy accueille les prospects,
            qualifie les demandes et vous transmet les opportunités importantes.
          </p>

          <a
            href="#rdv"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-black transition hover:bg-white/80"
          >
            Tester Stecy gratuitement
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Installation en 72h</h2>
          <p className="mt-4 text-white/60">
            Une offre simple, avec une consommation IA estimée selon votre
            volume d’appels.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const totalEstimated =
              plan.basePrice !== null ? plan.basePrice + estimatedAiCost : null;

            return (
              <div
                key={plan.name}
                className="rounded-3xl border border-white/10 bg-white/5 p-8"
              >
                <h3 className="text-2xl font-bold">{plan.name}</h3>

                <p className="mt-4 text-4xl font-bold">{plan.price}</p>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black p-4">
                  <p className="text-sm text-white/50">
                    Surcoût IA estimé
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    + {estimatedAiCost}€/mois
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    {totalCallHours}h estimées × {AI_HOURLY_RATE}€/h.
                  </p>

                  {totalEstimated !== null && (
                    <p className="mt-3 text-sm text-white/70">
                      Total estimé :{" "}
                      <span className="font-semibold text-white">
                        {totalEstimated}€/mois
                      </span>
                    </p>
                  )}
                </div>

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
                  Tester Stecy
                </a>
              </div>
            );
          })}
        </div>
      </section>

      <section id="rdv" className="mx-auto max-w-4xl px-6 py-32">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
          <h2 className="text-center text-4xl font-bold md:text-5xl">
            Testez Stecy sur votre entreprise
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-white/60">
            Décrivez votre activité et estimez votre volume d’appels. Nous vous
            montrons concrètement comment Stecy pourrait répondre, qualifier et
            relancer vos prospects à votre place.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black p-5 text-center">
            <p className="text-sm text-white/50">
              Vous pouvez aussi appeler la démo vocale :
            </p>
            <a
              href={PHONE_LINK}
              className="mt-2 inline-block text-2xl font-bold text-white hover:underline"
            >
              {PHONE_DISPLAY}
            </a>
          </div>

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

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="number"
                min="0"
                step="0.5"
                placeholder="Heures d’appels entrants / mois"
                value={form.inboundHours}
                onChange={(e) =>
                  setForm({ ...form, inboundHours: e.target.value })
                }
                className="rounded-xl border border-white/10 bg-black px-5 py-4 text-white outline-none"
              />

              <input
                type="number"
                min="0"
                step="0.5"
                placeholder="Heures d’appels sortants / mois"
                value={form.outboundHours}
                onChange={(e) =>
                  setForm({ ...form, outboundHours: e.target.value })
                }
                className="rounded-xl border border-white/10 bg-black px-5 py-4 text-white outline-none"
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-black p-5 text-center">
              <p className="text-sm text-white/50">
                Estimation du surcoût IA refacturé
              </p>
              <p className="mt-2 text-3xl font-bold text-white">
                {estimatedAiCost}€/mois
              </p>
              <p className="mt-2 text-sm text-white/40">
                {totalCallHours}h estimées × {AI_HOURLY_RATE}€/h
              </p>
            </div>

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
              {loading ? "Envoi en cours..." : "Tester Stecy gratuitement"}
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
              Démo vocale Stecy :{" "}
              <a href={PHONE_LINK} className="text-white hover:underline">
                {PHONE_DISPLAY}
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