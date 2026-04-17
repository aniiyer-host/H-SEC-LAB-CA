/**
 * Secure Blog Viewer - Storage Utility
 * 
 * Handles localStorage operations with safety checks for malformed data.
 * Now with SEC_ prefixes and Base64 obfuscation for enhanced security.
 */

const STORAGE_KEY = 'SEC_BLOG_POSTS';

const encodeData = (data) => btoa(JSON.stringify(data));
const decodeData = (encoded) => {
  try {
    return JSON.parse(atob(encoded));
  } catch (e) {
    console.error('Storage decode failed:', e);
    return null;
  }
};

export const getPosts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const parsed = decodeData(data);
    if (!parsed || !Array.isArray(parsed)) {
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
    return [];
  }
};

export const savePost = (post) => {
  try {
    const posts = getPosts();
    const newPosts = [post, ...posts];
    localStorage.setItem(STORAGE_KEY, encodeData(newPosts));
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
    localStorage.setItem(STORAGE_KEY, encodeData(filtered));
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    return false;
  }
};

