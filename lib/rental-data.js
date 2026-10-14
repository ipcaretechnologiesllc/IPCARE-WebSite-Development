// Equipment Rental Hub data — categories, products, bundles.

import { RENTAL_REGION } from '@/lib/seo-region'

const LAPTOP_IMG = 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853'
const TABLET_IMG = 'https://images.unsplash.com/photo-1561154464-82e9adf32764'
const PRINTER_IMG = 'https://images.unsplash.com/photo-1650094980833-7373de26feb6'
const ROUTER_IMG = 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2'
const SERVER_IMG = 'https://images.unsplash.com/photo-1695668548342-c0c1ad479aee'
const SWITCH_IMG = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64'
const TESTER_IMG = 'https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf'
const BUNDLE_IMG = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'

const P = (slug, brand, model, specs, fullSpecs, rates, image, images) => ({ slug, brand, model, specs, fullSpecs, rates, image, ...(images ? { images } : {}) })

export const rentalCategories = {
  'laptops-desktops': {
    name: 'Laptops & Desktops',
    icon: 'Laptop',
    keyword: 'Laptop Rental UAE',
    // Search Console: /rental/laptops-desktops was also ranking (at 30-60) for iMac and
    // MacBook queries that /rental/macbooks already ranks for at 5-15, splitting the
    // signal. Title and description now lead with Windows business laptops and the
    // cities people search ("laptop rental dubai", pos 37); Mac demand goes to macbooks.
    title: 'Laptop Rental Dubai & Abu Dhabi: Dell, HP, ThinkPad | IP Care',
    metaDescription: `Business laptop and desktop rental in ${RENTAL_REGION.prose}. Dell, HP and Lenovo ThinkPad, daily to monthly, delivery and setup included.`,
    description: 'Enterprise-grade laptops and desktops for events, training, projects and temporary staff. All units are configured to customer spec, delivered and set up.',
    content: {
      intro: 'Renting laptops for a fixed window — an event, a training room, a project team, a wave of temporary staff — is a different problem from buying them. The units have to arrive imaged to your standard build, joined to your domain or enrolled in your MDM, and working on day one, because there is no week of IT setup before the people who need them turn up.',
      sections: [
        {
          h2: 'Imaged to your build, not a factory default',
          body: [
            'A laptop out of the box is not a laptop your users can work on. We image rented machines to your standard operating environment, join them to your domain or Entra ID tenant, or enrol them in Intune, and load the applications your team actually needs. That work happens before delivery, so the fleet lands ready rather than as fifty setup jobs for your helpdesk.',
            'Windows and macOS are both in stock. Where a project mixes the two — developers on MacBooks, back office on Windows — a single order covers both rather than splitting across suppliers.',
          ],
        },
        {
          // "i5 laptop rental" (pos 7.6) and "i7 laptop rental" (pos 14.5) in the 28 days to
          // 2026-10-09 (UAE). The heading now uses those terms and the table maps each
          // tier to the models actually in the fleet below, with their listed day rates.
          h2: 'Core i5 vs i7 laptops for rent: matched to the workload',
          body: [
            'The right machine depends on the work. An i5 with 16 GB is the sensible specification for registration desks, training rooms and general office use, and rents for meaningfully less than an i7. An i7 or Core Ultra with 32 GB is what CAD, data analysis and development actually need. Ordering the high-end machine for reception, or the entry machine for an engineer, both cost you — one in money, the other in a frustrated user.',
            'Tell us the workload rather than the model and we will match it. The fleet spans Dell Latitude and OptiPlex, HP EliteBook, Lenovo ThinkPad and Apple, so the recommendation is not constrained to one brand.',
          ],
          table: {
            caption: 'Laptop and desktop rental tiers by processor, with typical use and day rate',
            columns: ['Tier', 'Typical use', 'In the fleet', 'From (per day)'],
            rows: [
              ['Core i5 · 16 GB', 'Registration desks, training rooms, general office work', 'Core i5 business laptops (ask for current models), and the Dell OptiPlex 7020 Micro desktop (Core i5-14500)', 'AED 110'],
              ['Core i7 / Ryzen 7 · 16–32 GB', 'Project teams, finance, heavier multitasking', 'Dell Latitude 5450 (Core i7-1365U), HP EliteBook 845 G11 (Ryzen 7 PRO, 32 GB)', 'AED 150'],
              ['Core Ultra 7 · 32 GB', 'Development, data analysis, executives who travel', 'Lenovo ThinkPad X1 Carbon Gen 12 (Core Ultra 7 165U)', 'AED 220'],
              ['Apple M4 · 16 GB', 'Creative, video and iOS work', 'MacBook Pro 14" M4, iMac 24" M4 (more on the Mac rental page)', 'AED 240'],
            ],
          },
        },
        {
          h2: 'What the rate covers',
          body: [
            'Quoted rates are per unit and exclude VAT. Delivery, collection and setup are included, along with technical support for the duration of the rental. Imaging to your SOE, domain or MDM enrolment, standby spare units and a dedicated on-site engineer are quoted separately against the deployment.',
            'Plan on one to two days between confirmed order and delivery across the UAE. Larger fleets or specific configurations are worth flagging early so the imaging work is done before the units ship rather than on your floor.',
          ],
        },
      ],
      faqs: [
        {
          q: 'How much does it cost to rent a laptop in the UAE?',
          a: 'Business laptop rental starts at AED 110 per day for a compact desktop and AED 150 per day for a Dell Latitude i7, with premium ultrabooks such as the ThinkPad X1 Carbon and MacBook Pro higher. Weekly rates run at roughly five and a half times the daily rate and monthly at around eighteen times, so longer projects carry a substantial discount. Rates are indicative, per unit and exclude VAT, and include delivery and setup.',
        },
        {
          q: 'Can you rent i5 and i7 laptops, and what is the difference for rental?',
          a: 'Both are available. An i5 with 16 GB RAM handles office work, registration desks and training rooms and rents for noticeably less. An i7 or Core Ultra with 32 GB is the choice for CAD, data analysis, software development and anything that pushes the processor. Tell us the workload and we will specify the tier rather than leaving you to guess from a model number.',
        },
        {
          q: 'Do rented laptops come configured to our environment?',
          a: 'Yes. We image to your standard build, join the machines to your domain or Entra ID tenant, or enrol them in Intune, and preload your applications before delivery, so the fleet arrives ready to use rather than as a stack of setup jobs. Share your requirements when booking.',
        },
        {
          q: 'What is the minimum rental period?',
          a: 'One day. Daily, weekly and monthly rates are available, with the weekly and monthly bands offering better value on anything running beyond a few days. Rates shown are indicative, per unit and exclude VAT.',
        },
      ],
    },
    products: [
      P('dell-latitude-5450', 'Dell', 'Latitude 5450', ['Intel Core i7-1365U', '16 GB RAM · 512 GB SSD', '14" FHD IPS anti-glare'], { CPU: 'Intel Core i7-1365U (10-core)', RAM: '16 GB DDR5', Storage: '512 GB NVMe SSD', Display: '14" FHD 1920×1200 IPS', OS: 'Windows 11 Pro', Ports: '2× Thunderbolt 4, HDMI 2.0, USB-A', Weight: '1.36 kg', Battery: 'Up to 14 hrs' }, { daily: 150, weekly: 840, monthly: 2800 }, LAPTOP_IMG),
      P('macbook-pro-14-m4', 'Apple', 'MacBook Pro 14" M4', ['Apple M4 chip (10-core CPU)', '16 GB unified memory · 512 GB SSD', 'Liquid Retina XDR display'], { CPU: 'Apple M4 (10-core)', GPU: '10-core Apple GPU', RAM: '16 GB unified', Storage: '512 GB SSD', Display: '14.2" Liquid Retina XDR 3024×1964', OS: 'macOS Sequoia', Ports: '3× Thunderbolt 4, HDMI, SDXC, MagSafe 3', Battery: 'Up to 18 hrs' }, { daily: 260, weekly: 1440, monthly: 4800 }, LAPTOP_IMG),
      P('hp-elitebook-845-g11', 'HP', 'EliteBook 845 G11', ['AMD Ryzen 7 PRO 8840U', '32 GB RAM · 1 TB SSD', '14" WUXGA with IR camera'], { CPU: 'AMD Ryzen 7 PRO 8840U', RAM: '32 GB DDR5', Storage: '1 TB NVMe SSD', Display: '14" WUXGA 1920×1200 anti-glare', OS: 'Windows 11 Pro', Biometrics: 'IR camera + fingerprint', Weight: '1.38 kg', Battery: 'Up to 21 hrs' }, { daily: 170, weekly: 960, monthly: 3200 }, LAPTOP_IMG),
      P('lenovo-thinkpad-x1-carbon', 'Lenovo', 'ThinkPad X1 Carbon Gen 12', ['Intel Core Ultra 7', '32 GB RAM · 1 TB SSD', '14" 2.8K OLED'], { CPU: 'Intel Core Ultra 7 165U', RAM: '32 GB LPDDR5x', Storage: '1 TB NVMe SSD', Display: '14" 2.8K OLED 2880×1800', OS: 'Windows 11 Pro', Weight: '1.09 kg', Battery: 'Up to 19 hrs', Security: 'Discrete TPM 2.0, fingerprint' }, { daily: 220, weekly: 1240, monthly: 4200 }, LAPTOP_IMG),
      P('dell-optiplex-7020', 'Dell', 'OptiPlex 7020 Micro', ['Intel Core i5-14500', '16 GB RAM · 512 GB SSD', 'Ultra-small form factor'], { CPU: 'Intel Core i5-14500', RAM: '16 GB DDR5', Storage: '512 GB NVMe SSD', FormFactor: 'Micro (1.14 L)', OS: 'Windows 11 Pro', Ports: '4× USB 3.2, DisplayPort, HDMI, RJ-45', Wireless: 'WiFi 6E + Bluetooth 5.3' }, { daily: 110, weekly: 600, monthly: 1900 }, LAPTOP_IMG),
      P('apple-imac-24-m4', 'Apple', 'iMac 24" M4', ['Apple M4 chip (8-core CPU)', '16 GB RAM · 512 GB SSD', '24" 4.5K Retina display'], { CPU: 'Apple M4 (8-core)', GPU: '8-core Apple GPU', RAM: '16 GB unified', Storage: '512 GB SSD', Display: '24" 4.5K Retina 4480×2520', OS: 'macOS Sequoia', Ports: '4× Thunderbolt 4, Magic Keyboard + Mouse', Finish: 'Seven vibrant colour options' }, { daily: 240, weekly: 1300, monthly: 4400 }, LAPTOP_IMG),
    ],
  },
  'tablets-ipads': {
    name: 'iPads & Tablets',
    icon: 'Tablet',
    keyword: 'iPad Rental UAE',
    // ~2,700 impressions, zero clicks in the 3 months to 2026-09-20, for "ipad pro rent",
    // "rent ipad uae", "rent ipad abu dhabi", "ipad air rental". The old title led with
    // "iPad & Tablet ... Events, Exhibitions, Training" and named no model or city.
    title: 'iPad Rental Dubai & Abu Dhabi: iPad Pro, Air & mini | IP Care',
    metaDescription: `iPad rental in ${RENTAL_REGION.prose}: iPad Pro 13" M4, iPad Air, iPad mini and Galaxy Tab, MDM-configured, delivery and setup included.`,
    description: 'Tablets ready for registration desks, survey stations, menu kiosks, retail and field workforce. Pre-configured with MDM and your apps.',
    // Long-form category content. Optional per category — the page renders this block
    // only when present, so categories without it are unaffected.
    //
    // Added because /rental pages ran ~300-350 words against ~1,100-1,700 on services and
    // industries pages, and Search Console showed the whole section stalled at position
    // 28-30: /rental/tablets-ipads had 1,152 impressions and zero clicks, with the tablet
    // query cluster ("ipad mini rental", "tablet rental uae", "rent ipad pro") sitting at
    // position 12-20. Depth, not schema, was the gap — the schema was already strong.
    content: {
      intro: 'We hold a fleet of up to 50 tablets for simultaneous deployment across the UAE, configured before they leave our facility rather than at your registration desk. Most tablet rentals are not really hardware problems: they are configuration problems that surface on the morning of an event, when there is no time left to solve them.',
      sections: [
        // "event ipad rental" (pos 21), "4g ipad hire" (24) and "hire ipad mini" (24) in the
        // 28 days to 2026-10-09 (UAE): event use was only covered in an FAQ answer.
        {
          h2: 'Event iPad hire: registration, check-in, surveys and kiosks',
          body: [
            'Most of the iPads we rent go to events. Registration and check-in desks, lead capture on exhibition stands, audience surveys and wayfinding or menu kiosks are the usual jobs, and each device arrives locked to your app so stand staff are running the event rather than troubleshooting tablets.',
            'Match the model to the job. The iPad mini 7 is the handheld choice for surveys, roaming check-in and queue-busting. The iPad (10th generation) and iPad Air 11" M3 suit fixed registration desks and kiosks. The iPad Pro 13" M4 is the cellular model in the fleet, which matters at outdoor sites and at venues where the WiFi is not yours to control: 4G/5G iPad hire keeps check-in running when the venue network is congested.',
          ],
        },
        {
          h2: 'Configured before delivery, not on site',
          body: [
            'Every tablet is enrolled in MDM before dispatch. For deployments above five devices we treat this as mandatory, using Jamf, Microsoft Intune, Mosyle or Kandji depending on what you already run. The MDM enforces the configuration, pushes your app, and gives you remote lock and wipe if a device goes missing mid-event.',
            'For kiosk deployments we enable Single App Mode, disable auto-lock and notifications, and lock down the home button, Control Centre and side switches so an attendee cannot exit your app. WiFi profiles for the venue SSID and a fallback are loaded in advance, with cellular provisioned where the device supports it.',
          ],
        },
        {
          h2: 'Power planning for all-day deployments',
          body: [
            'A tablet running always-on in kiosk mode lasts four to six hours, not a full day. For a ten-hour event that means either permanently powered stands or a swap protocol with a charging station holding the second set. This gets decided before the order ships, because retrofitting power at a live venue rarely goes well.',
            'Locked stands stop devices walking. Tethered cables stop them leaving the stand. Both tend to pay for themselves the first time a guest decides to borrow one.',
          ],
        },
        {
          h2: 'What the rate covers',
          body: [
            'Quoted rates are per unit and exclude VAT. Delivery, collection and setup are included, as is technical support for the duration of the rental. MDM enrolment and kiosk configuration, locked stands and tethers, standby spare units, a dedicated on-site engineer and damage waiver are quoted separately against your deployment.',
            'Plan on one to two days between confirmed order and delivery. We hold that window deliberately: it is the time the configuration work above actually takes, and shipping an unconfigured tablet to meet a same-day promise moves the problem to your event floor.',
          ],
        },
      ],
      caseStudy: {
        h2: 'Saadiyat Nights: survey capture across a two-month residency',
        body: 'For the Saadiyat Nights concert residency in Abu Dhabi we supplied 17 iPads for audience survey capture, redeployed week after week across roughly two months of performances. A recurring deployment is a different problem from a single event: devices come back between shows, batteries degrade, and configuration drifts unless it is re-verified. The fleet was checked and re-imaged between performances so each week started from a known state rather than from whatever condition the previous week left behind.',
        href: '/event-it/saadiyat-nights',
        linkLabel: 'See the Saadiyat Nights deployment',
      },
      faqs: [
        {
          q: 'How much does it cost to rent an iPad in the UAE?',
          a: 'Rates start at AED 80 per day for an iPad (10th generation) and AED 90 per day for an iPad mini 7, rising to AED 190 per day for an iPad Pro 13" M4. Weekly rates run at roughly five and a half times the daily rate, and monthly at around eighteen times, so longer bookings carry a substantial discount. All rates exclude VAT and include delivery, collection and setup.',
        },
        {
          q: 'How many tablets can you supply at once?',
          a: 'We hold a fleet of up to 50 tablets for simultaneous deployment. For requirements beyond that we can usually source additional units, but the lead time extends past the standard one to two days, so tell us early.',
        },
        {
          q: 'Can you rent tablets for events and exhibitions?',
          a: 'Yes, and it is most of what this fleet does. Registration desks, survey stations, menu and wayfinding kiosks, and lead capture at exhibition stands are the common patterns. Devices arrive locked to your app in kiosk mode, so stand staff are not troubleshooting configuration during the event.',
        },
        {
          q: 'Do you rent iPad mini and iPad Air, or only the Pro models?',
          a: 'The fleet covers iPad mini 7, iPad (10th generation), iPad Air 11" M3 and iPad Pro 13" M4, alongside the Samsung Galaxy Tab S10 Ultra and Microsoft Surface Pro 11. The mini is the usual choice for handheld survey and queue-busting work; the Pro suits creative and demonstration use where display quality matters.',
        },
        {
          q: 'What is the minimum rental period?',
          a: 'One day. Rates are structured daily, weekly and monthly, with the weekly and monthly bands offering better value on anything running beyond a few days.',
        },
        {
          q: 'Can you deliver iPads outside the UAE?',
          a: 'For events and projects, yes. Deliveries to Qatar, Saudi Arabia, Oman and Bahrain are quoted per project, with devices configured before they ship as they are for UAE orders. Share the country, venue, dates and quantities and we will confirm availability and lead time before you commit.',
        },
      ],
    },
products: [
      P('ipad-pro-13-m4', 'Apple', 'iPad Pro 13" M4', ['Apple M4 chip', 'Ultra Retina XDR OLED', '256 GB · WiFi + Cellular'], { Chip: 'Apple M4 (9-core CPU)', Display: '13" Ultra Retina XDR OLED', Storage: '256 GB', Connectivity: 'WiFi 6E + 5G cellular', Camera: '12 MP Ultra Wide, LiDAR', Accessories: 'Apple Pencil Pro + Magic Keyboard available', OS: 'iPadOS 18' }, { daily: 190, weekly: 1040, monthly: 3600 }, TABLET_IMG),
      P('ipad-air-11-m3', 'Apple', 'iPad Air 11" M3', ['Apple M3 chip', 'Liquid Retina display', '128 GB · WiFi'], { Chip: 'Apple M3', Display: '11" Liquid Retina', Storage: '128 GB', Connectivity: 'WiFi 6E', Accessories: 'Apple Pencil Pro compatible', OS: 'iPadOS 18' }, { daily: 130, weekly: 720, monthly: 2400 }, TABLET_IMG),
      P('ipad-10th-gen', 'Apple', 'iPad (10th Gen)', ['A14 Bionic chip', '10.9" Liquid Retina', '64 GB · WiFi'], { Chip: 'Apple A14 Bionic', Display: '10.9" Liquid Retina', Storage: '64 GB', Connectivity: 'WiFi 6', OS: 'iPadOS 18', Colour: 'Silver, Blue, Pink, Yellow' }, { daily: 80, weekly: 440, monthly: 1440 }, TABLET_IMG),
      P('samsung-galaxy-tab-s10', 'Samsung', 'Galaxy Tab S10 Ultra', ['Dimensity 9300+', '14.6" Dynamic AMOLED 2X', '256 GB · WiFi'], { Chip: 'MediaTek Dimensity 9300+', Display: '14.6" Dynamic AMOLED 2X', Storage: '256 GB', RAM: '12 GB', S_Pen: 'Included', OS: 'Android 14 with One UI 6.1' }, { daily: 150, weekly: 820, monthly: 2800 }, TABLET_IMG),
      P('ipad-mini-7', 'Apple', 'iPad mini 7', ['A17 Pro chip', '8.3" Liquid Retina', '128 GB · WiFi'], { Chip: 'Apple A17 Pro', Display: '8.3" Liquid Retina', Storage: '128 GB', Connectivity: 'WiFi 6E', Camera: '12 MP Wide', OS: 'iPadOS 18' }, { daily: 90, weekly: 500, monthly: 1700 }, TABLET_IMG),
      P('microsoft-surface-pro-11', 'Microsoft', 'Surface Pro 11', ['Snapdragon X Elite', '16 GB RAM · 512 GB SSD', '13" OLED touch'], { CPU: 'Snapdragon X Elite (12-core)', RAM: '16 GB LPDDR5x', Storage: '512 GB SSD', Display: '13" OLED 2880×1920', OS: 'Windows 11 Pro', Keyboard: 'Signature Keyboard available' }, { daily: 180, weekly: 1000, monthly: 3400 }, TABLET_IMG),
    ],
  },
  'printers': {
    name: 'Printers & Peripherals',
    icon: 'Printer',
    keyword: 'Printer Rental UAE',
    title: 'Printer Rental UAE: Laser, Colour, MFP, Plotter | IP Care Technologies',
    metaDescription: `Commercial printer rental in ${RENTAL_REGION.prose}. Mono laser, colour laser, MFPs, plotters. Delivery, setup, toner and maintenance included.`,
    description: 'From a single desktop printer to a full floor of MFPs. We deliver, install, supply toner and service throughout the rental period.',
    content: {
      intro: 'Printers get rented for the same reason as everything else here: a defined window where you need output without owning the machine or the maintenance contract behind it. A registration event, a temporary office, a project handover pack, an exam hall, an audit — the common thread is that the printer has to work for the duration and someone else deals with the toner and the jams.',
      sections: [
        {
          h2: 'Consumables and service are the actual rental',
          body: [
            'Anyone can drop a printer at a door. The value in a printer rental is that toner, drums and servicing are handled for the whole period, so a cartridge running out mid-event is our problem, not yours. That is the difference between renting output and buying a machine you then have to feed and fix.',
            'The fleet spans desktop MFPs for a small office up to production multifunction devices — Canon imageRUNNER, Konica Minolta bizhub and HP LaserJet Enterprise — for a floor of users or a high-volume print run.',
          ],
        },
        {
          h2: 'Matched to volume, not just function',
          body: [
            'The wrong printer for the volume is a false economy. A desktop MFP asked to carry a whole floor jams, overheats and runs out of toner constantly; a production device sitting idle in a two-person office is money wasted. We size to expected page volume and user count, and where the deployment needs colour, A3, high-speed duplex or large-format, the fleet covers those rather than forcing a compromise.',
            'For events and shared offices, we can set up secure release, network printing and user accounting so the machine drops into your environment cleanly.',
          ],
        },
        // "color printer rental" (pos 20) and "a3 printer rental" (33) in the 28 days to
        // 2026-10-09 (UAE). Rates mirror the products below; keep them in step.
        {
          h2: 'Colour and A3 printer rental',
          body: [
            'Colour, A3 and large-format output need the right class of machine rather than an office printer pushed past what it was built for. These are the colour, A3 and wide-format models in the fleet, each delivered with toner and servicing for the rental period.',
          ],
          table: {
            caption: 'Colour, A3 and large-format printers for rent, with type, speed and day rate',
            columns: ['Model', 'Type', 'Speed / width', 'From (per day)'],
            rows: [
              ['HP Color LaserJet Pro MFP M479fdw', 'A4 colour MFP', '27 ppm', 'AED 110'],
              ['Canon imageRUNNER ADVANCE C5500 ES II', 'A3 colour MFP', 'Up to 60 ppm', 'AED 440'],
              ['Konica Minolta bizhub 554e', 'A3 mono MFP', '55 ppm', 'AED 280'],
              ['HP DesignJet T1700', 'Large-format plotter for CAD, GIS and graphics', '44 inch', 'AED 520'],
            ],
          },
        },
        {
          h2: 'What the rate covers',
          body: [
            'Quoted rates are per unit and exclude VAT. Delivery, installation, collection and setup are included, along with toner, servicing and technical support for the duration. Very high-volume print runs, specific finishing options and standby replacement units are quoted separately against the requirement.',
            'Plan on one to two days between confirmed order and delivery across the UAE. For a floor of devices or specific network and security setup, flag it at booking so the configuration is done before delivery.',
          ],
        },
      ],
      faqs: [
        {
          q: 'How much does it cost to rent a printer in the UAE?',
          a: 'Printer rental is priced by class, from desktop multifunction units up to production MFPs, with toner and servicing included for the rental period. Weekly and monthly bands carry a discount over the daily rate, which suits the temporary-office and project timelines printers are usually rented for. Rates are indicative, per unit and exclude VAT, and include delivery and setup.',
        },
        {
          q: 'Is toner included in a printer rental?',
          a: 'Yes. Toner, drums and servicing are handled for the whole rental period, so a cartridge running out or a fault mid-event is on us. That is the main reason to rent rather than buy — you get the output without the consumables and maintenance overhead.',
        },
        {
          q: 'Can you supply enough printers for a whole floor or event?',
          a: 'Yes. The fleet runs from single desktop MFPs up to production multifunction devices, and we size to your expected page volume and user count rather than dropping in one machine and hoping. Secure release, network printing and user accounting can be configured for shared environments.',
        },
        {
          q: 'What is the minimum rental period?',
          a: 'One day. Daily, weekly and monthly rates are available, with the longer bands offering better value for temporary offices and multi-week projects. Rates shown are indicative, per unit and exclude VAT.',
        },
      ],
    },
    products: [
      P('canon-imagerunner-advance-c5500', 'CANON', 'imageRUNNER ADVANCE C5500 ES II', ['A3 colour MFP · up to 60 ppm', 'Print · Copy · Scan · Send', 'Duplex · large-capacity trays'], { Type: 'A3 colour MFP', Speed: 'Up to 60 ppm', Functions: 'Print, Copy, Scan, Send', Trays: 'Large-capacity', Duplex: 'Yes' }, { daily: 440, weekly: 2200, monthly: 6800 }, '/images/rental/printers/canon-c5500.webp'),
      P('konica-minolta-bizhub-554e', 'KONICA MINOLTA', 'bizhub 554e', ['A3 mono MFP · 55 ppm', 'Print · Copy · Scan · Fax', 'Duplex · high-capacity trays'], { Type: 'A3 mono MFP', Speed: '55 ppm', Functions: 'Print, Copy, Scan, Fax', Trays: 'High-capacity', Duplex: 'Yes' }, { daily: 280, weekly: 1400, monthly: 4200 }, '/images/rental/printers/konica-bizhub-554e.webp'),
      P('hp-laserjet-pro-mfp-m428fdw', 'HP', 'LaserJet Pro MFP M428fdw', ['A4 mono MFP · 38 ppm', 'Print · Copy · Scan · Fax', 'Duplex · WiFi + Ethernet'], { Type: 'A4 mono MFP', Speed: '38 ppm', Functions: 'Print, Copy, Scan, Fax', Connectivity: 'WiFi, Ethernet', Duplex: 'Yes' }, { daily: 80, weekly: 360, monthly: 960 }, '/images/rental/printers/hp-m428fdw.webp'),
      P('hp-color-laserjet-pro-mfp-m479fdw', 'HP', 'Color LaserJet Pro MFP M479fdw', ['A4 colour MFP · 27 ppm', 'Print · Copy · Scan · Fax', 'Duplex · WiFi + Ethernet'], { Type: 'A4 colour MFP', Speed: '27 ppm', Functions: 'Print, Copy, Scan, Fax', Connectivity: 'WiFi, Ethernet', Duplex: 'Yes' }, { daily: 110, weekly: 520, monthly: 1560 }, '/images/rental/printers/hp-m479fdw.webp'),
      P('hp-laserjet-enterprise-mfp-m635h', 'HP', 'LaserJet Enterprise MFP M635h', ['A4 mono MFP · 61 ppm', 'Print · Copy · Scan', 'High-volume · Duplex + Ethernet'], { Type: 'A4 mono MFP', Speed: '61 ppm', Functions: 'Print, Copy, Scan', Volume: 'High-volume', Connectivity: 'Ethernet', Duplex: 'Yes' }, { daily: 150, weekly: 840, monthly: 2800 }, '/images/rental/printers/hp-m635.webp'),
      P('hp-designjet-t1700', 'HP', 'DesignJet T1700 44"', ['44 inch large-format plotter', 'CAD · GIS · graphics', 'PostScript · HP-GL/2'], { Type: 'Large-format plotter', Width: '44 inch', Use: 'CAD, GIS, graphics', Languages: 'PostScript, HP-GL/2' }, { daily: 520, weekly: 2600, monthly: 7800 }, '/images/rental/printers/hp-designjet-t1700.webp'),
    ],
  },
  'event-wifi': {
    name: 'Event WiFi & Routers',
    icon: 'Wifi',
    keyword: 'Event WiFi Rental UAE',
    // Positions 9-16 in the 3 months to 2026-09-20 for "event wifi rental uae", "hire event
    // wifi", "event wifi rental dubai" and "event wifi middle east": the closest cluster to
    // page 1. Title now carries "rental & hire" and both cities.
    title: 'Event WiFi Rental & Hire Dubai, Abu Dhabi, UAE | IP Care',
    // Still positions 11-14 for "event wifi rental uae" / "event wifi rental dubai" in the
    // 28 days to 2026-10-09 (UAE). The generated H1 read "Event WiFi & Routers Rental",
    // which never contains the searched phrase; this one does.
    h1: 'Event WiFi Rental & Hire',
    metaDescription: `Event WiFi rental and hire in ${RENTAL_REGION.prose}: WiFi 6/7 from Aruba, Cisco Meraki and Ruckus, with RF survey and on-site engineers.`,
    description: 'High-density event WiFi kits deployed in 24-72 hours, including RF survey, installation, on-site engineer during event and de-rig.',
    content: {
      intro: 'Event WiFi is not a router you drop at a venue. A room full of people all trying to connect at once is a hostile RF environment, and consumer gear falls over in it within minutes. High-density event WiFi is an engineered deployment: RF survey, access-point placement, channel and power planning, a controller sized for the crowd, and an engineer on site who can see and fix the network while the event is live.',
      sections: [
        {
          h2: 'Density is the problem, not coverage',
          body: [
            'Covering a space with signal is easy. Carrying a thousand simultaneous connections in that space without the network collapsing is the actual job. It comes down to access-point density, band steering, airtime fairness and a controller that can hold the client count — the things a home router simply does not do. We plan the deployment around concurrent users per zone, not floor area.',
            'The kit is enterprise-grade and current: HPE Aruba, Ruckus WiFi 7, and UniFi across WiFi 6E and 7, with FortiGate firewalls where the event needs segmentation between guest, production, payment and broadcast traffic.',
          ],
        },
        {
          h2: 'Surveyed, installed, watched and removed',
          body: [
            'A managed event WiFi rental is the network plus the people. We run a predictive or on-site RF survey, install and tune to the venue as built rather than as drawn, keep an engineer on site through the event to hold performance under live load, and de-rig cleanly afterwards. Temporary press positions and layout changes get re-validated on the day, because a stand moved overnight changes the RF picture.',
            'Where the venue has no usable uplink, we bring the backhaul too — bonded connectivity or point-to-point microwave — so the network does not depend on a house circuit that was never sized for the crowd.',
          ],
        },
        {
          h2: 'Planned mobilisation',
          body: [
            'A high-density deployment is scoped in advance, not shipped same-day. The survey, plan and staging are the work that makes the event itself uneventful. For hardware-only bookings, plan on one to two days from confirmed order; for a fully managed build we agree a mobilisation window against the event date. Delivery, installation, the on-site engineer and de-rig are included in a managed deployment; extended standby crew and redundant backhaul are quoted against the brief.',
          ],
        },
      ],
      caseStudy: {
        h2: 'The same networks behind FIFA, UFC and the NBA in Abu Dhabi',
        body: 'This equipment and these methods are what IP Care runs at scale on major events: high-density WiFi and temporary networks for the FIFA Club World Cup, UFC Fight Nights, the NBA Abu Dhabi Games and the EuroLeague Final Four, the first held outside Europe. Renting the kit gives you the hardware; the reason the hardware works is the RF planning and on-site engineering that comes with it. Very few vendors in the region can point to a delivery record like that behind their event WiFi.',
        // Each named event links to its own case study, so the rental page passes
        // relevance to (and draws it from) the deployments it cites.
        links: [
          { href: '/event-it/fifa-club-world-cup', label: 'FIFA Club World Cup' },
          { href: '/event-it/ufc-uae', label: 'UFC Fight Nights' },
          { href: '/event-it/nba-abu-dhabi-games', label: 'NBA Abu Dhabi Games' },
          { href: '/event-it/euroleague-final-four-2025', label: 'EuroLeague Final Four' },
          { href: '/event-it/event-wifi', label: 'Managed high-density event WiFi' },
        ],
        href: '/event-it/portfolio',
        linkLabel: 'See the full event delivery portfolio',
      },
      faqs: [
        {
          q: 'How much does event WiFi rental cost in the UAE?',
          a: 'Event WiFi is priced two ways. A hardware-only kit is quoted per unit against your equipment list, with each access point, gateway and firewall priced on its own page. A fully managed high-density deployment — RF survey, installation, an on-site engineer for the event and de-rig — is scoped against the venue, crowd size and duration. Send the event details and we will quote the build rather than a box of parts.',
        },
        {
          q: 'Why not just use a normal router for an event?',
          a: 'A consumer or small-business router is built for a handful of devices in a quiet RF environment. An event puts hundreds or thousands of clients in the same space competing for airtime, and that gear falls over within minutes. High-density event WiFi uses enterprise access points at planned density, band steering and a controller sized for the crowd — engineering a home router does not do.',
        },
        {
          q: 'Do you provide an on-site engineer during the event?',
          a: 'Yes, on a managed deployment. An engineer stays on site through the event to hold performance under live load, re-validate the network when press positions or layouts change, and fix issues before they reach attendees. This is included in a managed build and is the single biggest reason event WiFi succeeds or fails.',
        },
        {
          q: 'Can you supply the internet uplink as well as the WiFi?',
          a: 'Yes. Where a venue has no usable circuit, or one that was never sized for the crowd, we bring the backhaul — bonded connectivity or point-to-point microwave — so the network does not depend on house infrastructure. This is scoped as part of the deployment.',
        },
      ],
    },
    products: [
      P('aruba-ap-635-wifi6e', 'HPE Aruba', 'AP-635 WiFi 6E', ['Tri-band 6 GHz WiFi 6E', 'Up to 3.9 Gbps per radio', '1,024 concurrent clients'], { Standard: 'WiFi 6E (802.11ax)', Bands: '2.4/5/6 GHz', MaxThroughput: '7.8 Gbps aggregate', Clients: '1,024 concurrent', PoE: '802.3bt', Antennas: '4×4:4 internal' }, { daily: 190, weekly: 960, monthly: 2800 }, '/images/rental/event-wifi/aruba-ap-635.webp'),
      P('unifi-u6-pro', 'Ubiquiti', 'UniFi U6 Pro', ['WiFi 6 dual-band AP', '5.3 Gbps aggregate', '300+ concurrent clients'], { Standard: 'WiFi 6 (802.11ax)', Bands: '2.4/5 GHz', MaxThroughput: '5.3 Gbps aggregate', Clients: '300+ concurrent', PoE: '802.3at', Management: 'UniFi Network controller' }, { daily: 210, weekly: 1040, monthly: 3100 }, '/images/rental/event-wifi/unifi-u6-pro.webp'),
      P('unifi-uap-ac-pro', 'Ubiquiti', 'UniFi AC Pro (UAP-AC-Pro)', ['WiFi 5 dual-band AP', '1.75 Gbps aggregate', '250+ concurrent clients'], { Standard: 'WiFi 5 (802.11ac)', Bands: '2.4/5 GHz', MaxThroughput: '1.75 Gbps aggregate (450 + 1300 Mbps)', Clients: '250+ concurrent', PoE: '802.3af / 802.3at', Ports: '2× Gigabit Ethernet', Management: 'UniFi Network controller' }, { daily: 100 }, '/images/rental/event-wifi/unifi-uap-ac-pro.webp'),
      P('ruckus-r770-wifi7', 'Ruckus', 'R770 WiFi 7', ['First WiFi 7 AP in region', 'BeamFlex+ adaptive antenna', 'Up to 22 Gbps aggregate'], { Standard: 'WiFi 7 (802.11be)', MaxThroughput: '22 Gbps', Antenna: 'BeamFlex+ adaptive', PoE: '802.3bt Type 4', Management: 'RUCKUS One cloud / SmartZone' }, { daily: 280, weekly: 1440, monthly: 4200 }, '/images/rental/event-wifi/ruckus-r770.webp'),
      P('unifi-e7', 'Ubiquiti', 'UniFi E7', ['WiFi 7 tri-band AP', 'Up to 21 Gbps aggregate', '6 GHz radio · high-density'], { Standard: 'WiFi 7 (802.11be)', Bands: '2.4/5/6 GHz', MaxThroughput: '21 Gbps aggregate', PoE: '802.3bt', Management: 'UniFi Network controller' }, { daily: 260, weekly: 1300, monthly: 3800 }, '/images/rental/event-wifi/unifi-e7.webp'),
      P('ubiquiti-udm-pro-max', 'Ubiquiti', 'UniFi Dream Machine Pro Max', ['10G SFP+ uplink', 'Integrated controller', '750+ client capacity'], { Throughput: '5 Gbps', Storage: '2× 3.5" HDD bays for protect', Ports: '8× 1GbE + 2× 10GbE SFP+', Users: '750+' }, { daily: 900, weekly: 4500, monthly: 13500 }, '/images/rental/event-wifi/ubiquiti-udm-pro-max.webp'),
      P('fortigate-200e', 'Fortinet', 'FortiGate 200E', ['Next-gen firewall (NGFW)', '20 Gbps firewall throughput', 'SD-WAN · IPS · VPN'], { Throughput: '20 Gbps firewall', SD_WAN: 'Built-in SD-WAN', Security: 'IPS, VPN, NGFW', Management: 'FortiGate cloud / FortiManager' }, { daily: 1000, weekly: 5000, monthly: 15000 }, '/images/rental/event-wifi/fortigate-200e.webp'),
    ],
  },
  'networking': {
    name: 'Networking Equipment',
    icon: 'Network',
    keyword: 'Network Equipment Rental UAE',
    title: 'Network Equipment Rental UAE: Switches, Firewalls | IP Care',
    metaDescription: 'Enterprise switch, firewall and router rental in UAE. Cisco, HPE Aruba, Fortinet, Palo Alto, configured and delivered with on-site support.',
    description: 'Core, distribution and access switches, firewalls, and SD-WAN kits, ready for projects, temporary offices and events.',
    content: {
      intro: 'Network hardware gets rented for the gap between needing a network and owning one: a temporary office, a project site, an event, a migration window, or a proof-of-concept before a capital purchase. The switch or firewall is the easy part — the value is in getting a working, segmented, manageable network stood up quickly and taken down cleanly.',
      sections: [
        {
          h2: 'Core to edge, one order',
          body: [
            'A real deployment is rarely one box. It is core and access switching, a firewall at the edge, PoE for the access points and cameras, and often SD-WAN or point-to-point links between sites. Renting the layers separately from different suppliers is how gaps and mismatches happen. We supply the stack as one order — Aruba and Ubiquiti switching, FortiGate and Palo Alto firewalls — configured to work together before it ships.',
            'PoE budget is the detail that catches people out. Access points, cameras and phones all draw from the switch, and a switch chosen on port count alone can run out of power halfway through the install. We size the PoE to the load, not just the port count.',
          ],
        },
        {
          h2: 'Configured, not just supplied',
          body: [
            'Rented network gear can arrive at factory default for you to configure, or built to your design — VLANs, segmentation, firewall policy and management access set up before delivery. For a temporary office or event that needs guest, staff and payment traffic kept apart, having that done in advance is the difference between plugging in and a day of console work on site.',
            'Where a project needs an engineer to commission and hand over the network rather than just receive the hardware, that is available and quoted with the kit.',
          ],
        },
        {
          h2: 'What the rate covers',
          body: [
            'Quoted rates are per unit and exclude VAT. Delivery, collection and setup are included, along with technical support for the rental. Pre-staged configuration to your design, on-site commissioning, standby spares and a dedicated engineer are quoted separately against the project.',
            'Plan on one to two days between confirmed order and delivery across the UAE. For anything needing pre-staged configuration, flag it at booking so the build is done before the kit ships.',
          ],
        },
      ],
      caseStudy: {
        h2: 'Backed by real infrastructure delivery',
        body: 'IP Care does not just rent network hardware — it installs and certifies it on enterprise projects. At Al Jeel Tower, a 168-apartment residential and retail build, the ELV and ICT package ran to 2,391 Cat6A outlets and 82 racks. At Paragon Mall the backbone was 48-core fibre carrying 1,192 patched ports. Renting a switch from a team that commissions structured cabling and core networks for towers and malls is a different proposition from renting one from a box-shifter, particularly when something needs configuring rather than just powering on.',
        href: '/portfolio',
        linkLabel: 'See the infrastructure delivery portfolio',
      },
      faqs: [
        {
          q: 'How much does it cost to rent network switches and firewalls in the UAE?',
          a: 'Individual switches, firewalls and gateways are quoted per unit, with each item priced on its own page. A full stack for a temporary office or event — access and core switching, a firewall at the edge and the PoE to run it — is scoped and priced as a set against the requirement. Rates are per unit and exclude VAT, and include delivery and setup. Send the requirement and we will quote the build.',
        },
        {
          q: 'Can the equipment arrive pre-configured to our design?',
          a: 'Yes. We can build VLANs, segmentation, firewall policy and management access to your design before delivery, so a temporary office or event network is ready to plug in rather than needing a day of console work on site. Share the design or requirements when booking.',
        },
        {
          q: 'Can you supply an engineer to commission the network?',
          a: 'Yes. Where a project needs the network commissioned and handed over rather than just the hardware delivered, we supply an engineer to configure, test and hand over, quoted alongside the kit. IP Care commissions core and access networks on its own infrastructure projects, so this is core work, not an add-on.',
        },
        {
          q: 'What is the minimum rental period?',
          a: 'One day. Daily, weekly and monthly rates are available, with the longer bands offering better value on project and migration timelines. Rates shown are indicative, per unit and exclude VAT.',
        },
      ],
    },
    products: [
      P('aruba-1930-48g', 'HPE Aruba', '1930 48G PoE+', ['48× 1GbE PoE+ · 4× SFP+', '370 W PoE budget', 'Layer 2+ smart-managed'], { Ports: '48× 1G PoE+ · 4× SFP+', PoE: '370 W budget', Management: 'Layer 2+ smart-managed' }, { daily: 400, weekly: 2060, monthly: 6000 }, '/images/rental/networking/aruba-1930-48g-poe.webp'),
      P('aruba-1930-24g', 'HPE Aruba', '1930 24G PoE+', ['24× 1GbE PoE+ · 4× SFP+', '195 W PoE budget', 'Layer 2+ smart-managed'], { Ports: '24× 1G PoE+ · 4× SFP+', PoE: '195 W budget', Management: 'Layer 2+ smart-managed' }, { daily: 300, weekly: 1560, monthly: 4600 }, '/images/rental/networking/aruba-1930-24g-poe.webp'),
      P('fortinet-fortigate-100f', 'Fortinet', 'FortiGate 100F', ['20 Gbps firewall throughput', '11.5 Gbps IPS', 'SD-WAN ready'], { Firewall: '20 Gbps', IPS: '11.5 Gbps', ThreatProtection: '1 Gbps', Ports: '22× GE + 2× 10G SFP+', Users: '500-1500' }, { daily: 240, weekly: 1240, monthly: 3700 }, '/images/rental/networking/fortigate-100f.webp'),
      P('palo-alto-pa-440', 'Palo Alto', 'PA-440', ['Next-gen firewall', '3.1 Gbps firewall throughput', 'PAN-OS 11.x'], { Firewall: '3.1 Gbps', ThreatPrevention: '930 Mbps', Ports: '8× GE', Power: 'Dual AC optional', Software: 'PAN-OS 11.x' }, { daily: 220, weekly: 1120, monthly: 3400 }, '/images/rental/networking/pa-440.webp'),
      P('juniper-ex4400-24p', 'Ubiquiti', 'USW-24-PoE', ['24× GbE · 16 PoE+ ports', '2× 1G SFP uplinks', '95 W PoE budget · Layer 2 managed'], { Ports: '24× GbE · 16 PoE+ ports', Uplinks: '2× 1G SFP', PoE: '95 W budget', Management: 'Layer 2 managed' }, { daily: 260, weekly: 1340, monthly: 3900 }, '/images/rental/networking/usw-24-poe.webp'),
      P('netgear-m4350-48x4v', 'Ubiquiti', 'USW-48-PoE', ['48× GbE · 32 PoE+ ports', '4× 1G SFP uplinks', '195 W PoE budget · Layer 2 managed'], { Ports: '48× GbE · 32 PoE+ ports', Uplinks: '4× 1G SFP', PoE: '195 W budget', Management: 'Layer 2 managed' }, { daily: 270, weekly: 1400, monthly: 4100 }, '/images/rental/networking/usw-48-poe.webp'),
    ],
  },
  'cctv': {
    name: 'CCTV & Security',
    icon: 'Video',
    keyword: 'Event CCTV Rental UAE',
    title: 'CCTV Rental UAE: Event Cameras, NVR, VMS | IP Care Technologies',
    metaDescription: 'CCTV and security camera rental in UAE. IP cameras, NVRs, PTZ, thermal. Fully deployed with live monitoring and ADMCC-certified install in Abu Dhabi.',
    description: 'Rapid-deploy event security: CCTV and NVRs, displays, walk-through gates, baggage scanners and people-counting analytics, with on-site command centre and ADMCC-certified installation in Abu Dhabi.',
    content: {
      intro: 'Temporary surveillance for an event or a site is rented because the need is real but short: a few days of coverage, a screening perimeter, a command position, then it comes down. The hardware is only part of it — cameras that record to nothing, or a checkpoint no one is watching, are theatre. A working deployment is cameras, recording, screening and someone watching the wall.',
      sections: [
        {
          h2: 'Coverage, screening and a place to watch it',
          body: [
            'A rapid-deploy event security setup is more than cameras. It is IP cameras and the NVR they record to, displays and a command position where an operator can actually see the coverage, and where the event needs it, walk-through metal detectors and baggage X-ray at the entry points. People-counting analytics turn the same cameras into crowd-density data for safety and operations. We deploy the parts that match the risk, not a generic bundle.',
            'The kit is enterprise and screening-grade: Hikvision cameras and NVRs, commercial displays, Garrett walk-through gates and Smiths Detection X-ray, deployed and removed around the event window.',
          ],
        },
        {
          h2: 'Compliant installation in Abu Dhabi',
          body: [
            'CCTV in Abu Dhabi is regulated. Installations in scope must meet ADMCC (Abu Dhabi Monitoring and Control Centre) requirements, and a deployment that ignores that is a problem waiting to surface. IP Care installs to ADMCC standard, so a temporary deployment is compliant rather than improvised, which matters as much for a public event as for a permanent building.',
            'For events that need eyes on the coverage rather than just a recording to review afterwards, we set up a command position and can staff it, so an incident is seen as it happens.',
          ],
        },
        {
          h2: 'What the rate covers',
          body: [
            'Quoted rates are per unit and exclude VAT. Delivery, installation, collection and setup are included, along with technical support for the rental. A staffed command centre, screening operators, ADMCC compliance work and standby equipment are quoted separately against the deployment.',
            'A managed event security deployment is scoped against the venue and risk rather than shipped same-day. Plan on one to two days for hardware-only bookings; for a full deployment we agree a mobilisation window against the event.',
          ],
        },
      ],
      caseStudy: {
        h2: 'From national events to 432-camera towers',
        body: 'IP Care runs surveillance at both ends of the scale. Government-grade CCTV and command-centre integration featured across UAE National Day deliveries and other major events. At the permanent end, Al Jeel Tower carried 432 cameras integrated with access control and a monitoring position, installed and tested as part of the ELV package. Renting event CCTV from a team that installs and certifies permanent systems means the temporary deployment is built to the same standard, not a step down from it.',
        href: '/event-it/portfolio',
        linkLabel: 'See the event delivery portfolio',
      },
      faqs: [
        {
          q: 'How much does event CCTV rental cost in the UAE?',
          a: 'Cameras rent from around AED 120 per day and NVRs, displays and screening equipment are priced by unit, so a coverage-only kit is straightforward. A managed event security deployment — installation, a command position, screening at entry points and ADMCC-compliant setup — is scoped against the venue and risk. Send the event details for a deployment quote rather than a parts list.',
        },
        {
          q: 'Is temporary CCTV in Abu Dhabi subject to ADMCC rules?',
          a: 'Installations in scope must meet Abu Dhabi Monitoring and Control Centre (ADMCC) requirements, and a temporary event deployment is not automatically exempt. IP Care installs to ADMCC standard, so the coverage is compliant rather than improvised. Tell us the venue and we will advise what applies.',
        },
        {
          q: 'Can you provide walk-through gates and baggage scanners for events?',
          a: 'Yes. The fleet includes Garrett walk-through metal detectors and Smiths Detection HI-SCAN X-ray for entry screening, alongside cameras, NVRs and displays. Screening operators and a staffed command position can be supplied with the equipment and are quoted as part of the deployment.',
        },
        {
          q: 'What is the minimum rental period?',
          a: 'One day. Daily, weekly and monthly rates are available, with the longer bands suited to multi-week site security. Rates shown are indicative, per unit and exclude VAT.',
        },
      ],
    },
    products: [
      P('hikvision-ds-2cd2t86g2', 'Hikvision', 'DS-2CD2T86G2', ['8 MP AcuSense IP bullet', '60 m IR range', 'Built-in mic'], { Resolution: '8 MP (4K)', Type: 'Bullet IP camera', IRDistance: '60 m', Lens: '2.8 / 4 / 6 mm', PoE: '802.3af', Smart: 'AcuSense human/vehicle detection' }, { daily: 60, weekly: 320, monthly: 1040 }, '/images/rental/cctv/hikvision-ds-2cd2t86g2.webp'),
      P('hikvision-ds-9664ni-i8', 'Hikvision', 'DS-9664NI-I8', ['64-channel 4K NVR', '8× HDD bays · up to 128 TB', 'AcuSense AI search'], { Channels: '64', Recording: '4K UHD', HDDBays: '8 × SATA III', Storage: 'Up to 128 TB', AI: 'AcuSense human/vehicle search' }, { daily: 240, weekly: 1240, monthly: 3700 }, '/images/rental/cctv/hikvision-ds-9664ni-i8.webp'),
      P('samsung-4k-commercial-display', 'Samsung', '55" 4K Commercial Display', ['4K UHD commercial panel', '24/7 operation', 'Floor stand or wall mount'], { Size: '55"', Resolution: '4K UHD', Operation: '24/7 rated', Mounting: 'Floor stand or wall mount' }, { daily: 190, weekly: 980, monthly: 2900 }, '/images/rental/cctv/samsung-4k-display.webp'),
      P('garrett-pd-6500i', 'Garrett', 'PD 6500i Walk-Through', ['33-zone pinpoint detection', 'High-traffic throughput', 'Battery + mains'], { Zones: '33-zone pinpoint', Throughput: 'High-traffic', Power: 'Battery or mains' }, { daily: 360, weekly: 1840, monthly: 5600 }, '/images/rental/cctv/garrett-pd-6500i.webp'),
      P('smiths-hi-scan-6040i', 'Smiths Detection', 'HI-SCAN 6040i X-Ray', ['Dual-energy X-ray', '620 × 420 mm tunnel', 'Threat-imaging (TIP)'], { Technology: 'Dual-energy X-ray', TunnelSize: '620 × 420 mm', Imaging: 'Threat Image Projection (TIP)' }, { daily: 560, weekly: 2800, monthly: 8400 }, '/images/rental/cctv/smiths-hi-scan-6040i.webp'),
      P('vcount-ultima-ai', 'V-Count', 'Ultima AI People Counter', ['3D AI people counting', '99%+ accuracy', 'Real-time analytics dashboard'], { Technology: '3D AI people counting', Accuracy: '99%+', Analytics: 'Real-time dashboard' }, { daily: 190, weekly: 980, monthly: 2900 }, '/images/rental/cctv/vcount-ultima-ai.webp'),
    ],
  },
  'testing-equipment': {
    name: 'Testing Equipment',
    icon: 'Wrench',
    keyword: 'Cable & Fibre Testing Equipment Rental UAE',
    title: 'Cable & Fibre Testing Equipment Rental UAE: Fluke DSX 5000, AFL OTDR | IP Care',
    metaDescription: `Rent the Fluke DSX 5000 cable certifier, AFL Noyes M210 OTDR and a fusion splicer in ${RENTAL_REGION.prose}. Certify copper, test fibre and splice on-site. Day rates from AED 300, calibrated and ready to ship.`,
    description: 'If the cable fails cert, the whole job stops. We keep the Fluke DSX 5000, AFL Noyes M210 OTDR and a fusion splicer ready to ship, so your crew has the right gear on-site, not the closest substitute.',
    content: {
      intro: 'Certification tools get rented rather than bought because the maths rarely works otherwise. A cable certifier is used hard for the two weeks of a handover and then sits in a cupboard depreciating, needing annual calibration to stay valid. Renting puts a calibrated instrument on site for the window you actually need it, which is usually the difference between a handover that passes and one that gets disputed.',
      sections: [
        {
          h2: 'Certification, not verification',
          body: [
            'These are different things, and consultants reject handovers over the distinction. A verification tester tells you a cable is connected and roughly working. A certifier measures against the TIA or ISO standard — insertion loss, NEXT, return loss, delay skew — and produces a pass or fail traceable to that standard. Only the second is accepted as a handover document.',
            'The Fluke DSX 5000 certifies Cat 5e through Cat 6A to 500 MHz and uploads results to LinkWare Live, so the report is in the cloud before the kit is packed. On a contested handover, that report is the thing that ends the argument.',
          ],
        },
        {
          h2: 'Copper, fibre, or both',
          body: [
            'Most infrastructure jobs need more than one instrument. Copper runs need certification. Fibre runs need an OTDR trace to prove loss budget and locate faults by distance. Where fibre has been damaged or needs extending, a fusion splicer makes the join properly rather than leaving a mechanical connector in the path to fail later.',
            'The AFL Noyes M210 handles singlemode and multimode in one unit at 1310/1550 nm, with a 0.8 m event dead zone that resolves faults close to the launch point where cheaper units are blind. The Fujikura fusion splicer holds typical splice loss below 0.02 dB, which keeps a repaired run inside its original loss budget instead of eating headroom the design did not have.',
          ],
        },
        {
          h2: 'Calibration and what arrives with the kit',
          body: [
            'Instruments ship with current calibration. This matters more than it sounds: a certification report from an out-of-calibration tester can be rejected outright, which means re-testing the whole installation at your cost. Ask for the calibration status when you book if your consultant requires it on the handover pack.',
            'Adapters and consumables travel with the instrument — permanent link and channel adapters for the DSX, cleaver, electrodes and carry case for the splicer. Delivery, collection and setup are included in the rate. Operator training, standby replacement units and a dedicated on-site engineer are quoted separately where a project needs them.',
          ],
        },
      ],
      caseStudy: {
        h2: 'Proven on Abu Dhabi tower and mall handovers',
        body: 'These are the instruments behind IP Care\'s own ELV and structured cabling deliveries. At Al Jeel Tower, a 168-apartment residential and retail build, the same class of kit certified 2,391 Cat6A outlets and supported close to 2,500 fibre splices across 82 racks. At Paragon Mall, a 48-core fibre backbone carried 3,200 OTDR-tested splices and 1,192 patched ports. The point is not the headline numbers — it is that copper certification, OTDR tracing and fusion splicing are work we do on our own projects to handover standard, at Soho Tower Saadiyat and Mubadala Arena among others, not a box we hand over and hope you can drive. If you need an operator as well as the instrument, we can supply both.',
        href: '/portfolio/al-jeel-tower',
        linkLabel: 'See the Al Jeel Tower delivery',
      },
      faqs: [
        {
          q: 'How much does it cost to rent a Fluke DSX 5000 in the UAE?',
          a: 'The Fluke DSX 5000 CableAnalyzer rents at AED 350 per day. The AFL Noyes M210 OTDR and the Fujikura fusion splicer kit are both AED 300 per day. Rates are indicative, per unit and exclude VAT, and include delivery, collection and setup. Test instruments are quoted on a day rate; for commissioning or handover phases running several weeks, contact us and we will price the period against your project.',
        },
        {
          q: 'What is the difference between a cable certifier and a cable tester?',
          a: 'A tester confirms a cable is connected and passing traffic. A certifier measures performance against the TIA or ISO standard — insertion loss, NEXT, return loss and delay skew — and issues a pass or fail traceable to that standard. Consultants and main contractors generally accept only certification reports at handover, which is why the DSX 5000 is the instrument specified on structured cabling projects.',
        },
        {
          q: 'Do the instruments come calibrated?',
          a: 'Yes. Instruments ship with current calibration, which matters because a certification report produced on an out-of-calibration tester can be rejected and force a full re-test at your cost. Tell us when booking if your consultant requires calibration certificates in the handover pack.',
        },
        {
          q: 'Can I rent an OTDR for a single day?',
          a: 'Yes, one day is the minimum period, and test instruments are quoted on a day rate. Fault-finding work often needs only a day or two, which is exactly the case where renting beats owning. For longer commissioning or handover phases, contact us and we will price the full period rather than billing day by day.',
        },
        {
          q: 'Do you rent fusion splicers for on-site fibre repair?',
          a: 'Yes. The Fujikura kit is supplied as a complete carry case with cleaver, electrodes, heat-shrink oven and AC adapter, and holds enough battery for 200-plus splices per charge for off-grid site work. It is the right tool where fibre must be repaired, extended or terminated properly rather than patched with a mechanical connector.',
        },
      ],
    },
    products: [
      P('fluke-dsx-5000', 'Fluke Networks', 'DSX 5000 CableAnalyzer', ['Certifies Cat 5e to Cat 6A at 500 MHz, pass/fail in under 10 seconds', 'Tests PoE up to 60W so you know the port delivers before the AP goes up', 'LinkWare Live: reports sync to the cloud before you\'ve packed the kit'], { Standard: 'Cat 5e / 6 / 6A up to 500 MHz', PoE: 'Up to 60W PoE+ testing', Cloud: 'LinkWare Live report upload', Connector: 'Permanent link + channel adapters included', Display: '5" colour touchscreen', Battery: '8 hr runtime' }, { daily: 350 }, '/Rental/testing-fluke-dsx5000.webp'),
      P('afl-noyes-m210-otdr', 'AFL Noyes', 'M210 OTDR', ['Traces singlemode and multimode fibre, one unit, both jobs', '1310 / 1550 nm wavelengths catch faults, reflections and losses most gear misses', 'Compact and field-rugged, fits in a backpack, no cart required'], { Type: 'Singlemode + multimode OTDR', Wavelengths: '1310 / 1550 nm (SM) · 850 / 1300 nm (MM)', DynamicRange: 'Up to 35 dB', EventDeadzone: '0.8 m typical', Display: 'Colour LCD with automatic event analysis', Battery: '8 hr field runtime' }, { daily: 300 }, '/Rental/testing-afl-m210-otdr.jpg'),
      P('fiber-splicing-machine', 'Fujikura', 'Fusion Splicer Kit', ['Arc-fusion splicing with sub-0.02 dB typical splice loss', 'Built-in fibre cleaver + heat-shrink oven, everything in one carry case', 'Ruggedised case with battery backup rated for full off-grid site days'], { Type: 'Core-alignment fusion splicer', SpliceLoss: '< 0.02 dB typical (SM)', SpliceTime: '9 seconds', SleeveHeating: '35 seconds', Battery: '200+ splices per charge', Includes: 'Cleaver, electrodes, carry case, AC adapter' }, { daily: 300 }, '/Rental/testing-fiber-splicer.jpg'),
    ],
  },
  'servers': {
    name: 'Servers & Data',
    icon: 'Server',
    keyword: 'Server Rental UAE',
    title: 'Server Rental UAE: Dell, HPE, Supermicro | IP Care Technologies',
    metaDescription: 'Enterprise server rental in UAE. Dell PowerEdge, HPE ProLiant, Supermicro, delivered configured with storage, backup and on-site setup.',
    description: 'Rack-mount and tower servers for broadcast, event analytics, temporary data centres and short-term workloads.',
    content: {
      intro: 'Servers get rented when a workload needs real compute for a defined period and buying hardware makes no sense: broadcast and event analytics, a temporary data centre at a venue, a migration or disaster-recovery standby, a proof-of-concept, or burst capacity for a project. The requirement is enterprise-grade compute that arrives configured and comes off the books when the work is done.',
      sections: [
        {
          h2: 'Compute, storage and power as one system',
          body: [
            'A server on its own is rarely the deployment. Event analytics and temporary data centres need compute, fast storage, and the UPS and power protection to keep them up through the event — a rack that loses power at the wrong moment loses the data with it. We supply the parts as a system: Dell PowerEdge and HPE ProLiant compute, PowerVault storage, and Smart-UPS protection, sized together.',
            'Where the deployment goes somewhere hostile — a site cabin, an outdoor event compound — ruggedised and short-depth options exist that a standard data-centre chassis cannot handle.',
          ],
        },
        {
          h2: 'Configured for the workload',
          body: [
            'Rented servers can arrive as bare metal for your team to build, or provisioned to your specification — hypervisor installed, storage configured, joined to your management. For a short deployment window, having the virtualisation and storage layer ready before delivery is often the difference between hitting the event date and missing it.',
            'For broadcast and analytics work with a hard start time, we can stage and test the full stack before it ships, so it arrives proven rather than as components to assemble under deadline.',
          ],
        },
        {
          h2: 'What the rate covers',
          body: [
            'Quoted rates are per unit and exclude VAT. Delivery, installation, collection and setup are included, along with technical support for the rental. Hypervisor and storage provisioning, on-site commissioning, redundant power and a dedicated engineer are quoted separately against the deployment.',
            'Plan on one to two days between confirmed order and delivery across the UAE. For pre-provisioned or staged-and-tested builds, flag the requirement at booking so the work is done before the hardware ships.',
          ],
        },
      ],
      caseStudy: {
        h2: 'Temporary data centres for live events',
        body: 'Deploying compute to a venue for the length of an event is something IP Care does as a named capability: NOC-grade compute, storage and networking in portable racks with redundant power and cooling, stood up on site and removed afterwards. It is the same discipline behind the event analytics and broadcast workloads at the major events in the portfolio. Renting server hardware from a team that builds temporary data centres for live events means the kit is specified by people who have had to keep it running under those conditions.',
        href: '/event-it/temporary-data-centres',
        linkLabel: 'See temporary data centre deployments',
      },
      faqs: [
        {
          q: 'How much does it cost to rent a server in the UAE?',
          a: 'Server rental is priced by configuration, from single rack-mount compute nodes up to compute-plus-storage-plus-UPS deployments for temporary data centres, with UPS and power protection available alongside. Weekly and monthly bands carry a discount suited to project and migration timelines. Rates are indicative, per unit and exclude VAT, and include delivery and setup.',
        },
        {
          q: 'Can servers arrive pre-provisioned with a hypervisor and storage?',
          a: 'Yes. We can install the hypervisor, configure storage and join the machines to your management before delivery, and for broadcast or analytics work with a hard start time we stage and test the full stack in advance so it arrives proven. Share the specification when booking.',
        },
        {
          q: 'Do you provide temporary data centres for events?',
          a: 'Yes. Beyond individual servers, IP Care deploys NOC-grade compute, storage and networking in portable racks with redundant power and cooling for the length of an event, then removes them afterwards. This is a scoped deployment rather than a hardware rental — send the requirement and we will design it.',
        },
        {
          q: 'What is the minimum rental period?',
          a: 'One day. Daily, weekly and monthly rates are available, with the longer bands suited to migration, disaster-recovery standby and multi-week project workloads. Rates shown are indicative, per unit and exclude VAT.',
        },
      ],
    },
    products: [
      P('dell-r760', 'Dell', 'PowerEdge R760', ['Dual Xeon Emerald Rapids', 'Up to 8 TB DDR5', '24× 2.5" NVMe bays'], { FormFactor: '2U rack', CPU: '2× Intel Xeon 5/6th Gen', MaxRAM: '8 TB DDR5', Storage: 'Up to 24× 2.5" NVMe', GPU: 'Up to 6× double-wide', Mgmt: 'iDRAC 9' }, { daily: 520, weekly: 2600, monthly: 7800 }, '/images/rental/servers/dell-poweredge-r760.webp'),
      P('dell-r740', 'Dell', 'PowerEdge R740', ['Dual Xeon Scalable (2nd Gen)', 'Up to 3 TB DDR4', '16× 2.5" or 8× 3.5" drive bays'], { FormFactor: '2U rack', CPU: '2× Intel Xeon Scalable', MaxRAM: '3 TB DDR4', Storage: 'Up to 16× 2.5" or 8× 3.5"', GPU: 'Up to 3× double-wide', Mgmt: 'iDRAC 9' }, { daily: 400, weekly: 2000, monthly: 6000 }, '/images/rental/servers/dell-poweredge-r760.webp'),
      P('hpe-dl380-gen11', 'HPE', 'ProLiant DL380 Gen11', ['Dual 5th Gen Xeon', 'Up to 8 TB DDR5', 'Composable with GreenLake'], { FormFactor: '2U rack', CPU: '2× Intel Xeon 5th Gen', MaxRAM: '8 TB DDR5', Storage: 'Up to 36 LFF / 50 SFF', Mgmt: 'iLO 6, ProLiant integrated' }, { daily: 510, weekly: 2540, monthly: 7600 }, '/images/rental/servers/hpe-proliant-dl380-gen11.webp'),
      P('supermicro-sys-221h', 'Supermicro', 'SYS-221H-TNR', ['Dual Xeon Sapphire Rapids', '4 TB DDR5', '10× hot-swap NVMe'], { FormFactor: '2U rack', CPU: '2× Intel Xeon 4th Gen', MaxRAM: '4 TB DDR5', Storage: '10× hot-swap NVMe' }, { daily: 420, weekly: 2100, monthly: 6300 }, '/images/rental/servers/supermicro-sys-221h-tnr.webp'),
      P('dell-me5024', 'Dell', 'PowerVault ME5024', ['24× 2.5" SAS/SSD', 'Up to 4 PB raw', '12G SAS host ports'], { FormFactor: '2U storage', MaxRaw: '4 PB', Drives: '24× 2.5" SAS/SSD', Hosts: '12G SAS / FC / iSCSI' }, { daily: 360, weekly: 1800, monthly: 5400 }, '/images/rental/servers/dell-powervault-me5024.webp'),
      P('dell-xr4000z', 'Dell', 'PowerEdge XR4000z (Rugged)', ['Short-depth 12" rack', 'Rugged MIL-STD-810H', 'For edge + events'], { FormFactor: '2U short-depth (12")', CPU: 'Intel Xeon D', Environment: 'MIL-STD-810H rugged', Use: 'Edge computing, events, field' }, { daily: 390, weekly: 1960, monthly: 5800 }, '/images/rental/servers/dell-poweredge-xr4000z.webp'),
      P('apc-smt-3000-xl', 'APC', 'Smart-UPS SMT3000RMXL', ['3000 VA / 2700 W UPS', 'Rack 2U', 'Extended runtime'], { FormFactor: '2U rack UPS', Capacity: '3 kVA / 2.7 kW', Runtime: '~45 min at 50%', Mgmt: 'Network card included' }, { daily: 160, weekly: 800, monthly: 2300 }, '/images/rental/servers/apc-smart-ups-smt3000rmxl.webp'),
    ],
  },
  'bundles': {
    name: 'Bundle Packages',
    icon: 'Package',
    keyword: 'Event IT Rental Bundle UAE',
    title: 'Event IT Rental Bundles UAE: Pre-configured Packages | IP Care',
    metaDescription: 'Pre-configured IT rental bundles in UAE. 10-person event bundle, conference room pack, network testing kit. Everything included, delivered and setup.',
    description: 'Pre-configured all-in-one packages sized for common use cases. One line item, one price, fully assembled, delivered and set up.',
    products: [
      P('event-10-person', 'IP Care', '10-Person Event Bundle', ['10× business laptops', '2× event WiFi APs', '1× MFP + 1× firewall'], { Laptops: '10× Dell Latitude 5450', WiFi: '2× HPE Aruba AP-635 WiFi 6E', Firewall: '1× Fortinet FortiGate 60F', Printer: '1× HP LaserJet M404dn colour MFP', Includes: 'Pre-configuration, delivery, setup, on-site tech day 1', Duration: 'Min 3 days' }, { daily: 1780, weekly: 8400, monthly: 27000 }, '/Rental/bundle-event-10-person.webp'),
      P('conference-room-pack', 'IP Care', 'Conference Room Pack', ['Full AV + collaboration', 'MS Teams / Zoom certified', 'Ready in 4 hours'], { Display: '75" 4K commercial display', Conferencing: 'Logitech Rally Bar + Tap IP', Laptops: '2× Surface Pro 11 hosts', Wireless: '1× Meraki MX85 + MR57 AP', Setup: 'Full on-site install by engineer', Use: 'Board rooms, summits, hybrid events' }, { daily: 1160, weekly: 5400, monthly: 17000 }, '/Rental/bundle-conference-room-pack.webp'),
      P('network-testing-kit', 'IP Care', 'Network Testing Kit', ['All 3 tools in one booking — Fluke DSX 5000, AFL M210 OTDR, Fujikura Splicer', 'AED 865/day against AED 950 for the three hired separately', 'Ruggedised cases, LinkWare reports and same-day collection included'], { Copper: 'Fluke DSX 5000 CableAnalyzer — Cat 5e to Cat 6A, 500 MHz', Fibre: 'AFL Noyes M210 OTDR — SM + MM, 1310/1550 nm', Splicing: 'Fujikura Fusion Splicer — <0.02 dB splice loss', Cases: 'Individual ruggedised travel cases per unit', Docs: 'LinkWare Live reports bundled at no extra cost', Saving: 'AED 865/day vs AED 950 hiring the three separately, about 9% lower', Duration: 'Minimum 2 days · delivery and collection included' }, { daily: 865 }, '/Rental/testing-fluke-dsx5000.webp', ['/Rental/testing-fluke-dsx5000.webp', '/Rental/testing-afl-m210-otdr.jpg', '/Rental/testing-fiber-splicer.jpg']),
    ],
  },
  'macbooks': {
    name: 'MacBook & Mac',
    icon: 'Laptop',
    keyword: 'Mac Rental Dubai & Abu Dhabi',
    // The Mac hub. In the 3 months to 2026-09-20 this page took ~2,400 impressions for
    // "rent mac pro" (pos 14), "rent macbook pro" (10), "imac rental dubai" (19),
    // "rent macbook pro abu dhabi" (15) and "rent imac" (9) with almost no clicks, while
    // /rental/laptops-desktops and the iMac product page competed for the same queries.
    // Title now names MacBook Pro, iMac and both cities; the iMac is cross-listed below.
    title: 'MacBook Pro & iMac Rental Dubai & Abu Dhabi | IP Care',
    // This page is the one meant to own iMac searches, but in the 28 days to 2026-10-09
    // (UAE) "imac rental" still split across it (pos 21), the iMac product page (11) and
    // /rental (58). The H1 now names the iMac alongside the MacBook, and the iMac product
    // page links back here.
    h1: 'MacBook & iMac Rental',
    // Previously promised "same-day delivery in Dubai and Abu Dhabi" here and in the
    // description, and asked "delivered to a Dubai event venue tomorrow morning?".
    // Confirmed lead time is one to two days from confirmed order, so those claims set
    // customers up for a missed first order — and contradicted the tablets and
    // testing-equipment pages, which state the real window.
    metaDescription: `MacBook Pro, MacBook Air, iMac, Mac mini and Mac Studio rental in ${RENTAL_REGION.prose}. M4 models, daily to monthly rates, setup included.`,
    description: `Current-generation Apple Macs, from MacBook Air and MacBook Pro to iMac, Mac mini and Mac Studio, ready to deploy in ${RENTAL_REGION.prose} for events, shoots, hackathons, agency overflow and short-term staffing. Plan on one to two days between confirmed order and delivery. Daily, weekly and monthly rentals, pre-configured with Creative Cloud, Logic Pro, Final Cut and Xcode on request.`,
    // Products that live in another category but belong in this one for the searcher.
    // Rendered as cards (linking to their one canonical product URL) and included in the
    // ItemList schema; they are not duplicated as /rental/macbooks/<slug> pages.
    crossListed: [
      { category: 'laptops-desktops', slug: 'macbook-pro-14-m4' },
      { category: 'laptops-desktops', slug: 'apple-imac-24-m4' },
    ],
    content: {
      intro: 'MacBooks get rented for work that is specifically Mac work: video and photo editing on location, music and audio production, iOS development, design, and the creative and agency overflow that arrives with a deadline attached. The machine matters less than what is on it and whether it is ready when the shoot or sprint starts.',
      sections: [
        {
          h2: 'Configured for the work, not just wiped',
          body: [
            'A rented Mac that arrives signed out and empty is a morning lost to installs and licence sign-ins. On request we preload Creative Cloud, Final Cut Pro, Logic Pro and Xcode, and can enrol the machines in your MDM so they land inside your management and security rather than as unmanaged devices. The aim is that an editor opens the lid and starts cutting.',
            'The fleet is current-generation across the range — MacBook Air M3 for portable production and presentation, MacBook Pro M4 and M4 Max for video, 3D and ML work, and Mac mini and Mac Studio where a desk-bound workstation is the better fit.',
          ],
        },
        {
          h2: 'Silicon matched to the job',
          body: [
            'The gap between an Air and a Pro Max is real money and real performance. An M3 Air is right for presentation, light editing and development. Sustained 4K and multicam video, heavy Xcode builds and ML workloads want the thermal headroom and GPU cores of an M4 Pro or Max. For fixed-position colour and render work, a Mac Studio often does more per dirham than a laptop you are not carrying anywhere.',
            'Tell us the application and footage or project type and we will specify the machine, rather than defaulting everyone to the most expensive option.',
          ],
        },
        {
          h2: 'iMac and desktop Macs',
          body: [
            'Not every Mac job needs to travel. For reception and registration desks, design and editing stations, and a temporary desk-bound replacement while a Mac is away for repair, the iMac 24" M4 is usually the right machine: Apple M4, 16 GB unified memory and a 4.5K Retina display, with keyboard and mouse included. It rents from AED 240 per day.',
            'Where the work needs more power than an all-in-one, the Mac mini M4 Pro and Mac Studio M2 Ultra sit on the same desk with your own displays. All three are delivered, set up and collected the same way as the MacBooks.',
          ],
        },
        {
          h2: 'Mac rental in Dubai and Abu Dhabi',
          body: [
            'Our team is based in Abu Dhabi and delivers, sets up and collects rented Macs across Abu Dhabi and Dubai, and on to Sharjah, Al Ain and the rest of the UAE. Plan on one to two days between confirmed order and delivery, whichever emirate the shoot, event or office is in.',
          ],
        },
        {
          h2: 'What the rate covers',
          body: [
            'Quoted rates are per unit and exclude VAT. Delivery, collection and setup are included, along with technical support for the rental. Software preloading, MDM enrolment, standby spares and a dedicated on-site engineer for a shoot or event are quoted separately.',
            'Plan on one to two days between confirmed order and delivery across the UAE. Flag the software and configuration you need when booking so it is done before the machines ship.',
          ],
        },
      ],
      faqs: [
        {
          q: 'How much does it cost to rent a MacBook in the UAE?',
          a: 'MacBook rental starts at AED 190 per day for a MacBook Air M3. The MacBook Pro starts at AED 260 per day for the 14" M4, with the 16" M4 Pro at AED 360 and the 14" M4 Max at AED 420. Mac mini and Mac Studio are also available for desk-bound work. Weekly and monthly bands carry a substantial discount. Rates are indicative, per unit and exclude VAT, and include delivery and setup.',
        },
        {
          q: 'Can you preinstall Final Cut, Logic or Creative Cloud?',
          a: 'Yes, on request. We preload Final Cut Pro, Logic Pro, Adobe Creative Cloud and Xcode, and can enrol the machines in your MDM, so a rented Mac arrives ready to work rather than needing a morning of installs and sign-ins. Tell us what you need when booking.',
        },
        {
          q: 'Should I rent a MacBook Air or a MacBook Pro?',
          a: 'The Air M3 suits presentation, light editing and development and costs less. Sustained 4K or multicam video, heavy Xcode builds and ML work want a MacBook Pro M4 Pro or M4 Max for the extra GPU cores and thermal headroom. For fixed-desk colour or render work a Mac Studio is often the better value. Tell us the workload and we will match the machine.',
        },
        {
          q: 'What is the minimum rental period?',
          a: 'One day. Daily, weekly and monthly rates are available, with the longer bands offering better value beyond a few days. Rates shown are indicative, per unit and exclude VAT.',
        },
        {
          q: 'Can I rent an iMac in Dubai or Abu Dhabi?',
          a: 'Yes. The iMac 24" M4 (Apple M4, 16 GB unified memory, 512 GB SSD, 4.5K Retina display) rents from AED 240 per day, with weekly and monthly rates, and is delivered and set up across Dubai, Abu Dhabi and the wider UAE. Rates are indicative, per unit and exclude VAT.',
        },
        {
          q: 'Do you rent the Mac Pro?',
          a: 'The tower Mac Pro is not in the fleet. For the workloads people usually mean when they ask — colour grading, broadcast, ML, high-channel-count audio — the Mac Studio M2 Ultra uses the same M2 Ultra chip as the base Mac Pro at a lower day rate, and it is what we actually deploy on those jobs. Tell us the workload and we will confirm it covers you before you book.',
        },
        {
          q: 'Do you rent the iMac Pro?',
          a: 'Apple discontinued the iMac Pro in 2021, so it is not available from us or from Apple directly. The current iMac 24" M4 is the machine that replaced it, is faster on CPU tasks, and is what we rent for the same desk-bound, all-in-one use cases. For heavier GPU work, the Mac Studio M2 Ultra is the step up.',
        },
        {
          q: 'Can you deliver Macs outside the UAE?',
          a: 'For events and projects, yes. Deliveries to Qatar, Saudi Arabia, Oman and Bahrain are quoted per project. Share the country, venue, dates and quantities and we will confirm availability and lead time before you commit.',
        },
      ],
    },
    products: [
      P('macbook-pro-16-m4-pro', 'Apple', 'MacBook Pro 16" M4 Pro', ['Apple M4 Pro chip (12-core CPU)', '24 GB unified memory · 1 TB SSD', '16.2" Liquid Retina XDR display'], { CPU: 'Apple M4 Pro (12-core)', GPU: '18-core Apple GPU', RAM: '24 GB unified', Storage: '1 TB SSD', Display: '16.2" Liquid Retina XDR 3456×2234', OS: 'macOS Sequoia', Ports: '3× Thunderbolt 5, HDMI, SDXC, MagSafe 3', Battery: 'Up to 22 hrs', Use: 'Video editing, 3D, broadcast, dev workstations' }, { daily: 360, weekly: 1960, monthly: 6400 }, LAPTOP_IMG),
      P('macbook-pro-14-m4-max', 'Apple', 'MacBook Pro 14" M4 Max', ['Apple M4 Max chip (14-core CPU)', '36 GB unified memory · 1 TB SSD', '14.2" Liquid Retina XDR display'], { CPU: 'Apple M4 Max (14-core)', GPU: '32-core Apple GPU', RAM: '36 GB unified', Storage: '1 TB SSD', Display: '14.2" Liquid Retina XDR 3024×1964', OS: 'macOS Sequoia', Ports: '3× Thunderbolt 5, HDMI, SDXC, MagSafe 3', Battery: 'Up to 18 hrs', Use: 'High-end video, ML/AI development, motion graphics' }, { daily: 420, weekly: 2300, monthly: 7600 }, LAPTOP_IMG),
      P('macbook-air-15-m3', 'Apple', 'MacBook Air 15" M3', ['Apple M3 chip (8-core CPU)', '16 GB unified memory · 512 GB SSD', '15.3" Liquid Retina display'], { CPU: 'Apple M3 (8-core)', GPU: '10-core Apple GPU', RAM: '16 GB unified', Storage: '512 GB SSD', Display: '15.3" Liquid Retina 2880×1864', OS: 'macOS Sequoia', Ports: '2× Thunderbolt 3, MagSafe 3', Battery: 'Up to 18 hrs', Use: 'Events, training rooms, business travel' }, { daily: 190, weekly: 1040, monthly: 3500 }, LAPTOP_IMG),
      P('macbook-air-13-m3', 'Apple', 'MacBook Air 13" M3', ['Apple M3 chip (8-core CPU)', '16 GB unified memory · 256 GB SSD', '13.6" Liquid Retina display'], { CPU: 'Apple M3 (8-core)', GPU: '8-core Apple GPU', RAM: '16 GB unified', Storage: '256 GB SSD', Display: '13.6" Liquid Retina 2560×1664', OS: 'macOS Sequoia', Ports: '2× Thunderbolt 3, MagSafe 3', Battery: 'Up to 18 hrs', Weight: '1.24 kg', Use: 'Hackathons, conference attendees, registration desks' }, { daily: 190, weekly: 880, monthly: 2900 }, LAPTOP_IMG),
      P('mac-mini-m4-pro', 'Apple', 'Mac mini M4 Pro', ['Apple M4 Pro chip', '24 GB unified memory · 512 GB SSD', 'Compact desktop form factor'], { CPU: 'Apple M4 Pro (12-core)', GPU: '16-core Apple GPU', RAM: '24 GB unified', Storage: '512 GB SSD', OS: 'macOS Sequoia', Ports: '3× Thunderbolt 5, 2× USB-A, HDMI, Ethernet, headphone', Wireless: 'WiFi 6E + Bluetooth 5.3', Use: 'Edit suites, digital signage, dev workstations' }, { daily: 190, weekly: 1040, monthly: 3500 }, LAPTOP_IMG),
      P('mac-studio-m2-ultra', 'Apple', 'Mac Studio M2 Ultra', ['Apple M2 Ultra chip', '64 GB unified memory · 1 TB SSD', 'Desktop workstation power'], { CPU: 'Apple M2 Ultra (24-core)', GPU: '60-core Apple GPU', RAM: '64 GB unified', Storage: '1 TB SSD', OS: 'macOS Sequoia', Ports: '6× Thunderbolt 4, 2× USB-A, HDMI, 10 Gb Ethernet, SDXC', Use: 'Colour grading, broadcast, ML, photo studios' }, { daily: 480, weekly: 2600, monthly: 8800 }, LAPTOP_IMG),
    ],
  },
}

