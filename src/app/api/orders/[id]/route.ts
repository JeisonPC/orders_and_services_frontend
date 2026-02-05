import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_BACK_URL || 'http://localhost:3001';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const res = await fetch(`${API_URL}/orders/${params.id}`, {
      method: 'DELETE',
      headers: {
        'Accept': '*/*',
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to delete order' },
        { status: res.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
