import clientPromise from './mongodb';

const SAMPLE_EWASTE = [
  {
    name: 'Dell Inspiron 15 Laptop',
    category: 'Computers & Laptops',
    condition: 'Not Working',
    description: 'Screen broken, motherboard intact. 8GB RAM, 256GB SSD still recoverable.',
    address: '42 Circuit Lane, Tech City',
    status: 'received',
    date: '2026-06-15',
  },
  {
    name: 'Samsung Galaxy S21 Ultra',
    category: 'Smartphones & Tablets',
    condition: 'Partially Working',
    description: 'Battery bloated, screen cracked but touch works. Camera module salvageable.',
    address: '88 Silicon Ave',
    status: 'processing',
    date: '2026-06-18',
  },
  {
    name: 'HP LaserJet Pro MFP',
    category: 'Printers & Scanners',
    condition: 'Not Working',
    description: 'Paper feed mechanism jammed. Toner cartridge full. Good for parts.',
    address: '15 Board Street',
    status: 'pending',
    date: '2026-06-20',
  },
];

const SAMPLE_PRODUCTS = [
  // ── ICs & Microcontrollers ────────────────────────────
  {
    name: 'Arduino Uno R3 Board',
    category: 'ICs & Microcontrollers',
    price: 450,
    condition: 'Excellent',
    description: 'Barely used Arduino Uno R3. All pins working. Comes with USB cable. Perfect for prototyping projects.',
    quantity: 1,
    date: '2026-06-10',
  },
  {
    name: 'ESP32 Development Board',
    category: 'ICs & Microcontrollers',
    price: 350,
    condition: 'Good',
    description: 'Dual-core WiFi + Bluetooth MCU. Used in IoT project. All GPIOs functional. Flash memory intact.',
    quantity: 2,
    date: '2026-06-17',
  },
  {
    name: 'ATmega328P Microcontroller (DIP-28)',
    category: 'ICs & Microcontrollers',
    price: 95,
    condition: 'Excellent',
    description: 'Brand new surplus ATmega328P with Arduino bootloader pre-flashed. Drop-in replacement for Uno boards.',
    quantity: 5,
    date: '2026-06-22',
  },
  {
    name: 'STM32F103C8T6 Blue Pill Board',
    category: 'ICs & Microcontrollers',
    price: 180,
    condition: 'Good',
    description: 'ARM Cortex-M3 72MHz dev board. Used briefly for a university project. Runs STM32duino or bare-metal.',
    quantity: 3,
    date: '2026-06-25',
  },
  {
    name: 'ESP8266 NodeMCU WiFi Module',
    category: 'ICs & Microcontrollers',
    price: 200,
    condition: 'Excellent',
    description: '80MHz MCU with built-in WiFi. Perfect for IoT sensors, weather stations, and smart home hacks.',
    quantity: 4,
    date: '2026-06-28',
  },
  {
    name: 'NE555 Timer IC (10-Pack)',
    category: 'ICs & Microcontrollers',
    price: 40,
    condition: 'Excellent',
    description: 'Classic 555 timer ICs, DIP-8 package. New old stock. Perfect for oscillators, PWM, and timing circuits.',
    quantity: 10,
    date: '2026-06-30',
  },

  // ── PCBs & Boards ────────────────────────────────────
  {
    name: 'Raspberry Pi 4 Model B (4GB)',
    category: 'PCBs & Boards',
    price: 2800,
    condition: 'Good',
    description: 'Used for a home server project. Runs perfectly. Minor scuff on case. Includes power supply.',
    quantity: 1,
    date: '2026-06-12',
  },
  {
    name: 'Raspberry Pi Pico W',
    category: 'PCBs & Boards',
    price: 380,
    condition: 'Excellent',
    description: 'RP2040 dual-core with WiFi. Header pins soldered. Used for one project, works flawlessly. MicroPython ready.',
    quantity: 2,
    date: '2026-06-24',
  },
  {
    name: 'Custom PCB Prototype (Double-Sided, 5-Pack)',
    category: 'PCBs & Boards',
    price: 150,
    condition: 'Excellent',
    description: 'Blank FR4 boards, 70×50mm, 1.6mm thick, HASL finish. Extra boards from a PCB order — unused.',
    quantity: 5,
    date: '2026-06-26',
  },

  // ── Capacitors ────────────────────────────────────────
  {
    name: '100μF Electrolytic Capacitors (50-Pack)',
    category: 'Capacitors',
    price: 120,
    condition: 'Excellent',
    description: 'Brand new surplus stock. 25V rated. Through-hole mount. Great for audio circuits and power filtering.',
    quantity: 50,
    date: '2026-06-14',
  },
  {
    name: '10nF Ceramic Disc Capacitors (100-Pack)',
    category: 'Capacitors',
    price: 60,
    condition: 'Excellent',
    description: '50V rated ceramic caps — 103 code. Ideal for decoupling and noise filtering. Through-hole leads.',
    quantity: 100,
    date: '2026-06-21',
  },
  {
    name: '1000μF 16V Electrolytic Capacitors (20-Pack)',
    category: 'Capacitors',
    price: 90,
    condition: 'Good',
    description: 'Desoldered from working power supplies. Tested — all within spec. Great for audio amplifier builds.',
    quantity: 20,
    date: '2026-06-27',
  },

  // ── Resistors ─────────────────────────────────────────
  {
    name: '1/4W Resistor Assortment Kit (600pcs, 30 Values)',
    category: 'Resistors',
    price: 150,
    condition: 'Excellent',
    description: 'Metal film resistors, ±1% tolerance. Values from 10Ω to 1MΩ. Organized in labeled bags.',
    quantity: 1,
    date: '2026-06-23',
  },
  {
    name: '10kΩ Trimmer Potentiometer (10-Pack)',
    category: 'Resistors',
    price: 70,
    condition: 'Good',
    description: 'Bourns-style 3-pin trimmers, single-turn. Recovered from test fixtures, all working.',
    quantity: 10,
    date: '2026-06-29',
  },

  // ── Displays ──────────────────────────────────────────
  {
    name: '0.96" OLED Display Module (I2C)',
    category: 'Displays',
    price: 180,
    condition: 'Excellent',
    description: 'SSD1306 driver. 128x64 pixels. Works with Arduino and ESP32. Tested and fully functional.',
    quantity: 3,
    date: '2026-06-16',
  },
  {
    name: '16×2 LCD Display (HD44780, Blue Backlight)',
    category: 'Displays',
    price: 110,
    condition: 'Good',
    description: 'Standard character LCD with soldered header pins. Includes I2C backpack adapter for 2-wire connection.',
    quantity: 2,
    date: '2026-06-19',
  },
  {
    name: '2.4" TFT Touch Screen (ILI9341, SPI)',
    category: 'Displays',
    price: 320,
    condition: 'Excellent',
    description: '240×320 color display with resistive touch. SD card slot on back. Works with Arduino TFT library.',
    quantity: 1,
    date: '2026-06-28',
  },

  // ── Sensors ───────────────────────────────────────────
  {
    name: 'HC-SR04 Ultrasonic Sensor',
    category: 'Sensors',
    price: 60,
    condition: 'Excellent',
    description: 'Measuring range: 2cm–400cm. Accuracy: 3mm. Gently used in robotics project. Like new condition.',
    quantity: 5,
    date: '2026-06-18',
  },
  {
    name: 'DHT22 Temperature & Humidity Sensor',
    category: 'Sensors',
    price: 140,
    condition: 'Excellent',
    description: '0–100% RH, -40–80°C range. Digital output, 1-wire protocol. Much more accurate than DHT11.',
    quantity: 3,
    date: '2026-06-20',
  },
  {
    name: 'MPU6050 6-Axis Gyro + Accelerometer Module',
    category: 'Sensors',
    price: 120,
    condition: 'Good',
    description: 'I2C interface, 3-axis gyroscope + 3-axis accelerometer. Used in drone stabilization project.',
    quantity: 2,
    date: '2026-06-25',
  },
  {
    name: 'Soil Moisture Sensor Module',
    category: 'Sensors',
    price: 45,
    condition: 'Excellent',
    description: 'Analog output, corrosion-resistant probe. Perfect for automated plant watering systems.',
    quantity: 4,
    date: '2026-06-30',
  },
  {
    name: 'IR Obstacle Avoidance Sensor (5-Pack)',
    category: 'Sensors',
    price: 80,
    condition: 'Good',
    description: 'Adjustable detection range 2–30cm. Digital output with indicator LED. Great for line-following robots.',
    quantity: 5,
    date: '2026-07-01',
  },

  // ── Motors & Actuators ────────────────────────────────
  {
    name: 'NEMA 17 Stepper Motor',
    category: 'Motors & Actuators',
    price: 380,
    condition: 'Good',
    description: '1.8° step angle. 1.5A rated. Salvaged from 3D printer. Runs smoothly. Tested with A4988 driver.',
    quantity: 2,
    date: '2026-06-19',
  },
  {
    name: 'SG90 Micro Servo Motor (5-Pack)',
    category: 'Motors & Actuators',
    price: 200,
    condition: 'Excellent',
    description: '180° rotation, 1.8kg·cm torque. Lightweight 9g servos, ideal for robotic arms and RC projects.',
    quantity: 5,
    date: '2026-06-22',
  },
  {
    name: 'L298N Dual H-Bridge Motor Driver',
    category: 'Motors & Actuators',
    price: 160,
    condition: 'Good',
    description: 'Controls 2 DC motors or 1 stepper. Up to 2A per channel. Heat sink included. Tested thoroughly.',
    quantity: 2,
    date: '2026-06-26',
  },

  // ── Power Supplies ────────────────────────────────────
  {
    name: '5V 3A USB-C Power Supply',
    category: 'Power Supplies',
    price: 220,
    condition: 'Fair',
    description: 'Official Raspberry Pi power supply. Cable has minor wear but connector is solid. Stable output verified.',
    quantity: 1,
    date: '2026-06-20',
  },
  {
    name: 'LM7805 5V Voltage Regulator (10-Pack)',
    category: 'Power Supplies',
    price: 50,
    condition: 'Excellent',
    description: 'TO-220 package, 1.5A max output. Industry standard 5V regulator. New, never soldered.',
    quantity: 10,
    date: '2026-06-24',
  },
  {
    name: 'MT3608 DC-DC Boost Converter Module (3-Pack)',
    category: 'Power Supplies',
    price: 90,
    condition: 'Good',
    description: '2V–24V input, up to 28V output. Adjustable via trimpot. Compact and efficient for portable projects.',
    quantity: 3,
    date: '2026-06-29',
  },
  {
    name: '18650 Li-Ion Battery Holder (Dual Slot)',
    category: 'Power Supplies',
    price: 35,
    condition: 'Excellent',
    description: 'Series/parallel switchable. Spring-loaded contacts. Includes on/off switch and JST connector.',
    quantity: 4,
    date: '2026-07-01',
  },

  // ── Connectors ────────────────────────────────────────
  {
    name: 'Male-to-Male Jumper Wires (40-Pack, 20cm)',
    category: 'Connectors',
    price: 50,
    condition: 'Excellent',
    description: 'Dupont-style breadboard jumper wires. Color-coded rainbow ribbon. Essential for prototyping.',
    quantity: 40,
    date: '2026-06-21',
  },
  {
    name: 'Female Header Pin Strips (10-Pack, 40-pin)',
    category: 'Connectors',
    price: 40,
    condition: 'Excellent',
    description: '2.54mm pitch, single-row. Snap-apart design. Perfect for custom shields and breakout boards.',
    quantity: 10,
    date: '2026-06-27',
  },
  {
    name: 'JST-XH 2.54mm Connector Kit (50 Pairs)',
    category: 'Connectors',
    price: 120,
    condition: 'Excellent',
    description: '2-pin to 6-pin assortment. Includes male & female housings + pre-crimped wires. Great for battery packs.',
    quantity: 50,
    date: '2026-06-30',
  },

  // ── Transistors ───────────────────────────────────────
  {
    name: '2N2222A NPN Transistor (20-Pack)',
    category: 'Transistors',
    price: 45,
    condition: 'Excellent',
    description: 'TO-92 package, 600mA collector current. Classic general-purpose switching transistor.',
    quantity: 20,
    date: '2026-06-23',
  },
  {
    name: 'IRFZ44N N-Channel MOSFET (5-Pack)',
    category: 'Transistors',
    price: 80,
    condition: 'Good',
    description: 'TO-220, 49A/55V. Low Rds(on). Ideal for motor drivers, LED strips, and PWM load switching.',
    quantity: 5,
    date: '2026-06-28',
  },

  // ── Diodes & LEDs ─────────────────────────────────────
  {
    name: '5mm LED Assortment Kit (100pcs, 5 Colors)',
    category: 'Diodes & LEDs',
    price: 60,
    condition: 'Excellent',
    description: 'Red, green, blue, yellow, white — 20 of each. Clear lens, through-hole. Includes matching resistors.',
    quantity: 100,
    date: '2026-06-22',
  },
  {
    name: 'WS2812B RGB LED Strip (1m, 60 LEDs)',
    category: 'Diodes & LEDs',
    price: 280,
    condition: 'Good',
    description: 'Individually addressable NeoPixel-compatible strip. IP30 (no waterproofing). Cut from a longer roll.',
    quantity: 1,
    date: '2026-06-26',
  },
  {
    name: '1N4007 Rectifier Diodes (50-Pack)',
    category: 'Diodes & LEDs',
    price: 35,
    condition: 'Excellent',
    description: '1A/1000V general-purpose rectifier. DO-41 package. New stock — essential for power supply builds.',
    quantity: 50,
    date: '2026-06-29',
  },

  // ── Cables & Wires ────────────────────────────────────
  {
    name: 'USB-A to Micro-USB Cable (1m, 3-Pack)',
    category: 'Cables & Wires',
    price: 60,
    condition: 'Good',
    description: 'Data + charging cables. Tested with Arduino boards. Minor cosmetic wear, all fully functional.',
    quantity: 3,
    date: '2026-06-25',
  },
  {
    name: 'Breadboard (830 Points, Full Size)',
    category: 'Cables & Wires',
    price: 85,
    condition: 'Excellent',
    description: 'Standard solderless breadboard with power rails. Tight pin grip — not the cheap loose-contact kind.',
    quantity: 2,
    date: '2026-06-30',
  },
];