// ─── Per-product long-form content ───────────────────────────────────────────
// Keyed by product slug and merged in getProduct(), so the P() factory signature
// and the ~60 existing product definitions stay untouched.
//
// Product detail pages ran ~317 words. Several of the strongest striking-distance
// queries in Search Console point at individual products rather than the category:
// "ipad mini rental" (pos 15.9), "rent ipad mini" (14.2), "hire ipad mini" (14.1),
// "rent ipad pro" (19.3), "ipad air rental" (18.6) — all with zero clicks. Each
// entry below targets the query cluster for that specific device.
//
// `usedFor` renders as a bulleted deployment list; `body` as prose paragraphs.
export const productContent = {
  'ipad-mini-7': {
    body: [
      'The iPad mini is the handheld of the fleet. At 8.3 inches it is the device staff hold for a whole shift rather than mount on a stand, which makes it the usual choice for roaming survey capture, queue-busting, ticket scanning and clipboard replacement work.',
      'Rented units arrive enrolled in MDM with your app pushed and the device locked to it. For survey and data-capture work we normally configure Single App Mode so a respondent handed the device cannot navigate away from the form, and disable notifications so nothing interrupts a half-completed response.',
      'Battery is the practical constraint on handheld deployments. Continuous screen-on use runs four to six hours, so a full event day needs either a mid-shift swap or a charging rotation. We size the order for that rather than leaving you to discover it at hour five.',
    ],
    usedFor: [
      'Roaming audience and visitor surveys',
      'Queue-busting and mobile ticket scanning',
      'Field inspection and checklist capture',
      'Waiter and floor-staff ordering',
    ],
    faqs: [
      {
        q: 'Do you rent older iPad mini models, like the iPad mini 4?',
        a: 'No. We rent the current iPad mini 7, which replaced the older models. It has the A17 Pro chip and an 8.3-inch display and runs current iPadOS versions that older minis such as the mini 4 cannot. It rents from AED 90 per day.',
      },
      {
        q: 'How long does the iPad mini battery last in handheld use?',
        a: 'Plan on four to six hours of continuous screen-on use. For a full event day, either swap devices mid-shift or run a charging rotation; we size the order for that when you book, so the fleet does not run flat at hour five.',
      },
    ],
  },
  'ipad-pro-13-m4': {
    body: [
      'The 13-inch iPad Pro is specified when display quality is the point of the deployment. The Ultra Retina XDR OLED panel holds up under exhibition-hall lighting where cheaper displays wash out, which matters for product visualisation, architectural walkthroughs and creative review at a stand.',
      'The M4 chip and 5G cellular option make it the practical choice where the deployment cannot depend on venue WiFi. Apple Pencil Pro and Magic Keyboard are available with the rental for annotation and sign-off workflows.',
      'For high-value devices on open stands we recommend locked stands and tethers as standard. These are quoted separately, but on a Pro-class fleet they are cheaper than replacing a unit that walked.',
    ],
    usedFor: [
      'Exhibition stand product demonstrations',
      'Design and architectural review sessions',
      'Executive briefing and boardroom presentation',
      'Digital signage and wayfinding at premium venues',
    ],
    faqs: [
      {
        q: 'Is this the iPad Pro 12.9-inch?',
        a: 'It is its replacement. Apple retired the 12.9-inch iPad Pro in 2024 and replaced it with the 13-inch M4 model, which has a larger Ultra Retina XDR OLED display and the M4 chip. If you are looking to rent a 12.9-inch iPad Pro, this is the current equivalent, at AED 190 per day.',
      },
      {
        q: 'Do you rent 4G or 5G iPads?',
        a: 'Yes. The iPad Pro 13" M4 is the WiFi + Cellular model with 5G, and the cellular option in our tablet fleet, so it can run on mobile data where venue WiFi is unreliable or unavailable. Tell us when booking that you need cellular and we will set it up for mobile data before delivery.',
      },
      {
        q: 'Can I rent an Apple Pencil or keyboard with the iPad Pro?',
        a: 'Yes. Apple Pencil Pro and Magic Keyboard are available with the iPad Pro rental for annotation, sign-off and note-taking. Add them when booking so they ship with the devices.',
      },
    ],
  },
  'ipad-air-11-m3': {
    body: [
      'The iPad Air is the middle of the range and the one most conference deployments settle on. It carries an M3 chip and an 11-inch Liquid Retina display at a materially lower rate than the Pro, which matters when the order is forty units rather than four.',
      'Typical use is fixed-position: registration and check-in desks, session feedback stations, and lead capture at stands. Devices arrive in kiosk mode with your registration or survey app loaded, so desk staff are not configuring anything on the morning of the event.',
      'Where the deployment is permanently powered, the Air will run all day without a swap protocol. That usually makes it the lower-total-cost option against a handheld fleet of the same size.',
    ],
    usedFor: [
      'Conference registration and check-in desks',
      'Session feedback and survey stations',
      'Exhibition lead capture',
      'Training-room device pools',
    ],
    faqs: [
      {
        q: 'Should I rent the iPad Air or the iPad Pro for an event?',
        a: 'For registration desks, surveys and lead capture, the iPad Air 11" M3 at AED 130 per day does the job at a lower rate, which adds up across a large order. Choose the iPad Pro 13" M4 (AED 190) when display quality is the point, such as product demonstrations under bright exhibition lighting, or when the devices need mobile data, as the Air is WiFi only.',
      },
      {
        q: 'Can the iPad Air run in kiosk mode for registration?',
        a: 'Yes. Devices can arrive enrolled in MDM with your registration or survey app locked on screen in Single App Mode, and auto-lock and notifications disabled, so desk staff are not configuring anything on the morning of the event. MDM and kiosk configuration are quoted with the order.',
      },
    ],
    readMore: { href: '/blog/ipad-kiosk-deployment-playbook', label: 'iPad kiosk deployments: the configuration playbook' },
  },
  'ipad-10th-gen': {
    body: [
      'The standard iPad is the volume option. At AED 80 per day it is the lowest entry point in the fleet, which makes it the sensible specification when the deployment needs quantity rather than a high-end panel — twenty kiosks around a venue rather than two on a premium stand.',
      'The A14 Bionic and 10.9-inch Liquid Retina display are more than adequate for form capture, menu browsing, check-in and wayfinding. Spending the difference on a Pro for that workload is rarely justified.',
      'Because this is the highest-turnover model in the fleet, availability is generally the best of any device we hold. It remains worth confirming quantity early for anything approaching the fifty-unit ceiling.',
    ],
    usedFor: [
      'Volume kiosk and wayfinding deployments',
      'Menu and self-order terminals',
      'Visitor check-in across multiple entrances',
      'Classroom and training device pools',
    ],
    faqs: [
      {
        q: 'What is the cheapest iPad to rent in the UAE?',
        a: 'The iPad (10th generation) is the lowest-cost iPad we rent, at AED 80 per day, AED 440 per week or AED 1,440 per month. It suits kiosks, check-in, menus and wayfinding, where you need quantity rather than a premium display. Rates are indicative, per unit and exclude VAT.',
      },
      {
        q: 'How many iPads can you supply at once?',
        a: 'We hold a fleet of up to 50 tablets for simultaneous deployment across the UAE, and the 10th-generation iPad is usually the most available model. Beyond that we can usually source additional units with a longer lead time, so share quantities and dates early.',
      },
    ],
    readMore: { href: '/blog/ipad-kiosk-deployment-playbook', label: 'iPad kiosk deployments: the configuration playbook' },
  },
  'samsung-galaxy-tab-s10': {
    body: [
      'The Galaxy Tab S10 Ultra is the Android option, specified when the app you are deploying is Android-only, or when your organisation already runs Android Enterprise and adding an iOS fleet would mean a second management path for a one-week event.',
      'The 14.6-inch display is the largest tablet we hold, which suits signage, floor plans and shared-viewing use where an 11-inch panel is too small to work around. The included S Pen supports signature capture and annotation workflows.',
      'Enrolment runs through Android Enterprise rather than Apple Business Manager, and kiosk lockdown uses managed-device mode. Tell us your MDM platform when ordering so devices arrive enrolled against your tenant.',
    ],
    usedFor: [
      'Android-only application deployments',
      'Signature and annotation capture with S Pen',
      'Large-format signage and floor plans',
      'Organisations standardised on Android Enterprise',
    ],
  },
  'microsoft-surface-pro-11': {
    body: [
      'The Surface Pro is the option when the workload is genuinely a Windows one. If the application is a full desktop program rather than a tablet app — a CAD viewer, a line-of-business client, an Access or Excel-based capture tool — a tablet running iPadOS will not run it, and this will.',
      'It joins your domain or Entra ID tenant like any other Windows endpoint, so it lands inside your existing group policy and security tooling rather than requiring a separate mobile management path.',
      'Type Cover and Surface Pen are available with the rental. For deployments that mix desk work with handheld capture, the detachable keyboard often removes the need for a separate laptop order.',
    ],
    usedFor: [
      'Windows desktop applications on a tablet form factor',
      'Domain or Entra ID joined temporary endpoints',
      'Site surveys needing full Windows tooling',
      'Mixed laptop and tablet workflows',
    ],
  },
}

