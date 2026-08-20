import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Jobanpreet Singh",
  description: "Contact Jobanpreet Singh about full stack development, SaaS, AI media, and web application projects.",
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <header className="contact-page-header">
        <Link className="brand" href="/" aria-label="Jobanpreet Singh, home">
          <Image className="brand-image" src="/profile_image.jpeg" alt="" width={40} height={40} priority />
          <strong>Jobanpreet Singh</strong>
        </Link>
        <div className="header-actions">
          <ThemeToggle />
          <Link className="back-link" href="/">← Back home</Link>
        </div>
      </header>

      <div className="contact-page-grid">
        <section className="contact-copy">
          <p className="eyebrow">Start a conversation</p>
          <h1>Have an idea?<br /><em>Let&apos;s talk.</em></h1>
          <p className="contact-intro">
            Tell me what you&apos;re building, where you&apos;re stuck, or what you want to improve. I&apos;ll reply with a clear next step.
          </p>

          <div className="contact-direct">
            <span>Prefer to reach me directly?</span>
            <a href="mailto:jobangill222@gmail.com">jobangill222@gmail.com</a>
          </div>
        </section>

        <section className="contact-form-panel" aria-label="Contact form">
          <div className="form-heading">
            <span>Project enquiry</span>
            <span>Your details stay private</span>
          </div>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