// ────────────────── Helpers ──────────────────

let usingFallback = false;

async function getCollections() {
  try {
    const client = await clientPromise;
    const db = client.db('ebridge');
    return {
      ewasteCollection: db.collection('ewaste'),
      productsCollection: db.collection('products'),
    };
  } catch {
    // If MongoDB is unreachable, switch to in-memory fallback mode.
    usingFallback = true;
    return null;
  }
}

// ────────────────── In-memory fallback store ──────────────────
// This lets the app work fully without a running database.

let fallbackEwaste = [...SAMPLE_EWASTE.map((item, i) => ({
  id: `sample-ewaste-${i + 1}`,
  ...item,
}))];

let fallbackProducts = [...SAMPLE_PRODUCTS.map((prod, i) => ({
  id: `sample-product-${i + 101}`,
  ...prod,
}))];

// ────────────────── E-waste operations ──────────────────

export async function readEwaste() {
  const collections = await getCollections();

  if (!collections) {
    // Fallback: return in-memory data
    return [...fallbackEwaste].reverse();
  }

  const { ewasteCollection } = collections;
  const count = await ewasteCollection.countDocuments();
  if (count === 0) {
    const docs = SAMPLE_EWASTE.map((item, index) => ({
      _id: `sample-ewaste-${index + 1}`,
      ...item
    }));
    await ewasteCollection.insertMany(docs);
  }
  const items = await ewasteCollection.find({}).toArray();
  return items.map(item => ({
    id: item._id,
    name: item.name,
    category: item.category,
    condition: item.condition,
    description: item.description,
    address: item.address,
    status: item.status,
    date: item.date
  })).reverse();
}