// Mac products. Until 2026-09-29 only three Macs had their own content (added 2026-08,
// replaced here: it overstated the Mac Studio and iMac against the Mac Pro and iMac Pro
// and promised same-day imaging), so most Mac pages were the shared template plus a spec
// table: the two MacBook Air pages were 78% identical. Each
// entry says what that model is for against its nearest sibling, and its FAQs answer the
// searches that land on the Mac pages ("rent macbook pro", "rent mac pro", "rent imac pro").
// Rates quoted here must match the P() rates above. The Mac mini and Mac Studio are the
// computer only; displays and peripherals are quoted on request (confirmed 2026-09-29).
const MAC = (slug) => ({ category: 'macbooks', slug })
Object.assign(productContent, {
  'macbook-pro-14-m4': {
    body: [
      'The 14-inch MacBook Pro with the M4 chip is the entry point to the Pro range, and for many rentals it is the right one. It keeps what separates a Pro from an Air on a working day: active cooling that holds performance through a long export, a Liquid Retina XDR display bright enough for colour-critical review, and HDMI and an SD card slot, so a presenter or photographer is not hunting for adapters.',
      'It is the machine we specify for presenters, producers, developers and photographers who need more than an Air but are not cutting multicam 4K or training models. Where the work is sustained video, heavy Xcode builds or GPU-bound rendering, the M4 Pro and M4 Max models are the better fit, and we will say so before you book rather than after.',
      'On request it arrives with your software preloaded and enrolled in your MDM, so it can be handed straight to the person using it. Rates start at AED 260 per day, with weekly and monthly bands for longer engagements.',
    ],
    usedFor: [
      'Presenters and speakers who need HDMI without adapters',
      'Photographers offloading cards on location',
      'Developer and product-team loan machines',
      'Visiting executives and project teams',
    ],
    faqs: [
      {
        q: 'Which MacBook Pro should I rent: M4, M4 Pro or M4 Max?',
        a: 'Match the chip to the heaviest thing the machine will do. The 14" M4 (AED 260 per day) covers presentations, photo work, development and light video editing. The 16" M4 Pro (AED 360) adds CPU and GPU cores and a larger screen for sustained 4K editing and bigger builds. The 14" M4 Max (AED 420) is for 8K and multicam video, 3D, motion graphics and machine learning. Tell us the software and footage and we will specify the model. Rates are indicative, per unit and exclude VAT.',
      },
      {
        q: 'Can I rent a MacBook Pro in Abu Dhabi or Dubai for a single day?',
        a: 'Yes. The minimum rental is one day and the MacBook Pro 14" M4 is AED 260 per day, delivered, set up and collected across Abu Dhabi, Dubai and the rest of the UAE. Allow one to two days between confirmed order and delivery so the machine can be configured before it ships.',
      },
    ],
    related: [MAC('macbook-pro-16-m4-pro'), MAC('macbook-pro-14-m4-max'), MAC('macbook-air-13-m3')],
  },
  'macbook-pro-16-m4-pro': {
    body: [
      'The 16-inch MacBook Pro is the one to rent when the screen is part of the job. A 16.2-inch Liquid Retina XDR panel gives an editor room for a timeline, viewer and scopes without a second display, which matters on location, in a hotel suite or in a production office with no monitors to spare.',
      'The M4 Pro chip, with a 12-core CPU, 18-core GPU and 24 GB of unified memory, handles sustained 4K editing, large photo catalogues and substantial Xcode projects without throttling, and the 1 TB SSD holds a working project locally. Thunderbolt 5 runs external RAID and capture hardware at full bandwidth, and battery life is rated at up to 22 hours, the longest of any machine in the fleet.',
      'It sits between the 14-inch M4 and the M4 Max on price. For most video and photo work it is the sensible middle: enough headroom for the job without paying for GPU cores the project will not use.',
    ],
    usedFor: [
      'Location and on-set video editing',
      'Photo editing and tethered capture on a large screen',
      'Production-office workstations without external displays',
      'Developers with large codebases and simulators',
    ],
    faqs: [
      {
        q: 'Should I rent the 14-inch or the 16-inch MacBook Pro?',
        a: 'Choose the 16-inch when the person will work on the laptop screen all day, particularly for editing, and the 14-inch when it moves between rooms and venues. The 16" M4 Pro is AED 360 per day; the 14" is AED 260 with the M4 chip or AED 420 with the M4 Max. If the work is at a fixed desk with its own displays, a Mac mini or Mac Studio is often better value.',
      },
      {
        q: 'Can you preinstall Final Cut Pro or Adobe Creative Cloud?',
        a: 'Yes. On request we preload Final Cut Pro, Adobe Creative Cloud, Logic Pro and Xcode, and the M4 Pro handles sustained 4K editing in any of them. If you use other applications, name them when booking and we will confirm before dispatch.',
      },
    ],
  },
  'macbook-pro-14-m4-max': {
    body: [
      'The M4 Max is the most powerful Mac in the fleet that you can carry. A 14-core CPU, 32-core GPU and 36 GB of unified memory put it well ahead of the M4 Pro for multicam and 8K timelines, 3D rendering, motion graphics and machine-learning work, and the 14-inch chassis means that power goes where the crew goes.',
      'The extra GPU cores are what you are paying for. For export-heavy video, effects and local model training they shorten jobs measurably; for presentation, office and development work they sit idle, and the M4 or M4 Pro models are better value.',
      'We specify it for colourists and editors working on location, motion designers on a campaign deadline and engineers who need GPU memory on a laptop rather than in the cloud. At AED 420 per day it is also the portable alternative to the Mac Studio when the work cannot stay at one desk.',
    ],
    usedFor: [
      'Multicam and 8K video editing on location',
      'Motion graphics and 3D rendering',
      'Local machine-learning and AI model development',
      'Colour grading away from the suite',
    ],
    faqs: [
      {
        q: 'Is the M4 Max worth it over the M4 Pro?',
        a: 'Only if the work is GPU-bound. The M4 Max has a 32-core GPU and 36 GB of unified memory against the 18-core GPU and 24 GB of the 16" M4 Pro, which shortens 8K and multicam exports, 3D renders and ML training. For 4K editing, photo work and development the M4 Pro (AED 360 per day) does the job, and the M4 Max (AED 420) adds cost without a visible gain.',
      },
      {
        q: 'MacBook Pro M4 Max or Mac Studio for heavy work?',
        a: 'If the work stays at one desk with its own displays, the Mac Studio M2 Ultra (AED 480 per day) brings more CPU and GPU cores and 64 GB of memory. If the machine has to move between set, suite and hotel, the MacBook Pro 14" M4 Max is the portable option at AED 420 per day.',
      },
    ],
  },
  'macbook-air-15-m3': {
    body: [
      'The 15-inch MacBook Air is the choice when people will spend the whole day on the laptop screen but the work does not need a Pro. The 15.3-inch Liquid Retina display is noticeably easier to work on than the 13-inch for spreadsheets, documents and side-by-side windows, and the fanless design keeps a training room or project office silent.',
      'It carries an M3 chip with a 10-core GPU, 16 GB of unified memory and a 512 GB SSD, double the storage of the 13-inch, which matters when the machine holds course material, recordings or a local project for a week. Battery life is rated at up to 18 hours, enough for a full training day unplugged.',
      'The daily rate matches the 13-inch at AED 190; on weekly and monthly rentals the 13-inch costs less. Pick the 15-inch for screen space and storage, and the 13-inch when machines are carried all day or ordered in volume.',
    ],
    usedFor: [
      'Training rooms and workshops',
      'Temporary project and back-office staff',
      'Presenting and screen-sharing in meeting rooms',
      'Visiting teams working from a hotel or site office',
    ],
    faqs: [
      {
        q: 'Should I rent the MacBook Air 13-inch or 15-inch?',
        a: 'Both run the M3 chip with 16 GB of memory at AED 190 per day. The 15-inch adds a larger display, a 10-core GPU and 512 GB of storage, which suits people working on the laptop all day. The 13-inch is lighter at 1.24 kg and cheaper by the week (AED 880 against AED 1,040), which suits carried machines and larger orders.',
      },
    ],
  },
  'macbook-air-13-m3': {
    body: [
      'The 13-inch MacBook Air is the Mac we specify when an order is measured in dozens rather than units. At 1.24 kg and with no fan, it is the machine attendees carry between sessions, hackathon teams work on through the night and registration staff use at a desk all day, and it is the lowest-cost Mac in the fleet by the week and the month.',
      'The M3 chip and 16 GB of unified memory are well beyond what browsing, documents, presentations and most development work need. The 256 GB SSD is the one limit: for machines that will hold large media or local projects, the 15-inch Air with 512 GB or a MacBook Pro is the better fit.',
      'Volume orders are where preparation matters most. On request, machines are imaged identically, loaded with your apps and enrolled in MDM before they leave us, so a batch arrives as working machines rather than a pile of setup tasks. Tell us the quantity early, as larger orders need more lead time than the standard one to two days.',
    ],
    usedFor: [
      'Hackathons and coding bootcamps',
      'Conference and summit attendee machines',
      'Registration and check-in desks',
      'Short-term staff and interns',
    ],
    faqs: [
      {
        q: 'Can you supply a batch of MacBook Airs for a hackathon or training course?',
        a: 'Yes. The MacBook Air 13" M3 is AED 190 per day, AED 880 per week or AED 2,900 per month per unit, and batches can be imaged identically with your software and MDM enrolment. Share the quantity and dates as early as you can: larger orders need more lead time than the standard one to two days.',
      },
      {
        q: 'Is 256 GB of storage enough?',
        a: 'For documents, browser-based work, presentations and most coding, yes. For video, large photo libraries or local datasets, rent the MacBook Air 15" M3 with 512 GB or a MacBook Pro with 512 GB to 1 TB instead.',
      },
    ],
  },
  'mac-mini-m4-pro': {
    body: [
      'The Mac mini M4 Pro is a desktop Mac without the screen, which makes it the flexible option when displays are already on site or need to be something specific: a grading monitor, a pair of ultrawides or a video wall. It is the computer only; displays, keyboards and mice are quoted on request.',
      'The M4 Pro chip, with a 12-core CPU, 16-core GPU and 24 GB of unified memory, brings close to 16-inch MacBook Pro performance to a box small enough to sit behind a screen. Three Thunderbolt 5 ports, HDMI and wired Ethernet cover multi-display edit suites, signage players and build machines on a wired network.',
      'At AED 190 per day it is the lowest-cost way to put M4 Pro performance on a desk. For heavier grading, broadcast and ML work the Mac Studio M2 Ultra steps up, and where a single all-in-one is simpler, the iMac 24" M4 comes with its own display, keyboard and mouse.',
    ],
    usedFor: [
      'Temporary edit suites with your own monitors',
      'Digital signage and display-wall playback',
      'Build machines for iOS and macOS development',
      'Show-control and playback machines for events',
    ],
    faqs: [
      {
        q: 'Does the Mac mini include a display, keyboard and mouse?',
        a: 'No. The Mac mini M4 Pro is the computer only, designed to run with your own displays and peripherals. If you need displays, keyboards or mice, tell us when booking and we will quote them with the order. The iMac 24" M4 is the alternative when you want an all-in-one with display, keyboard and mouse included.',
      },
    ],
  },
  'mac-studio-m2-ultra': {
    body: [
      'The Mac Studio M2 Ultra is the most powerful Mac we rent, and the machine we deploy when someone asks for a Mac Pro. It uses the same M2 Ultra chip as the base Mac Pro, with a 24-core CPU, 60-core GPU and 64 GB of unified memory, in a desktop that fits on a producer\'s desk rather than under it.',
      'It is specified for colour grading, broadcast graphics and playback, high-track-count audio and machine-learning work, where sustained multi-core performance matters more than portability. Six Thunderbolt 4 ports, HDMI, 10 Gb Ethernet and an SD slot connect it to reference monitors, storage arrays and a facility network without adapters.',
      'Like the Mac mini, it is the computer only; displays, keyboards and mice are quoted on request. At AED 480 per day it costs more than a MacBook Pro M4 Max, and for work that stays at one desk it delivers more cores and memory for the difference.',
    ],
    usedFor: [
      'Colour grading and finishing suites',
      'Broadcast graphics and playback',
      'Music and post-production audio',
      'Machine-learning and data-processing workstations',
    ],
    faqs: [
      {
        q: 'Do you rent the Mac Pro?',
        a: 'The tower Mac Pro is not in our fleet. The Mac Studio M2 Ultra uses the same M2 Ultra chip as the base Mac Pro, with a 24-core CPU, 60-core GPU and 64 GB of memory, and it is what we deploy for Mac Pro workloads such as grading, broadcast and ML, at AED 480 per day. If the job depends on PCIe expansion cards, tell us before booking so we can confirm the right setup.',
      },
      {
        q: 'Does the Mac Studio come with a display?',
        a: 'No. Like the Mac mini, the Mac Studio is the computer only, so it can drive the reference monitors or displays your workflow needs. Displays, keyboards and mice are quoted on request with the order.',
      },
    ],
  },
  'apple-imac-24-m4': {
    body: [
      'The iMac 24" M4 is the all-in-one Mac: display, computer, Magic Keyboard and mouse in one delivery, which makes it the simplest machine to put on a reception desk, a registration counter or a row of design stations. There is nothing to cable up beyond power.',
      'The 4.5K Retina display is the reason creative teams ask for it. Photo and design work that looks soft on a standard office monitor is crisp at 4480 by 2520, and the Apple M4 chip with 16 GB of unified memory handles Adobe Creative Cloud and everyday editing without strain.',
      'For heavier work at a desk, a Mac mini M4 Pro or Mac Studio M2 Ultra with your own displays is the step up. For a temporary replacement while a Mac is away for repair, or a design team scaling up for a campaign, the iMac is usually the right answer, at AED 240 per day with weekly and monthly rates.',
    ],
    usedFor: [
      'Reception, registration and visitor desks',
      'Design and photo-editing stations',
      'Temporary replacements while a Mac is repaired',
      'Showroom and retail display machines',
    ],
    faqs: [
      {
        q: 'Do you rent the iMac Pro?',
        a: 'Apple discontinued the iMac Pro in 2021, so it is not part of our fleet. The iMac 24" M4 replaced it for desk-bound creative work and is faster on CPU tasks; for heavier GPU work, a Mac Studio M2 Ultra with your own display is the step up.',
      },
      {
        q: 'Are a keyboard and mouse included with the iMac?',
        a: 'Yes. Every iMac 24" M4 rental includes the Magic Keyboard and mouse, delivered, set up and collected across Dubai, Abu Dhabi and the wider UAE. Rates start at AED 240 per day and exclude VAT.',
      },
    ],
    related: [MAC('mac-mini-m4-pro'), MAC('mac-studio-m2-ultra'), MAC('macbook-air-15-m3')],
    // The iMac is filed under laptops-desktops, so its breadcrumb and "see all" link point
    // there. This sends the iMac query signal to the Mac hub instead.
    readMore: { href: '/rental/macbooks', label: 'All iMac and MacBook rental in Dubai & Abu Dhabi' },
  },
})

