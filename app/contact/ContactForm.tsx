"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to send your message.");
      }

      form.reset();
      setStatus("success");
      setMessage("Thanks — your message has been sent. I’ll get back to you soon.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" type="text" autoComplete="name" minLength={2} maxLength={80} required placeholder="John Smith" />
      </div>

      <div className="form-field">
        <label htmlFor="contact">Phone or email</label>
        <input id="contact" name="contact" type="text" maxLength={120} required placeholder="john@example.com or +91 98765 43210" />
      </div>

      <div className="form-field">
        <label htmlFor="description">Tell me about your project</label>
        <textarea id="description" name="description" rows={7} minLength={10} maxLength={2000} required placeholder="A short description of what you’d like to build…" />
        <span>10–2,000 characters</span>
      </div>

      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button className="contact-submit" type="submit" disabled={status === "sending"}>
        <span>{status === "sending" ? "Sending…" : "Send message"}</span>
        <span aria-hidden="true">↗</span>
      </button>

      {message && (
        <p className={`form-message form-message-${status}`} role="status" aria-live="polite">
          {message}
        </p>
      )}
    </form>
  );
}
