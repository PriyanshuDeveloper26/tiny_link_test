import { NextRequest, NextResponse } from 'next/server';
import { getLinksCollection } from '@/lib/db';
import type { Link } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;

    const collection = await getLinksCollection();
    const doc = await collection.findOne({ code });

    if (!doc) {
      return NextResponse.json(
        { error: 'Not found', message: 'Link not found' },
        { status: 404 }
      );
    }

    const link: Link = {
      id: doc._id.toString(),
      code: doc.code,
      target_url: doc.target_url,
      clicks: doc.clicks || 0,
      last_clicked: doc.last_clicked ? doc.last_clicked.toISOString() : null,
      created_at: doc.created_at.toISOString(),
    };

    return NextResponse.json(link, { status: 200 });
  } catch (error) {
    console.error('Error fetching link:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to fetch link' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;

    const collection = await getLinksCollection();
    const result = await collection.deleteOne({ code });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Not found', message: 'Link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Link deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting link:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to delete link' },
      { status: 500 }
    );
  }
}
