import { redirect } from 'next/navigation';
import { getLinksCollection } from '@/lib/db';

interface PageProps {
  params: {
    code: string;
  };
}

export default async function RedirectPage({ params }: PageProps) {
  const { code } = params;

  try {
    // Fetch the link
    const collection = await getLinksCollection();
    const link = await collection.findOne({ code });

    if (!link) {
      // Return 404 page
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Link not found</p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      );
    }

    const targetUrl = link.target_url;

    // Update click count and last_clicked timestamp
    await collection.updateOne(
      { code },
      {
        $inc: { clicks: 1 },
        $set: { last_clicked: new Date() },
      }
    );

    // Perform redirect (this throws a special Next.js error which is expected)
    redirect(targetUrl);
  } catch (error) {
    // Check if this is a Next.js redirect (which is expected behavior)
    if (error && typeof error === 'object' && 'digest' in error) {
      // This is a Next.js redirect, re-throw it
      throw error;
    }
    
    // Only catch actual errors
    console.error('Error in redirect:', error);
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">Error</h1>
          <p className="text-xl text-gray-600 mb-8">Something went wrong</p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }
}
