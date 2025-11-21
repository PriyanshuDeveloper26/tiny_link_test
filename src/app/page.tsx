'use client';

import { useState, useEffect } from 'react';
import { Link2 } from 'lucide-react';
import CreateLinkForm from '@/components/CreateLinkForm';
import LinksTable from '@/components/LinksTable';
import type { Link } from '@/types';

export default function HomePage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = async () => {
    try {
      const response = await fetch('/api/links');
      if (response.ok) {
        const data = await response.json();
        setLinks(data);
      }
    } catch (error) {
      console.error('Error fetching links:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Link2 className="w-10 h-10 text-primary-600" />
            <h1 className="text-4xl font-bold text-gray-900">TinyLink</h1>
          </div>
          <p className="text-lg text-gray-600">
            Shorten your URLs and track their performance
          </p>
        </div>

        {/* Create Link Form */}
        <div className="mb-8">
          <CreateLinkForm onLinkCreated={fetchLinks} />
        </div>

        {/* Links Table */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading links...</p>
          </div>
        ) : (
          <LinksTable links={links} onLinkDeleted={fetchLinks} />
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>TinyLink v1.0 - A simple URL shortener</p>
        </div>
      </div>
    </div>
  );
}
