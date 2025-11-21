'use client';

import { useState, useEffect } from 'react';
import { 
  Link2 as Link2Icon,
  Zap as ZapIcon,
  BarChart2 as BarChart2Icon,
  Copy as CopyIcon,
  Check as CheckIcon,
  MousePointerClick as MousePointerClickIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CreateLinkForm from '@/components/CreateLinkForm';
import LinksTable from '@/components/LinksTable';
import type { Link } from '@/types';

// Helper function to get the full short URL
const getShortUrl = (code: string) => {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}/${code}`;
};

export default function HomePage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center gap-3 mb-6 px-6 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300"
              >
                <ZapIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Now with Analytics</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
              >
                Short Links, <span className="text-indigo-600 dark:text-indigo-400">Big Impact</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10"
              >
                Create short, memorable links and track their performance with our powerful analytics dashboard.
              </motion.p>

              {/* Create Link Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="max-w-3xl mx-auto"
              >
                <CreateLinkForm onLinkCreated={fetchLinks} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-white dark:bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Powerful Features</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Everything you need to manage your links effectively</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Link2Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Easy to Use</h3>
                <p className="text-gray-600 dark:text-gray-300">Create short links in seconds with our intuitive interface.</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                  <BarChart2Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Detailed Analytics</h3>
                <p className="text-gray-600 dark:text-gray-300">Track clicks, locations, and referrers for all your links.</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                  <MousePointerClickIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Link clicks</h3>
                <p className="text-gray-600 dark:text-gray-300">Track clicks, locations, and referrers for all your links.</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Links Table Section */}
        <div className="py-16 bg-gray-50 dark:bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Links</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {links.length > 0 
                    ? `You have ${links.length} active ${links.length === 1 ? 'link' : 'links'}`
                    : 'Your shortened links will appear here'}
                </p>
              </div>
              
              {links.length > 0 && (
                <button
                  onClick={() => {
                    const allLinks = links.map(link => 
                      `${getShortUrl(link.code)} -> ${link.target_url}`
                    ).join('\n');
                    copyToClipboard(allLinks);
                  }}
                  className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  {copied === 'all' ? (
                    <>
                      <CheckIcon className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <CopyIcon className="w-4 h-4 mr-2" />
                      Copy All Links
                    </>
                  )}
                </button>
              )}
            </div>

            {loading ? (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your links...</p>
              </div>
            ) : links.length > 0 ? (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
                <LinksTable links={links} onLinkDeleted={fetchLinks} />
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-12 text-center"
              >
                <Link2Icon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No links yet</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Create your first shortened link above</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2">
                <Link2Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">TinyLink</span>
              </div>
              <p className="mt-4 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} TinyLink. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </AnimatePresence>
  );
}