export async function addEwaste(item) {
  const collections = await getCollections();

  if (!collections) {
    // Fallback: add to in-memory store
    fallbackEwaste.push(item);
    return;
  }

  const { ewasteCollection } = collections;
  await ewasteCollection.insertOne({
    _id: item.id.toString(),
    name: item.name,
    category: item.category,
    condition: item.condition,
    description: item.description,
    address: item.address,
    status: item.status,
    date: item.date
  });
}

// ────────────────── Product operations ──────────────────

export async function readProducts() {
  const collections = await getCollections();

  if (!collections) {
    // Fallback: return in-memory data
    return [...fallbackProducts].reverse();
  }

  const { productsCollection } = collections;
  const count = await productsCollection.countDocuments();
  if (count === 0) {
    const docs = SAMPLE_PRODUCTS.map((prod, index) => ({
      _id: `sample-product-${index + 101}`,
      ...prod
    }));
    await productsCollection.insertMany(docs);
  }
  const products = await productsCollection.find({}).toArray();
  return products.map(prod => ({
    id: prod._id,
    name: prod.name,
    category: prod.category,
    price: prod.price,
    condition: prod.condition,
    description: prod.description,
    quantity: prod.quantity,
    date: prod.date
  })).reverse();
}

export async function addProduct(product) {
  const collections = await getCollections();

  if (!collections) {
    // Fallback: add to in-memory store
    fallbackProducts.push(product);
    return;
  }

  const { productsCollection } = collections;
  await productsCollection.insertOne({
    _id: product.id.toString(),
    name: product.name,
    category: product.category,
    price: product.price,
    condition: product.condition,
    description: product.description,
    quantity: product.quantity,
    date: product.date
  });
}
