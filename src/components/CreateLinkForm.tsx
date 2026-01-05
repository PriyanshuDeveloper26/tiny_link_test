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
    <div className="backdrop-blur-xl bg-teal-800/20 border border-teal-600/30 rounded-2xl shadow-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Link2 className="w-5 h-5 text-emerald-400" />
        <h2 className="text-xl font-semibold text-white">Create Short Link</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="targetUrl" className="block text-sm font-medium text-emerald-100 mb-1">
            Target URL *
          </label>
          <input
            type="url"
            id="targetUrl"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://example.com/very/long/url"
            required
            className="w-full px-4 py-2 backdrop-blur-sm bg-teal-700/30 border border-teal-600/30 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder-emerald-300 text-white"
          />
        </div>

        <div>
          <label htmlFor="customCode" className="block text-sm font-medium text-emerald-100 mb-1">
            Custom Code (optional)
          </label>
          <input
            type="text"
            id="customCode"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            placeholder="mycode (6-8 alphanumeric characters)"
            pattern="[A-Za-z0-9]{6,8}"
            className="w-full px-4 py-2 backdrop-blur-sm bg-teal-700/30 border border-teal-600/30 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all placeholder-emerald-300 text-white"
          />
          <p className="mt-1 text-xs text-emerald-300">
            Leave empty to generate a random code
          </p>
        </div>

        {error && (
          <div className="p-3 backdrop-blur-sm bg-red-500/20 border border-red-400/30 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 backdrop-blur-sm bg-green-500/20 border border-green-400/30 rounded-lg text-green-300 text-sm">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-3 backdrop-blur-sm bg-emerald-600/80 text-white font-medium rounded-lg hover:bg-emerald-700/80 focus:ring-4 focus:ring-emerald-200/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 border border-teal-600/30"
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
