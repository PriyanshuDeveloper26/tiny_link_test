'use client';

import { useState } from 'react';
import { Link2, Loader2 } from 'lucide-react';

interface CreateLinkFormProps {
  onLinkCreated: () => void;
}

export default function CreateLinkForm({ onLinkCreated }: CreateLinkFormProps) {
  const [targetUrl, setTargetUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          target_url: targetUrl,
          code: customCode || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to create link');
        return;
      }

      setSuccess(`Link created: ${data.short_url}`);
      setTargetUrl('');
      setCustomCode('');
      onLinkCreated();
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Link2 className="w-5 h-5 text-primary-600" />
        <h2 className="text-xl font-semibold text-gray-900">Create Short Link</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="targetUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Target URL *
          </label>
          <input
            type="url"
            id="targetUrl"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://example.com/very/long/url"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label htmlFor="customCode" className="block text-sm font-medium text-gray-700 mb-1">
            Custom Code (optional)
          </label>
          <input
            type="text"
            id="customCode"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            placeholder="mycode (6-8 alphanumeric characters)"
            pattern="[A-Za-z0-9]{6,8}"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          />
          <p className="mt-1 text-xs text-gray-500">
            Leave empty to generate a random code
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Creating...
            </>
          ) : (
            'Create Short Link'
          )}
        </button>
      </form>
    </div>
  );
}
