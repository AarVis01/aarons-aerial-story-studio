export async function notifyNewEnquiry(args: {
  to: string;
  enquiryId: string;
  enquiry: Record<string, string | undefined>;
}): Promise<"sent" | "not_configured" | "failed"> {
  try {
    const res = await fetch("https://web3forms.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "0c90495c-d1c4-4b27-ba0b-880dc5545d39",
        subject: `New Quote Request from ${args.enquiry.name || "Website"}`,
        from_name: "Aaron's Visuals Website",
        replyto: args.enquiry.email,
        ...args.enquiry,
      }),
    });

    const data = await res.json();
    return data.success ? "sent" : "failed";
  } catch (err) {
    console.error("Web3Forms server delivery failed:", err);
    return "failed";
  }
}
