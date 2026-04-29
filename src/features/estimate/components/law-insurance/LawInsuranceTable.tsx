import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
  ESPECIAL_DATA,
  InsurancePlansData,
  InsurancePlansHeader,
} from '@/mocks/plans-data';
import { CarInsurances } from '../../type/types';

interface LawInsuranceTableProps {
  selectedPlan?: CarInsurances;
}

export const LawInsuranceTable = ({ selectedPlan }: LawInsuranceTableProps) => {
  const SPECIAL_ROWS_COUNT = ESPECIAL_DATA.specialCell.rowspan;
  const activeHeader: Record<
    CarInsurances,
    ('basico' | 'plus' | 'autoExceso' | 'autoExcesoPlus')[]
  > = {
    [CarInsurances.BASE]: ['basico'],
    [CarInsurances.PLUS]: ['plus'],
    [CarInsurances.AUTO_EXCESO]: ['plus', 'autoExceso'],
    [CarInsurances.AUTO_EXCESO_PLUS]: ['plus', 'autoExcesoPlus'],
  };
  const currentHeader = selectedPlan ? activeHeader[selectedPlan] : null;

  // Por fila: qué celda resaltar según el plan y el index
  const getActiveCellByRow = (
    col: 'basico' | 'plus' | 'autoExceso' | 'autoExcesoPlus',
    index: number
  ): boolean => {
    if (!selectedPlan) return false;

    const isSpecialRow = index < SPECIAL_ROWS_COUNT;

    switch (selectedPlan) {
      case CarInsurances.BASE:
        return col === 'basico';

      case CarInsurances.PLUS:
        return col === 'plus';

      case CarInsurances.AUTO_EXCESO:
        // Primeras 5 filas → resalta Plus, resto → resalta Auto Exceso
        if (isSpecialRow) return col === 'plus';
        return col === 'autoExceso';

      case CarInsurances.AUTO_EXCESO_PLUS:
        // Primeras 5 filas → resalta Plus, resto → resalta Auto Exceso+
        if (isSpecialRow) return col === 'plus';
        return col === 'autoExcesoPlus';

      default:
        return false;
    }
  };
  const activeHeaderCls = 'bg-kover-widget-primary text-white font-semibold';
  const activeCellCls = 'bg-blue-50 font-medium text-kover-widget-primary';
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cobertura</TableHead>
          {(['basico', 'plus', 'autoExceso', 'autoExcesoPlus'] as const).map((col, i) => (
            <TableHead
              key={col}
              className={cn(
                'text-center',
                currentHeader?.includes(col) && activeHeaderCls
              )}
            >
              {InsurancePlansHeader[i]}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {InsurancePlansData.map((insurance, index) => {
          const isFirstRow = index === 0;
          const isNormalRow = index >= ESPECIAL_DATA.specialCell.rowspan;
          const isAutoExcesoPlusRow =
            index >= ESPECIAL_DATA.specialCellAutoExcesoPlus.rowspan;

          return (
            <TableRow key={insurance.coverage} className="hover:bg-gray-50">
              <TableCell className="text-sm font-medium text-gray-700 py-3">
                {insurance.coverage}
              </TableCell>
              <TableCell
                className={cn(
                  'text-center text-sm py-3',
                  getActiveCellByRow('basico', index) && activeCellCls
                )}
              >
                {insurance.basico}
              </TableCell>
              <TableCell
                className={cn(
                  'text-center text-sm py-3',
                  getActiveCellByRow('plus', index) && activeCellCls
                )}
              >
                {insurance.plus}
              </TableCell>
              {isFirstRow && (
                <TableCell
                  rowSpan={ESPECIAL_DATA.specialCell.rowspan}
                  className={cn(
                    'text-center align-middle p-4',
                    selectedPlan === CarInsurances.AUTO_EXCESO && activeCellCls
                  )}
                >
                  <div className="mx-auto max-w-[220px] whitespace-normal text-sm">
                    {ESPECIAL_DATA.specialCell.text}
                  </div>
                </TableCell>
              )}
              {isNormalRow && (
                <TableCell
                  className={cn(
                    'text-center text-sm py-3',
                    getActiveCellByRow('autoExceso', index) && activeCellCls
                  )}
                >
                  {insurance.autoExceso}
                </TableCell>
              )}
              {isFirstRow && (
                <TableCell
                  rowSpan={ESPECIAL_DATA.specialCellAutoExcesoPlus.rowspan}
                  className={cn(
                    'text-center align-middle p-4',
                    selectedPlan === CarInsurances.AUTO_EXCESO_PLUS && activeCellCls
                  )}
                >
                  <div className="mx-auto max-w-[220px] whitespace-normal text-sm">
                    {ESPECIAL_DATA.specialCellAutoExcesoPlus.text}
                  </div>
                </TableCell>
              )}
              {isAutoExcesoPlusRow && (
                <TableCell
                  className={cn(
                    'text-center text-sm py-3',
                    getActiveCellByRow('autoExcesoPlus', index) && activeCellCls
                  )}
                >
                  {insurance.autoExcesoPlus}
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
