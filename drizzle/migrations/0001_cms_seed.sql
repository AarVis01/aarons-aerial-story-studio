
insert into public.site_content (key, draft, published, published_at) values
('settings', $j${
 "brandName":"Aarons Visuals",
 "subtitle":"From Ground to Sky, Bring Your Vision to Life.",
 "logoUrl":"/media/brand/logo-mark.png",
 "logoAlt":"Aarons Visuals logo",
 "nav":[{"label":"Home","href":"/"},{"label":"Services","href":"/services"},{"label":"Portfolio","href":"/portfolio"},{"label":"About","href":"/about"},{"label":"Contact","href":"/contact"}],
 "ctaLabel":"Get a Quote",
 "ctaHref":"/contact#enquiry",
 "contact":{"email":"","phone":"","website":"","serviceArea":"North West London, London and surrounding areas"},
 "notificationEmail":"",
 "social":[{"label":"Instagram","url":"https://www.instagram.com/AaronsAerials1/"}],
 "footer":{"description":"Independent visual media and production — aerial filming, photography and commercial video for businesses, properties, brands and events.","navHeading":"Explore","servicesHeading":"Services","contactHeading":"Contact","privacyLabel":"Privacy Policy","copyrightName":"Aarons Visuals"},
 "seo":{"siteTitle":"Aarons Visuals","defaultDescription":"Cinematic drone filming, aerial photography and commercial videography in North West London and London.","ogImage":"/media/placeholders/hero.jpg"}
}$j$::jsonb, '{}'::jsonb, now()),
('home', $j${
 "sections":[{"id":"hero","visible":true},{"id":"intro","visible":true},{"id":"services","visible":true},{"id":"portfolio","visible":true},{"id":"showcase","visible":true},{"id":"about","visible":true},{"id":"process","visible":true},{"id":"contact","visible":true}],
 "hero":{"headline":"Visuals That Make an Impact.","supportingText":"Cinematic aerial, video and photography services for businesses, properties, brands and events.","primaryButtonLabel":"Explore Our Services","primaryButtonHref":"#services","secondaryButtonLabel":"View Our Work","secondaryButtonHref":"/portfolio","videoUrl":"","posterUrl":"/media/placeholders/hero.jpg","posterAlt":"Aerial view of a British home at sunset (placeholder image)","scrollLabel":"Scroll"},
 "intro":{"eyebrow":"Aarons Visuals","heading":"A visual production studio, from the ground to the sky.","text":"We combine aerial technology, professional cameras and modern editing to create cinematic content that helps businesses, properties and brands stand out."},
 "services":{"eyebrow":"Services","heading":"What We Do","text":"From the sky to the ground, we create professional visual content designed to showcase, promote and elevate your business.","buttonLabel":"All Services","buttonHref":"/services"},
 "portfolio":{"eyebrow":"Portfolio","heading":"Selected Work","text":"A selection of visual projects, created with precision, creativity and attention to detail.","buttonLabel":"View Full Portfolio","buttonHref":"/portfolio"},
 "showcase":{"eyebrow":"Commercial","heading":"Your Business, Seen Differently.","text":"Professional visual content that helps businesses showcase their spaces, products and services.","imageUrl":"/media/placeholders/commercial.jpg","imageAlt":"Commercial building at dusk (placeholder image)","ctaText":"Have a project in mind? Let’s create something exceptional.","buttonLabel":"Discuss Your Project","buttonHref":"/contact#enquiry"},
 "about":{"eyebrow":"About","heading":"Creative Vision. Professional Execution.","text":"Aarons Visuals is a growing independent creative brand serving London and the surrounding areas. We create cinematic visual content using aerial technology, professional cameras, photography and modern editing techniques.\n\nEvery project is tailored to its purpose, with careful attention to detail, professional presentation and clear, reliable communication from first conversation to final delivery.","imageUrl":"/media/placeholders/bts.jpg","imageAlt":"Videographer filming on location (placeholder image)","videoUrl":"","buttonLabel":"More About Us","buttonHref":"/about"},
 "process":{"eyebrow":"Process","heading":"How It Works","steps":[{"title":"Tell Us About Your Project","text":"Share your ideas, requirements, location and goals."},{"title":"Plan & Create","text":"Plan the production and capture the required footage or photography."},{"title":"Receive Your Content","text":"Receive professionally edited visuals prepared for their intended use."}]},
 "contact":{"eyebrow":"Contact","heading":"Let’s Bring Your Vision to Life.","text":"Whether you’re promoting a business, showcasing a property, filming a vehicle or planning an event, get in touch to discuss your project.","buttonLabel":"Get a Quote","buttonHref":"/contact#enquiry"},
 "seo":{"title":"Aarons Visuals — Drone Filming & Videography, North West London","description":"Cinematic drone filming, aerial photography, commercial videography and property media for businesses across North West London and London.","ogImage":"/media/placeholders/hero.jpg"}
}$j$::jsonb, '{}'::jsonb, now()),
('about', $j${
 "eyebrow":"About","heading":"Creative Vision. Professional Execution.",
 "intro":"Aarons Visuals is an independent visual media and production business based in North West London.",
 "body":"We create cinematic visual content using aerial technology, professional cameras, photography and modern editing techniques — for businesses, properties, brands and events.\n\nOur work is built on creativity, attention to detail and professional presentation. Every project is tailored to how the content will be used, whether that is a property listing, a brand film or a run of social media Reels.\n\nWe are a growing creative brand serving London and the surrounding areas, and we pride ourselves on clear, reliable communication from the first conversation to final delivery.",
 "imageUrl":"/media/placeholders/bts.jpg","imageAlt":"Behind the scenes on a shoot (placeholder image)","videoUrl":"",
 "valuesHeading":"What You Can Expect",
 "values":[{"title":"Creativity","text":"Considered, cinematic visuals designed around your goals."},{"title":"Attention to Detail","text":"Careful planning, framing and editing on every project."},{"title":"Tailored Content","text":"Deliverables prepared for the platforms you actually use."},{"title":"Reliable Communication","text":"Clear updates from first enquiry to final delivery."}],
 "buttonLabel":"Start a Project","buttonHref":"/contact#enquiry",
 "seo":{"title":"About — Aarons Visuals","description":"Independent visual production brand in North West London creating aerial, video and photography content.","ogImage":""}
}$j$::jsonb, '{}'::jsonb, now()),
('services_page', $j${"eyebrow":"Services","heading":"What We Do","text":"From the sky to the ground, we create professional visual content designed to showcase, promote and elevate your business.","ctaHeading":"Not sure what you need?","ctaText":"Tell us about your project and we’ll recommend the right approach.","ctaButtonLabel":"Get a Quote","ctaButtonHref":"/contact#enquiry","seo":{"title":"Services — Drone, Video & Photography | Aarons Visuals","description":"Aerial filming, commercial videography, property media, automotive, social media content, events and roof inspections in London.","ogImage":""}}$j$::jsonb, '{}'::jsonb, now()),
('portfolio_page', $j${"eyebrow":"Portfolio","heading":"Selected Work","text":"A selection of visual projects, created with precision, creativity and attention to detail.","allLabel":"All","emptyText":"No projects in this category yet.","seo":{"title":"Portfolio — Aarons Visuals","description":"Aerial, commercial, property, automotive and event visual projects by Aarons Visuals.","ogImage":""}}$j$::jsonb, '{}'::jsonb, now()),
('contact', $j${
 "eyebrow":"Contact","heading":"Let’s Bring Your Vision to Life.",
 "text":"Whether you’re promoting a business, showcasing a property, filming a vehicle or planning an event, get in touch to discuss your project.",
 "instagramLabel":"Follow on Instagram",
 "form":{"nameLabel":"Name","businessLabel":"Business name","emailLabel":"Email","phoneLabel":"Phone","serviceLabel":"Service required","locationLabel":"Project location","budgetLabel":"Budget","detailsLabel":"Project details","contactMethodLabel":"Preferred contact method","submitLabel":"Send Enquiry","sendingLabel":"Sending…","successMessage":"Thank you — your enquiry has been received. We’ll be in touch soon.","errorMessage":"Sorry, your enquiry could not be sent. Please try again in a moment.",
  "serviceOptions":["Aerial Filming & Drone Photography","Commercial Videography","Real Estate & Property Media","Automotive Photography & Videography","Social Media Content","Events & Weddings","Roof & Gutter Inspections","Other"],
  "budgetOptions":["Under £500","£500 – £1,000","£1,000 – £2,500","£2,500 – £5,000","£5,000+","Not sure yet"],
  "contactMethodOptions":["Email","Phone","WhatsApp"],
  "privacyNotice":"We only use your details to respond to your enquiry. See our Privacy Policy for more information."},
 "seo":{"title":"Contact & Quotes — Aarons Visuals","description":"Request a quote for drone filming, videography or photography in North West London and London.","ogImage":""}
}$j$::jsonb, '{}'::jsonb, now()),
('privacy', $j${"heading":"Privacy Policy","body":"This Privacy Policy explains how Aarons Visuals collects and uses personal information submitted through this website.\n\nWhat we collect\nWhen you submit an enquiry we collect the details you provide: your name, email address, and optionally your business name, phone number, project location, budget and project details.\n\nHow we use it\nWe use this information only to respond to your enquiry and to discuss, quote for and deliver your project. We do not sell your information or use it for unrelated marketing.\n\nHow long we keep it\nEnquiries are kept for as long as needed to handle your request and any resulting work, and are then deleted.\n\nYour rights\nUnder UK data protection law (UK GDPR) you can ask to access, correct or delete the personal information we hold about you. Contact us using the details on our Contact page.\n\nCookies\nThis website does not use advertising or tracking cookies.\n\nThis policy may be updated from time to time.","seo":{"title":"Privacy Policy — Aarons Visuals","description":"How Aarons Visuals handles personal information submitted through this website.","ogImage":""}}$j$::jsonb, '{}'::jsonb, now());

