/** Fixed business contact details, used as defaults wherever the CMS value is empty. */
export const BUSINESS_EMAIL = "info@aaronsvisuals.co.uk";
export const BUSINESS_PHONE = "+44 7354 740445";
export const INSTAGRAM_HANDLE = "@AaronsVisualsUK";
export const INSTAGRAM_URL = "https://www.instagram.com/AaronsVisualsUK/";

/** Phone number in tel: link form (no spaces). */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/* eslint-disable @typescript-eslint/no-explicit-any */
/** Social links from settings, with every Instagram link pointed at the official profile. */
export function socialLinks(social: any[] | undefined): { label: string; url: string; instagram: boolean }[] {
  const list = (social ?? []).map((so: any) => {
    const instagram = /instagram/i.test(so?.url ?? "") || /instagram/i.test(so?.label ?? "");
    return { label: so?.label ?? "", url: instagram ? INSTAGRAM_URL : so?.url ?? "", instagram };
  });
  if (!list.some((x) => x.instagram)) list.push({ label: "Instagram", url: INSTAGRAM_URL, instagram: true });
  return list;
}
