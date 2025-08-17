import { useState } from "preact/hooks";

const fonts = [
  { name: "Default (System)", value: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" },
  { name: "Inter", value: "'Inter', sans-serif", url: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" },
  { name: "Playfair Display", value: "'Playfair Display', serif", url: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap" },
  { name: "Merriweather", value: "'Merriweather', serif", url: "https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap" },
  { name: "Lora", value: "'Lora', serif", url: "https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap" },
  { name: "Source Serif Pro", value: "'Source Serif Pro', serif", url: "https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;600;700;900&display=swap" },
  { name: "IBM Plex Sans", value: "'IBM Plex Sans', sans-serif", url: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap" },
  { name: "Work Sans", value: "'Work Sans', sans-serif", url: "https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800&display=swap" },
  { name: "Space Grotesk", value: "'Space Grotesk', sans-serif", url: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" },
  { name: "Crimson Text", value: "'Crimson Text', serif", url: "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&display=swap" },
  { name: "Libre Baskerville", value: "'Libre Baskerville', serif", url: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap" },
  { name: "Spectral", value: "'Spectral', serif", url: "https://fonts.googleapis.com/css2?family=Spectral:wght@300;400;500;600;700;800&display=swap" },
  { name: "Archivo", value: "'Archivo', sans-serif", url: "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&display=swap" },
  { name: "Manrope", value: "'Manrope', sans-serif", url: "https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" },
  { name: "DM Sans", value: "'DM Sans', sans-serif", url: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" },
  { name: "JetBrains Mono", value: "'JetBrains Mono', monospace", url: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" },
  { name: "Fira Code", value: "'Fira Code', monospace", url: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap" },
  { name: "Georgia", value: "Georgia, serif" },
  { name: "Garamond", value: "Garamond, serif" },
  { name: "Times New Roman", value: "'Times New Roman', serif" },
];

export default function FontPicker() {
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [fontSize, setFontSize] = useState("18");

  const handleFontChange = (fontIndex: number) => {
    const font = fonts[fontIndex];
    setSelectedFont(font);
    
    // Load Google Font if needed
    if (font.url && !document.querySelector(`link[href="${font.url}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = font.url;
      document.head.appendChild(link);
    }
    
    // Apply font to body
    document.body.style.fontFamily = font.value;
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    document.documentElement.style.fontSize = `${size}px`;
  };

  return (
    <div class="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-xl z-50 min-w-[300px]">
      <h3 class="text-lg font-bold mb-3">Font Picker</h3>
      
      <div class="mb-3">
        <label class="block text-sm mb-1">Font Family:</label>
        <select 
          class="w-full bg-gray-800 text-white px-2 py-1 rounded"
          onChange={(e) => handleFontChange(Number((e.target as HTMLSelectElement).value))}
        >
          {fonts.map((font, index) => (
            <option value={index} selected={font === selectedFont}>
              {font.name}
            </option>
          ))}
        </select>
      </div>

      <div class="mb-3">
        <label class="block text-sm mb-1">Base Font Size: {fontSize}px</label>
        <input
          type="range"
          min="14"
          max="24"
          value={fontSize}
          class="w-full"
          onInput={(e) => handleFontSizeChange((e.target as HTMLInputElement).value)}
        />
      </div>

      <div class="text-xs text-gray-400 mt-2">
        Current: {selectedFont.name}
      </div>

      <button
        class="mt-3 w-full bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
        onClick={() => {
          console.log(`Selected Font: ${selectedFont.name}`);
          console.log(`Font CSS: ${selectedFont.value}`);
          console.log(`Font Size: ${fontSize}px`);
          alert(`Selected: ${selectedFont.name}\nCSS: ${selectedFont.value}\nSize: ${fontSize}px`);
        }}
      >
        Copy Font Settings
      </button>
    </div>
  );
}