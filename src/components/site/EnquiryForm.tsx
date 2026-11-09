import { useRef, useState, type FormEvent } from "react";
import { submitEnquiry } from "@/lib/enquiry.functions";
import { enquirySchema } from "@/lib/enquiry-schema";
import { SmartLink } from "./SmartLink";
import { Button } from "@/components/ui/button";
import { TermsAgreement } from "./TermsAgreement";
import { TERMS_VERSION } from "@/lib/terms";
import { useServerFn } from "@tanstack/react-start";

/* eslint-disable @typescript-eslint/no-explicit-any */
const field = "w-full rounded-sm border border-input bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-foreground";

export function EnquiryForm({ f }: { f: any }) {
  const started = useRef(Date.now());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsReadToEnd, setTermsReadToEnd] = useState(false);
  const sendEnquiry = useServerFn(submitEnquiry);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!termsAccepted || !termsReadToEnd) {
      setErrors({ termsAccepted: "Please open the Terms & Conditions, read to the end and agree before submitting." });
      return;
    }
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const input = { ...raw, startedAt: started.current, termsAccepted, termsReadToEnd, termsVersion: TERMS_VERSION };
    const parsed = enquirySchema.safeParse(input);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const i of parsed.error.issues) errs[String(i.path[0])] ??= i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setState("sending");
    try {
      const res = await sendEnquiry({ data: parsed.data });
      if (res.ok) {
        setState("done");
        form.reset();
      } else {
        setState("error");
        setMsg(res.error);
      }
    } catch {
      setState("error");
      setMsg(f.errorMessage);
    }
  }

  if (state === "done") {
    return <div role="status" className="rounded-sm border border-border bg-card p-8 text-lg">{f.successMessage}</div>;
  }

  const Err = ({ n }: { n: string }) => (errors[n] ? <p className="mt-1.5 text-xs text-destructive">{errors[n]}</p> : null);
  const L = ({ n, children, req }: { n: string; children: string; req?: boolean }) => (
    <label htmlFor={`enq-${n}`} className="mb-2 block text-xs uppercase tracking-[0.15em] text-muted-foreground">{children}{req && " *"}</label>
  );
  const Sel = ({ n, label, options }: { n: string; label: string; options?: string[] }) => (
    <div>
      <L n={n}>{label}</L>
      <select id={`enq-${n}`} name={n} className={field} defaultValue="">
        <option value="">Select…</option>
        {(options ?? []).map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 md:grid-cols-2">
      <div><L n="name" req>{f.nameLabel}</L><input id="enq-name" name="name" autoComplete="name" className={field} aria-invalid={!!errors["name"]} /><Err n="name" /></div>
      <div><L n="businessName">{f.businessLabel}</L><input id="enq-businessName" name="businessName" autoComplete="organization" className={field} /></div>
      <div><L n="email" req>{f.emailLabel}</L><input id="enq-email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors["email"]} /><Err n="email" /></div>
      <div><L n="phone">{f.phoneLabel}</L><input id="enq-phone" name="phone" type="tel" autoComplete="tel" className={field} /><Err n="phone" /></div>
      <Sel n="service" label={f.serviceLabel} options={f.serviceOptions} />
      <div><L n="location" req>{f.locationLabel}</L><input id="enq-location" name="location" className={field} aria-invalid={!!errors["location"]} /><Err n="location" /></div>
      <Sel n="budget" label={f.budgetLabel} options={f.budgetOptions} />
      <Sel n="contactMethod" label={f.contactMethodLabel} options={f.contactMethodOptions} />
      <div className="md:col-span-2"><L n="details" req>{f.detailsLabel}</L><textarea id="enq-details" name="details" rows={6} className={field} aria-invalid={!!errors["details"]} /><Err n="details" /></div>
      <div className="absolute -left-[9999px]" aria-hidden><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="md:col-span-2">
        <TermsAgreement accepted={termsAccepted} onAcceptedChange={setTermsAccepted} onReadEnd={() => setTermsReadToEnd(true)} />
        <Err n="termsAccepted" />
      </div>
      <div className="md:col-span-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-md text-xs text-muted-foreground">{f.privacyNotice} <SmartLink href="/privacy" className="underline">Privacy Policy</SmartLink></p>
        <Button type="submit" disabled={state === "sending" || !termsAccepted || !termsReadToEnd} className="h-auto whitespace-normal rounded-sm bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground disabled:opacity-60">
          {state === "sending" ? f.sendingLabel : f.submitLabel}
        </Button>
      </div>
      {state === "error" && <p role="alert" className="md:col-span-2 text-sm text-destructive">{msg || f.errorMessage}</p>}
    </form>
  );
}
