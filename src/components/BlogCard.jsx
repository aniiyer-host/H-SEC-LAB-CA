import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

const BlogCard = ({ post, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (timestamp) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp));
  };

  // Safe Rendering Technique:
  // React's standard children interpolation handles escaping by default.
  // We do NOT use dangerouslySetInnerHTML here.

  return (
    <div className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 text-xs font-medium text-blue-400 uppercase tracking-wider">
            <Calendar className="h-3 w-3" />
            {formatDate(post.timestamp)}
          </div>
          <button 
            onClick={() => onDelete(post.id)}
            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>

        <div className="relative">
          <p className={`text-gray-300 leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
            {post.content}
          </p>
          
          {post.content.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 flex items-center gap-1 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              {isExpanded ? (
                <>Show less <ChevronUp className="h-4 w-4" /></>
              ) : (
                <>Read full post <ChevronDown className="h-4 w-4" /></>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 w-0 group-hover:w-full transition-all duration-500" />
    </div>
  );
};

export default BlogCard;
