import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';
import { sanitizeInput, validateBlogInput } from '../utils/sanitizer';

const BlogForm = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Validate Input
    const validationError = validateBlogInput(title, content);
    if (validationError) {
      setError(validationError);
      return;
    }

    // 2. Clear previous errors
    setError(null);

    // 3. Sanitize Input (Pre-storage)
    const sanitizedTitle = sanitizeInput(title);
    const sanitizedContent = sanitizeInput(content);

    // 4. Submit
    onAddPost({
      id: crypto.randomUUID(),
      title: sanitizedTitle,
      content: sanitizedContent,
      timestamp: Date.now(),
    });

    // 5. Reset
    setTitle('');
    setContent('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12 p-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl">
      <form onSubmit={handleSubmit} className="p-6 bg-gray-900/40 rounded-[22px] space-y-4">
        <h2 className="text-xl font-bold text-white mb-2">Create New Post</h2>
        
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="h-5 w-5" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 ml-1">Title</label>
          <input
            type="text"
            placeholder="Enter a secure title..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500/40 outline-none transition-all"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400 ml-1">Content</label>
          <textarea
            placeholder="Share your thoughts securely..."
            rows={5}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-blue-500/40 outline-none transition-all resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-lg shadow-blue-500/20"
        >
          <Send className="h-5 w-5" />
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
