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

export const LawInsuranceTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cobertura</TableHead>
          {InsurancePlansHeader.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {InsurancePlansData.map((insurance, index) => {
          const isFirstRow = index === 0;
          const isNormalRow = index >= ESPECIAL_DATA.specialCell.rowspan;
          const isAutoExcesoPlusRow = index >= ESPECIAL_DATA.specialCellAutoExcesoPlus.rowspan;
          // const isLastBoxRow = index === ESPECIAL_DATA.specialCell.rowspan - 1;
          // const isInsideBox = index < ESPECIAL_DATA.specialCell.rowspan;
          return (
            <TableRow key={insurance.coverage} className="hover:bg-gray-50">
              <TableCell className="text-sm font-medium text-gray-700 py-3">
                {insurance.coverage}
              </TableCell>
              <TableCell className="text-center text-sm py-3">
                {insurance.basico}
              </TableCell>
              <TableCell
                className={cn(
                  'text-center text-sm py-3',
                )}
              >
                {insurance.plus}
              </TableCell>
              {isFirstRow && (
                <TableCell
                  rowSpan={ESPECIAL_DATA.specialCell.rowspan}
                  className={cn(
                    'text-center align-middle p-4',
                    'border-kover-widget-primary border-t-2 border-r-2 border-b-2 border-l-2 '
                  )}
                >
                  <div className="mx-auto max-w-[220px] whitespace-normal text-sm text-black">
                    {ESPECIAL_DATA.specialCell.text}
                  </div>
                </TableCell>
              )}
              {isNormalRow && (
                <TableCell className={cn(
                    'text-center align-middle p-4 text-black',
                    'border-kover-widget-primary border-t-2 border-r-2 border-b-2 border-l-2 '
                  )}>
                  {insurance.autoExceso}
                </TableCell>
              )}
               {isFirstRow && (
                <TableCell
                  rowSpan={ESPECIAL_DATA.specialCellAutoExcesoPlus.rowspan}
                  className={cn(
                    'bg-gray-50/80 text-center align-middle p-4',
                    'border-t-2 border-b-2 border-l-2'
                  )}
                >
                  <div className="mx-auto max-w-[220px] whitespace-normal text-sm text-black">
                    {ESPECIAL_DATA.specialCellAutoExcesoPlus.text}
                  </div>
                </TableCell>
              )}
              {isAutoExcesoPlusRow && (
                <TableCell className="text-center text-sm py-3 border-l border-gray-200">
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