// Testing-equipment products. Each has a matching blog article that until now linked
// nowhere near the rental pages, so the `readMore` link closes that loop in both
// directions. "afl m210 otdr" sits at position 10.3 in Search Console — the closest
// single win on the site — and /rental/testing-equipment/fluke-dsx-5000 is already the
// best-converting rental product page at 3.1% CTR.
Object.assign(productContent, {
  'fluke-dsx-5000': {
    body: [
      'The DSX 5000 is the instrument specified when a copper handover has to be certified rather than merely tested. It measures against TIA and ISO limits — insertion loss, NEXT, return loss, delay skew — and returns a pass or fail in under ten seconds per link, which is what makes certifying several hundred outlets in a week realistic.',
      'PoE testing to 60W is the feature that saves return visits. Knowing a port actually delivers power before the access point goes up on a ceiling mount is considerably cheaper than discovering it afterwards from a ladder.',
      'Results upload to LinkWare Live, so the report exists in the cloud before the kit is packed. On a disputed handover that report is the document that settles it, which is why consultants ask for DSX output by name.',
    ],
    usedFor: [
      'Structured cabling handover certification',
      'Cat 5e / 6 / 6A acceptance testing to 500 MHz',
      'PoE delivery verification before AP installation',
      'Fault diagnosis on failing copper runs',
    ],
    readMore: { href: '/blog/fluke-dsx-5000-rental-uae', label: 'When you need real copper certification' },
  },
  'afl-noyes-m210-otdr': {
    body: [
      'An OTDR answers a question no other instrument can: not just whether a fibre run is bad, but how far along it the problem sits. That distance reading is the difference between excavating one splice enclosure and excavating four.',
      'The M210 covers singlemode and multimode in a single unit, at 1310/1550 nm for singlemode and 850/1300 nm for multimode, with up to 35 dB dynamic range. Its 0.8 m event dead zone resolves faults close to the launch point, where units with a longer dead zone simply cannot see.',
      'Automatic event analysis matters on a live site. It flags reflections, splice losses and breaks without requiring the operator to interpret a raw trace, which makes the instrument usable by a competent cabling crew rather than only by a fibre specialist.',
    ],
    usedFor: [
      'Locating fibre breaks and high-loss splices by distance',
      'Loss budget verification before handover',
      'Commissioning new singlemode or multimode runs',
      'Proving whether a fault is in the fibre path or the active equipment',
    ],
    readMore: { href: '/blog/afl-noyes-m210-otdr-rental-uae', label: 'Finding fibre faults before they become handover problems' },
  },
  'fiber-splicing-machine': {
    body: [
      'A fusion splicer is what you rent when fibre has to be repaired, extended or terminated properly rather than patched. Core-alignment fusion holds typical splice loss below 0.02 dB, so a repaired run stays inside the loss budget the design allowed. A mechanical connector in the same position typically costs an order of magnitude more loss and becomes the next fault.',
      'The kit ships as a complete carry case: splicer, cleaver, spare electrodes, heat-shrink oven and AC adapter. Splice time is around nine seconds with a further thirty-five for sleeve heating, and the battery carries more than 200 splices per charge, which covers a full day on a site with no power.',
      'Cleave quality is the usual limit on splice quality. The cleaver in the kit is matched to the splicer, and we check both before dispatch, because a worn cleaver blade produces high-loss splices that look like a machine fault.',
    ],
    usedFor: [
      'On-site fibre break repair',
      'Extending or re-terminating existing runs',
      'Pigtail splicing into patch panels and enclosures',
      'Emergency restoration where a patch lead will not do',
    ],
    readMore: { href: '/blog/fusion-splicer-rental-uae', label: 'When fibre repair needs more than a patch lead' },
  },
})

