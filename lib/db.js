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
    name: 'Raspberry Pi 4 Model B (4GB)',
    category: 'PCBs & Boards',
    price: 2800,
    condition: 'Good',
    description: 'Used for a home server project. Runs perfectly. Minor scuff on case. Includes power supply.',
    quantity: 1,
    date: '2026-06-12',
  },
  {
    name: '100μF Electrolytic Capacitors (50-pack)',
    category: 'Capacitors',
    price: 120,
    condition: 'Excellent',
    description: 'Brand new surplus stock. 25V rated. Through-hole mount. Great for audio circuits and power filtering.',
    quantity: 50,
    date: '2026-06-14',
  },
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
    name: 'ESP32 Development Board',
    category: 'ICs & Microcontrollers',
    price: 350,
    condition: 'Good',
    description: 'Dual-core WiFi + Bluetooth MCU. Used in IoT project. All GPIOs functional. Flash memory intact.',
    quantity: 2,
    date: '2026-06-17',
  },
  {
    name: 'HC-SR04 Ultrasonic Sensor',
    category: 'Sensors',
    price: 60,
    condition: 'Excellent',
    description: 'Measuring range: 2cm-400cm. Accuracy: 3mm. Gently used in robotics project. Like new condition.',
    quantity: 5,
    date: '2026-06-18',
  },
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
    name: '5V 3A USB-C Power Supply',
    category: 'Power Supplies',
    price: 220,
    condition: 'Fair',
    description: 'Official Raspberry Pi power supply. Cable has minor wear but connector is solid. Stable output verified.',
    quantity: 1,
    date: '2026-06-20',
  },
];

async function getCollections() {
  const client = await clientPromise;
  const db = client.db('ebridge');
  return {
    ewasteCollection: db.collection('ewaste'),
    productsCollection: db.collection('products'),
  };
}

export async function readEwaste() {
  const { ewasteCollection } = await getCollections();
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
  const { ewasteCollection } = await getCollections();
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

export async function readProducts() {
  const { productsCollection } = await getCollections();
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
  const { productsCollection } = await getCollections();
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