update public.site_content set published = draft;

insert into public.categories (slug, name, sort_order) values
('commercial','Commercial',1),('real-estate','Real Estate',2),('automotive','Automotive',3),('aerial','Aerial',4),('events','Events',5),('social-media','Social Media',6);

insert into public.services (slug,title,summary,body,image_url,image_alt,button_label,sort_order) values
('aerial-filming-drone-photography','Aerial Filming & Drone Photography','Professional aerial footage and photography for properties, commercial projects, landscapes and events, subject to applicable permissions and operating restrictions.','Aerial footage gives viewers a sense of scale, location and context that ground-level filming cannot. We capture smooth cinematic aerial video and high-resolution stills for properties, commercial sites, landscapes and events.\n\nAll flights are planned around applicable permissions, airspace and operating restrictions, and are subject to safe weather conditions.','/media/placeholders/hero.jpg','Aerial view of a house at sunset (placeholder)','View Service',1),
('commercial-videography','Commercial Videography','Cinematic promotional films, business videos, brand films and professional commercial content.','From short promotional edits to full brand films, we produce commercial video that presents your business professionally and tells its story clearly.\n\nEach production is planned around your audience and where the content will be used.','/media/placeholders/commercial.jpg','Commercial building at dusk (placeholder)','View Service',2),
('real-estate-property-media','Real Estate & Property Media','Property videos, aerial photography, cinematic walkthroughs and marketing visuals for estate agents, developers and property owners.','Strong visuals help a property stand out. We create property videos, aerial photography, cinematic walkthroughs and marketing stills for estate agents, developers and homeowners.','/media/placeholders/hero.jpg','British home from the air (placeholder)','View Service',3),
('automotive-photography-videography','Automotive Photography & Videography','Cinematic vehicle filming, automotive photography, dealership content and promotional films for automotive businesses.','We capture vehicles with cinematic lighting and movement — for dealerships, detailers, private owners and automotive brands.','/media/placeholders/auto.jpg','Sports car in a car park (placeholder)','View Service',4),
('social-media-content','Social Media Content','Instagram Reels, short-form videos and promotional photography designed for businesses and brands.','Short-form content built for Instagram, TikTok and other platforms — shot and edited in the right formats so it is ready to post.','/media/placeholders/restaurant.jpg','Chef plating food (placeholder)','View Service',5),
('events-weddings','Events & Weddings','Cinematic event coverage, photography and aerial footage where permitted and appropriate.','Cinematic coverage of events and weddings, with aerial footage where the venue, permissions and conditions allow.','/media/placeholders/events.jpg','Wedding venue from the air (placeholder)','View Service',6),
('roof-gutter-inspections','Roof & Gutter Inspections','Drone-assisted visual inspections of roofs, gutters and other difficult-to-access areas, subject to safe operating conditions and applicable requirements.','Drone-assisted visual inspections let you see roofs, gutters and other hard-to-reach areas clearly without ladders or scaffolding. You receive clear photographs and video of the areas inspected.\n\nInspections are visual only and are subject to safe operating conditions and applicable requirements.','/media/placeholders/roof.jpg','Top-down view of a terraced roof (placeholder)','View Service',7);

