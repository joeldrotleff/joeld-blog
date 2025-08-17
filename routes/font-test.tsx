import FontPicker from "../islands/FontPicker.tsx";

export default function FontTest() {
  return (
    <>
      <div class="min-h-screen bg-gray-950 text-gray-100">
        <div class="max-w-4xl mx-auto p-8">
          <h1 class="text-4xl font-bold mb-8">Font Testing Page</h1>
          
          <article class="prose prose-lg prose-invert max-w-none">
            <h2>Sample Article Title</h2>
            <p class="lead">
              This is a lead paragraph with slightly larger text to introduce the article.
              It helps set the tone and gives readers a preview of what's to come.
            </p>
            
            <p>
              Regular paragraph text. The quick brown fox jumps over the lazy dog. 
              This classic pangram contains every letter of the alphabet, making it 
              perfect for testing how a font displays different characters.
            </p>
            
            <h3>A Smaller Heading</h3>
            <p>
              Here's another paragraph with some <strong>bold text</strong> and some{" "}
              <em>italic text</em> to see how the font handles different weights and styles.
              You can also see how <a href="#">links appear</a> in the chosen font.
            </p>
            
            <blockquote>
              "This is a blockquote to test how quoted text appears. It's important 
              to see how the font handles longer passages of quoted material."
            </blockquote>
            
            <h4>Even Smaller Heading</h4>
            <ul>
              <li>First item in an unordered list</li>
              <li>Second item with <code>inline code</code></li>
              <li>Third item in the list</li>
            </ul>
            
            <p>
              Numbers and special characters: 0123456789 !@#$%^&amp;*()_+-=[]{"{}"}|;:,.&lt;&gt;?
            </p>
            
            <pre><code>{`// Code block example
function helloWorld() {
  console.log("Testing monospace font");
  return 42;
}`}</code></pre>
            
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </article>
          
          <div class="mt-12 p-6 bg-gray-900 rounded-lg">
            <h3 class="text-xl font-semibold mb-3">Quick Brown Fox Test</h3>
            <p class="text-2xl mb-2">The quick brown fox jumps over the lazy dog.</p>
            <p class="text-xl mb-2">THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.</p>
            <p class="text-lg">0123456789 !@#$%^&amp;*()_+-=[]{"{}"}|;:,.&lt;&gt;?</p>
          </div>
        </div>
        
        <FontPicker />
      </div>
    </>
  );
}