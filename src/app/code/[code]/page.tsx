'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink, TrendingUp, Calendar, Clock, Link2 } from 'lucide-react';
import type { Link } from '@/types';

interface PageProps {
  params: {
    code: string;
  };
}

export default function StatsPage({ params }: PageProps) {
  const { code } = params;
  const router = useRouter();
  const [link, setLink] = useState<Link | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const response = await fetch(`/api/links/${code}`);
        if (response.ok) {
          const data = await response.json();
          setLink(data);
        } else if (response.status === 404) {
          setError('Link not found');
        } else {
          setError('Failed to load link stats');
        }
      } catch (err) {
        setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLink();
  }, [code]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  const appUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://tiny-link-test.vercel.app';
  const shortUrl = `${appUrl}/${code}`;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading stats...</p>
        </div>
      </div>
    );
  }

  if (error || !link) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">{error || 'Link not found'}</p>
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Link2 className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Link Statistics</h1>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Short Code</label>
              <code className="inline-block px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-mono text-lg">
                {link.code}
              </code>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Short URL</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg font-mono">
                  {shortUrl}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(shortUrl)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Target URL</label>
              <a
                href={link.target_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 break-all"
              >
                {link.target_url}
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
              </a>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-primary-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Clicks</p>
                <p className="text-3xl font-bold text-gray-900">{link.clicks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-green-100 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Last Clicked</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {formatDate(link.last_clicked)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Created</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  {formatDate(link.created_at)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Test Link Button */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Your Link</h2>
          <a
            href={`/${link.code}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            Visit Short URL
          </a>
          <p className="mt-2 text-sm text-gray-500">
            This will redirect you to the target URL and increment the click count
          </p>
        </div>
      </div>
    </div>
  );
}
