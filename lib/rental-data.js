// Equipment Rental Hub data — categories, products, bundles.

const LAPTOP_IMG = 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853'
const TABLET_IMG = 'https://images.unsplash.com/photo-1561154464-82e9adf32764'
const PRINTER_IMG = 'https://images.unsplash.com/photo-1650094980833-7373de26feb6'
const ROUTER_IMG = 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2'
const SERVER_IMG = 'https://images.unsplash.com/photo-1695668548342-c0c1ad479aee'
const CCTV_IMG = 'https://images.unsplash.com/photo-1585771724684-38269d6639fd'
const SWITCH_IMG = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64'
const TESTER_IMG = 'https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf'
const BUNDLE_IMG = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'

const P = (slug, brand, model, specs, fullSpecs, rates, image) => ({ slug, brand, model, specs, fullSpecs, rates, image })

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
    description: 'Rapid-deploy CCTV kits, cameras, NVRs, analytics, with on-site command centre and ADMCC-certified installation in Abu Dhabi.',
    products: [
      P('hikvision-ds-2cd2t86g2', 'Hikvision', 'DS-2CD2T86G2', ['8 MP AcuSense IP bullet', '60m IR range', 'Built-in mic'], { Resolution: '8 MP (4K)', Type: 'Bullet IP camera', IRDistance: '60 m', Lens: '2.8 / 4 / 6 mm', PoE: '802.3af', Smart: 'AcuSense human/vehicle detection' }, { daily: 30, weekly: 160, monthly: 520 }, CCTV_IMG),
      P('axis-p5676-le', 'Axis', 'P5676-LE PTZ', ['4K UHD PTZ dome', '40× optical zoom', 'OptimizedIR 400 m'], { Resolution: '4K UHD', Zoom: '40× optical', IR: '400 m OptimizedIR', PanTilt: '360° continuous / 220° tilt', Features: 'Autotracking, Lightfinder 2.0' }, { daily: 220, weekly: 1100, monthly: 3300 }, CCTV_IMG),
      P('dahua-nvr5864-4ks2', 'Dahua', 'NVR5864-4KS2', ['64-channel 4K NVR', '8× HDD bays / 128 TB', 'AI smart search'], { Channels: '64', Recording: '4K UHD 320 Mbps', HDDBays: '8 × SATA III', Storage: 'Up to 128 TB', AI: 'Face recognition, ANPR, smart search' }, { daily: 120, weekly: 620, monthly: 1850 }, CCTV_IMG),
      P('hanwha-xno-c9083r', 'Hanwha Vision', 'XNO-C9083R', ['8 MP AI bullet', 'P-iris auto lens', 'Wisenet 7 AI chipset'], { Resolution: '8 MP (4K)', Lens: '2.8-12 mm motorised P-iris', IR: '50 m', AI: 'Object classification, loitering, intrusion', Cert: 'NDAA, FIPS 140-2' }, { daily: 95, weekly: 490, monthly: 1450 }, CCTV_IMG),
      P('flir-fc-644-id', 'Teledyne FLIR', 'FC-644 ID Thermal', ['Thermal detection 1,080 m', 'Classify human vs vehicle', 'Edge analytics'], { Type: 'Thermal + visible', Resolution: '640×480 thermal', DetectionRange: '1,080 m', Analytics: 'FLIR ID onboard', Use: 'Perimeter, crowd, wildfire' }, { daily: 280, weekly: 1400, monthly: 4200 }, CCTV_IMG),
      P('milestone-xprotect', 'Milestone', 'XProtect Corporate (VMS)', ['Unlimited camera VMS', '200+ integrations', 'Video-wall + mobile'], { Type: 'Video Management Software', Channels: 'Unlimited', Clients: 'XProtect Smart Client + Mobile', Integrations: '200+ (cameras, access, analytics)', Deployment: 'Server + workstation included' }, { daily: 180, weekly: 920, monthly: 2800 }, CCTV_IMG),
    ],
  },
  'testing-equipment': {
    name: 'Testing Equipment',
    icon: 'Wrench',
    keyword: 'Cable & Fibre Testing Equipment Rental UAE',
    title: 'Cable & Fibre Testing Equipment Rental UAE: Fluke DSX 5000, AFL OTDR | IP Care',
    metaDescription: 'Rent the Fluke DSX 5000 cable certifier, AFL Noyes M210 OTDR and a fusion splicer in UAE and Canada. Certify copper, test fibre and splice on-site. Daily, weekly and monthly rates.',
    description: 'If the cable fails cert, the whole job stops. We keep the Fluke DSX 5000, AFL Noyes M210 OTDR and a fusion splicer ready to ship, so your crew has the right gear on-site, not the closest substitute.',
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
      P('dell-r760', 'Dell', 'PowerEdge R760', ['Dual Xeon Emerald Rapids', 'Up to 8 TB DDR5', '24× 2.5" NVMe bays'], { FormFactor: '2U rack', CPU: '2× Intel Xeon 5/6th Gen', MaxRAM: '8 TB DDR5', Storage: 'Up to 24× 2.5" NVMe', GPU: 'Up to 6× double-wide', Mgmt: 'iDRAC 9' }, { daily: 260, weekly: 1300, monthly: 3900 }, SERVER_IMG),
      P('hpe-dl380-gen11', 'HPE', 'ProLiant DL380 Gen11', ['Dual 5th Gen Xeon', 'Up to 8 TB DDR5', 'Composable with GreenLake'], { FormFactor: '2U rack', CPU: '2× Intel Xeon 5th Gen', MaxRAM: '8 TB DDR5', Storage: 'Up to 36 LFF / 50 SFF', Mgmt: 'iLO 6, ProLiant integrated' }, { daily: 255, weekly: 1270, monthly: 3800 }, SERVER_IMG),
      P('supermicro-sys-221h', 'Supermicro', 'SYS-221H-TNR', ['Dual Xeon Sapphire Rapids', '4 TB DDR5', '10× hot-swap NVMe'], { FormFactor: '2U rack', CPU: '2× Intel Xeon 4th Gen', MaxRAM: '4 TB DDR5', Storage: '10× hot-swap NVMe' }, { daily: 210, weekly: 1050, monthly: 3150 }, SERVER_IMG),
      P('dell-me5024', 'Dell', 'PowerVault ME5024', ['24× 2.5" SAS/SSD', 'Up to 4 PB raw', '12G SAS host ports'], { FormFactor: '2U storage', MaxRaw: '4 PB', Drives: '24× 2.5" SAS/SSD', Hosts: '12G SAS / FC / iSCSI' }, { daily: 180, weekly: 900, monthly: 2700 }, SERVER_IMG),
      P('dell-xr4000z', 'Dell', 'PowerEdge XR4000z (Rugged)', ['Short-depth 12" rack', 'Rugged MIL-STD-810H', 'For edge + events'], { FormFactor: '2U short-depth (12")', CPU: 'Intel Xeon D', Environment: 'MIL-STD-810H rugged', Use: 'Edge computing, events, field' }, { daily: 195, weekly: 980, monthly: 2900 }, SERVER_IMG),
      P('apc-smt-3000-xl', 'APC', 'Smart-UPS SMT3000RMXL', ['3000 VA / 2700 W UPS', 'Rack 2U', 'Extended runtime'], { FormFactor: '2U rack UPS', Capacity: '3 kVA / 2.7 kW', Runtime: '~45 min at 50%', Mgmt: 'Network card included' }, { daily: 80, weekly: 400, monthly: 1150 }, SERVER_IMG),
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
      P('event-10-person', 'IP Care', '10-Person Event Bundle', ['10× business laptops', '2× event WiFi APs', '1× MFP + 1× firewall'], { Laptops: '10× Dell Latitude 5450', WiFi: '2× HPE Aruba AP-635 WiFi 6E', Firewall: '1× Fortinet FortiGate 60F', Printer: '1× HP LaserJet M404dn colour MFP', Includes: 'Pre-configuration, delivery, setup, on-site tech day 1', Duration: 'Min 3 days' }, { daily: 890, weekly: 4200, monthly: 13500 }, BUNDLE_IMG),
      P('conference-room-pack', 'IP Care', 'Conference Room Pack', ['Full AV + collaboration', 'MS Teams / Zoom certified', 'Ready in 4 hours'], { Display: '75" 4K commercial display', Conferencing: 'Logitech Rally Bar + Tap IP', Laptops: '2× Surface Pro 11 hosts', Wireless: '1× Meraki MX85 + MR57 AP', Setup: 'Full on-site install by engineer', Use: 'Board rooms, summits, hybrid events' }, { daily: 580, weekly: 2700, monthly: 8500 }, BUNDLE_IMG),
      P('network-testing-kit', 'IP Care', 'Network Testing Kit', ['Copper + fibre certification bundle', 'Fluke DSX 5000 + AFL M210 OTDR + Fusion Splicer', 'Ruggedised cases, delivery and collection included'], { Copper: 'Fluke DSX 5000 CableAnalyzer', Fibre: 'AFL Noyes M210 OTDR', Splicing: 'Fujikura Fusion Splicer Kit', Cases: 'Ruggedised travel cases', Docs: 'LinkWare reports bundled', Duration: 'Min 2 days' }, { daily: 480, weekly: 2400, monthly: 7200 }, BUNDLE_IMG),
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

export const getCategory = (slug) => rentalCategories[slug] || null
export const getAllCategorySlugs = () => Object.keys(rentalCategories)
export const getProduct = (catSlug, productSlug) => {
  const cat = rentalCategories[catSlug]
  if (!cat) return null
  const product = cat.products.find(p => p.slug === productSlug)
  if (!product) return null
  return { ...product, categorySlug: catSlug, categoryName: cat.name, categoryKeyword: cat.keyword }
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
