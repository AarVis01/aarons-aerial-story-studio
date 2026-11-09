import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { CLIENT_TERMS } from "@/lib/terms";

export function TermsAgreement({ accepted, onAcceptedChange, onReadEnd }: {
  accepted: boolean;
  onAcceptedChange: (accepted: boolean) => void;
  onReadEnd: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false);

  function agree(checked: boolean | "indeterminate") {
    if (reachedEnd) onAcceptedChange(checked === true);
  }

  return <>
    <div className="flex items-start gap-3">
      <Checkbox id="enquiry-terms" checked={accepted} disabled={!reachedEnd} onCheckedChange={agree} className="mt-1" />
      <div className="text-sm">
        <label htmlFor="enquiry-terms">I have read and agree to the </label>
        <Button type="button" variant="link" className="h-auto whitespace-normal p-0 text-legal-link underline" onClick={() => setOpen(true)}>Terms &amp; Conditions</Button>
        <span aria-hidden> *</span>
      </div>
    </div>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl flex-col gap-4 p-5 sm:p-6">
        <DialogTitle className="pr-6 tracking-normal">Client Terms &amp; Conditions</DialogTitle>
        <DialogDescription>Last updated: 9 November 2026</DialogDescription>
        <div role="region" aria-label="Terms and conditions text" tabIndex={0} className="min-h-0 flex-1 overflow-y-auto overscroll-contain border-y border-border py-4" onScroll={(event) => {
          const el = event.currentTarget;
          if (el.scrollTop > 0 && el.scrollTop + el.clientHeight >= el.scrollHeight - 2) {
            setReachedEnd(true);
            onReadEnd();
          }
        }}>
          <div className="whitespace-pre-wrap text-sm leading-7">{CLIENT_TERMS}</div>
        </div>
        <div className="flex shrink-0 items-start gap-3">
          <Checkbox id="terms-dialog-agree" checked={accepted} disabled={!reachedEnd} onCheckedChange={agree} className="mt-1" />
          <label htmlFor="terms-dialog-agree" className="text-sm leading-6">I have read, understood and agree to these Terms &amp; Conditions.</label>
        </div>
        <Button type="button" disabled={!accepted} onClick={() => setOpen(false)}>Continue to enquiry</Button>
      </DialogContent>
    </Dialog>
  </>;
}