insert into public.projects (slug,title,short_description,full_description,thumbnail_url,thumbnail_alt,category_id,sort_order,featured,featured_order,status,is_placeholder) values
('sample-property-aerial','Sample Project — Property Aerial','Placeholder project. Replace with your real work from the dashboard.','This is placeholder content created during development to demonstrate the portfolio layout. It is not a real client project. Replace or delete it from the admin dashboard.','/media/placeholders/hero.jpg','Placeholder aerial property image',(select id from public.categories where slug='real-estate'),1,true,1,'published',true),
('sample-automotive','Sample Project — Automotive','Placeholder project. Replace with your real work from the dashboard.','This is placeholder content created during development to demonstrate the portfolio layout. It is not a real client project.','/media/placeholders/auto.jpg','Placeholder automotive image',(select id from public.categories where slug='automotive'),2,true,2,'published',true),
('sample-restaurant','Sample Project — Restaurant','Placeholder project. Replace with your real work from the dashboard.','This is placeholder content created during development to demonstrate the portfolio layout. It is not a real client project.','/media/placeholders/restaurant.jpg','Placeholder restaurant image',(select id from public.categories where slug='commercial'),3,true,3,'published',true),
('sample-event','Sample Project — Event','Placeholder project. Replace with your real work from the dashboard.','This is placeholder content created during development to demonstrate the portfolio layout. It is not a real client project.','/media/placeholders/events.jpg','Placeholder event image',(select id from public.categories where slug='events'),4,false,0,'published',true);

