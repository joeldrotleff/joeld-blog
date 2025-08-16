import { Signal, useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { Article } from "../utils/kv.ts";

interface BlogLayoutProps {
  posts: Article[];
  selectedPost: Article;
  selectedPostId: Signal<string>;
}

export default function BlogLayout({ posts, selectedPost: initialPost, selectedPostId }: BlogLayoutProps) {
  const selectedPost = posts.find(p => p.id === selectedPostId.value) || posts[0] || initialPost;
  
  const readingProgress = useSignal(0);
  const isDarkMode = useSignal(true);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const mainElement = e.target as HTMLElement;
      const scrollTop = mainElement.scrollTop;
      const scrollHeight = mainElement.scrollHeight - mainElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      readingProgress.value = Math.min(100, Math.max(0, progress));
    };

    const timer = setTimeout(() => {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.addEventListener('scroll', handleScroll);
        handleScroll({ target: mainElement } as any);
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [selectedPostId.value]);

  useEffect(() => {
    readingProgress.value = 0;
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTop = 0;
    }
  }, [selectedPostId.value]);

  return (
    <div 
      class="min-h-screen flex relative transition-all duration-500 ease-in-out"
      style={{ 
        fontFamily: "'IBM Plex Mono', monospace",
        backgroundColor: isDarkMode.value ? '#111827' : '#ffffff',
        color: isDarkMode.value ? '#e5e7eb' : '#111827'
      }}
    >
      
      {/* Sidebar */}
      <aside 
        class="w-80 p-6 overflow-y-auto transition-all duration-500 ease-in-out"
        style={{
          background: isDarkMode.value 
            ? 'linear-gradient(to bottom, #1f2937, #111827)' 
            : 'linear-gradient(to bottom, #f9fafb, #f3f4f6)',
          borderRightColor: isDarkMode.value ? '#374151' : '#d1d5db',
          borderRightWidth: '1px',
          borderRightStyle: 'solid'
        }}
      >
        <h1 class="text-2xl font-bold mb-8" style={{ color: isDarkMode.value ? '#f3f4f6' : '#1f2937' }}>Joel Drotleff</h1>
        
        {/* Theme Toggle */}
        <div class={`mb-8 pb-8 ${isDarkMode.value ? 'border-b border-gray-700' : 'border-b border-gray-300'}`}>
          <button
            onClick={() => isDarkMode.value = !isDarkMode.value}
            class={`w-full px-4 py-2 rounded-lg flex items-center justify-between transition-colors border ${
              isDarkMode.value 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200 border-gray-700' 
                : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
            }`}
          >
            <span class="flex items-center gap-2">
              <div class="w-5 h-5 relative">
                <svg 
                  class="w-5 h-5 absolute inset-0 transition-opacity duration-500" 
                  style={{ opacity: isDarkMode.value ? 1 : 0 }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                <svg 
                  class="w-5 h-5 absolute inset-0 transition-opacity duration-500" 
                  style={{ opacity: isDarkMode.value ? 0 : 1 }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span>{isDarkMode.value ? 'Dark Mode' : 'Light Mode'}</span>
            </span>
            <div class={`w-12 h-6 rounded-full p-1 transition-colors duration-500 ${isDarkMode.value ? 'bg-blue-600' : 'bg-gray-300'}`}>
              <div class={`w-4 h-4 bg-white rounded-full transition-transform duration-500 ${isDarkMode.value ? 'translate-x-6' : ''}`} />
            </div>
          </button>
        </div>

        {/* Posts List */}
        <nav>
          <h2 class="text-sm uppercase tracking-wider mb-4 font-bold" style={{ color: isDarkMode.value ? '#9ca3af' : '#4b5563' }}>Posts</h2>
          <div class="space-y-1">
            {posts.map(post => (
              <button
                key={post.id}
                class="w-full text-left px-3 py-2 rounded-lg transition-all duration-200"
                style={{
                  backgroundColor: selectedPostId.value === post.id 
                    ? '#3b82f6'
                    : 'transparent',
                  color: selectedPostId.value === post.id 
                    ? '#ffffff'
                    : isDarkMode.value ? '#d1d5db' : '#374151'
                }}
                onClick={() => {
                  selectedPostId.value = post.id;
                }}
                onMouseEnter={(e) => {
                  if (selectedPostId.value !== post.id) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = isDarkMode.value ? '#374151' : '#e5e7eb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPostId.value !== post.id) {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div class="text-sm font-medium">{post.title}</div>
                <div class="text-xs opacity-70 mt-1">{post.date}</div>
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main class="flex-1 overflow-y-auto max-h-screen relative">
        {/* Sticky Article Header */}
        <header 
          class="sticky top-0 z-10 w-full transition-all duration-500 ease-in-out"
          style={{
            backgroundColor: isDarkMode.value ? '#111827' : '#ffffff',
            borderBottomColor: isDarkMode.value ? '#1f2937' : '#e5e7eb',
            borderBottomWidth: '1px',
            borderBottomStyle: 'solid'
          }}
        >
          <div class="max-w-3xl mx-auto px-8 py-6">
            <h1 class="text-3xl font-bold mb-2" style={{ color: isDarkMode.value ? '#f3f4f6' : '#111827' }}>{selectedPost.title}</h1>
            <div class="flex items-center gap-3 text-sm" style={{ color: isDarkMode.value ? '#9ca3af' : '#4b5563' }}>
              <time>{selectedPost.date}</time>
              <span>·</span>
              <div class="relative flex items-center">
                {/* Reading time - visible at 0%, fades out */}
                <span 
                  class="transition-opacity duration-500 ease-out"
                  style={{ 
                    opacity: readingProgress.value === 0 ? 1 : 0,
                    position: readingProgress.value === 0 ? 'relative' : 'absolute'
                  }}
                >
                  {selectedPost.readingTime}
                </span>
                
                {/* Progress indicator - fades in after 0% */}
                <div 
                  class="flex items-center gap-2 transition-opacity duration-500 ease-out"
                  style={{ 
                    opacity: readingProgress.value > 0 ? 1 : 0,
                    position: readingProgress.value > 0 ? 'relative' : 'absolute'
                  }}
                >
                  <div class="w-24">
                    <div 
                      class="h-1.5 rounded-full overflow-hidden"
                      style={{ backgroundColor: isDarkMode.value ? '#374151' : '#d1d5db' }}
                    >
                      <div 
                        class="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300 ease-out"
                        style={{ width: `${readingProgress.value}%` }}
                      />
                    </div>
                  </div>
                  <span class="text-xs min-w-[3ch]">{Math.round(readingProgress.value)}%</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <article class="max-w-3xl mx-auto p-8">
          <div 
            class={`prose prose-lg max-w-none ${isDarkMode.value ? 'prose-invert' : ''}`}
            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          />
        </article>
      </main>
    </div>
  );
}