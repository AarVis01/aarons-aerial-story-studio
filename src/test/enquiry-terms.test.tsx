import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TermsAgreement } from "@/components/site/TermsAgreement";
import { enquirySchema } from "@/lib/enquiry-schema";
import { TERMS_VERSION } from "@/lib/terms";

const input = { name: "Test", email: "test@example.com", location: "London", details: "A filming enquiry", startedAt: 0, termsAccepted: true, termsReadToEnd: true, termsVersion: TERMS_VERSION };

describe("Mandatory enquiry consent", () => {
  it("rejects an enquiry without explicit agreement", () => {
    expect(enquirySchema.safeParse({ ...input, termsAccepted: false }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...input, termsAccepted: undefined }).success).toBe(false);
  });
  it("rejects agreement without reading to the end", () => {
    expect(enquirySchema.safeParse({ ...input, termsReadToEnd: false }).success).toBe(false);
  });
  it("only accepts the current terms version", () => {
    expect(enquirySchema.safeParse({ ...input, termsVersion: "2026-11-08" }).success).toBe(false);
    expect(enquirySchema.safeParse(input).success).toBe(true);
  });
  it("requires opening and scrolling before ticking agreement", () => {
    const accepted = vi.fn();
    const readEnd = vi.fn();
    render(<TermsAgreement accepted={false} onAcceptedChange={accepted} onReadEnd={readEnd} />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Terms & Conditions" }));
    const checkbox = screen.getByRole("checkbox", { name: "I have read, understood and agree to these Terms & Conditions." });
    expect(checkbox).toBeDisabled();
    const region = screen.getByRole("region");
    Object.defineProperties(region, { clientHeight: { value: 100 }, scrollHeight: { value: 1000 }, scrollTop: { value: 400, writable: true } });
    fireEvent.scroll(region);
    expect(checkbox).toBeDisabled();
    region.scrollTop = 900;
    fireEvent.scroll(region);
    expect(checkbox).toBeEnabled();
    fireEvent.click(checkbox);
    expect(readEnd).toHaveBeenCalled();
    expect(accepted).toHaveBeenCalledWith(true);
  });
});