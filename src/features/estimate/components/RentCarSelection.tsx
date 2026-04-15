const RENT_CAR_OPTIONS = [
  { category: 'Compacto', price15: 363, price30: 659 },
  { category: 'Premium', price15: 541, price30: 870 },
  { category: 'Camioneta', price15: 809, price30: 1064 },
];

export const RentCarSelection = () => {
  const selectedCategory = 'Camioneta';
  const selectedDays:number = 30;
  const currentPrice = 1064;
  return (
    <div className="mt-4 p-6 border rounded-2xl border-slate-200 bg-slate-50 space-y-6">
      <h3 className="text-kover-widget-primary font-bold text-md">Selecciona tu vehículo rentado</h3>

      <div className="space-y-4">
        {/* Cabecera */}
        <div className="flex justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2">
          <span className="w-1/3 text-left">Categoría</span>
          <span className="w-1/3 text-center">15 días / mes</span>
          <span className="w-1/3 text-center">30 días / mes</span>
        </div>
        {/* Filas */}
        {RENT_CAR_OPTIONS.map((opt) => (
          <div
            key={opt.category}
            className="flex items-center justify-between py-2 border-t border-slate-100"
          >
            <span className="w-1/3 font-bold text-black text-sm">
              {opt.category}
            </span>

            {/* 15 días */}
            <div className="w-1/3 flex justify-center">
              <div
                className={`flex items-center justify-center w-28 h-9 rounded-full border-2  cursor-pointer transition-all ${
                  selectedCategory === opt.category && selectedDays === 15
                    ? 'bg-[#1a365d] text-white border-[#1a365d] shadow-lg'
                    : 'border-[#1a365d] text-[#1a365d] bg-white opacity-80'
                }`}
              >
                RD${opt.price15}
              </div>
            </div>
            {/* 30 días */}
            <div className="w-1/3 flex justify-center">
              <div
                className={`flex items-center justify-center w-28 h-9 rounded-full border-2  cursor-pointer transition-all ${
                  selectedCategory === opt.category && selectedDays === 30
                    ? 'bg-kover-widget-primary text-white border-kover-widget-primary shadow-lg'
                    : 'border-[#1a365d] text-[#1a365d] bg-white opacity-80'
                }`}
              >
                RD${opt.price30}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Caja de Resumen */}
      <div className="bg-[#f1f5f9] rounded-xl p-2 text-center space-y-1">
        <p className="text-black font-bold text-[15px]">
          Seleccionado: {selectedCategory} – {selectedDays} días
        </p>
        <p className="text-black text-xl font-semibold">RD${currentPrice}</p>
      </div>
    </div>
  );
};
