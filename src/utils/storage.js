/**
 * Secure Blog Viewer - Storage Utility
 * 
 * Handles localStorage operations with safety checks for malformed data.
 */

const STORAGE_KEY = 'secure_blog_posts';

export const getPosts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const parsed = JSON.parse(data);
    
    // Safety check: ensure the parsed data is an array
    if (!Array.isArray(parsed)) {
      console.error("Storage data corrupted: not an array");
      return [];
    }

    // Validate each item in the array to ensure integrity
    return parsed.filter(item => (
      item &&
      typeof item.id === 'string' &&
      typeof item.title === 'string' &&
      typeof item.content === 'string' &&
      typeof item.timestamp === 'number'
    ));
  } catch (error) {
    console.error("Error loading posts from localStorage:", error);
    // In case of corruption, we return an empty array to prevent app crash
    return [];
  }
};

export const savePost = (post) => {
  try {
    const posts = getPosts();
    const newPosts = [post, ...posts];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
    return true;
  } catch (error) {
    console.error("Error saving post to localStorage:", error);
    return false;
  }
};

export const deletePost = (id) => {
  try {
    const posts = getPosts();
    const filtered = posts.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    return false;
  }
};
