import { useEffect } from 'react';

export const usePreventScrollLock = () => {
  useEffect(() => {
    // Observer para detectar cambios en los atributos del body
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-scroll-locked') {
          const body = document.body;
          // Remover el atributo y los estilos que bloquean el scroll
          if (body.hasAttribute('data-scroll-locked')) {
            body.removeAttribute('data-scroll-locked');
          }
          
          // Remover el estilo inline que oculta el overflow
          if (body.style.overflow === 'hidden') {
            body.style.overflow = '';
          }
          
          if(body.style.paddingRight) {
            body.style.paddingRight = '';
          }
          // Remover el margin-right que se puede agregar
          if (body.style.marginRight) {
            body.style.marginRight = '';
          }
        }
      });
    });

    // Observar cambios en los atributos del body
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-scroll-locked', 'style'],
    });

    //limpiar
    return () => {
      observer.disconnect();
    };
  }, []);
};