import { NextResponse } from 'next/server';
import { readEwaste, addEwaste } from '@/lib/db';

export async function GET() {
  try {
    const data = await readEwaste();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading e-waste:', error);
    return NextResponse.json({ error: 'Failed to read e-waste data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, category, condition, description, address } = body;
    
    if (!name || !category || !condition) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newItem = {
      id: Date.now().toString(),
      name,
      category,
      condition,
      description: description || '',
      address: address || '',
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };

    await addEwaste(newItem);

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error saving e-waste:', error);
    return NextResponse.json({ error: 'Failed to save e-waste listing' }, { status: 500 });
  }
}

