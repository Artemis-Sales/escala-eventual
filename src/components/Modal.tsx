import React, { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  title: string;
  subtitle?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  footer?: React.ReactNode;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Diálogo único do app. Fecha no Esc e no clique fora, leva o foco para dentro ao abrir
 * e o devolve a quem abriu ao fechar.
 */
export const Modal: React.FC<ModalProps> = ({
  title,
  subtitle,
  size = 'md',
  footer,
  onClose,
  children,
}) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  // Quem chama passa uma função nova a cada render; guardar numa ref evita refazer o
  // efeito (e roubar o foco do campo que está sendo digitado).
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const anterior = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      anterior?.focus?.();
    };
  }, []);

  return (
    <div className="dialogo-fundo" onMouseDown={onClose}>
      <div
        ref={panelRef}
        className={`dialogo dialogo-${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="dialogo-cabeca">
          <div className="dialogo-titulos">
            <h2 id={titleId} className="dialogo-titulo">
              {title}
            </h2>
            {subtitle && <p className="dialogo-sub">{subtitle}</p>}
          </div>
          <button type="button" className="btn-icone" onClick={onClose} aria-label="Fechar">
            <X size={18} />
          </button>
        </header>
        <div className="dialogo-corpo">{children}</div>
        {footer && <footer className="dialogo-rodape">{footer}</footer>}
      </div>
    </div>
  );
};
