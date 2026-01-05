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
                className="inline-flex items-center justify-center gap-3 mb-6 px-6 py-3 rounded-full backdrop-blur-xl bg-teal-800/30 border border-teal-600/40 text-emerald-300 shadow-2xl"
              >
                <ZapIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Now with Analytics</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                Short Links, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Big Impact</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-emerald-100 max-w-3xl mx-auto mb-10 backdrop-blur-sm"
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
        <div className="py-16 relative">
          <div className="absolute inset-0 backdrop-blur-md bg-white/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-white mb-4"
              >
                Powerful Features
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-emerald-100 max-w-2xl mx-auto backdrop-blur-sm"
              >
                Everything you need to manage your links effectively
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="backdrop-blur-xl bg-teal-800/20 border border-teal-600/30 p-8 rounded-3xl shadow-2xl group cursor-pointer transition-all duration-200 hover:shadow-emerald-500/30 hover:bg-teal-800/30"
              >
                <div className="w-16 h-16 backdrop-blur-sm bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-teal-600/30 rounded-2xl flex items-center justify-center mb-6 transition-all duration-200 group-hover:shadow-emerald-500/20">
                  <Link2Icon className="w-8 h-8 text-emerald-400 transition-colors duration-200 group-hover:text-emerald-300" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3 transition-colors duration-200 group-hover:text-emerald-100">Easy to Use</h3>
                <p className="text-emerald-100 transition-colors duration-200 group-hover:text-white">Create short links in seconds with our intuitive interface.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="backdrop-blur-xl bg-teal-800/20 border border-teal-600/30 p-8 rounded-3xl shadow-2xl group cursor-pointer transition-all duration-200 hover:shadow-teal-500/30 hover:bg-teal-800/30"
              >
                <div className="w-16 h-16 backdrop-blur-sm bg-gradient-to-br from-teal-500/20 to-green-500/20 border border-teal-600/30 rounded-2xl flex items-center justify-center mb-6 transition-all duration-200 group-hover:shadow-teal-500/20">
                  <BarChart2Icon className="w-8 h-8 text-teal-400 transition-colors duration-200 group-hover:text-teal-300" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3 transition-colors duration-200 group-hover:text-teal-100">Detailed Analytics</h3>
                <p className="text-emerald-100 transition-colors duration-200 group-hover:text-white">Track clicks, locations, and referrers for all your links.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="backdrop-blur-xl bg-teal-800/20 border border-teal-600/30 p-8 rounded-3xl shadow-2xl group cursor-pointer transition-all duration-200 hover:shadow-green-500/30 hover:bg-teal-800/30"
              >
                <div className="w-16 h-16 backdrop-blur-sm bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-teal-600/30 rounded-2xl flex items-center justify-center mb-6 transition-all duration-200 group-hover:shadow-green-500/20">
                  <MousePointerClickIcon className="w-8 h-8 text-green-400 transition-colors duration-200 group-hover:text-green-300" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3 transition-colors duration-200 group-hover:text-green-100">Link Clicks</h3>
                <p className="text-emerald-100 transition-colors duration-200 group-hover:text-white">Track clicks, locations, and referrers for all your links.</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Links Table Section */}
        <div className="py-16 relative">
          <div className="absolute inset-0 backdrop-blur-md bg-white/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-white">Your Links</h2>
                <p className="mt-1 text-sm text-emerald-200">
                  {links.length > 0 
                    ? `You have ${links.length} active ${links.length === 1 ? 'link' : 'links'}`
                    : 'Your shortened links will appear here'}
                </p>
              </div>
              
              {links.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onClick={() => {
                    const allLinks = links.map(link => 
                      `${getShortUrl(link.code)} -> ${link.target_url}`
                    ).join('\n');
                    copyToClipboard(allLinks);
                  }}
                  className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 backdrop-blur-xl bg-teal-800/30 border border-teal-600/40 text-sm font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-emerald-300 hover:bg-teal-800/40"
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
                </motion.button>
              )}
            </motion.div>

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

        {/* Amazing Footer */}
        <footer className="relative border-t border-teal-600/30 overflow-hidden">
          <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-br from-teal-900/50 via-green-900/30 to-emerald-900/50"></div>
          <div className="absolute inset-0 backdrop-blur-sm bg-teal-800/20"></div>
          
          {/* Sea green animated footer elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-600/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-teal-600/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-green-600/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 backdrop-blur-xl bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Link2Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">TinyLink</span>
                </div>
                <p className="text-emerald-200 text-sm leading-relaxed">
                  Create short, memorable links with powerful analytics and beautiful design.
                </p>
                <div className="flex space-x-3">
                  <div className="w-8 h-8 backdrop-blur-sm bg-teal-700/40 border border-teal-600/30 rounded-lg flex items-center justify-center hover:bg-teal-700/60 transition-colors cursor-pointer">
                    <span className="text-xs">📧</span>
                  </div>
                  <div className="w-8 h-8 backdrop-blur-sm bg-teal-700/40 border border-teal-600/30 rounded-lg flex items-center justify-center hover:bg-teal-700/60 transition-colors cursor-pointer">
                    <span className="text-xs">🐦</span>
                  </div>
                  <div className="w-8 h-8 backdrop-blur-sm bg-teal-700/40 border border-teal-600/30 rounded-lg flex items-center justify-center hover:bg-teal-700/60 transition-colors cursor-pointer">
                    <span className="text-xs">💼</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-white">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-emerald-200 hover:text-emerald-300 transition-colors text-sm">Features</a></li>
                  <li><a href="#" className="text-emerald-200 hover:text-emerald-300 transition-colors text-sm">Analytics</a></li>
                  <li><a href="#" className="text-emerald-200 hover:text-emerald-300 transition-colors text-sm">API</a></li>
                  <li><a href="#" className="text-emerald-200 hover:text-emerald-300 transition-colors text-sm">Pricing</a></li>
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-white">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-emerald-200 hover:text-emerald-300 transition-colors text-sm">About</a></li>
                  <li><a href="#" className="text-emerald-200 hover:text-emerald-300 transition-colors text-sm">Blog</a></li>
                  <li><a href="#" className="text-emerald-200 hover:text-emerald-300 transition-colors text-sm">Careers</a></li>
                  <li><a href="#" className="text-emerald-200 hover:text-emerald-300 transition-colors text-sm">Contact</a></li>
                </ul>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-white">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-emerald-200 hover:text-emerald-300 transition-colors text-sm">Help Center</a></li>
                  <li><a href="#" className="text-emerald-200 hover:text-emerald-300 transition-colors text-sm">Documentation</a></li>
                  <li><a href="#" className="text-emerald-200 hover:text-emerald-300 transition-colors text-sm">Status</a></li>
                  <li><a href="#" className="text-emerald-200 hover:text-emerald-300 transition-colors text-sm">Terms</a></li>
                </ul>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="border-t border-teal-600/30 pt-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-emerald-200 text-sm">
                  &copy; {new Date().getFullYear()} TinyLink. All rights reserved.
                </p>
                <div className="flex items-center space-x-6 mt-4 md:mt-0">
                  <a href="#" className="text-emerald-200 hover:text-emerald-300 transition-colors text-sm">Privacy Policy</a>
                  <a href="#" className="text-emerald-200 hover:text-emerald-300 transition-colors text-sm">Terms of Service</a>
                  <a href="#" className="text-emerald-200 hover:text-emerald-300 transition-colors text-sm">Cookie Policy</a>
                </div>
              </div>
            </motion.div>
          </div>
        </footer>
      </div>
    </AnimatePresence>
  );
}
