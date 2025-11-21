'use client';

import { useState } from 'react';
import { Copy, Trash2, ExternalLink, TrendingUp, Check, Loader2 } from 'lucide-react';
import type { Link } from '@/types';

interface LinksTableProps {
  links: Link[];
  onLinkDeleted: () => void;
}

export default function LinksTable({ links, onLinkDeleted }: LinksTableProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [deletingCode, setDeletingCode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const appUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_APP_URL || 'https://tiny-link-test.vercel.app';

  const filteredLinks = links.filter(
    (link) =>
      link.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.target_url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = async (code: string) => {
    const shortUrl = `${appUrl}/${code}`;
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const deleteLink = async (code: string) => {
    if (!confirm('Are you sure you want to delete this link?')) {
      return;
    }

    setDeletingCode(code);
    try {
      const response = await fetch(`/api/links/${code}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onLinkDeleted();
      } else {
        alert('Failed to delete link');
      }
    } catch (err) {
      alert('An error occurred');
    } finally {
      setDeletingCode(null);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  const truncateUrl = (url: string, maxLength: number = 50) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Links</h2>
        <input
          type="text"
          placeholder="Search by code or URL..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      {filteredLinks.length === 0 ? (
        <div className="p-12 text-center text-gray-500">
          {searchTerm ? 'No links match your search' : 'No links yet. Create your first one!'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Short Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Target URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clicks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Clicked
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLinks.map((link) => (
                <tr key={link.code} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <code className="px-2 py-1 bg-primary-50 text-primary-700 rounded font-mono text-sm">
                        {link.code}
                      </code>
                      <button
                        onClick={() => copyToClipboard(link.code)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Copy short URL"
                      >
                        {copiedCode === link.code ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={link.target_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-800 flex items-center gap-1 group"
                      title={link.target_url}
                    >
                      <span className="truncate max-w-md">{truncateUrl(link.target_url)}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-gray-900">
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{link.clicks}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(link.last_clicked)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <a
                        href={`/code/${link.code}`}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded transition-colors"
                        title="View stats"
                      >
                        <TrendingUp className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => deleteLink(link.code)}
                        disabled={deletingCode === link.code}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                        title="Delete link"
                      >
                        {deletingCode === link.code ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
