// Equipment Rental Hub data — categories, products, bundles.

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
    title: 'Laptop & Desktop Rental UAE: Short & Long-Term | IP Care Technologies',
    metaDescription: 'Business laptop and desktop rental in UAE and Canada. Intel i7, Apple MacBook, Dell ThinkPad. Daily, weekly, monthly. Delivery and setup included.',
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
          h2: 'Specification matched to the workload',
          body: [
            'The right machine depends on the work. An i5 with 16 GB is the sensible specification for registration desks, training rooms and general office use, and rents for meaningfully less than an i7. An i7 or Core Ultra with 32 GB is what CAD, data analysis and development actually need. Ordering the high-end machine for reception, or the entry machine for an engineer, both cost you — one in money, the other in a frustrated user.',
            'Tell us the workload rather than the model and we will match it. The fleet spans Dell Latitude and OptiPlex, HP EliteBook, Lenovo ThinkPad and Apple, so the recommendation is not constrained to one brand.',
          ],
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
          a: 'Business laptop rental starts at AED 55 per day for a compact desktop and AED 75 per day for a Dell Latitude i7, with premium ultrabooks such as the ThinkPad X1 Carbon and MacBook Pro higher. Weekly rates run at roughly five and a half times the daily rate and monthly at around eighteen times, so longer projects carry a substantial discount. Rates are indicative, per unit and exclude VAT, and include delivery and setup.',
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
      P('dell-latitude-5450', 'Dell', 'Latitude 5450', ['Intel Core i7-1365U', '16 GB RAM · 512 GB SSD', '14" FHD IPS anti-glare'], { CPU: 'Intel Core i7-1365U (10-core)', RAM: '16 GB DDR5', Storage: '512 GB NVMe SSD', Display: '14" FHD 1920×1200 IPS', OS: 'Windows 11 Pro', Ports: '2× Thunderbolt 4, HDMI 2.0, USB-A', Weight: '1.36 kg', Battery: 'Up to 14 hrs' }, { daily: 75, weekly: 420, monthly: 1400 }, LAPTOP_IMG),
      P('macbook-pro-14-m4', 'Apple', 'MacBook Pro 14" M4', ['Apple M4 chip (10-core CPU)', '16 GB unified memory · 512 GB SSD', 'Liquid Retina XDR display'], { CPU: 'Apple M4 (10-core)', GPU: '10-core Apple GPU', RAM: '16 GB unified', Storage: '512 GB SSD', Display: '14.2" Liquid Retina XDR 3024×1964', OS: 'macOS Sequoia', Ports: '3× Thunderbolt 4, HDMI, SDXC, MagSafe 3', Battery: 'Up to 18 hrs' }, { daily: 130, weekly: 720, monthly: 2400 }, LAPTOP_IMG),
      P('hp-elitebook-845-g11', 'HP', 'EliteBook 845 G11', ['AMD Ryzen 7 PRO 8840U', '32 GB RAM · 1 TB SSD', '14" WUXGA with IR camera'], { CPU: 'AMD Ryzen 7 PRO 8840U', RAM: '32 GB DDR5', Storage: '1 TB NVMe SSD', Display: '14" WUXGA 1920×1200 anti-glare', OS: 'Windows 11 Pro', Biometrics: 'IR camera + fingerprint', Weight: '1.38 kg', Battery: 'Up to 21 hrs' }, { daily: 85, weekly: 480, monthly: 1600 }, LAPTOP_IMG),
      P('lenovo-thinkpad-x1-carbon', 'Lenovo', 'ThinkPad X1 Carbon Gen 12', ['Intel Core Ultra 7', '32 GB RAM · 1 TB SSD', '14" 2.8K OLED'], { CPU: 'Intel Core Ultra 7 165U', RAM: '32 GB LPDDR5x', Storage: '1 TB NVMe SSD', Display: '14" 2.8K OLED 2880×1800', OS: 'Windows 11 Pro', Weight: '1.09 kg', Battery: 'Up to 19 hrs', Security: 'Discrete TPM 2.0, fingerprint' }, { daily: 110, weekly: 620, monthly: 2100 }, LAPTOP_IMG),
      P('dell-optiplex-7020', 'Dell', 'OptiPlex 7020 Micro', ['Intel Core i5-14500', '16 GB RAM · 512 GB SSD', 'Ultra-small form factor'], { CPU: 'Intel Core i5-14500', RAM: '16 GB DDR5', Storage: '512 GB NVMe SSD', FormFactor: 'Micro (1.14 L)', OS: 'Windows 11 Pro', Ports: '4× USB 3.2, DisplayPort, HDMI, RJ-45', Wireless: 'WiFi 6E + Bluetooth 5.3' }, { daily: 55, weekly: 300, monthly: 950 }, LAPTOP_IMG),
      P('apple-imac-24-m4', 'Apple', 'iMac 24" M4', ['Apple M4 chip (8-core CPU)', '16 GB RAM · 512 GB SSD', '24" 4.5K Retina display'], { CPU: 'Apple M4 (8-core)', GPU: '8-core Apple GPU', RAM: '16 GB unified', Storage: '512 GB SSD', Display: '24" 4.5K Retina 4480×2520', OS: 'macOS Sequoia', Ports: '4× Thunderbolt 4, Magic Keyboard + Mouse', Finish: 'Seven vibrant colour options' }, { daily: 120, weekly: 650, monthly: 2200 }, LAPTOP_IMG),
    ],
  },
  'tablets-ipads': {
    name: 'iPads & Tablets',
    icon: 'Tablet',
    keyword: 'iPad Rental UAE',
    title: 'iPad & Tablet Rental UAE: Events, Exhibitions, Training | IP Care',
    metaDescription: 'iPad and Android tablet rental in UAE and Canada. iPad Pro, iPad Air, Samsung Galaxy Tab. MDM enrolment, kiosk mode, delivery and setup included.',
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
          a: 'Rates start at AED 40 per day for an iPad (10th generation) and AED 45 per day for an iPad mini 7, rising to AED 95 per day for an iPad Pro 13" M4. Weekly rates run at roughly five and a half times the daily rate, and monthly at around eighteen times, so longer bookings carry a substantial discount. All rates exclude VAT and include delivery, collection and setup.',
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
      ],
    },