// Product write-ups for servers, CCTV/security and printers. Search Console lists several of
// these pages as "Crawled - currently not indexed": they carried only the shared template, so
// siblings were ~83% identical. Each entry says what the unit is for against its nearest
// sibling and answers the question a renter actually asks. Specs and rates quoted here must
// match the P() entries above.
Object.assign(productContent, {
  // ---- Servers ----
  'dell-r740': {
    body: [
      'The PowerEdge R740 is the previous-generation Dell 2U workhorse: dual Intel Xeon Scalable processors, up to 3 TB of DDR4 and a choice of 16 small-form-factor or 8 large-form-factor drive bays. It is still the server many UAE estates run in production, which is the main reason to rent one: a like-for-like machine for testing a firmware or OS update, standing in during a repair, or adding capacity to an existing R740 cluster.',
      'Management is through iDRAC 9, the same controller as the R760, so existing tooling and scripts carry over. It takes up to three double-wide GPUs, enough for inference trials and graphics workloads that do not need the six slots of the R760.',
      'It rents below the R760 because the platform is older and uses DDR4 memory. Where the work is performance-sensitive or needs NVMe in volume, the R760 is the better fit, and we will say so before you book. Rates start at AED 400 per day, with weekly and monthly bands.',
    ],
    usedFor: [
      'Like-for-like test machine for an existing R740 estate',
      'Standby while a production server is repaired',
      'Extra capacity for a migration or seasonal peak',
      'Lower-cost virtualisation host for a fixed project',
    ],
    faqs: [
      {
        q: 'Can I rent a Dell PowerEdge R740?',
        a: 'Yes. The R740 is a 2U dual-socket server with up to 3 TB of DDR4 and iDRAC 9 management, rented from AED 400 per day with lower weekly and monthly rates. Tell us the CPU, memory and storage you need and we will configure it before delivery.',
      },
      {
        q: 'What is the difference between the R740 and the R760?',
        a: 'The R760 is the newer generation, with DDR5 memory, NVMe bays and room for up to six GPUs, at AED 520 per day. The R740 uses DDR4, takes up to three GPUs and rents for less, which suits tests and capacity that do not need the newest platform.',
      },
    ],
  },
  'dell-r760': {
    body: [
      'The PowerEdge R760 is the general-purpose workhorse of the server fleet: a 2U dual-socket machine with up to 8 TB of DDR5, 24 NVMe bays and room for up to six double-wide GPUs. It is the one we recommend when a rental has to run mixed workloads, such as virtualisation hosts, a database tier or an AI inference test, and you do not yet know which will dominate.',
      'Out-of-band management is through iDRAC 9, so the machine can be provisioned, patched and rebuilt remotely. For a proof of concept or a migration window that matters: your team can work on the box from the office while it sits in a rack elsewhere.',
      'Rental suits a few clear situations: a proof of concept before a purchase decision, capacity for a migration or seasonal peak, and a stand-in while a failed production server is being repaired. Rates start at AED 520 per day, with weekly and monthly bands.',
    ],
    usedFor: [
      'Proof of concept ahead of a server purchase',
      'Migration and cut-over capacity',
      'Virtualisation or database hosts for a fixed project',
      'GPU-backed AI inference trials',
    ],
    faqs: [
      {
        q: 'Can I rent a Dell PowerEdge R760 for a short proof of concept?',
        a: 'Yes. Short rentals are the usual use. Tell us the CPU, memory and storage you want to test, and the unit is configured and delivered ready to rack, from AED 520 per day with lower weekly and monthly rates.',
      },
      {
        q: 'Does the R760 support GPUs?',
        a: 'The platform takes up to six double-wide GPUs. Tell us the card you need when you enquire so we can confirm what is available for your dates before you plan the test around it.',
      },
    ],
  },
  'hpe-dl380-gen11': {
    body: [
      'The ProLiant DL380 Gen11 is the HPE-standard 2U server: dual 5th Gen Xeon, up to 8 TB of DDR5 and a choice of large- or small-form-factor drive cages, up to 36 LFF or 50 SFF bays. That storage range is its distinguishing feature against the other servers in the fleet, because it suits capacity-heavy jobs as well as compute.',
      'Management is through iLO 6, which is what HPE-based estates already use, so the rental slots into existing tooling. That makes it the natural choice when you run ProLiant in production and want a like-for-like machine for testing a firmware or OS update, or as a standby during a repair.',
      'Rates start at AED 510 per day. As with every server in the range, tell us the workload and we will confirm the configuration before you book.',
    ],
    usedFor: [
      'Like-for-like test machine for an existing HPE estate',
      'Standby while a production server is repaired',
      'Storage-heavy workloads that need many drive bays',
      'Temporary capacity during a data-centre move',
    ],
    faqs: [
      {
        q: 'Is the DL380 Gen11 a good match if we already run HPE servers?',
        a: 'Yes. It uses iLO 6 management and the same ProLiant tooling, so firmware, OS and monitoring tests carry over directly. That is the main reason to rent it over a different make.',
      },
      {
        q: 'How much storage can the DL380 Gen11 take?',
        a: 'The platform supports up to 36 large-form-factor or 50 small-form-factor drives, depending on the build. Tell us the capacity and drive type you need and we will confirm what can be configured for your dates.',
      },
    ],
  },
  'supermicro-sys-221h': {
    body: [
      'The Supermicro SYS-221H-TNR is a dual-socket 4th Gen Xeon (Sapphire Rapids) 2U server with up to 4 TB of DDR5 and ten hot-swap NVMe bays. It is the fast-storage option in the fleet at a lower day rate than the Dell and HPE servers, which makes it the sensible pick when the job is NVMe throughput, such as a database benchmark, an analytics run or a storage-array test, rather than a branded-estate match.',
      'Because it is a different platform from the Dell and HPE units, it is also useful as a neutral comparison machine. Teams evaluating whether a workload scales across vendors often rent one of each for the same two-week window.',
      'Rates start at AED 420 per day, with weekly and monthly bands for longer tests.',
    ],
    usedFor: [
      'NVMe database and analytics benchmarking',
      'Vendor-neutral platform comparison',
      'Temporary compute for a short project',
      'Test bed for storage software',
    ],
    faqs: [
      {
        q: 'What is the difference between the Supermicro and the Dell R760?',
        a: 'The Supermicro uses 4th Gen Xeon with ten hot-swap NVMe bays and rents at a lower rate, while the Dell R760 takes newer Xeon generations, far more drive bays and up to six GPUs. Choose the Supermicro for NVMe-focused tests on a budget and the Dell for broader flexibility.',
      },
      {
        q: 'Can I rent more than one server for a comparison test?',
        a: 'Yes. Many comparison tests use two or three different platforms over the same window. Ask for them in one quote and we will confirm availability together.',
      },
    ],
  },
  'dell-me5024': {
    body: [
      'The PowerVault ME5024 is a 2U block-storage array rather than a server: 24 bays of 2.5-inch SAS or SSD, scaling to 4 PB raw with expansion, and host connectivity over 12G SAS, Fibre Channel or iSCSI. It is rented when storage, not compute, is the gap.',
      'The usual cases are migrations, where data has to land on a staging array before cut-over, and proof-of-concept builds that need shared storage for a cluster. It is also a stand-in during an array failure or upgrade.',
      'Which host protocol you need changes what we deliver with it, so tell us whether your hosts connect over SAS, FC or iSCSI when you enquire. Rates start at AED 360 per day.',
    ],
    usedFor: [
      'Staging storage during a data migration',
      'Shared storage for a cluster proof of concept',
      'Stand-in during an array repair or upgrade',
      'Temporary capacity for backup or archive jobs',
    ],
    faqs: [
      {
        q: 'Is the ME5024 a server or a storage array?',
        a: 'It is a storage array. It holds the disks and presents them to your servers over SAS, Fibre Channel or iSCSI, so you pair it with compute rather than run applications on it directly.',
      },
      {
        q: 'Can I rent the ME5024 for a data migration?',
        a: 'Yes, and that is a common use. Rent it for the cut-over window, land the data on it, and return it once production has moved. Weekly and monthly rates apply to longer migrations.',
      },
    ],
  },
  'dell-xr4000z': {
    body: [
      'The PowerEdge XR4000z is built for places where a normal rack server does not belong. It is a short-depth, 12-inch chassis with an Intel Xeon D processor and MIL-STD-810H rugged certification, which is the standard for shock, vibration and temperature resistance.',
      'That makes it the server we use for edge deployments: event control rooms, temporary venues, site offices and field projects where the compute has to sit in a small rack or a flight case rather than a data-centre hall. For event IT work it sits naturally beside our event networking and temporary data-centre services.',
      'Rates start at AED 390 per day. If you are planning an on-site deployment, tell us the space, power and cooling available and we will advise whether the XR4000z or a standard rack server is the better fit.',
    ],
    usedFor: [
      'Event control rooms and temporary venues',
      'Edge compute at remote or field sites',
      'Short-depth racks and flight-case builds',
      'Portable proof of concept for edge workloads',
    ],
    faqs: [
      {
        q: 'What does MIL-STD-810H mean for a server rental?',
        a: 'It is a US military test standard for resistance to shock, vibration, temperature and similar stresses. For you it means the unit tolerates transport and harsher site conditions than a data-centre server, which suits events and field deployments.',
      },
      {
        q: 'Will the XR4000z fit a standard rack?',
        a: 'It is a short-depth 12-inch chassis, so it fits shallow racks and flight cases as well as standard racks. Send us the rack depth or enclosure details and we will confirm the mounting arrangement.',
      },
    ],
  },
  'apc-smt-3000-xl': {
    body: [
      'The APC Smart-UPS SMT3000RMXL is a 2U rack-mount UPS rated 3000 VA / 2700 W, with extended runtime of roughly 45 minutes at half load. It is what you rent when the power behind rented or temporary equipment cannot be trusted: a pop-up server room, an event network core or a site where mains is unstable.',
      'Runtime depends on load. At 50 percent load you can expect around 45 minutes, which is ample for a controlled shutdown or to ride through a short outage, and shorter at higher loads. We size the units to your equipment list rather than guess.',
      'A network management card is included, so the UPS can report status and trigger a clean shutdown of connected servers. Rates start at AED 160 per day.',
    ],
    usedFor: [
      'Backup power for a temporary server room',
      'Protecting an event network core',
      'Clean-shutdown cover for rented servers',
      'Sites with unreliable mains power',
    ],
    faqs: [
      {
        q: 'How long will the APC SMT3000RMXL run on battery?',
        a: 'About 45 minutes at 50 percent load, and less at higher loads. Give us the combined power draw of the equipment and we will tell you the expected runtime before you book.',
      },
      {
        q: 'Does the UPS come with network monitoring?',
        a: 'Yes, a network management card is included, so it can report status and signal connected servers to shut down cleanly when the battery runs low.',
      },
    ],
  },
  // ---- CCTV and security ----
  'hikvision-ds-2cd2t86g2': {
    body: [
      'The DS-2CD2T86G2 is an 8 MP (4K) bullet IP camera with 60 m infrared range, a built-in microphone and AcuSense human and vehicle detection. It is the standard fixed camera in the fleet: sharp enough to read detail at distance, and smart enough to cut false alarms from animals, shadows and passing lights.',
      'It runs on 802.3af PoE, so a single network cable carries power and video and no separate power run is needed. Lens options of 2.8, 4 or 6 mm let us match the view to the space: wider for a gate or car park, narrower for an entrance.',
      'Rates start at AED 60 per day, with weekly and monthly bands. Most deployments pair several cameras with an NVR from the same range.',
    ],
    usedFor: [
      'Temporary perimeter and gate monitoring',
      'Construction-site and laydown-yard coverage',
      'Event entrances and back-of-house areas',
      'Short-term monitoring during an investigation or incident',
    ],
    faqs: [
      {
        q: 'Do the rental cameras work with the rental NVR?',
        a: 'Yes. The DS-2CD2T86G2 and the Hikvision DS-9664NI-I8 NVR are from the same family, so recording and AcuSense search work together. Tell us the number of cameras and retention period and we will size the recorder.',
      },
      {
        q: 'Can I choose the lens?',
        a: 'Yes. Lenses of 2.8, 4 and 6 mm are available. Send the distance and area you need to cover and we will recommend one.',
      },
    ],
  },
  'hikvision-ds-9664ni-i8': {
    body: [
      'The DS-9664NI-I8 is a 64-channel network video recorder that records 4K, with eight SATA III drive bays and up to 128 TB of storage. It is the recorder to rent when a temporary deployment has to hold many cameras and keep footage for a defined period.',
      'AcuSense search lets an operator filter recordings by human or vehicle instead of scrubbing through hours of video, which shortens the review after an incident. Storage is sized to your camera count and retention, since 4K recording consumes disk quickly.',
      'Rates start at AED 240 per day. Give us the camera count and how many days of footage you need to keep and we will specify the drives.',
    ],
    usedFor: [
      'Large temporary camera deployments',
      'Event and venue recording with defined retention',
      'Replacement recorder while a site system is repaired',
      'Construction-site CCTV with searchable footage',
    ],
    faqs: [
      {
        q: 'How many days of footage will it hold?',
        a: 'It depends on camera count, resolution, frame rate and compression. The recorder takes up to 128 TB across eight drives. Tell us the cameras and the retention you need and we will calculate the storage.',
      },
      {
        q: 'Can it record 4K cameras?',
        a: 'Yes. It records 4K UHD across up to 64 channels, which matches the 8 MP cameras in the rental range.',
      },
    ],
  },
  'samsung-4k-commercial-display': {
    body: [
      'The Samsung 55-inch 4K commercial display is rated for 24/7 operation, which is what separates it from a consumer television. Commercial panels are built to run continuously in public spaces, so they suit control-room walls, reception signage and live event dashboards.',
      'It mounts on a floor stand or a wall bracket, and it suits a CCTV deployment as the monitor, showing camera feeds and the recorder\'s live view in a control room or security desk.',
      'Rates start at AED 190 per day. Tell us how many screens you need and how they will be mounted and we will include the right stands or brackets.',
    ],
    usedFor: [
      'Security control-room monitor wall',
      'Event signage and live information displays',
      'Reception and wayfinding screens',
      'Temporary operations dashboards',
    ],
    faqs: [
      {
        q: 'Is it rated for continuous operation?',
        a: 'Yes. It is a commercial display rated for 24/7 use, unlike a standard consumer television.',
      },
      {
        q: 'Can I get it on a stand or wall mount?',
        a: 'Both are available. Tell us which you need and how many displays, and we will deliver it ready to use.',
      },
    ],
  },
  'garrett-pd-6500i': {
    body: [
      'The Garrett PD 6500i is a walk-through metal detector with 33 pinpoint detection zones, designed for high-traffic entrances. The zone display shows where on the body a detected item sits, which lets staff resolve an alarm quickly instead of searching everyone who sets it off, and keeps queues moving at busy entrances.',
      'It runs on battery or mains power, so it can be set up at a venue entrance, a temporary event gate or a site where power is not available at the entry point. Pairing it with an X-ray unit for bags gives a complete screening lane.',
      'Rates start at AED 360 per day. Screening requirements vary by venue and authority, so confirm your obligations before you plan the lane; we will help you work out the equipment count for your expected throughput.',
    ],
    usedFor: [
      'Event and venue entrance screening',
      'High-traffic temporary access points',
      'Conference and exhibition security',
      'Sites without mains power at the entrance',
    ],
    faqs: [
      {
        q: 'What do the 33 detection zones do?',
        a: 'They show roughly where on the body an alarm was triggered, so security staff can check one area rather than search the whole person. That speeds up throughput at busy entrances.',
      },
      {
        q: 'Can it run without mains power?',
        a: 'Yes. It runs from battery as well as mains, which helps at outdoor or temporary entrances.',
      },
    ],
  },
  'smiths-hi-scan-6040i': {
    body: [
      'The Smiths Detection HI-SCAN 6040i is a dual-energy X-ray baggage scanner with a 620 by 420 mm tunnel and Threat Image Projection (TIP). Dual-energy imaging colours items by material type, which helps operators distinguish organic from inorganic objects, and TIP keeps operators alert by inserting test images into the live feed.',
      'The tunnel size suits bags, parcels and personal items rather than large cargo, which is the right scale for event entrances, government buildings, conferences and mail rooms. It is usually deployed alongside a walk-through metal detector as one screening lane.',
      'Rates start at AED 560 per day. Screening is a regulated activity in many venues, so confirm the operating and operator-training requirements with the venue or relevant authority. Tell us your expected visitor numbers and we will advise how many lanes you need.',
    ],
    usedFor: [
      'Bag screening at event entrances',
      'Temporary security lanes at conferences and exhibitions',
      'Mail and parcel screening for a fixed period',
      'Short-term screening during a high-security project',
    ],
    faqs: [
      {
        q: 'What is Threat Image Projection?',
        a: 'TIP inserts virtual threat images into the live scan feed to test operator attention and training. It is a standard feature of professional baggage scanners.',
      },
      {
        q: 'What size of bag fits the HI-SCAN 6040i?',
        a: 'The tunnel is 620 by 420 mm, which takes standard bags, backpacks and parcels but not large luggage or cargo.',
      },
    ],
  },
  'vcount-ultima-ai': {
    body: [
      'The V-Count Ultima AI is a 3D people counter that reports accuracy above 99 percent and sends results to a real-time analytics dashboard. It counts people through an entrance, which gives you occupancy and footfall without relying on manual tallies or ticket scans.',
      'Counting matters in two ways at events and venues: live occupancy, so staff can control capacity and avoid crowding at a gate, and post-event analytics, so organisers can see peak arrival times and dwell patterns. The dashboard presents both.',
      'Rates start at AED 190 per day. Tell us the number of entrances and whether you need live occupancy or a post-event report and we will configure the counters.',
    ],
    usedFor: [
      'Live occupancy and capacity control',
      'Visitor flow analysis at exhibitions and events',
      'Retail pop-up and showroom footfall measurement',
      'Evidence for post-event reporting to organisers or sponsors',
    ],
    faqs: [
      {
        q: 'How accurate is the V-Count Ultima AI?',
        a: 'The manufacturer reports accuracy above 99 percent in normal installations. Placement and entrance width affect results, so we advise on mounting for your layout.',
      },
      {
        q: 'Can I see the data live?',
        a: 'Yes. Counts go to a real-time analytics dashboard, so staff can watch occupancy as it changes and export the figures afterwards.',
      },
    ],
  },

  // ---- Printers ----
  'canon-imagerunner-advance-c5500': {
    body: [
      'The Canon imageRUNNER ADVANCE C5500 ES II is an A3 colour multifunction printer running up to 60 pages per minute, with print, copy, scan and send, duplex and large-capacity trays. It is the high-volume colour machine in the range, and the right choice when a deployment has to produce a lot of colour output without constant paper refills.',
      'Typical uses are conferences, exhibitions, training programmes and project offices that print programmes, badges, handouts or drawings in colour and in volume. The large-capacity trays reduce how often someone has to refill, which matters during a live event.',
      'Rates start at AED 440 per day, with weekly and monthly bands. Tell us expected monthly volume and the paper sizes you need and we will confirm the setup.',
    ],
    usedFor: [
      'High-volume colour printing at conferences and events',
      'Project offices that produce drawings and reports',
      'Training programmes with printed materials',
      'Temporary print rooms during an office move',
    ],
    faqs: [
      {
        q: 'Can I rent an A3 colour printer in the UAE?',
        a: 'Yes. The Canon imageRUNNER ADVANCE C5500 ES II is an A3 colour multifunction that prints, copies and scans at up to 60 pages per minute, rented from AED 440 per day.',
      },
      {
        q: 'Is paper and toner included?',
        a: 'Tell us the volume you expect when you enquire and we will confirm what is included in the quote and how consumables are handled for your rental period.',
      },
    ],
  },
  'konica-minolta-bizhub-554e': {
    body: [
      'The Konica Minolta bizhub 554e is an A3 monochrome multifunction printer at 55 pages per minute, with print, copy, scan and fax, duplex and high-capacity trays. It is the workhorse for black-and-white volume: documents, contracts, forms and reports in bulk.',
      'Its day rate is about a third lower than the colour A3 machine, so for document-heavy work with no colour requirement it is the economical option. Project teams use it for submissions, tender packs and bulk copying where speed matters more than colour.',
      'Rates start at AED 280 per day, with weekly and monthly bands.',
    ],
    usedFor: [
      'Bulk black-and-white document production',
      'Tender and submission packs',
      'Shared office printing during a refit',
      'Registration and form-heavy events',
    ],
    faqs: [
      {
        q: 'Is the bizhub 554e black and white only?',
        a: 'Yes, it is an A3 monochrome machine. If you need colour, the Canon imageRUNNER ADVANCE C5500 is the A3 colour option in the range.',
      },
      {
        q: 'Does it support fax?',
        a: 'Yes. The bizhub 554e prints, copies, scans and faxes.',
      },
    ],
  },
  'hp-laserjet-pro-mfp-m428fdw': {
    body: [
      'The HP LaserJet Pro MFP M428fdw is an A4 monochrome multifunction printer at 38 pages per minute, with print, copy, scan and fax, duplex, and both WiFi and Ethernet. It is the everyday office printer for small teams and short rentals.',
      'It is the lowest-cost machine in the range, which suits a team room, a site office or a registration desk where volume is modest. Wireless means it can be placed where it is needed without a cable run.',
      'Rates start at AED 80 per day. If volume is high, the HP Enterprise M635h or the bizhub 554e are better matches.',
    ],
    usedFor: [
      'Small team and site-office printing',
      'Registration and check-in desks',
      'Training rooms and workshops',
      'Short-term cover for a failed office printer',
    ],
    faqs: [
      {
        q: 'Does the M428fdw have WiFi?',
        a: 'Yes. It supports WiFi and Ethernet, so it can be placed wherever there is power, with or without a network cable.',
      },
      {
        q: 'Which HP printer should I rent for higher volume?',
        a: 'For higher volume, step up to the HP LaserJet Enterprise MFP M635h (61 pages per minute) or the A3 Konica Minolta bizhub 554e.',
      },
    ],
  },
  'hp-color-laserjet-pro-mfp-m479fdw': {
    body: [
      'The HP Color LaserJet Pro MFP M479fdw is an A4 colour multifunction printer at 27 pages per minute, with print, copy, scan and fax, duplex, WiFi and Ethernet. It is the compact colour option: enough for presentations, marketing handouts and client documents without the cost of an A3 machine.',
      'It suits small to medium teams and events that need colour in modest volume, such as proposals, programmes and signage. Wireless connectivity keeps setup simple.',
      'Rates start at AED 110 per day. For colour at higher volume, or A3 output, use the Canon imageRUNNER ADVANCE C5500.',
    ],
    usedFor: [
      'Colour handouts and presentations',
      'Small-event programmes and badges',
      'Client proposals and marketing printing',
      'Colour printing for a temporary office',
    ],
    faqs: [
      {
        q: 'Is it A4 or A3?',
        a: 'The M479fdw is A4. For A3 colour, rent the Canon imageRUNNER ADVANCE C5500.',
      },
      {
        q: 'Can it print on both sides?',
        a: 'Yes, it has automatic duplex printing.',
      },
    ],
  },
  'hp-laserjet-enterprise-mfp-m635h': {
    body: [
      'The HP LaserJet Enterprise MFP M635h is an A4 monochrome machine at 61 pages per minute for high-volume work, with print, copy and scan, duplex and Ethernet. It is built for sustained throughput, where a Pro-class printer would be overworked.',
      'It fits shared print rooms, registration areas and project offices that print continuously through the day. Ethernet connectivity suits a fixed network position, and the Enterprise-class engine copes with heavy use.',
      'Rates start at AED 150 per day, with weekly and monthly bands that favour longer projects.',
    ],
    usedFor: [
      'High-volume shared print rooms',
      'Large registration and accreditation operations',
      'Project offices with continuous printing',
      'Temporary capacity during peak document periods',
    ],
    faqs: [
      {
        q: 'How fast is the HP M635h?',
        a: 'It prints up to 61 pages per minute in A4 monochrome, the fastest A4 machine in the range.',
      },
      {
        q: 'Does it have WiFi?',
        a: 'It is an Ethernet machine, designed for a fixed network connection. For WiFi, the HP LaserJet Pro M428fdw and M479fdw support it.',
      },
    ],
  },
  'hp-designjet-t1700': {
    body: [
      'The HP DesignJet T1700 is a 44-inch large-format plotter for CAD, GIS and graphics, with PostScript and HP-GL/2 support. It prints drawings, site plans, posters and presentation boards at sizes an office printer cannot reach.',
      'Rented plotters are used by contractors during a project, architecture and engineering teams meeting a submission deadline, and exhibition builders who need large graphics at short notice. HP-GL/2 support means it works with the CAD and engineering software those teams already use.',
      'Rates start at AED 520 per day, with weekly and monthly bands. Tell us the media width and print volume, and we will confirm the media and ink needed for your job.',
    ],
    usedFor: [
      'CAD and engineering drawing sets',
      'GIS and site plans for a construction project',
      'Large posters and presentation boards',
      'Submission deadlines that need A0 prints',
    ],
    faqs: [
      {
        q: 'How wide can the DesignJet T1700 print?',
        a: 'It is a 44-inch plotter, which handles A0 and similar large formats.',
      },
      {
        q: 'Does it support CAD file formats?',
        a: 'It supports PostScript and HP-GL/2, the languages used by common CAD and GIS software.',
      },
    ],
  },
})

