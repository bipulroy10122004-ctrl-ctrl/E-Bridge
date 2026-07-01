import { NextResponse } from 'next/server';
import { readProducts, addProduct } from '@/lib/db';

export async function GET() {
  try {
    const data = await readProducts();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading products:', error);
    return NextResponse.json({ error: 'Failed to read products data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, category, price, condition, description, quantity } = body;

    if (!name || !category || price === undefined || !condition) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newProduct = {
      id: Date.now().toString(),
      name,
      category,
      price: parseFloat(price),
      condition,
      description: description || '',
      quantity: quantity ? parseInt(quantity, 10) : 1,
      date: new Date().toISOString().split('T')[0],
    };

    await addProduct(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error saving product:', error);
    return NextResponse.json({ error: 'Failed to save product listing' }, { status: 500 });
  }
}

