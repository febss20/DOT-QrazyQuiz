import { useState, useCallback } from "react";
import { CATEGORY_ICONS, DEFAULT_CATEGORY_ICON } from "@/utils/constants";

export default function CategoryPicker({ categories, value, onChange }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getCategoryIcon = useCallback(
    (name) => CATEGORY_ICONS[name] || DEFAULT_CATEGORY_ICON,
    [],
  );

  const handleSelect = (id) => {
    const stringId = String(id);
    onChange(value === stringId ? "" : stringId);
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="material-icons text-primary">category</span>
          Select Category
        </h2>
        <span className="text-xs font-medium px-2 py-1 bg-primary/20 text-emerald-300 border border-primary/40 rounded">
          Required
        </span>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
        {/* Search */}
        <div className="relative mb-4">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-icons text-slate-500">search</span>
          </span>
          <input
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border-slate-600 bg-slate-800 focus:ring-primary focus:border-primary transition-colors text-slate-200 placeholder-slate-500 border"
            placeholder="Search for a topic (e.g. Film, Music)..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Grid */}
        <div className="custom-scrollbar grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto pr-2">
          {filteredCategories.map((cat) => {
            const isSelected = value === String(cat.id);
            return (
              <button
                key={cat.id}
                className={`flex items-center p-3 rounded-md transition-all text-left ${
                  isSelected
                    ? "border-2 border-primary bg-primary/20"
                    : "border border-slate-700 bg-slate-800 hover:border-primary/50 hover:bg-slate-700 group"
                }`}
                onClick={() => handleSelect(cat.id)}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-sm ${
                    isSelected
                      ? "bg-surface-dark text-primary"
                      : "bg-slate-700 text-slate-400 group-hover:text-primary"
                  } transition-colors`}
                >
                  <span className="material-icons text-lg">
                    {getCategoryIcon(cat.name)}
                  </span>
                </div>
                <span
                  className={`text-sm truncate ${
                    isSelected
                      ? "font-semibold text-primary"
                      : "font-medium text-slate-300 group-hover:text-white"
                  }`}
                >
                  {cat.name
                    .replace("Entertainment: ", "")
                    .replace("Science: ", "")}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