// Product write-ups for laptops/desktops, event WiFi, networking and bundles (batch 2; batch 1
// covered servers, CCTV and printers). Same purpose: these pages carried only the shared template
// and read as near-duplicates of their siblings. Specs and rates quoted here must match the
// P() entries above.
Object.assign(productContent, {
  // ---- Laptops and desktops ----
  'dell-latitude-5450': {
    body: [
      'The Dell Latitude 5450 is the standard Windows business laptop in the fleet: a Core i7-1365U with 16 GB of DDR5, a 512 GB NVMe drive and a 14-inch 1920 by 1200 anti-glare display, running Windows 11 Pro. It is the machine we specify when a deployment needs dependable laptops in quantity and nobody has asked for anything exotic.',
      'Two Thunderbolt 4 ports and HDMI mean presenters and desk users can connect to docks and displays without adapters, and at 1.36 kg with up to 14 hours of battery it handles a full conference or training day away from a socket. It is also the laptop inside our 10-Person Event Bundle, so it is the unit we know best at scale.',
      'Rented units are imaged to your build, joined to your domain or enrolled in Intune before delivery. Rates start at AED 150 per day, with weekly and monthly bands for project teams and temporary staff.',
    ],
    usedFor: [
      'Training rooms and workshops',
      'Temporary staff and project teams',
      'Registration and back-office desks at events',
      'Stand-in laptops while staff machines are repaired',
    ],
    faqs: [
      {
        q: 'Can I rent a Dell Latitude 5450 laptop in the UAE?',
        a: 'Yes. The Latitude 5450 (Core i7-1365U, 16 GB, 512 GB SSD, Windows 11 Pro) rents from AED 150 per day, with weekly and monthly rates for longer projects. It is delivered imaged to your standard build.',
      },
      {
        q: 'Can you load our software and join the laptops to our domain?',
        a: 'Yes. We image rented laptops to your build and join them to your domain or enrol them in Intune before delivery, so they can be handed straight to users.',
      },
    ],
  },
  'hp-elitebook-845-g11': {
    body: [
      'The HP EliteBook 845 G11 is the memory-heavy Windows option: an AMD Ryzen 7 PRO 8840U with 32 GB of DDR5 and a 1 TB NVMe drive, in a 1.38 kg chassis with a 14-inch 1920 by 1200 anti-glare display. Where the Latitude 5450 covers general work, the EliteBook suits users with heavier multitasking, large spreadsheets or several virtual machines open.',
      'It carries an infrared camera and a fingerprint reader, so Windows Hello sign-in works without passwords, which helps on shared project teams where credentials are a nuisance. Rated battery life of up to 21 hours is the longest in the laptop fleet.',
      'Rates start at AED 170 per day. The specification is a good fit for finance teams, analysts and project managers who would find 16 GB limiting.',
    ],
    usedFor: [
      'Analysts and finance teams on large workbooks',
      'Users running virtual machines or many applications',
      'Hybrid and travelling project staff',
      'Windows Hello sign-in for shared project teams',
    ],
    faqs: [
      {
        q: 'What is the difference between the EliteBook 845 and the Dell Latitude 5450?',
        a: 'The EliteBook has 32 GB of memory and a 1 TB drive on an AMD Ryzen 7 PRO, with an infrared camera and fingerprint reader, at AED 170 per day. The Latitude has 16 GB and 512 GB on an Intel Core i7 at AED 150. Choose the EliteBook for heavier multitasking.',
      },
      {
        q: 'Does it support face or fingerprint sign-in?',
        a: 'Yes. It has an infrared camera and a fingerprint reader for Windows Hello.',
      },
    ],
  },
  'lenovo-thinkpad-x1-carbon': {
    body: [
      'The ThinkPad X1 Carbon Gen 12 is the premium ultraportable: an Intel Core Ultra 7 165U, 32 GB of LPDDR5x, a 1 TB NVMe drive and a 14-inch 2.8K OLED display, at only 1.09 kg. It is the machine for executives, consultants and presenters who travel, and for anyone who will judge the laptop by how it feels in the hand.',
      'The OLED panel is sharper and more colour-accurate than the IPS displays on the other Windows laptops, which helps in client presentations and design review. A discrete TPM 2.0 chip and fingerprint reader support the security policies that enterprise users expect, and rated battery life is up to 19 hours.',
      'Rates start at AED 220 per day, the highest of the Windows laptops, reflecting the display, memory and weight. For general use, the Latitude 5450 and EliteBook 845 are more economical.',
    ],
    usedFor: [
      'Executives and visiting delegations',
      'Client presentations and workshops',
      'Consultants who travel between sites',
      'Users who need a light laptop with a high-quality display',
    ],
    faqs: [
      {
        q: 'How heavy is the ThinkPad X1 Carbon Gen 12?',
        a: 'It weighs 1.09 kg, the lightest laptop in the fleet.',
      },
      {
        q: 'Is the X1 Carbon suitable for developers?',
        a: 'Yes. The Core Ultra 7 with 32 GB of memory and a 1 TB drive handles development tools comfortably. For sustained builds or graphics workloads, ask about our MacBook Pro range.',
      },
    ],
  },
  'dell-optiplex-7020': {
    body: [
      'The Dell OptiPlex 7020 Micro is a 1.14-litre desktop with a Core i5-14500, 16 GB of DDR5 and a 512 GB NVMe drive, running Windows 11 Pro. It rents when you need a desk-based machine rather than a laptop: reception, hot desks, kiosks, control-room workstations or a training room where machines stay put.',
      'It is small enough to mount behind a monitor, so it does not take desk space, and it carries four USB 3.2 ports, DisplayPort, HDMI, Ethernet and WiFi 6E with Bluetooth 5.3. Monitors, keyboards and mice are available with it when you book.',
      'Rates start at AED 110 per day, the lowest of the Windows machines, which makes it the economical choice for fixed positions.',
    ],
    usedFor: [
      'Reception, hot-desk and kiosk positions',
      'Training rooms with fixed seating',
      'Temporary control-room and monitoring workstations',
      'Back-office desks during an office move',
    ],
    faqs: [
      {
        q: 'Does the OptiPlex 7020 Micro come with a monitor?',
        a: 'It is the computer only by default. Monitors, keyboards and mice are available with it, so ask for them when you book and they ship together.',
      },
      {
        q: 'How big is the OptiPlex 7020 Micro?',
        a: 'It is a micro form factor of about 1.14 litres, small enough to mount behind a monitor.',
      },
    ],
  },

  // ---- Event WiFi ----
  'aruba-ap-635-wifi6e': {
    body: [
      'The HPE Aruba AP-635 is a tri-band WiFi 6E access point covering 2.4, 5 and 6 GHz, rated for up to 1,024 concurrent clients and 7.8 Gbps of aggregate throughput with a 4x4:4 antenna design. The 6 GHz band is the point: it is clean spectrum that most client devices are not yet crowding, which helps in halls where hundreds of phones are fighting over 5 GHz.',
      'It is the access point behind many of our event deployments, and the one we use in the 10-Person Event Bundle. It is powered by 802.3bt PoE, so each unit needs a switch port that can supply it, and we include that in the design.',
      'The number of access points you need depends on attendee count, expected usage and the venue, not the headline client figure. We run the RF survey and plan the layout, then deploy and support the network through the event. Rates start at AED 190 per day per access point.',
    ],
    usedFor: [
      'Conferences and exhibitions with hundreds of devices',
      'Press, media and broadcast areas',
      'Back-of-house and operations networks',
      'Temporary offices and site cabins needing quick WiFi',
    ],
    faqs: [
      {
        q: 'How many people can one Aruba AP-635 support?',
        a: 'The unit is rated for 1,024 concurrent clients, but real capacity in a venue depends on usage and the radio environment. We plan access points from attendee numbers and expected traffic, usually well below the rated maximum per unit.',
      },
      {
        q: 'Does the AP-635 need special power?',
        a: 'It runs on 802.3bt PoE, so it needs a compatible switch port. We include suitable switching in the event design.',
      },
    ],
  },
  'unifi-u6-pro': {
    body: [
      'The UniFi U6 Pro is a dual-band WiFi 6 access point rated at 5.3 Gbps aggregate and 300 or more concurrent clients. It is one of the lower-density options in the event WiFi range, aimed at meeting rooms, small exhibitions, hospitality areas and temporary offices rather than packed halls.',
      'It runs on 802.3at PoE and is managed from a UniFi Network controller, which makes setup quick and gives a single dashboard for the whole deployment. That fits short rentals where speed of installation matters more than the last increment of capacity.',
      'Rates start at AED 210 per day per access point. For halls with many hundreds of devices, step up to the AP-635 or one of the WiFi 7 models.',
    ],
    usedFor: [
      'Meeting rooms and small exhibitions',
      'Hospitality and registration areas',
      'Temporary offices and site cabins',
      'Pop-up retail and brand activations',
    ],
    faqs: [
      {
        q: 'Is the UniFi U6 Pro enough for a large event?',
        a: 'Not on its own. It supports 300 or more clients per unit, which suits smaller areas. For large halls we deploy higher-density access points such as the Aruba AP-635 or a WiFi 7 model, planned from your attendee numbers.',
      },
      {
        q: 'What do I need to run it?',
        a: 'A PoE (802.3at) switch port and a UniFi Network controller. We supply and configure both as part of the rental.',
      },
    ],
  },
  'unifi-uap-ac-pro': {
    body: [
      'The UniFi AC Pro (UAP-AC-Pro) is a dual-band WiFi 5 (802.11ac) access point with 3x3 MIMO radios: up to 450 Mbps on 2.4 GHz and 1,300 Mbps on 5 GHz, for 1.75 Gbps aggregate. Ubiquiti rates it for more than 250 concurrent clients, and it has two Gigabit Ethernet ports.',
      'It is the entry point of the event WiFi range. It suits meeting rooms, back-of-house areas, site cabins and temporary offices where the device count is modest and the budget matters more than the newest standard. It runs on standard 802.3af or 802.3at PoE and is managed from the same UniFi Network controller as the U6 Pro and E7, so it can sit alongside them in one deployment.',
      'Rates start at AED 100 per day per access point. For busy halls, or where most devices support WiFi 6 or newer, choose the U6 Pro, the AP-635 or a WiFi 7 model.',
    ],
    usedFor: [
      'Meeting rooms and breakout spaces',
      'Back-of-house and staff areas',
      'Site cabins and temporary offices',
      'Extra coverage alongside higher-density access points',
    ],
    faqs: [
      {
        q: 'Is WiFi 5 still good enough for an event?',
        a: 'For smaller areas, yes. Every current phone and laptop connects to WiFi 5, and the AC Pro handles light to moderate use well. For crowded halls with hundreds of active devices, a WiFi 6, 6E or 7 access point gives more capacity per unit.',
      },
      {
        q: 'Can the AC Pro be mixed with newer UniFi access points?',
        a: 'Yes. It is managed from the same UniFi Network controller, so we can use AC Pros in smaller rooms and U6 Pro or E7 units in the main space, all on one network.',
      },
    ],
  },
  'ruckus-r770-wifi7': {
    body: [
      'The Ruckus R770 is a WiFi 7 (802.11be) access point rated up to 22 Gbps aggregate, with BeamFlex+ adaptive antennas that steer coverage towards clients rather than radiating evenly. Adaptive antennas help most where venues are awkward: long rooms, metal structures and crowds that absorb signal.',
      'It needs 802.3bt Type 4 PoE, so the switching has to be able to supply it, and it is managed through RUCKUS One cloud or SmartZone. For deployments built on Ruckus already, the rental slots into the same management.',
      'Rates start at AED 280 per day per access point, the top of the event WiFi range. Choose it for demanding, high-density venues and for clients who want to test WiFi 7. Note that client devices must also support WiFi 7 to benefit from its top speeds.',
    ],
    usedFor: [
      'High-density halls and arenas',
      'Venues with difficult RF conditions',
      'WiFi 7 evaluation before a purchase',
      'Premium events with demanding media or streaming use',
    ],
    faqs: [
      {
        q: 'Do guests need WiFi 7 devices to use the R770?',
        a: 'No. It supports earlier standards too, so existing phones and laptops connect normally. Only WiFi 7 devices reach its highest speeds.',
      },
      {
        q: 'What is BeamFlex+?',
        a: 'It is Ruckus adaptive antenna technology, which directs signal towards client devices rather than spreading it evenly, improving coverage and capacity in difficult spaces.',
      },
    ],
  },
  'unifi-e7': {
    body: [
      'The UniFi E7 is a WiFi 7 tri-band access point (2.4, 5 and 6 GHz) rated up to 21 Gbps aggregate, designed for high-density environments. It sits between the U6 Pro and the Ruckus R770: the performance of WiFi 7 and a 6 GHz radio at a lower day rate than the Ruckus unit.',
      'It runs on 802.3bt PoE and is managed from the UniFi Network controller, so a deployment can be configured and monitored from one place. That suits event teams who want WiFi 7 capacity and fast setup without moving to a different management platform.',
      'Rates start at AED 260 per day per access point. The UniFi controller keeps the management simple, and we handle the survey, installation and support during the event.',
    ],
    usedFor: [
      'High-density conference halls',
      'Venues needing 6 GHz capacity at a moderate day rate',
      'WiFi 7 events for tech-focused audiences',
      'Temporary offices with heavy video-call use',
    ],
    faqs: [
      {
        q: 'What is the difference between the UniFi E7 and the Ruckus R770?',
        a: 'Both are WiFi 7. The E7 is rated 21 Gbps and rents at AED 260 per day with UniFi management. The R770 is rated 22 Gbps with adaptive antennas for difficult venues and rents at AED 280. For ordinary halls the E7 is usually the better value.',
      },
      {
        q: 'Can I mix UniFi access points at the same event?',
        a: 'Yes. UniFi models share a single controller, so we can combine units, for example E7s in the main hall and U6 Pros in smaller rooms.',
      },
    ],
  },
  'ubiquiti-udm-pro-max': {
    body: [
      'The UniFi Dream Machine Pro Max is the controller and gateway for a UniFi event network: it routes traffic, runs the UniFi Network controller and manages the access points on the same device. It has eight 1 GbE ports and two 10 GbE SFP+ ports, and supports 750 or more clients.',
      'It is rented when an event WiFi deployment needs a gateway and controller in one box, typically with UniFi access points. The 10 GbE uplink ports matter when the access points feed back to the core over fibre, or when several switches hang off it.',
      'Rates start at AED 900 per day. Where the event needs enterprise security such as intrusion prevention and detailed policies, the FortiGate 200E is the firewall to use instead.',
    ],
    usedFor: [
      'Gateway and controller for a UniFi event network',
      'Core for temporary offices and site cabins',
      'Event networks with 10 GbE uplinks to the switch core',
      'Small to mid-size deployments needing one managed box',
    ],
    faqs: [
      {
        q: 'Does the Dream Machine Pro Max replace a separate controller?',
        a: 'Yes. It runs the UniFi Network controller itself, so you do not need a separate server or cloud controller for the deployment.',
      },
      {
        q: 'When should I choose a FortiGate instead?',
        a: 'Choose the FortiGate when you need next-generation firewall features such as IPS, VPN and SD-WAN, or have to meet a security policy that calls for them. The Dream Machine suits straightforward event networks.',
      },
    ],
  },
  'fortigate-200e': {
    body: [
      'The FortiGate 200E is a next-generation firewall rated at 20 Gbps of firewall throughput, with IPS, VPN and built-in SD-WAN, managed through FortiGate Cloud or FortiManager. It is rented when an event or temporary site needs real perimeter security rather than a router with a firewall bolted on.',
      'In event networks it sits between the venue uplink and the WiFi and wired networks, separating guest, press and operational traffic, enforcing policy and giving a log trail when something goes wrong. It is also used for temporary offices that must keep to a corporate security standard.',
      'We configure the firewall before delivery to your policy, or to a standard event template. Rates start at AED 1,000 per day. Where you need a smaller firewall, the FortiGate 100F is available in our networking range at a lower rate.',
    ],
    usedFor: [
      'Perimeter security for large events',
      'Separating guest, press and operations networks',
      'Temporary offices that must meet corporate policy',
      'SD-WAN and VPN for multi-site temporary deployments',
    ],
    faqs: [
      {
        q: 'Can you configure the FortiGate to our policy?',
        a: 'Yes. We pre-configure the firewall to your rules, or to a standard event template, before delivery, and an engineer can support it during the event.',
      },
      {
        q: 'Is there a smaller FortiGate for rental?',
        a: 'Yes. The FortiGate 100F in our networking range is a smaller firewall at a lower day rate, suited to smaller sites.',
      },
    ],
  },

  // ---- Networking ----
  'aruba-1930-48g': {
    body: [
      'This is the Aruba 1930 48G PoE+ switch: 48 gigabit PoE+ ports and four SFP+ uplinks, with a 370 W PoE budget and layer 2+ smart management. It is the large access switch in the rental range, used to power and connect many devices at once, such as access points, cameras and phones at an event or temporary office.',
      'The 370 W budget is the figure to plan around. PoE+ devices can draw up to 30 W each, but most access points and cameras draw far less, so we add up the actual load for your deployment rather than assuming every port is at maximum. SFP+ uplinks connect it back to the core over fibre or high-speed copper.',
      'Rates start at AED 400 per day. For smaller edge positions, the 24-port version is also available.',
    ],
    usedFor: [
      'Access switch for a large event hall or exhibition',
      'Powering many access points and cameras',
      'Temporary office floors',
      'Replacement switch during an upgrade or failure',
    ],
    faqs: [
      {
        q: 'How many devices can the 48-port switch power over PoE?',
        a: 'The PoE budget is 370 W. Most access points and cameras draw well under the 30 W PoE+ maximum, so the practical number depends on your devices. Send us the list and we will check the budget.',
      },
      {
        q: 'Is this a layer 3 switch?',
        a: 'No. It is a layer 2+ smart-managed switch, suited to access-layer work. If you need routing between networks, pair it with a firewall or router.',
      },
    ],
  },
  'aruba-1930-24g': {
    body: [
      'This is the Aruba 1930 24G PoE+ switch: 24 gigabit PoE+ ports, four SFP+ uplinks, a 195 W PoE budget and layer 2+ smart management. It is the mid-size access switch for a floor, a hall zone or a meeting-room cluster.',
      'The 195 W budget covers a typical set of access points and cameras, and the SFP+ uplinks connect it to the core. Rack-mounted or flat on a shelf, it is quick to deploy, which suits temporary networks that have to be up in hours.',
      'Rates start at AED 300 per day. For a larger device count, use the 48-port model.',
    ],
    usedFor: [
      'Access switch for a floor or hall zone',
      'Powering access points in a mid-size event',
      'Temporary offices and site cabins',
      'Cover for a failed switch in production',
    ],
    faqs: [
      {
        q: 'What is the PoE budget on the 24-port switch?',
        a: 'It has a 195 W PoE budget across the 24 PoE+ ports. We check your device list against the budget before delivery.',
      },
      {
        q: 'Can I link several switches together?',
        a: 'Yes. The four SFP+ uplinks connect switches back to a core, so a larger deployment can use several units.',
      },
    ],
  },
  'fortinet-fortigate-100f': {
    body: [
      'The FortiGate 100F is a next-generation firewall with 20 Gbps of firewall throughput, 11.5 Gbps of IPS and 1 Gbps of threat protection, 22 gigabit ports plus two 10G SFP+ ports, and SD-WAN capability. It is sized for sites of roughly 500 to 1,500 users, which makes it the right firewall for a temporary office, a mid-size event or a branch during a migration.',
      'It rents well below the FortiGate 200E and covers most deployments that do not need the larger unit. Threat protection throughput is the figure to watch when inspection features are turned on, because it is much lower than raw firewall speed, and we size the unit to that.',
      'We configure it to your policy before delivery. Rates start at AED 240 per day.',
    ],
    usedFor: [
      'Firewall for a temporary or branch office',
      'Mid-size event networks',
      'Standby firewall during a replacement project',
      'Proof of concept for a Fortinet deployment',
    ],
    faqs: [
      {
        q: 'How many users can a FortiGate 100F support?',
        a: 'It is generally sized for 500 to 1,500 users, depending on the security features enabled. Tell us your user count and inspection needs and we will confirm it fits.',
      },
      {
        q: 'FortiGate 100F or 200E?',
        a: 'The 100F suits most sites at AED 240 per day. The 200E is for larger or higher-throughput deployments and rents at AED 1,000 per day.',
      },
    ],
  },
  'palo-alto-pa-440': {
    body: [
      'The Palo Alto PA-440 is a compact next-generation firewall running PAN-OS 11.x, with 3.1 Gbps of firewall throughput, 930 Mbps of threat prevention and eight gigabit ports. It is rented by teams that run Palo Alto and need a like-for-like unit for a branch, a test or a failure, and by those evaluating the platform before buying.',
      'The throughput figures make it a branch-scale firewall, so it suits small sites and temporary offices rather than large event cores. Dual power input is available as an option.',
      'We load your configuration or a baseline policy before delivery. Rates start at AED 220 per day.',
    ],
    usedFor: [
      'Branch and temporary-office firewall',
      'Like-for-like test unit for a Palo Alto estate',
      'Proof of concept ahead of a purchase',
      'Standby unit during a firewall replacement',
    ],
    faqs: [
      {
        q: 'Can I rent a Palo Alto PA-440 firewall?',
        a: 'Yes. The PA-440 runs PAN-OS 11.x with 3.1 Gbps of firewall throughput and rents from AED 220 per day, configured before delivery.',
      },
      {
        q: 'Is it big enough for a large event?',
        a: 'No. It is branch-scale. For large event networks we recommend a larger firewall such as the FortiGate 200E.',
      },
    ],
  },
  'juniper-ex4400-24p': {
    body: [
      'This is the UniFi USW-24-PoE switch: 24 gigabit ports, 16 of them PoE+, with two 1G SFP uplinks, a 95 W PoE budget and layer 2 management. It is the small managed switch in the networking range, suited to a single room, a stand or a small office.',
      'The 95 W PoE budget is the limit to plan around, because it caps how many powered devices the switch can run at once. A handful of access points or cameras is fine; a full complement of PoE+ devices is not, and we check the numbers with you before delivery.',
      'It is managed from the UniFi controller, so it pairs naturally with UniFi access points. Rates start at AED 260 per day.',
    ],
    usedFor: [
      'Switching for a single room or exhibition stand',
      'Powering a few access points or cameras',
      'Small temporary offices and cabins',
      'Edge switch in a UniFi event network',
    ],
    faqs: [
      {
        q: 'How much PoE does the USW-24-PoE provide?',
        a: 'It has a 95 W PoE budget across 16 PoE+ ports. Total draw is what matters, so we check your device list against it.',
      },
      {
        q: 'Does it work with non-UniFi equipment?',
        a: 'Yes, it is a standards-based managed switch, but it is easiest to run alongside UniFi access points and the UniFi controller.',
      },
    ],
  },
  'netgear-m4350-48x4v': {
    body: [
      'This is the UniFi USW-48-PoE switch: 48 gigabit ports with 32 PoE+, four 1G SFP uplinks, a 195 W PoE budget and layer 2 management. It is the large UniFi switch in the range, used where a deployment needs many ports but only a moderate number of powered devices.',
      'Of the 48 ports, 32 supply PoE+, and the 195 W budget is shared among them. That suits a mix of powered devices, such as access points and cameras, with the remaining ports serving wired desks, printers and other equipment that bring their own power.',
      'Like the 24-port model it is managed from the UniFi controller. Rates start at AED 270 per day.',
    ],
    usedFor: [
      'Wired desks plus a set of access points at an event',
      'Large temporary offices',
      'Core access switching in a UniFi deployment',
      'Replacement switch during a refit',
    ],
    faqs: [
      {
        q: 'How many PoE ports does the USW-48-PoE have?',
        a: 'Thirty-two of its 48 ports supply PoE+, sharing a 195 W budget.',
      },
      {
        q: 'Which should I rent, the 24-port or the 48-port?',
        a: 'Choose by the number of wired connections you need. Check the PoE budget as well: the 24-port gives 95 W and the 48-port 195 W. Send us the device list and we will recommend one.',
      },
    ],
  },

  // ---- Bundles ----
  'event-10-person': {
    body: [
      'The 10-Person Event Bundle is a complete small-event IT package in one booking: ten Dell Latitude 5450 laptops, two Aruba AP-635 WiFi 6E access points, a FortiGate 60F firewall and an HP LaserJet printer. It is built for a team of about ten working at an event, a training course, a pop-up office or a project site.',
      'The bundle is pre-configured before delivery, delivered and set up by our team, and includes an on-site technician on day one. Minimum rental is three days. Renting the pieces as a bundle avoids sourcing, configuring and coordinating four different items and keeps the network, laptops and printer working together from the start.',
      'The rate is AED 1,780 per day, with weekly and monthly bands. If your event is larger, we scale the numbers up and size the network from your attendance.',
    ],
    usedFor: [
      'Pop-up offices and project sites',
      'Training courses for around ten people',
      'Event back-offices and control teams',
      'Short assignments that need a working office quickly',
    ],
    faqs: [
      {
        q: 'What is in the 10-Person Event Bundle?',
        a: 'Ten Dell Latitude 5450 laptops, two Aruba AP-635 WiFi 6E access points, a FortiGate 60F firewall and an HP LaserJet printer, pre-configured, delivered and set up, with an on-site technician on day one.',
      },
      {
        q: 'What is the minimum rental period?',
        a: 'Three days. The rate is AED 1,780 per day, with weekly and monthly bands for longer engagements.',
      },
    ],
  },
  'conference-room-pack': {
    body: [
      'The Conference Room Pack equips a meeting space for hybrid work in one booking: a 75-inch 4K commercial display, a Logitech Rally Bar with Tap IP controller, two Surface Pro 11 host devices and a Meraki MX85 firewall with an MR57 access point. It is certified for Microsoft Teams and Zoom, so the room joins calls in the way staff already expect.',
      'An engineer installs and tests the full setup on site, and the pack can be ready within four hours of confirmation, subject to availability. It suits boardrooms, summits, hybrid events and temporary meeting rooms where there is no permanent AV, and where the room has to work the first time.',
      'The rate is AED 1,160 per day, with weekly and monthly bands. Tell us the room size and the call platform and we will confirm the setup.',
    ],
    usedFor: [
      'Boardrooms and executive meetings',
      'Hybrid summits and workshops',
      'Temporary meeting rooms in offices under refit',
      'Client briefings that need reliable video conferencing',
    ],
    faqs: [
      {
        q: 'Does the Conference Room Pack work with Microsoft Teams?',
        a: 'Yes. It is certified for both Microsoft Teams and Zoom, using the Logitech Rally Bar with a Tap IP controller.',
      },
      {
        q: 'How quickly can it be set up?',
        a: 'The pack can be ready in four hours from confirmation, subject to availability, with an engineer installing and testing it on site.',
      },
    ],
  },
  'network-testing-kit': {
    body: [
      'The Network Testing Kit puts the three instruments for cable and fibre handover in one booking: the Fluke DSX 5000 CableAnalyzer for copper certification, the AFL Noyes M210 OTDR for fibre tracing and the Fujikura fusion splicer for repair and termination. Each travels in its own ruggedised case, and LinkWare Live reports are included.',
      'It is aimed at cabling contractors, systems integrators and facilities teams who need all three on one project: certifying new copper, testing and tracing fibre, and repairing any breaks they find. Booking them together saves effort, and the bundle rate of AED 865 per day compares with AED 950 per day for the three hired separately, about 9 percent lower.',
      'Minimum rental is two days, with delivery and collection arranged. Each instrument also has its own rental page if you only need one.',
    ],
    usedFor: [
      'Structured cabling handover with copper and fibre',
      'Fibre fault finding and repair in one visit',
      'Acceptance testing for new building cabling',
      'Contractors who do not own test equipment',
    ],
    faqs: [
      {
        q: 'What does the Network Testing Kit include?',
        a: 'A Fluke DSX 5000 CableAnalyzer, an AFL Noyes M210 OTDR and a Fujikura fusion splicer, each in its own ruggedised case, with LinkWare Live reports included.',
      },
      {
        q: 'How much do I save by booking the kit?',
        a: 'The kit is AED 865 per day, against AED 950 per day for the three hired separately, about 9 percent lower. Minimum rental is two days.',
      },
    ],
  },
})