products: [
      P('ipad-pro-13-m4', 'Apple', 'iPad Pro 13" M4', ['Apple M4 chip', 'Ultra Retina XDR OLED', '256 GB · WiFi + Cellular'], { Chip: 'Apple M4 (9-core CPU)', Display: '13" Ultra Retina XDR OLED', Storage: '256 GB', Connectivity: 'WiFi 6E + 5G cellular', Camera: '12 MP Ultra Wide, LiDAR', Accessories: 'Apple Pencil Pro + Magic Keyboard available', OS: 'iPadOS 18' }, { daily: 95, weekly: 520, monthly: 1800 }, TABLET_IMG),
      P('ipad-air-11-m3', 'Apple', 'iPad Air 11" M3', ['Apple M3 chip', 'Liquid Retina display', '128 GB · WiFi'], { Chip: 'Apple M3', Display: '11" Liquid Retina', Storage: '128 GB', Connectivity: 'WiFi 6E', Accessories: 'Apple Pencil Pro compatible', OS: 'iPadOS 18' }, { daily: 65, weekly: 360, monthly: 1200 }, TABLET_IMG),
      P('ipad-10th-gen', 'Apple', 'iPad (10th Gen)', ['A14 Bionic chip', '10.9" Liquid Retina', '64 GB · WiFi'], { Chip: 'Apple A14 Bionic', Display: '10.9" Liquid Retina', Storage: '64 GB', Connectivity: 'WiFi 6', OS: 'iPadOS 18', Colour: 'Silver, Blue, Pink, Yellow' }, { daily: 40, weekly: 220, monthly: 720 }, TABLET_IMG),
      P('samsung-galaxy-tab-s10', 'Samsung', 'Galaxy Tab S10 Ultra', ['Dimensity 9300+', '14.6" Dynamic AMOLED 2X', '256 GB · WiFi'], { Chip: 'MediaTek Dimensity 9300+', Display: '14.6" Dynamic AMOLED 2X', Storage: '256 GB', RAM: '12 GB', S_Pen: 'Included', OS: 'Android 14 with One UI 6.1' }, { daily: 75, weekly: 410, monthly: 1400 }, TABLET_IMG),
      P('ipad-mini-7', 'Apple', 'iPad mini 7', ['A17 Pro chip', '8.3" Liquid Retina', '128 GB · WiFi'], { Chip: 'Apple A17 Pro', Display: '8.3" Liquid Retina', Storage: '128 GB', Connectivity: 'WiFi 6E', Camera: '12 MP Wide', OS: 'iPadOS 18' }, { daily: 45, weekly: 250, monthly: 850 }, TABLET_IMG),
      P('microsoft-surface-pro-11', 'Microsoft', 'Surface Pro 11', ['Snapdragon X Elite', '16 GB RAM · 512 GB SSD', '13" OLED touch'], { CPU: 'Snapdragon X Elite (12-core)', RAM: '16 GB LPDDR5x', Storage: '512 GB SSD', Display: '13" OLED 2880×1920', OS: 'Windows 11 Pro', Keyboard: 'Signature Keyboard available' }, { daily: 90, weekly: 500, monthly: 1700 }, TABLET_IMG),
    ],
  },
  'printers': {
    name: 'Printers & Peripherals',
    icon: 'Printer',
    keyword: 'Printer Rental UAE',
    title: 'Printer Rental UAE: Laser, Colour, MFP, Plotter | IP Care Technologies',
    metaDescription: 'Commercial printer rental in UAE and Canada. Mono laser, colour laser, MFPs, plotters. Delivery, setup, toner and maintenance included.',
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
      P('canon-imagerunner-advance-c5500', 'CANON', 'imageRUNNER ADVANCE C5500 ES II', ['A3 colour MFP · up to 60 ppm', 'Print · Copy · Scan · Send', 'Duplex · large-capacity trays'], { Type: 'A3 colour MFP', Speed: 'Up to 60 ppm', Functions: 'Print, Copy, Scan, Send', Trays: 'Large-capacity', Duplex: 'Yes' }, { daily: 220, weekly: 1100, monthly: 3400 }, '/images/rental/printers/canon-c5500.webp'),
      P('konica-minolta-bizhub-554e', 'KONICA MINOLTA', 'bizhub 554e', ['A3 mono MFP · 55 ppm', 'Print · Copy · Scan · Fax', 'Duplex · high-capacity trays'], { Type: 'A3 mono MFP', Speed: '55 ppm', Functions: 'Print, Copy, Scan, Fax', Trays: 'High-capacity', Duplex: 'Yes' }, { daily: 140, weekly: 700, monthly: 2100 }, '/images/rental/printers/konica-bizhub-554e.webp'),
      P('hp-laserjet-pro-mfp-m428fdw', 'HP', 'LaserJet Pro MFP M428fdw', ['A4 mono MFP · 38 ppm', 'Print · Copy · Scan · Fax', 'Duplex · WiFi + Ethernet'], { Type: 'A4 mono MFP', Speed: '38 ppm', Functions: 'Print, Copy, Scan, Fax', Connectivity: 'WiFi, Ethernet', Duplex: 'Yes' }, { daily: 40, weekly: 180, monthly: 480 }, '/images/rental/printers/hp-m428fdw.webp'),
      P('hp-color-laserjet-pro-mfp-m479fdw', 'HP', 'Color LaserJet Pro MFP M479fdw', ['A4 colour MFP · 27 ppm', 'Print · Copy · Scan · Fax', 'Duplex · WiFi + Ethernet'], { Type: 'A4 colour MFP', Speed: '27 ppm', Functions: 'Print, Copy, Scan, Fax', Connectivity: 'WiFi, Ethernet', Duplex: 'Yes' }, { daily: 55, weekly: 260, monthly: 780 }, '/images/rental/printers/hp-m479fdw.webp'),
      P('hp-laserjet-enterprise-mfp-m635h', 'HP', 'LaserJet Enterprise MFP M635h', ['A4 mono MFP · 61 ppm', 'Print · Copy · Scan', 'High-volume · Duplex + Ethernet'], { Type: 'A4 mono MFP', Speed: '61 ppm', Functions: 'Print, Copy, Scan', Volume: 'High-volume', Connectivity: 'Ethernet', Duplex: 'Yes' }, { daily: 75, weekly: 420, monthly: 1400 }, '/images/rental/printers/hp-m635.webp'),
      P('hp-designjet-t1700', 'HP', 'DesignJet T1700 44"', ['44 inch large-format plotter', 'CAD · GIS · graphics', 'PostScript · HP-GL/2'], { Type: 'Large-format plotter', Width: '44 inch', Use: 'CAD, GIS, graphics', Languages: 'PostScript, HP-GL/2' }, { daily: 260, weekly: 1300, monthly: 3900 }, '/images/rental/printers/hp-designjet-t1700.webp'),
    ],
  },
  'event-wifi': {
    name: 'Event WiFi & Routers',
    icon: 'Wifi',
    keyword: 'Event WiFi Rental UAE',
    title: 'Event WiFi & Router Rental UAE: High Density APs | IP Care',
    metaDescription: 'Event WiFi rental in UAE. WiFi 6 / 7 access points, routers and controllers from Aruba, Cisco Meraki, Ruckus. RF survey and on-site engineers included.',
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
      P('aruba-ap-635-wifi6e', 'HPE Aruba', 'AP-635 WiFi 6E', ['Tri-band 6 GHz WiFi 6E', 'Up to 3.9 Gbps per radio', '1,024 concurrent clients'], { Standard: 'WiFi 6E (802.11ax)', Bands: '2.4/5/6 GHz', MaxThroughput: '7.8 Gbps aggregate', Clients: '1,024 concurrent', PoE: '802.3bt', Antennas: '4×4:4 internal' }, { daily: 95, weekly: 480, monthly: 1400 }, '/images/rental/event-wifi/aruba-ap-635.webp'),
      P('unifi-u6-pro', 'Ubiquiti', 'UniFi U6 Pro', ['WiFi 6 dual-band AP', '5.3 Gbps aggregate', '300+ concurrent clients'], { Standard: 'WiFi 6 (802.11ax)', Bands: '2.4/5 GHz', MaxThroughput: '5.3 Gbps aggregate', Clients: '300+ concurrent', PoE: '802.3at', Management: 'UniFi Network controller' }, { daily: 105, weekly: 520, monthly: 1550 }, '/images/rental/event-wifi/unifi-u6-pro.webp'),
      P('ruckus-r770-wifi7', 'Ruckus', 'R770 WiFi 7', ['First WiFi 7 AP in region', 'BeamFlex+ adaptive antenna', 'Up to 22 Gbps aggregate'], { Standard: 'WiFi 7 (802.11be)', MaxThroughput: '22 Gbps', Antenna: 'BeamFlex+ adaptive', PoE: '802.3bt Type 4', Management: 'RUCKUS One cloud / SmartZone' }, { daily: 140, weekly: 720, monthly: 2100 }, '/images/rental/event-wifi/ruckus-r770.webp'),
      P('unifi-e7', 'Ubiquiti', 'UniFi E7', ['WiFi 7 tri-band AP', 'Up to 21 Gbps aggregate', '6 GHz radio · high-density'], { Standard: 'WiFi 7 (802.11be)', Bands: '2.4/5/6 GHz', MaxThroughput: '21 Gbps aggregate', PoE: '802.3bt', Management: 'UniFi Network controller' }, { daily: 130, weekly: 650, monthly: 1900 }, '/images/rental/event-wifi/unifi-e7.webp'),
      P('ubiquiti-udm-pro-max', 'Ubiquiti', 'UniFi Dream Machine Pro Max', ['10G SFP+ uplink', 'Integrated controller', '750+ client capacity'], { Throughput: '5 Gbps', Storage: '2× 3.5" HDD bays for protect', Ports: '8× 1GbE + 2× 10GbE SFP+', Users: '750+' }, { daily: 450, weekly: 2250, monthly: 6750 }, '/images/rental/event-wifi/ubiquiti-udm-pro-max.webp'),
      P('fortigate-200e', 'Fortinet', 'FortiGate 200E', ['Next-gen firewall (NGFW)', '20 Gbps firewall throughput', 'SD-WAN · IPS · VPN'], { Throughput: '20 Gbps firewall', SD_WAN: 'Built-in SD-WAN', Security: 'IPS, VPN, NGFW', Management: 'FortiGate cloud / FortiManager' }, { daily: 500, weekly: 2500, monthly: 7500 }, '/images/rental/event-wifi/fortigate-200e.webp'),
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
      P('aruba-cx-6300m-48g', 'HPE Aruba', 'Aruba 1930 48G PoE+', ['48× 1GbE PoE+ · 4× SFP+', '370 W PoE budget', 'Layer 2+ smart-managed'], { Ports: '48× 1G PoE+ · 4× SFP+', PoE: '370 W budget', Management: 'Layer 2+ smart-managed' }, { daily: 140, weekly: 720, monthly: 2100 }, '/images/rental/networking/aruba-1930-48g-poe.webp'),
      P('cisco-c9300-48', 'HPE Aruba', 'Aruba 1930 24G PoE+', ['24× 1GbE PoE+ · 4× SFP+', '195 W PoE budget', 'Layer 2+ smart-managed'], { Ports: '24× 1G PoE+ · 4× SFP+', PoE: '195 W budget', Management: 'Layer 2+ smart-managed' }, { daily: 150, weekly: 780, monthly: 2300 }, '/images/rental/networking/aruba-1930-24g-poe.webp'),
      P('fortinet-fortigate-100f', 'Fortinet', 'FortiGate 100F', ['20 Gbps firewall throughput', '11.5 Gbps IPS', 'SD-WAN ready'], { Firewall: '20 Gbps', IPS: '11.5 Gbps', ThreatProtection: '1 Gbps', Ports: '22× GE + 2× 10G SFP+', Users: '500-1500' }, { daily: 120, weekly: 620, monthly: 1850 }, '/images/rental/networking/fortigate-100f.webp'),
      P('palo-alto-pa-440', 'Palo Alto', 'PA-440', ['Next-gen firewall', '3.1 Gbps firewall throughput', 'PAN-OS 11.x'], { Firewall: '3.1 Gbps', ThreatPrevention: '930 Mbps', Ports: '8× GE', Power: 'Dual AC optional', Software: 'PAN-OS 11.x' }, { daily: 110, weekly: 560, monthly: 1700 }, '/images/rental/networking/pa-440.webp'),
      P('juniper-ex4400-24p', 'Ubiquiti', 'USW-24-PoE', ['24× GbE · 16 PoE+ ports', '2× 1G SFP uplinks', '95 W PoE budget · Layer 2 managed'], { Ports: '24× GbE · 16 PoE+ ports', Uplinks: '2× 1G SFP', PoE: '95 W budget', Management: 'Layer 2 managed' }, { daily: 130, weekly: 670, monthly: 1950 }, '/images/rental/networking/usw-24-poe.webp'),
      P('netgear-m4350-48x4v', 'Ubiquiti', 'USW-48-PoE', ['48× GbE · 32 PoE+ ports', '4× 1G SFP uplinks', '195 W PoE budget · Layer 2 managed'], { Ports: '48× GbE · 32 PoE+ ports', Uplinks: '4× 1G SFP', PoE: '195 W budget', Management: 'Layer 2 managed' }, { daily: 135, weekly: 700, monthly: 2050 }, '/images/rental/networking/usw-48-poe.webp'),
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
          a: 'Cameras rent from around AED 60 per day and NVRs, displays and screening equipment are priced by unit, so a coverage-only kit is straightforward. A managed event security deployment — installation, a command position, screening at entry points and ADMCC-compliant setup — is scoped against the venue and risk. Send the event details for a deployment quote rather than a parts list.',
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
      P('hikvision-ds-2cd2t86g2', 'Hikvision', 'DS-2CD2T86G2', ['8 MP AcuSense IP bullet', '60 m IR range', 'Built-in mic'], { Resolution: '8 MP (4K)', Type: 'Bullet IP camera', IRDistance: '60 m', Lens: '2.8 / 4 / 6 mm', PoE: '802.3af', Smart: 'AcuSense human/vehicle detection' }, { daily: 30, weekly: 160, monthly: 520 }, '/images/rental/cctv/hikvision-ds-2cd2t86g2.webp'),
      P('hikvision-ds-9664ni-i8', 'Hikvision', 'DS-9664NI-I8', ['64-channel 4K NVR', '8× HDD bays · up to 128 TB', 'AcuSense AI search'], { Channels: '64', Recording: '4K UHD', HDDBays: '8 × SATA III', Storage: 'Up to 128 TB', AI: 'AcuSense human/vehicle search' }, { daily: 120, weekly: 620, monthly: 1850 }, '/images/rental/cctv/hikvision-ds-9664ni-i8.webp'),
      P('samsung-4k-commercial-display', 'Samsung', '55" 4K Commercial Display', ['4K UHD commercial panel', '24/7 operation', 'Floor stand or wall mount'], { Size: '55"', Resolution: '4K UHD', Operation: '24/7 rated', Mounting: 'Floor stand or wall mount' }, { daily: 95, weekly: 490, monthly: 1450 }, '/images/rental/cctv/samsung-4k-display.webp'),
      P('garrett-pd-6500i', 'Garrett', 'PD 6500i Walk-Through', ['33-zone pinpoint detection', 'High-traffic throughput', 'Battery + mains'], { Zones: '33-zone pinpoint', Throughput: 'High-traffic', Power: 'Battery or mains' }, { daily: 180, weekly: 920, monthly: 2800 }, '/images/rental/cctv/garrett-pd-6500i.webp'),
      P('smiths-hi-scan-6040i', 'Smiths Detection', 'HI-SCAN 6040i X-Ray', ['Dual-energy X-ray', '620 × 420 mm tunnel', 'Threat-imaging (TIP)'], { Technology: 'Dual-energy X-ray', TunnelSize: '620 × 420 mm', Imaging: 'Threat Image Projection (TIP)' }, { daily: 280, weekly: 1400, monthly: 4200 }, '/images/rental/cctv/smiths-hi-scan-6040i.webp'),
      P('vcount-ultima-ai', 'V-Count', 'Ultima AI People Counter', ['3D AI people counting', '99%+ accuracy', 'Real-time analytics dashboard'], { Technology: '3D AI people counting', Accuracy: '99%+', Analytics: 'Real-time dashboard' }, { daily: 95, weekly: 490, monthly: 1450 }, '/images/rental/cctv/vcount-ultima-ai.webp'),
    ],
  },
  'testing-equipment': {
    name: 'Testing Equipment',
    icon: 'Wrench',
    keyword: 'Cable & Fibre Testing Equipment Rental UAE',
    title: 'Cable & Fibre Testing Equipment Rental UAE: Fluke DSX 5000, AFL OTDR | IP Care',
    metaDescription: 'Rent the Fluke DSX 5000 cable certifier, AFL Noyes M210 OTDR and a fusion splicer in UAE and Canada. Certify copper, test fibre and splice on-site. Day rates from AED 300, calibrated and ready to ship.',
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
      P('dell-r760', 'Dell', 'PowerEdge R760', ['Dual Xeon Emerald Rapids', 'Up to 8 TB DDR5', '24× 2.5" NVMe bays'], { FormFactor: '2U rack', CPU: '2× Intel Xeon 5/6th Gen', MaxRAM: '8 TB DDR5', Storage: 'Up to 24× 2.5" NVMe', GPU: 'Up to 6× double-wide', Mgmt: 'iDRAC 9' }, { daily: 260, weekly: 1300, monthly: 3900 }, '/images/rental/servers/dell-poweredge-r760.webp'),
      P('hpe-dl380-gen11', 'HPE', 'ProLiant DL380 Gen11', ['Dual 5th Gen Xeon', 'Up to 8 TB DDR5', 'Composable with GreenLake'], { FormFactor: '2U rack', CPU: '2× Intel Xeon 5th Gen', MaxRAM: '8 TB DDR5', Storage: 'Up to 36 LFF / 50 SFF', Mgmt: 'iLO 6, ProLiant integrated' }, { daily: 255, weekly: 1270, monthly: 3800 }, '/images/rental/servers/hpe-proliant-dl380-gen11.webp'),
      P('supermicro-sys-221h', 'Supermicro', 'SYS-221H-TNR', ['Dual Xeon Sapphire Rapids', '4 TB DDR5', '10× hot-swap NVMe'], { FormFactor: '2U rack', CPU: '2× Intel Xeon 4th Gen', MaxRAM: '4 TB DDR5', Storage: '10× hot-swap NVMe' }, { daily: 210, weekly: 1050, monthly: 3150 }, '/images/rental/servers/supermicro-sys-221h-tnr.webp'),
      P('dell-me5024', 'Dell', 'PowerVault ME5024', ['24× 2.5" SAS/SSD', 'Up to 4 PB raw', '12G SAS host ports'], { FormFactor: '2U storage', MaxRaw: '4 PB', Drives: '24× 2.5" SAS/SSD', Hosts: '12G SAS / FC / iSCSI' }, { daily: 180, weekly: 900, monthly: 2700 }, '/images/rental/servers/dell-powervault-me5024.webp'),
      P('dell-xr4000z', 'Dell', 'PowerEdge XR4000z (Rugged)', ['Short-depth 12" rack', 'Rugged MIL-STD-810H', 'For edge + events'], { FormFactor: '2U short-depth (12")', CPU: 'Intel Xeon D', Environment: 'MIL-STD-810H rugged', Use: 'Edge computing, events, field' }, { daily: 195, weekly: 980, monthly: 2900 }, '/images/rental/servers/dell-poweredge-xr4000z.webp'),
      P('apc-smt-3000-xl', 'APC', 'Smart-UPS SMT3000RMXL', ['3000 VA / 2700 W UPS', 'Rack 2U', 'Extended runtime'], { FormFactor: '2U rack UPS', Capacity: '3 kVA / 2.7 kW', Runtime: '~45 min at 50%', Mgmt: 'Network card included' }, { daily: 80, weekly: 400, monthly: 1150 }, '/images/rental/servers/apc-smart-ups-smt3000rmxl.webp'),
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
      P('event-10-person', 'IP Care', '10-Person Event Bundle', ['10× business laptops', '2× event WiFi APs', '1× MFP + 1× firewall'], { Laptops: '10× Dell Latitude 5450', WiFi: '2× HPE Aruba AP-635 WiFi 6E', Firewall: '1× Fortinet FortiGate 60F', Printer: '1× HP LaserJet M404dn colour MFP', Includes: 'Pre-configuration, delivery, setup, on-site tech day 1', Duration: 'Min 3 days' }, { daily: 890, weekly: 4200, monthly: 13500 }, '/Rental/bundle-event-10-person.webp'),
      P('conference-room-pack', 'IP Care', 'Conference Room Pack', ['Full AV + collaboration', 'MS Teams / Zoom certified', 'Ready in 4 hours'], { Display: '75" 4K commercial display', Conferencing: 'Logitech Rally Bar + Tap IP', Laptops: '2× Surface Pro 11 hosts', Wireless: '1× Meraki MX85 + MR57 AP', Setup: 'Full on-site install by engineer', Use: 'Board rooms, summits, hybrid events' }, { daily: 580, weekly: 2700, monthly: 8500 }, '/Rental/bundle-conference-room-pack.webp'),
      P('network-testing-kit', 'IP Care', 'Network Testing Kit', ['All 3 tools in one booking — Fluke DSX 5000, AFL M210 OTDR, Fujikura Splicer', 'AED 865/day against AED 950 for the three hired separately', 'Ruggedised cases, LinkWare reports and same-day collection included'], { Copper: 'Fluke DSX 5000 CableAnalyzer — Cat 5e to Cat 6A, 500 MHz', Fibre: 'AFL Noyes M210 OTDR — SM + MM, 1310/1550 nm', Splicing: 'Fujikura Fusion Splicer — <0.02 dB splice loss', Cases: 'Individual ruggedised travel cases per unit', Docs: 'LinkWare Live reports bundled at no extra cost', Saving: 'AED 865/day vs AED 950 hiring the three separately, about 9% lower', Duration: 'Minimum 2 days · delivery and collection included' }, { daily: 865 }, '/Rental/testing-fluke-dsx5000.webp', ['/Rental/testing-fluke-dsx5000.webp', '/Rental/testing-afl-m210-otdr.jpg', '/Rental/testing-fiber-splicer.jpg']),
    ],
  },
  'macbooks': {
    name: 'MacBook & Mac',
    icon: 'Laptop',
    keyword: 'MacBook Rental UAE',
    title: 'MacBook Rental UAE: M4, M3 MacBook Pro & Air | IP Care Technologies',
    // Previously promised "same-day delivery in Dubai and Abu Dhabi" here and in the
    // description, and asked "delivered to a Dubai event venue tomorrow morning?".
    // Confirmed lead time is one to two days from confirmed order, so those claims set
    // customers up for a missed first order — and contradicted the tablets and
    // testing-equipment pages, which state the real window.
    metaDescription: 'MacBook rental in UAE and Canada. MacBook Pro M4, MacBook Air M3, Mac mini M4, Mac Studio. Delivery in one to two days, setup included. Daily, weekly, monthly rates.',
    description: 'Current-generation Apple Macs held in stock across the UAE and Canada, ready to deploy for events, shoots, hackathons, agency overflow and short-term staffing. Plan on one to two days between confirmed order and delivery. Daily, weekly and monthly rentals, pre-configured with Creative Cloud, Logic Pro, Final Cut and Xcode on request.',
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
          a: 'MacBook rental starts at AED 95 per day for a MacBook Air 13" M3, with the MacBook Pro 14" and 16" higher depending on the M4, M4 Pro or M4 Max configuration. Mac mini and Mac Studio are also available for desk-bound work. Weekly and monthly bands carry a substantial discount. Rates are indicative, per unit and exclude VAT, and include delivery and setup.',
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
          q: 'Do you rent the Mac Pro?',
          a: 'The tower Mac Pro is not in the fleet. For the workloads people usually mean when they ask — colour grading, broadcast, ML, high-channel-count audio — the Mac Studio M2 Ultra outperforms a base Mac Pro configuration at a lower day rate, and it is what we actually deploy on those jobs. Tell us the workload and we will confirm it covers you before you book.',
        },
        {
          q: 'Do you rent the iMac Pro?',
          a: 'Apple discontinued the iMac Pro in 2021, so it is not available from us or from Apple directly. The current iMac 24" M4 is the machine that replaced it and outperforms it on CPU and GPU, and is what we rent for the same desk-bound, all-in-one use cases.',
        },
      ],
    },
    products: [
      P('macbook-pro-16-m4-pro', 'Apple', 'MacBook Pro 16" M4 Pro', ['Apple M4 Pro chip (12-core CPU)', '24 GB unified memory · 1 TB SSD', '16.2" Liquid Retina XDR display'], { CPU: 'Apple M4 Pro (12-core)', GPU: '18-core Apple GPU', RAM: '24 GB unified', Storage: '1 TB SSD', Display: '16.2" Liquid Retina XDR 3456×2234', OS: 'macOS Sequoia', Ports: '3× Thunderbolt 5, HDMI, SDXC, MagSafe 3', Battery: 'Up to 22 hrs', Use: 'Video editing, 3D, broadcast, dev workstations' }, { daily: 180, weekly: 980, monthly: 3200 }, LAPTOP_IMG),
      P('macbook-pro-14-m4-max', 'Apple', 'MacBook Pro 14" M4 Max', ['Apple M4 Max chip (14-core CPU)', '36 GB unified memory · 1 TB SSD', '14.2" Liquid Retina XDR display'], { CPU: 'Apple M4 Max (14-core)', GPU: '32-core Apple GPU', RAM: '36 GB unified', Storage: '1 TB SSD', Display: '14.2" Liquid Retina XDR 3024×1964', OS: 'macOS Sequoia', Ports: '3× Thunderbolt 5, HDMI, SDXC, MagSafe 3', Battery: 'Up to 18 hrs', Use: 'High-end video, ML/AI development, motion graphics' }, { daily: 210, weekly: 1150, monthly: 3800 }, LAPTOP_IMG),
      P('macbook-air-15-m3', 'Apple', 'MacBook Air 15" M3', ['Apple M3 chip (8-core CPU)', '16 GB unified memory · 512 GB SSD', '15.3" Liquid Retina display'], { CPU: 'Apple M3 (8-core)', GPU: '10-core Apple GPU', RAM: '16 GB unified', Storage: '512 GB SSD', Display: '15.3" Liquid Retina 2880×1864', OS: 'macOS Sequoia', Ports: '2× Thunderbolt 3, MagSafe 3', Battery: 'Up to 18 hrs', Use: 'Events, training rooms, business travel' }, { daily: 95, weekly: 520, monthly: 1750 }, LAPTOP_IMG),
      P('macbook-air-13-m3', 'Apple', 'MacBook Air 13" M3', ['Apple M3 chip (8-core CPU)', '16 GB unified memory · 256 GB SSD', '13.6" Liquid Retina display'], { CPU: 'Apple M3 (8-core)', GPU: '8-core Apple GPU', RAM: '16 GB unified', Storage: '256 GB SSD', Display: '13.6" Liquid Retina 2560×1664', OS: 'macOS Sequoia', Ports: '2× Thunderbolt 3, MagSafe 3', Battery: 'Up to 18 hrs', Weight: '1.24 kg', Use: 'Hackathons, conference attendees, registration desks' }, { daily: 80, weekly: 440, monthly: 1450 }, LAPTOP_IMG),
      P('mac-mini-m4-pro', 'Apple', 'Mac mini M4 Pro', ['Apple M4 Pro chip', '24 GB unified memory · 512 GB SSD', 'Compact desktop form factor'], { CPU: 'Apple M4 Pro (12-core)', GPU: '16-core Apple GPU', RAM: '24 GB unified', Storage: '512 GB SSD', OS: 'macOS Sequoia', Ports: '3× Thunderbolt 5, 2× USB-A, HDMI, Ethernet, headphone', Wireless: 'WiFi 6E + Bluetooth 5.3', Use: 'Edit suites, digital signage, dev workstations' }, { daily: 95, weekly: 520, monthly: 1750 }, LAPTOP_IMG),
      P('mac-studio-m2-ultra', 'Apple', 'Mac Studio M2 Ultra', ['Apple M2 Ultra chip', '64 GB unified memory · 1 TB SSD', 'Desktop workstation power'], { CPU: 'Apple M2 Ultra (24-core)', GPU: '60-core Apple GPU', RAM: '64 GB unified', Storage: '1 TB SSD', OS: 'macOS Sequoia', Ports: '6× Thunderbolt 4, 2× USB-A, HDMI, 10 Gb Ethernet, SDXC', Use: 'Colour grading, broadcast, ML, photo studios' }, { daily: 240, weekly: 1300, monthly: 4400 }, LAPTOP_IMG),
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
  },
  'ipad-10th-gen': {
    body: [
      'The standard iPad is the volume option. At AED 40 per day it is the lowest entry point in the fleet, which makes it the sensible specification when the deployment needs quantity rather than a high-end panel — twenty kiosks around a venue rather than two on a premium stand.',
      'The A14 Bionic and 10.9-inch Liquid Retina display are more than adequate for form capture, menu browsing, check-in and wayfinding. Spending the difference on a Pro for that workload is rarely justified.',
      'Because this is the highest-turnover model in the fleet, availability is generally the best of any device we hold. It remains worth confirming quantity early for anything approaching the fifty-unit ceiling.',
    ],
    usedFor: [
      'Volume kiosk and wayfinding deployments',
      'Menu and self-order terminals',
      'Visitor check-in across multiple entrances',
      'Classroom and training device pools',
    ],
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

// Mac desktop/laptop products. Search Console shows real demand sitting just off page 1
// with zero clicks: "rent macbook pro" (pos 11.9, 47 impr), "macbook pro rental" (pos 8.1,
// 24 impr), "mac pro rental" (pos 13.2, 50 impr), "rent mac pro" (pos 13.9, 70 impr) and
// "rent imac pro" (pos 12.2, 33 impr) — the last two for products IP Care doesn't stock
// under that exact name, hence the honest redirect in the body copy and the matching FAQ
// entries on the macbooks category page, rather than implying the tower Mac Pro or the
// discontinued iMac Pro are in the fleet.
Object.assign(productContent, {
  'macbook-pro-16-m4-pro': {
    body: [
      'The 16-inch MacBook Pro M4 Pro is the specification for portable work that still needs desktop-class headroom — multicam editing on location, on-set colour passes, and development builds too heavy to wait on. The 16.2" Liquid Retina XDR panel is large enough for a real timeline or a full IDE window rather than a cramped preview.',
      'Thunderbolt 5 and the 18-core GPU are the practical difference against the 14-inch M4 or an Air: sustained export and render jobs stay fast rather than throttling after twenty minutes, and external RAID or capture hardware runs at full bandwidth rather than bottlenecking the card.',
      'MacBook Pro rental at this tier ships with Final Cut Pro, Logic Pro, Creative Cloud or Xcode preloaded on request, and can be enrolled in your MDM before it leaves the warehouse, so the crew is cutting or building on day one rather than signing into licences.',
    ],
    usedFor: [
      'Multicam and 4K video editing on location',
      'On-set colour grading and dailies review',
      'Heavy Xcode builds and ML development',
      'Broadcast and agency overflow requiring desktop-class GPU',
    ],
  },
  'mac-studio-m2-ultra': {
    body: [
      'Mac Studio is what we specify when the ask is "a Mac Pro" but the job is colour grading, broadcast, ML training or a photo studio pipeline rather than internal PCIe expansion. The M2 Ultra\'s 60-core GPU and 64 GB of unified memory outperform a base tower Mac Pro configuration on every one of those workloads, at a materially lower day rate, which is why it is the desktop we actually deploy against that kind of brief.',
      'Six Thunderbolt 4 ports and 10 Gb Ethernet mean a studio rig — external drives, a capture card, a wired network — plugs in directly rather than through a hub, which matters when the rental is running a live grading or broadcast session and a dropped connection is not an option.',
      'If a project genuinely needs PCIe card expansion rather than raw compute, say so when booking and we will confirm whether the Studio still covers it or scope an alternative — better to catch that before delivery than on set.',
    ],
    usedFor: [
      'Colour grading and broadcast production',
      'ML training and inference workstations',
      'Photo studio tethered-capture pipelines',
      'Fixed-position render nodes for agencies and post houses',
    ],
  },
  'apple-imac-24-m4': {
    body: [
      'The iMac 24" M4 is the current all-in-one, and the machine we point people to when they ask for an "iMac Pro" — Apple discontinued that line in 2021, and this is what replaced it, with a faster CPU and GPU than the Pro it succeeded. Nothing is lost by the naming difference; the M4 outperforms it.',
      'The 4.5K Retina display and eight-core GPU suit reception and registration desks, executive offices and training rooms where a single cable and a Magic Keyboard and Mouse are the whole setup — there is no separate tower or monitor to rack and cable.',
      'Same-day imaging applies here as with the rest of the fleet: joined to your MDM or handed over signed-in and ready, depending on what the deployment needs.',
    ],
    usedFor: [
      'Reception, registration and front-desk deployments',
      'Executive office and boardroom workstations',
      'Training room and classroom desktop pools',
      'Short-term desk-bound replacement for a Mac under repair',
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
    'event-wifi/aruba-ap-635-wifi6e', 'networking/aruba-cx-6300m-48g', 'cctv/hikvision-ds-2cd2t86g2']
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
