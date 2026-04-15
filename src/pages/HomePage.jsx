import React, { useState, useEffect, useMemo } from 'react';
import BlogForm from '../components/BlogForm';
import BlogCard from '../components/BlogCard';
import SearchBar from '../components/SearchBar';
import { getPosts, savePost, deletePost } from '../utils/storage';
import { Shield, Layout, Ghost } from 'lucide-react';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load initial posts
  useEffect(() => {
    const loadedPosts = getPosts();
    setPosts(loadedPosts);
    setIsLoading(false);
  }, []);

  const handleAddPost = (newPost) => {
    if (savePost(newPost)) {
      setPosts([newPost, ...posts]);
    }
  };

  const handleDeletePost = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      if (deletePost(id)) {
        setPosts(posts.filter(p => p.id !== id));
      }
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-blue-500/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-16 space-y-4">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-bold tracking-widest uppercase mb-4 animate-bounce">
            <Shield className="h-4 w-4" />
            Security Guaranteed
          </div> */}
          <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
            Secure Blog Viewer
          </h1>
          <br></br>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A state-of-the-art blogging platform focused on input sanitization, safe rendering, and modern aesthetics.
          </p>
        </header>

        {/* Action Section */}
        <section className="mb-20">
          <BlogForm onAddPost={handleAddPost} />
        </section>

        {/* Content Section */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Layout className="h-8 w-8 text-blue-500" />
              Latest Feed
            </h2>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-64 bg-white/5 rounded-2xl" />
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {filteredPosts.map(post => (
                <BlogCard key={post.id} post={post} onDelete={handleDeletePost} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-dashed border-white/10 rounded-3xl">
              <Ghost className="h-16 w-16 text-gray-700 mb-4" />
              <h3 className="text-xl font-medium text-gray-500">No posts found</h3>
              <p className="text-gray-600">Start by creating your first secure blog post above.</p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-32 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
          <p>© 2026 Secure Blog Viewer. Built with advanced sanitization techniques.</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
