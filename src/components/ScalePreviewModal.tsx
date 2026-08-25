import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Calendar,
  Check,
  Edit3,
  GripVertical,
  Printer,
  FileSpreadsheet,
} from 'lucide-react';
import type { DailySubstitutionPlan, Teacher, SubstitutionItem } from '../types';
import { useSchool } from '../context/SchoolContext';
import { exportDailyPlanToExcel } from '../utils/excelHelper';
import { printScaleDocument } from '../utils/printHelper';

interface ScalePreviewModalProps {
  plan: DailySubstitutionPlan;
  teachers: Teacher[];
  onOfficialize: () => void;
  onClose: () => void;
  onEditItem: (item: SubstitutionItem) => void;
}

export const ScalePreviewModal: React.FC<ScalePreviewModalProps> = ({
  plan,
  teachers,
  onOfficialize,
  onClose,
  onEditItem,
}) => {
  const { swapSubstitutions, updateSubstitutionItem } = useSchool();

  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOverItemId, setDragOverItemId] = useState<string | null>(null);

  const formattedDate = new Date(plan.date + 'T00:00:00').toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const absentNames = plan.absentTeacherIds
    .map((id) => teachers.find((t) => t.id === id)?.name || id)
    .join(', ');

  const totalClasses = plan.substitutions.length;
  const coveredClasses = plan.substitutions.filter((s) => s.substituteTeacherId).length;

  // Handlers Drag & Drop entre linhas
  const handleDragStartItem = (e: React.DragEvent, itemId: string) => {
    setDraggedItemId(itemId);
    e.dataTransfer.setData('text/plain', JSON.stringify({ itemId }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, targetItemId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverItemId !== targetItemId) {
      setDragOverItemId(targetItemId);
    }
  };

  const handleDragLeave = (_e: React.DragEvent, targetItemId: string) => {
    if (dragOverItemId === targetItemId) {
      setDragOverItemId(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetItemId: string) => {
    e.preventDefault();
    setDragOverItemId(null);

    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      if (!dataStr) return;
      const data = JSON.parse(dataStr);

      if (data.itemId && data.itemId !== targetItemId) {
        swapSubstitutions(data.itemId, targetItemId);
      }
    } catch (err) {
      console.error('Drag drop error:', err);
    } finally {
      setDraggedItemId(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedItemId(null);
    setDragOverItemId(null);
  };

  const handleClearSubstitute = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    updateSubstitutionItem(itemId, null);
  };

  const handlePrintA4 = () => {
    printScaleDocument(plan, teachers);
  };

  const handleExportExcelModal = () => {
    exportDailyPlanToExcel(plan, teachers);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content preview-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header Limpo */}
        <div className="modal-header header-preview-clean">
          <div>
            <div className="preview-status-pill">
              {plan.isOfficial ? (
                <span className="badge-official-confirmed">
                  <CheckCircle2 size={13} /> Escala Oficializada
                </span>
              ) : (
                <span className="badge-draft-pending">
                  <Clock size={13} /> Conferência da Escala (Rascunho)
                </span>
              )}
            </div>
            <h3 className="modal-title">Conferência da Escala do Dia</h3>
            <p className="modal-subtitle">
              <Calendar size={13} /> {formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)} • {coveredClasses} de {totalClasses} aulas cobertas
            </p>
          </div>

          <div className="header-actions-right">
            <button onClick={handlePrintA4} className="btn-secondary btn-sm" title="Imprimir em folha A4">
              <Printer size={15} />
              <span>Imprimir A4</span>
            </button>
            <button onClick={handleExportExcelModal} className="btn-secondary btn-sm" title="Exportar Excel">
              <FileSpreadsheet size={15} />
              <span>Excel</span>
            </button>
            <button className="btn-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Resumo de Ausências */}
        <div className="preview-absent-bar">
          <span className="absent-label">Professores Ausentes:</span>
          <span className="absent-names">{absentNames || 'Nenhum'}</span>
        </div>

        {/* Tabela de Substituições Direta, Espaçosa e Sem Poluição */}
        <div className="preview-table-scroll">
          <table className="preview-clean-table">
            <thead>
              <tr>
                <th style={{ width: '14%' }}>Horário</th>
                <th style={{ width: '16%' }}>Turma</th>
                <th style={{ width: '18%' }}>Disciplina</th>
                <th style={{ width: '22%' }}>Professor Ausente</th>
                <th style={{ width: '24%' }}>Professor Substituto</th>
                <th style={{ width: '6%', textAlign: 'center' }}>Trocar</th>
              </tr>
            </thead>
            <tbody>
              {plan.substitutions.map((item) => {
                const isCovered = !!item.substituteTeacherId;
                const isDraggingThis = draggedItemId === item.id;
                const isTargetOver = dragOverItemId === item.id;

                return (
                  <tr
                    key={item.id}
                    onDragOver={(e) => handleDragOver(e, item.id)}
                    onDragLeave={(e) => handleDragLeave(e, item.id)}
                    onDrop={(e) => handleDrop(e, item.id)}
                    className={`table-row-item ${
                      !isCovered
                        ? 'row-uncovered'
                        : item.tier === 3
                        ? 'row-gestao'
                        : item.tier === 2
                        ? 'row-pca'
                        : 'row-regular'
                    } ${isDraggingThis ? 'row-dragging' : ''} ${
                      isTargetOver ? 'row-drop-hover' : ''
                    }`}
                  >
                    <td className="td-period">
                      <strong>{item.periodLabel}</strong>
                      <span className="text-muted" style={{ display: 'block', fontSize: '0.72rem' }}>
                        {item.periodTime}
                      </span>
                    </td>

                    <td className="td-class">
                      <span className="class-badge-solid">{item.className}</span>
                    </td>

                    <td className="td-subject">{item.originalSubject}</td>

                    <td className="td-absent">
                      <span className="text-danger font-bold">{item.originalTeacherName}</span>
                    </td>

                    <td className="td-substitute">
                      {isCovered ? (
                        <div
                          draggable={true}
                          onDragStart={(e) => handleDragStartItem(e, item.id)}
                          onDragEnd={handleDragEnd}
                          className={`sub-balloon-chip ${
                            item.tier === 3
                              ? 'balloon-gestao'
                              : item.tier === 2
                              ? 'balloon-pca'
                              : 'balloon-regular'
                          }`}
                        >
                          <GripVertical size={14} className="balloon-grip-icon" />
                          <span className="balloon-text">{item.substituteTeacherName}</span>
                          {item.tier === 3 && <span className="tag-role">[Gestão]</span>}
                          {item.tier === 2 && <span className="tag-role">[PCA]</span>}

                          <button
                            type="button"
                            onClick={(e) => handleClearSubstitute(e, item.id)}
                            className="btn-balloon-del"
                            title="Remover substituto"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-uncovered">
                          <AlertTriangle size={13} /> Sem Substituto
                        </span>
                      )}
                    </td>

                    <td className="td-action" style={{ textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onEditItem(item);
                        }}
                        className="btn-edit-cell"
                        title="Trocar manualmente por lista"
                      >
                        <Edit3 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Rodapé do Modal */}
        <div className="modal-footer footer-preview-clean">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Voltar ao Painel
          </button>

          {!plan.isOfficial ? (
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                onOfficialize();
                onClose();
              }}
            >
              <Check size={18} />
              <span>Oficializar Escala do Dia & Salvar</span>
            </button>
          ) : (
            <div className="badge-saved-clean">
              <CheckCircle2 size={16} />
              <span>Oficializada às {plan.officializedAt || 'Hoje'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
