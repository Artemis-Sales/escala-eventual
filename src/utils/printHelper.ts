import type { DailySubstitutionPlan, Teacher } from '../types';

export function printScaleDocument(plan: DailySubstitutionPlan, teachers: Teacher[]) {
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

  const rowsHtml = plan.substitutions
    .map((item, idx) => {
      const isCovered = !!item.substituteTeacherId;
      const subName = item.substituteTeacherName || 'SEM COBERTURA';
      const roleTag =
        item.tier === 3 ? ' <span style="color:#4338CA; font-weight:bold; font-size:7pt;">[Gestão]</span>' :
        item.tier === 2 ? ' <span style="color:#B45309; font-weight:bold; font-size:7pt;">[Coord. Área]</span>' : '';

      return `
        <tr style="background-color: ${idx % 2 === 0 ? '#FFFFFF' : '#F8FAFC'};">
          <td style="text-align:center; padding: 4px 6px; border: 1px solid #94A3B8; font-size: 8pt;">
            <strong>${item.periodLabel}</strong><br/>
            <span style="font-size: 6.8pt; color: #475569;">${item.periodTime}</span>
          </td>
          <td style="padding: 4px 6px; border: 1px solid #94A3B8; font-size: 8.5pt; font-weight: bold; color: #1E293B;">
            ${item.className}
          </td>
          <td style="padding: 4px 6px; border: 1px solid #94A3B8; font-size: 8pt;">
            ${item.originalSubject}
          </td>
          <td style="padding: 4px 6px; border: 1px solid #94A3B8; font-size: 8pt; color: #B91C1C; font-weight: bold;">
            ${item.originalTeacherName}
          </td>
          <td style="padding: 4px 6px; border: 1px solid #94A3B8; font-size: 8.5pt;">
            ${isCovered ? `<strong>${subName}</strong>${roleTag}` : `<span style="color: #DC2626; font-weight: 900; text-decoration: underline;">SEM COBERTURA</span>`}
          </td>
          <td style="text-align:center; padding: 4px 6px; border: 1px solid #94A3B8;">
            <div style="height: 14px; border-bottom: 1px dotted #94A3B8;"></div>
          </td>
        </tr>
      `;
    })
    .join('');

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Escala de Substituição - ${formattedDate}</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 8mm;
        }
        * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        body {
          font-family: Arial, Helvetica, sans-serif;
          margin: 0;
          padding: 0;
          color: #0F172A;
          background: #FFFFFF;
          font-size: 8pt;
          line-height: 1.2;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 2px solid #1E293B;
          padding-bottom: 5px;
          margin-bottom: 6px;
        }
        .header-left {
          flex: 1;
        }
        .state-title {
          font-size: 7.5pt;
          font-weight: bold;
          color: #475569;
          letter-spacing: 0.5px;
        }
        .sec-title {
          font-size: 8.5pt;
          font-weight: bold;
          color: #0F172A;
        }
        .school-title {
          font-size: 7.5pt;
          color: #64748B;
        }
        .header-right {
          text-align: right;
        }
        .badge-title {
          font-size: 10.5pt;
          font-weight: 900;
          color: #0F172A;
          background: #E2E8F0;
          padding: 2px 8px;
          border: 1px solid #CBD5E1;
          display: inline-block;
          border-radius: 3px;
        }
        .date-title {
          font-size: 8.5pt;
          font-weight: bold;
          color: #1E293B;
          margin-top: 2px;
        }
        .summary-box {
          display: flex;
          background: #F1F5F9;
          border: 1px solid #CBD5E1;
          padding: 4px 8px;
          margin-bottom: 6px;
          border-radius: 3px;
        }
        .summary-col {
          display: flex;
          flex-direction: column;
          padding-right: 12px;
        }
        .summary-label {
          font-size: 6.8pt;
          font-weight: bold;
          color: #64748B;
          text-transform: uppercase;
        }
        .summary-val {
          font-size: 8pt;
          font-weight: bold;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 6px;
        }
        th {
          background-color: #E2E8F0;
          color: #0F172A;
          font-size: 7.5pt;
          font-weight: bold;
          text-transform: uppercase;
          padding: 4px 6px;
          border: 1px solid #94A3B8;
          text-align: left;
        }
        .footer {
          margin-top: 4px;
          page-break-inside: avoid;
        }
        .note {
          font-size: 7pt;
          color: #475569;
          background: #F8FAFC;
          border-left: 3px solid #94A3B8;
          padding: 3px 6px;
          margin-bottom: 12px;
        }
        .signatures {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-top: 20px;
          margin-bottom: 6px;
        }
        .sig-block {
          flex: 1;
          text-align: center;
        }
        .sig-line {
          border-top: 1px solid #0F172A;
          margin-bottom: 3px;
        }
        .sig-name {
          font-size: 7pt;
          font-weight: bold;
          color: #334155;
        }
        .timestamp {
          text-align: center;
          font-size: 6.5pt;
          color: #94A3B8;
          border-top: 1px solid #E2E8F0;
          padding-top: 3px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="header-left">
          <div class="state-title">GOVERNO DO ESTADO DE SÃO PAULO</div>
          <div class="sec-title">SECRETARIA DA EDUCAÇÃO • PROGRAMA ENSINO INTEGRAL (PEI)</div>
          <div class="school-title">UNIDADE ESCOLAR - TURNO ÚNICO DE 9 HORAS</div>
        </div>
        <div class="header-right">
          <div class="badge-title">ESCALA DE SUBSTITUIÇÃO EVENTUAL</div>
          <div class="date-title">${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}</div>
        </div>
      </div>

      <div class="summary-box">
        <div class="summary-col" style="flex: 2;">
          <span class="summary-label">Professores Ausentes:</span>
          <span class="summary-val" style="color: #B91C1C;">${absentNames || 'Nenhum'}</span>
        </div>
        <div class="summary-col" style="flex: 1;">
          <span class="summary-label">Aulas / Cobertura:</span>
          <span class="summary-val">${coveredClasses} de ${totalClasses} cobertas</span>
        </div>
        <div class="summary-col" style="flex: 1;">
          <span class="summary-label">Situação:</span>
          <span class="summary-val">${plan.isOfficial ? 'OFICIALIZADA' : 'RASCUNHO'}</span>
        </div>
        <div class="summary-col" style="flex: 1;">
          <span class="summary-label">Horário de Emissão:</span>
          <span class="summary-val">${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 12%; text-align: center;">Aula / Horário</th>
            <th style="width: 15%;">Turma / Ano</th>
            <th style="width: 18%;">Disciplina</th>
            <th style="width: 24%;">Professor Titular (Ausente)</th>
            <th style="width: 23%;">Professor Substituto</th>
            <th style="width: 8%; text-align: center;">Visto</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>

      <div class="footer">
        <div class="note">
          <strong>Orientações ao Substituto:</strong> Cumprir pontualmente o horário, realizar a chamada dos estudantes e seguir o planejamento pedagógico previsto para a turma.
        </div>

        <div class="signatures">
          <div class="sig-block">
            <div class="sig-line"></div>
            <div class="sig-name">Direção / Vice-Direção</div>
          </div>
          <div class="sig-block">
            <div class="sig-line"></div>
            <div class="sig-name">Coordenação Pedagógica Geral (CGP)</div>
          </div>
          <div class="sig-block">
            <div class="sig-line"></div>
            <div class="sig-name">Coordenação de Área (PCA)</div>
          </div>
        </div>

        <div class="timestamp">
          Documento gerado automaticamente pelo Sistema de Gestão de Escala de Substituição • Emissão em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} • Página 1/1
        </div>
      </div>

      <script>
        window.onload = function() {
          window.focus();
          window.print();
        };
      </script>
    </body>
    </html>
  `;

  // Cria um iframe oculto isolado para impressão imediata e 100% perfeita
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document || iframe.contentDocument;
  if (doc) {
    doc.open();
    doc.write(htmlContent);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 2000);
    }, 300);
  }
}
