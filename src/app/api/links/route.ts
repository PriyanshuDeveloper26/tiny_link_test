import { NextRequest, NextResponse } from 'next/server';
import { getLinksCollection } from '@/lib/db';
import { isValidUrl, isValidCode, generateRandomCode } from '@/lib/validation';
import type { CreateLinkRequest, Link } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: CreateLinkRequest = await request.json();
    const { target_url, code } = body;

    // Validate target URL
    if (!target_url || !isValidUrl(target_url)) {
      return NextResponse.json(
        { error: 'Invalid URL', message: 'Please provide a valid HTTP or HTTPS URL' },
        { status: 400 }
      );
    }

    // Generate or validate custom code
    let shortCode = code;
    if (shortCode) {
      // Validate custom code format
      if (!isValidCode(shortCode)) {
        return NextResponse.json(
          { error: 'Invalid code', message: 'Code must be 6-8 alphanumeric characters' },
          { status: 400 }
        );
      }

      // Check if code already exists
      const collection = await getLinksCollection();
      const existingLink = await collection.findOne({ code: shortCode });
      if (existingLink) {
        return NextResponse.json(
          { error: 'Code already exists', message: 'This short code is already in use' },
          { status: 409 }
        );
      }
    } else {
      // Generate unique random code
      let attempts = 0;
      const maxAttempts = 10;
      const collection = await getLinksCollection();
      
      while (attempts < maxAttempts) {
        shortCode = generateRandomCode();
        const existingLink = await collection.findOne({ code: shortCode });
        if (!existingLink) {
          break;
        }
        attempts++;
      }

      if (attempts === maxAttempts) {
        return NextResponse.json(
          { error: 'Failed to generate unique code', message: 'Please try again' },
          { status: 500 }
        );
      }
    }

    // Insert new link
    const collection = await getLinksCollection();
    await collection.insertOne({
      code: shortCode,
      target_url,
      clicks: 0,
      last_clicked: null,
      created_at: new Date(),
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tiny-link-test.vercel.app';
    
    return NextResponse.json(
      {
        code: shortCode,
        target_url,
        short_url: `${appUrl}/${shortCode}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating link:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to create link' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const collection = await getLinksCollection();
    const findResult = await collection.find({});
    const sortedResult = findResult.sort({ created_at: -1 });
    const links = await sortedResult.toArray();

    // Transform documents to match Link interface
    const formattedLinks: Link[] = links.map((doc: any) => ({
      id: doc._id?.toString() || Date.now().toString(),
      code: doc.code,
      target_url: doc.target_url,
      clicks: doc.clicks || 0,
      last_clicked: doc.last_clicked || null,
      created_at: doc.created_at?.toISOString?.() || new Date().toISOString(),
    }));

    return NextResponse.json(formattedLinks, { status: 200 });
  } catch (error) {
    console.error('Error fetching links:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: 'Failed to fetch links' },
      { status: 500 }
    );
  }
}
