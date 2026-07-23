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
    products: [
      P('aruba-ap-635-wifi6e', 'HPE Aruba', 'AP-635 WiFi 6E', ['Tri-band 6 GHz WiFi 6E', 'Up to 3.9 Gbps per radio', '1,024 concurrent clients'], { Standard: 'WiFi 6E (802.11ax)', Bands: '2.4/5/6 GHz', MaxThroughput: '7.8 Gbps aggregate', Clients: '1,024 concurrent', PoE: '802.3bt', Antennas: '4×4:4 internal' }, { daily: 95, weekly: 480, monthly: 1400 }, '/images/rental/event-wifi/aruba-ap-635.webp'),
      P('unifi-u6-pro', 'Ubiquiti', 'UniFi U6 Pro', ['WiFi 6 dual-band AP', '5.3 Gbps aggregate', '300+ concurrent clients'], { Standard: 'WiFi 6 (802.11ax)', Bands: '2.4/5 GHz', MaxThroughput: '5.3 Gbps aggregate', Clients: '300+ concurrent', PoE: '802.3at', Management: 'UniFi Network controller' }, { daily: 105, weekly: 520, monthly: 1550 }, '/images/rental/event-wifi/unifi-u6-pro.webp'),
      P('ruckus-r770-wifi7', 'Ruckus', 'R770 WiFi 7', ['First WiFi 7 AP in region', 'BeamFlex+ adaptive antenna', 'Up to 22 Gbps aggregate'], { Standard: 'WiFi 7 (802.11be)', MaxThroughput: '22 Gbps', Antenna: 'BeamFlex+ adaptive', PoE: '802.3bt Type 4', Management: 'RUCKUS One cloud / SmartZone' }, { daily: 140, weekly: 720, monthly: 2100 }, '/images/rental/event-wifi/ruckus-r770.webp'),
      P('unifi-e7', 'Ubiquiti', 'UniFi E7', ['WiFi 7 tri-band AP', 'Up to 21 Gbps aggregate', '6 GHz radio · high-density'], { Standard: 'WiFi 7 (802.11be)', Bands: '2.4/5/6 GHz', MaxThroughput: '21 Gbps aggregate', PoE: '802.3bt', Management: 'UniFi Network controller' }, { daily: 130, weekly: 650, monthly: 1900 }, '/images/rental/event-wifi/unifi-e7.webp'),
      P('ubiquiti-udm-pro-max', 'Ubiquiti', 'UniFi Dream Machine Pro Max', ['10G SFP+ uplink', 'Integrated controller', '750+ client capacity'], { Throughput: '5 Gbps', Storage: '2× 3.5" HDD bays for protect', Ports: '8× 1GbE + 2× 10GbE SFP+', Users: '750+' }, { daily: 75, weekly: 390, monthly: 1150 }, '/images/rental/event-wifi/ubiquiti-udm-pro-max.webp'),
      P('fortigate-200e', 'Fortinet', 'FortiGate 200E', ['Next-gen firewall (NGFW)', '20 Gbps firewall throughput', 'SD-WAN · IPS · VPN'], { Throughput: '20 Gbps firewall', SD_WAN: 'Built-in SD-WAN', Security: 'IPS, VPN, NGFW', Management: 'FortiGate cloud / FortiManager' }, { daily: 95, weekly: 470, monthly: 1350 }, '/images/rental/event-wifi/fortigate-200e.webp'),
    ],
  },
  'networking': {
    name: 'Networking Equipment',
    icon: 'Network',
    keyword: 'Network Equipment Rental UAE',
    title: 'Network Equipment Rental UAE: Switches, Firewalls | IP Care',
    metaDescription: 'Enterprise switch, firewall and router rental in UAE. Cisco, HPE Aruba, Fortinet, Palo Alto, configured and delivered with on-site support.',
    description: 'Core, distribution and access switches, firewalls, and SD-WAN kits, ready for projects, temporary offices and events.',
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
    metaDescription: 'Rent the Fluke DSX 5000 cable certifier, AFL Noyes M210 OTDR and a fusion splicer in UAE and Canada. Certify copper, test fibre and splice on-site. Daily, weekly and monthly rates.',
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
      faqs: [
        {
          q: 'How much does it cost to rent a Fluke DSX 5000 in the UAE?',
          a: 'The Fluke DSX 5000 CableAnalyzer rents from AED 185 per day, AED 920 per week and AED 2,750 per month. The AFL Noyes M210 OTDR starts at AED 150 per day and the Fujikura fusion splicer kit at AED 195 per day. Rates are indicative, per unit and exclude VAT, and include delivery, collection and setup.',
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
          a: 'Yes, one day is the minimum period. Fault-finding work often needs only a day or two, which is exactly the case where renting beats owning. Weekly and monthly rates offer better value for commissioning and handover phases that run longer.',
        },
        {
          q: 'Do you rent fusion splicers for on-site fibre repair?',
          a: 'Yes. The Fujikura kit is supplied as a complete carry case with cleaver, electrodes, heat-shrink oven and AC adapter, and holds enough battery for 200-plus splices per charge for off-grid site work. It is the right tool where fibre must be repaired, extended or terminated properly rather than patched with a mechanical connector.',
        },
      ],
    },
    products: [
      P('fluke-dsx-5000', 'Fluke Networks', 'DSX 5000 CableAnalyzer', ['Certifies Cat 5e to Cat 6A at 500 MHz, pass/fail in under 10 seconds', 'Tests PoE up to 60W so you know the port delivers before the AP goes up', 'LinkWare Live: reports sync to the cloud before you\'ve packed the kit'], { Standard: 'Cat 5e / 6 / 6A up to 500 MHz', PoE: 'Up to 60W PoE+ testing', Cloud: 'LinkWare Live report upload', Connector: 'Permanent link + channel adapters included', Display: '5" colour touchscreen', Battery: '8 hr runtime' }, { daily: 185, weekly: 920, monthly: 2750 }, '/Rental/testing-fluke-dsx5000.webp'),
      P('afl-noyes-m210-otdr', 'AFL Noyes', 'M210 OTDR', ['Traces singlemode and multimode fibre, one unit, both jobs', '1310 / 1550 nm wavelengths catch faults, reflections and losses most gear misses', 'Compact and field-rugged, fits in a backpack, no cart required'], { Type: 'Singlemode + multimode OTDR', Wavelengths: '1310 / 1550 nm (SM) · 850 / 1300 nm (MM)', DynamicRange: 'Up to 35 dB', EventDeadzone: '0.8 m typical', Display: 'Colour LCD with automatic event analysis', Battery: '8 hr field runtime' }, { daily: 150, weekly: 750, monthly: 2250 }, '/Rental/testing-afl-m210-otdr.jpg'),
      P('fiber-splicing-machine', 'Fujikura', 'Fusion Splicer Kit', ['Arc-fusion splicing with sub-0.02 dB typical splice loss', 'Built-in fibre cleaver + heat-shrink oven, everything in one carry case', 'Ruggedised case with battery backup rated for full off-grid site days'], { Type: 'Core-alignment fusion splicer', SpliceLoss: '< 0.02 dB typical (SM)', SpliceTime: '9 seconds', SleeveHeating: '35 seconds', Battery: '200+ splices per charge', Includes: 'Cleaver, electrodes, carry case, AC adapter' }, { daily: 195, weekly: 975, monthly: 2900 }, '/Rental/testing-fiber-splicer.jpg'),
    ],
  },
  'servers': {
    name: 'Servers & Data',
    icon: 'Server',
    keyword: 'Server Rental UAE',
    title: 'Server Rental UAE: Dell, HPE, Supermicro | IP Care Technologies',
    metaDescription: 'Enterprise server rental in UAE. Dell PowerEdge, HPE ProLiant, Supermicro, delivered configured with storage, backup and on-site setup.',
    description: 'Rack-mount and tower servers for broadcast, event analytics, temporary data centres and short-term workloads.',
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
      P('network-testing-kit', 'IP Care', 'Network Testing Kit', ['All 3 tools in one booking — Fluke DSX 5000, AFL M210 OTDR, Fujikura Splicer', 'Save vs. hiring separately — bundle rate lower than combined individual daily rates', 'Ruggedised cases, LinkWare reports and same-day collection included'], { Copper: 'Fluke DSX 5000 CableAnalyzer — Cat 5e to Cat 6A, 500 MHz', Fibre: 'AFL Noyes M210 OTDR — SM + MM, 1310/1550 nm', Splicing: 'Fujikura Fusion Splicer — <0.02 dB splice loss', Cases: 'Individual ruggedised travel cases per unit', Docs: 'LinkWare Live reports bundled at no extra cost', Saving: 'Bundle rate vs individual hire: save up to 9% daily', Duration: 'Minimum 2 days · delivery and collection included' }, { daily: 480, weekly: 2400, monthly: 7200 }, '/Rental/testing-fluke-dsx5000.webp', ['/Rental/testing-fluke-dsx5000.webp', '/Rental/testing-afl-m210-otdr.jpg', '/Rental/testing-fiber-splicer.jpg']),
    ],
  },
  'macbooks': {
    name: 'MacBook & Mac',
    icon: 'Laptop',
    keyword: 'MacBook Rental UAE',
    title: 'MacBook Rental UAE: M4, M3 MacBook Pro & Air | IP Care Technologies',
    metaDescription: 'MacBook rental in UAE and Canada. MacBook Pro M4, MacBook Air M3, Mac mini M4, Mac Studio. Same-day delivery in Dubai and Abu Dhabi. Daily, weekly, monthly rates.',
    description: 'Need MacBooks delivered to a Dubai event venue tomorrow morning? This is the page. We keep current-generation Apple Macs in stock across the UAE and Canada, ready to deploy for events, shoots, hackathons, agency overflow and short-term staffing. Daily, weekly and monthly rentals with same-day delivery in Dubai and Abu Dhabi. Pre-configured with Creative Cloud, Logic Pro, Final Cut and Xcode on request.',
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