insert into public.project_media (project_id, kind, url, alt, sort_order)
select id, 'image', thumbnail_url, thumbnail_alt, 0 from public.projects;
insert into public.project_media (project_id, kind, url, alt, sort_order)
select id, 'image', '/media/placeholders/commercial.jpg', 'Placeholder image', 1 from public.projects;

insert into public.media_assets (path,url,kind,mime,alt) values
('brand/logo-mark.png','/media/brand/logo-mark.png','image','image/png','Aarons Visuals logo mark'),
('brand/logo-full.jpg','/media/brand/logo-full.jpg','image','image/jpeg','Aarons Visuals full logo'),
('placeholders/hero.jpg','/media/placeholders/hero.jpg','image','image/jpeg','Placeholder: aerial house'),
('placeholders/auto.jpg','/media/placeholders/auto.jpg','image','image/jpeg','Placeholder: car'),
('placeholders/restaurant.jpg','/media/placeholders/restaurant.jpg','image','image/jpeg','Placeholder: chef'),
('placeholders/bts.jpg','/media/placeholders/bts.jpg','image','image/jpeg','Placeholder: behind the scenes'),
('placeholders/events.jpg','/media/placeholders/events.jpg','image','image/jpeg','Placeholder: wedding venue'),
('placeholders/roof.jpg','/media/placeholders/roof.jpg','image','image/jpeg','Placeholder: roof'),
('placeholders/commercial.jpg','/media/placeholders/commercial.jpg','image','image/jpeg','Placeholder: office building');
