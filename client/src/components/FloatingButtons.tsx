import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FloatingButtons() {
  const [showMenu, setShowMenu] = useState(false);

  const whatsappNumber = '16045186863'; // CS Fragrances WhatsApp
  const whatsappMessage = encodeURIComponent('Olá! Gostaria de saber mais sobre os produtos da CS Fragrances.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleChatbot = () => {
    // This will be replaced with your actual chatbot integration
    // For now, we'll just open a placeholder or trigger a modal
    window.open('https://your-chatbot-url.com', '_blank', 'width=400,height=600');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Buttons Menu */}
      {showMenu && (
        <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-2xl p-4 mb-2 w-64 animate-in fade-in slide-in-from-bottom-2">
          <div className="space-y-3">
            {/* WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors text-green-700 font-semibold"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.946 1.347l-.355.214-3.671-.964.984 3.202-.213.341a9.758 9.758 0 001.438 4.817c.686 1.318 1.684 2.513 2.921 3.435 1.237.922 2.51 1.226 3.891 1.226 2.396 0 4.545-1.778 5.631-4.374l.575-1.346a9.764 9.764 0 00.464-4.802 9.965 9.965 0 00-1.441-4.121 9.979 9.979 0 00-2.25-2.645c-.333-.231-.666-.451-1.023-.651a9.879 9.879 0 00-1.02-.39 9.88 9.88 0 00-1.058-.062 9.892 9.892 0 00-.524.026zm0-2.382a12.261 12.261 0 015.816 1.424c1.669.778 3.157 1.9 4.355 3.297 1.197 1.397 2.031 3.029 2.457 4.801.426 1.772.358 3.608-.2 5.339-.558 1.73-1.557 3.308-2.948 4.509-1.39 1.201-3.065 2.032-4.87 2.44-1.804.408-3.708.32-5.486-.258-1.778-.578-3.35-1.656-4.55-3.066-1.2-1.41-2.02-3.126-2.41-4.953-.39-1.827-.31-3.754.23-5.565.54-1.81 1.545-3.387 2.945-4.588 1.4-1.2 3.075-2.032 4.88-2.44.805-.182 1.616-.273 2.429-.273z" />
              </svg>
              <div>
                <p className="font-semibold">WhatsApp</p>
                <p className="text-xs">Contact Us</p>
              </div>
            </a>

            {/* Chatbot Button */}
            <button
              onClick={handleChatbot}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors text-blue-700 font-semibold"
            >
              <MessageCircle className="w-6 h-6" />
              <div className="text-left">
                <p className="font-semibold">Chatbot IA</p>
                <p className="text-xs">Assistência 24/7</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Button */}
      <Button
        onClick={() => setShowMenu(!showMenu)}
        className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
        aria-label="Open contact menu"
      >
        {showMenu ? <X size={28} /> : <MessageCircle size={28} />}
      </Button>

      {/* Floating Label */}
      {!showMenu && (
          <div className="absolute bottom-20 right-0 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap shadow-lg">
            Need Help?
          </div>
      )}
    </div>
  );
}
