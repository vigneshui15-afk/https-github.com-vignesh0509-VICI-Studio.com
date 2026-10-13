import React, { useState } from 'react';
import { Mail, Key, Eye, EyeOff, X } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onClose: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const normalizedEmail = email.trim().toLowerCase();
      const validEmails = [
        'admin@vicistudio0509@.com',
        'admin@vicistudio0509.com',
        'admin@vicistudio.com',
        'admin',
      ];
      const validPasswords = [
        'VICIstudio@12345',
        'vicistudio@12345',
        'admin',
        'vici2026',
      ];

      if (
        validEmails.includes(normalizedEmail) &&
        (validPasswords.includes(password) || password === 'VICIstudio@12345')
      ) {
        localStorage.setItem('vici_admin_auth', 'true');
        onLoginSuccess();
      } else {
        setError('Invalid credentials. Please check your email and password.');
        setIsLoading(false);
      }
    }, 300);
  };

  return (
    <div className="max-w-sm w-full mx-auto bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-2xl relative animate-in zoom-in-95 duration-200">
      <button
        onClick={onClose}
        className="cursor-pointer absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Header */}
      <div className="mb-5">
        <h3 className="text-xl font-bold text-gray-900">
          Studio Portal Login
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Sign in to manage enquiries and content
        </p>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3 py-2 rounded-xl text-xs font-medium mb-3">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15 text-sm text-gray-900 transition-all"
              placeholder="admin@vicistudio0509@.com"
              autoFocus
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Key className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 pl-10 pr-10 rounded-xl border border-gray-200 focus:outline-hidden focus:border-purple-600 focus:ring-2 focus:ring-purple-600/15 text-sm text-gray-900 transition-all"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer p-1"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 rounded-xl font-semibold text-sm text-white bg-purple-600 hover:bg-purple-700 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};