export const getCategory = (slug) => rentalCategories[slug] || null
export const getAllCategorySlugs = () => Object.keys(rentalCategories)
export const getProduct = (catSlug, productSlug) => {
  const cat = rentalCategories[catSlug]
  if (!cat) return null
  const product = cat.products.find(p => p.slug === productSlug)
  if (!product) return null
  return {
    ...product,
    categorySlug: catSlug,
    categoryName: cat.name,
    categoryKeyword: cat.keyword,
    ...(productContent[productSlug] ? { content: productContent[productSlug] } : {}),
  }
}
export const getAllProductParams = () => {
  const out = []
  for (const [catSlug, cat] of Object.entries(rentalCategories)) {
    for (const p of cat.products) {
      out.push({ category: catSlug, product: p.slug })
    }
  }
  return out
}
export const getFeaturedProducts = (count = 6) => {
  const picks = ['laptops-desktops/dell-latitude-5450', 'tablets-ipads/ipad-pro-13-m4', 'printers/canon-imagerunner-advance-c5500',
    'event-wifi/aruba-ap-635-wifi6e', 'networking/aruba-1930-48g', 'cctv/hikvision-ds-2cd2t86g2']
  return picks.slice(0, count).map(path => {
    const [cat, prod] = path.split('/')
    return getProduct(cat, prod)
  }).filter(Boolean)
}
export const getRelatedProducts = (catSlug, productSlug, count = 3) => {
  const cat = rentalCategories[catSlug]
  if (!cat) return []
  return cat.products.filter(p => p.slug !== productSlug).slice(0, count).map(p => ({ ...p, categorySlug: catSlug, categoryName: cat.name }))
}
// Resolves [{ category, slug }] references from each product's home category, so cards
// link to the product's one canonical URL. Unknown entries are dropped.
export const resolveProductRefs = (refs) =>
  refs.map(({ category, slug }) => getProduct(category, slug)).filter(Boolean)

