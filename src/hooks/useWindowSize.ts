import { useEffect, useState } from "react";

function useWindowSize() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    // Este bloque solo se ejecuta en el cliente
    const handleResize = () => setWidth(window.innerWidth);

    handleResize(); // Set initial width

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default useWindowSize;
