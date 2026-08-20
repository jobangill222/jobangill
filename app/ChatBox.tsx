"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type ChatOption = { label: string; next?: string };
type ChatNode = { question: string; options: ChatOption[] };
type ChatEntry = { question: string; answer: string };
type Phase = "questions" | "details" | "success";

const chatTree: Record<string, ChatNode> = {
  start: {
    question: "What would you like to discuss?",
    options: [
      { label: "Make a website", next: "website" },
      { label: "Get project estimation", next: "estimate" },
      { label: "Develop a mobile application", next: "mobile" },
      { label: "Become a partner", next: "partner" },
    ],
  },
  website: {
    question: "What kind of website do you need?",
    options: [
      { label: "Business website", next: "websiteGoal" },
      { label: "E-commerce store", next: "websiteGoal" },
      { label: "SaaS / web application", next: "websiteGoal" },
      { label: "Portfolio / landing page", next: "websiteGoal" },
    ],
  },
  websiteGoal: {
    question: "Which outcome matters most?",
    options: [
      { label: "Generate more leads" },
      { label: "Sell products online" },
      { label: "Automate business operations" },
      { label: "Launch an MVP" },
    ],
  },
  estimate: {
    question: "What would you like estimated?",
    options: [
      { label: "A new project", next: "estimateType" },
      { label: "New features", next: "estimateType" },
      { label: "Redesign or rebuild", next: "estimateType" },
      { label: "Maintenance and support", next: "estimateType" },
    ],
  },
  estimateType: {
    question: "What kind of estimate would help you?",
    options: [
      { label: "Quick budget range" },
      { label: "Scope and timeline" },
      { label: "Detailed technical proposal" },
      { label: "Discovery consultation" },
    ],
  },
  mobile: {
    question: "What type of mobile app are you considering?",
    options: [
      { label: "iOS application", next: "mobileStage" },
      { label: "Android application", next: "mobileStage" },
      { label: "Cross-platform application", next: "mobileStage" },
      { label: "I’m not sure yet", next: "mobileStage" },
    ],
  },
  mobileStage: {
    question: "Where is the project currently?",
    options: [
      { label: "Idea stage" },
      { label: "Designs are ready" },
      { label: "Backend already exists" },
      { label: "Improving an existing app" },
    ],
  },
  partner: {
    question: "What kind of partnership interests you?",
    options: [
      { label: "Product partnership", next: "partnerModel" },
      { label: "Agency collaboration", next: "partnerModel" },
      { label: "Long-term development", next: "partnerModel" },
      { label: "Something else", next: "partnerModel" },
    ],
  },
  partnerModel: {
    question: "How would you like us to work together?",
    options: [
      { label: "White-label delivery" },
      { label: "Dedicated development support" },
      { label: "Build a product together" },
      { label: "Open to ideas" },
    ],
  },
};

export function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [nodeId, setNodeId] = useState("start");
  const [phase, setPhase] = useState<Phase>("questions");
  const [transcript, setTranscript] = useState<ChatEntry[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [transcript, phase, error]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const chooseOption = (option: ChatOption) => {
    const currentNode = chatTree[nodeId];
    setTranscript((entries) => [...entries, { question: currentNode.question, answer: option.label }]);
    if (option.next) setNodeId(option.next);
    else setPhase("details");
  };

  const resetChat = () => {
    setNodeId("start");
    setPhase("questions");
    setTranscript([]);
    setError("");
    setIsSending(false);
  };

  const submitEnquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setIsSending(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(formData), transcript, source: "guided-chat" }),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Unable to send your enquiry.");
      form.reset();
      setPhase("success");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const currentNode = chatTree[nodeId];

  return (
    <div className="guided-chat">
      {isOpen && (
        <section className="chat-panel" aria-label="Project enquiry chat">
          <header className="chat-header">
            <div>
              <span className="chat-status-dot" aria-hidden="true" />
              <div><strong>Let&apos;s build something</strong><span>Guided project enquiry</span></div>
            </div>
            <button type="button" className="chat-close" onClick={() => setIsOpen(false)} aria-label="Close chat">×</button>
          </header>

          <div className="chat-content" ref={scrollRef}>
            <div className="chat-message chat-message-bot">Hi! I&apos;ll ask a few quick questions to understand what you need.</div>

            {transcript.map((entry, index) => (
              <div className="chat-exchange" key={`${entry.question}-${index}`}>
                <div className="chat-message chat-message-bot">{entry.question}</div>
                <div className="chat-message chat-message-user">{entry.answer}</div>
              </div>
            ))}

            {phase === "questions" && (
              <div className="chat-step">
                <div className="chat-message chat-message-bot">{currentNode.question}</div>
                <div className="chat-options">
                  {currentNode.options.map((option) => (
                    <button type="button" key={option.label} onClick={() => chooseOption(option)}>{option.label}<span aria-hidden="true">→</span></button>
                  ))}
                </div>
              </div>
            )}

            {phase === "details" && (
              <div className="chat-step">
                <div className="chat-message chat-message-bot">Great. Share your details and describe the idea in your own words.</div>
                <form className="chat-details-form" onSubmit={submitEnquiry}>
                  <label htmlFor="chat-name">Name</label>
                  <input id="chat-name" name="name" type="text" minLength={2} maxLength={80} autoComplete="name" required placeholder="Your name" />

                  <label htmlFor="chat-contact">Phone or email</label>
                  <input id="chat-contact" name="contact" type="text" maxLength={120} required placeholder="How should I reach you?" />

                  <label htmlFor="chat-description">Project details</label>
                  <textarea id="chat-description" name="description" rows={5} minLength={10} maxLength={2000} required placeholder="Tell me about your goals, timeline, features, or anything else…" />

                  <div className="form-honeypot" aria-hidden="true">
                    <label htmlFor="chat-website">Website</label>
                    <input id="chat-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  <button type="submit" disabled={isSending}>{isSending ? "Sending…" : "Submit enquiry"}<span aria-hidden="true">↗</span></button>
                  {error && <p className="chat-error" role="alert">{error}</p>}
                </form>
              </div>
            )}

            {phase === "success" && (
              <div className="chat-success">
                <span aria-hidden="true">✓</span>
                <h3>Enquiry sent</h3>
                <p>Thanks! I&apos;ve received the complete conversation and your project details.</p>
                <button type="button" onClick={resetChat}>Start another enquiry</button>
              </div>
            )}
          </div>
        </section>
      )}

      <button className="chat-launcher" type="button" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-label={isOpen ? "Close project chat" : "Open project chat"}>
        <span className="chat-launcher-icon" aria-hidden="true">{isOpen ? "×" : "↗"}</span>
        <span>{isOpen ? "Close" : "Let’s chat"}</span>
      </button>
    </div>
  );
}
