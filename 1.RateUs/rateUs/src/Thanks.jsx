import React, {useEffect, useRef} from 'react'
import confetti from 'canvas-confetti';

function Thanks() {

  const canvasRef = useRef(null);

  useEffect(() => {
    const myConfetti = confetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    // Dispara la animación de confeti
    myConfetti({
      particleCount: 200,
      spread: 160,
    });

    // Limpia la animación de confeti después de 5 segundos
    const cleanUp = setTimeout(() => {
      myConfetti.reset();
    }, 5000);

    // Limpia el efecto cuando el componente se desmonta
    return () => {
      clearTimeout(cleanUp);
      myConfetti.reset();
    };
  }, []);

    

  return (
      <main className='aurora min-h-screen w-full flex justify-center items-center flex-col gap-2 absolute -z-50'>
      <h1 className='font-semibold text-2xl'>Gracias! <span className='font-normal'> calificación enviada al negocio.</span></h1>
      <p>Su solicitud se ha enviado correctamente y será procesada en breve. Este fue tu resúmen de respuestas.</p>
          
      </main>
  )
}

export default Thanks