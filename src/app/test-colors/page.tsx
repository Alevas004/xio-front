

export default function TestColors() {

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">
        Test de Colores Personalizados 
      </h1>

      {/* Test de colores de fondo */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-piel-oscuro p-4 text-white">piel-oscuro</div>
        <div className="bg-piel-claro p-4 text-white">piel-claro</div>
        <div className="bg-piel-blanco p-4 text-black">piel-blanco</div>
        <div className="bg-verde-gris p-4 text-white">verde-gris</div>
        <div className="bg-verde-claro p-4 text-white">verde-claro</div>
        <div className="bg-verde-oscuro p-4 text-white">verde-oscuro</div>
      </div>

      {/* Test de gradientes */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-1 p-4 text-black">gradient-1</div>
        <div className="bg-gradient-2 p-4 text-white">gradient-2</div>
        <div className="bg-gradient-3 p-4 text-white">gradient-3</div>
      </div>

      {/* Test de texto */}
      <div className="space-y-2">
        <p className="text-piel-oscuro">Texto piel-oscuro</p>
        <p className="text-verde-oscuro">Texto verde-oscuro</p>
        <p className="text-verde-claro">Texto verde-claro</p>
      </div>
    </div>
  );
}