// Cards for a category's `crossListed` entries.
export const getCrossListedProducts = (catSlug) =>
  resolveProductRefs(rentalCategories[catSlug]?.crossListed || [])

const dailyRate = (catSlug, productSlug) =>
  rentalCategories[catSlug].products.find((p) => p.slug === productSlug).rates.daily

// Hand-written <title>/description for product pages whose generated one underperforms.
// Keyed by product slug; the product page falls back to its template for everything else.
export const productSeo = {
  // Position ~2 in Search Console for "smiths detection rental" (394 impressions, 0 clicks
  // in the 3 months to 2026-09-20). The generated title ran 79 characters and was cut off
  // before saying what the product is; this one leads with the brand searched and the
  // equipment type, and fits in the snippet.
  'smiths-hi-scan-6040i': {
    title: 'Smiths Detection X-Ray Scanner Rental UAE: HI-SCAN 6040i',
    description: 'Rent the Smiths Detection HI-SCAN 6040i baggage X-ray scanner for events and venues across the UAE. From AED 560/day, delivered and set up.',
  },
  // Position 3.9-6 for "dsx-5000", "dsx5000", "fluke dsx-5000" (49 impressions, 0 clicks in
  // the 28 days to 2026-10-09, UAE). People type the model with a hyphen and the generated
  // title spelled it "DSX 5000 CableAnalyzer"; a bare model search also reads like a
  // datasheet hunt, so the title says rental and price up front. The price is read from
  // the product's own rate so a repricing can't leave a stale figure in the snippet.
  'fluke-dsx-5000': {
    title: `Fluke DSX-5000 Cable Certifier Rental UAE: AED ${dailyRate('testing-equipment', 'fluke-dsx-5000')}/day`,
    description: `Rent the Fluke DSX-5000 CableAnalyzer in Dubai & Abu Dhabi for AED ${dailyRate('testing-equipment', 'fluke-dsx-5000')}/day. Certifies Cat 5e to Cat 6A at 500 MHz, LinkWare Live reports, calibrated.`,
  },
}
