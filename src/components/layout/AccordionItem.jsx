import { Plus } from "lucide-react";

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
        onClick={onClick}
      >
        <span
          className={`text-lg font-medium transition-colors ${
            isOpen
              ? "text-amber-800"
              : "text-gray-900 group-hover:text-amber-800"
          }`}
        >
          {title}
        </span>

        <span
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-45" : "rotate-0"
          }`}
        >
          {/* Changed rotation to 45deg to turn Plus into X when open */}
          <Plus
            className={`w-5 h-5 ${isOpen ? "text-amber-800" : "text-gray-400"}`}
          />
        </span>
      </button>

      {/* ANIMATION WRAPPER 
         1. max-h-[5.5rem]: Height of roughly 3 lines of text.
         2. max-h-[1000px]: A value larger than your longest content to allow expansion.
         3. transition-[max-height]: Creates the smooth slide effect.
      */}
      <div
        className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-[5.5rem] opacity-80"
        }`}
      >
        <p className="pb-6 text-gray-600 leading-relaxed whitespace-pre-line">
          {content}
        </p>

        {/* Optional: Gradient fade at the bottom when collapsed to show there is more text */}
        <div
          className={`absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent pointer-events-none transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </div>
  );
};

export default AccordionItem;