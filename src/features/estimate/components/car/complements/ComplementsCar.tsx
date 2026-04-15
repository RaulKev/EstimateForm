import { Button } from '@/components/ui/button';
import type { AddedComplement } from './ComplementsDetailsCar';

interface ComplementsCarProps {
  setSelected: (value: boolean) => void;
  selected: boolean;
  complements: AddedComplement[];
  setComplements: React.Dispatch<React.SetStateAction<AddedComplement[]>>;
}

export function ComplementsCar({
  setSelected,
  selected,
  complements,
  setComplements,
}: ComplementsCarProps) {
  const isComplementsAdded = selected || complements.length > 0;
  const isSelected = !selected && !isComplementsAdded;

  const handleSelect = (value: boolean) => {
    if (value) {
      setSelected(value);
    } else {
      setSelected(false);
      setComplements([]);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        className={`${isComplementsAdded ? 'bg-kover-widget-primary text-white' : ''} hover:bg-kover-widget-primary-hover hover:text-white py-5 flex-1 cursor-pointer`}
        type="button"
        onClick={() => handleSelect(true)}
      >
        SI
      </Button>
      <Button
        variant="outline"
        className={`${isSelected ? 'bg-kover-widget-primary text-white' : ''} hover:bg-kover-widget-primary-hover hover:text-white py-5 flex-1 cursor-pointer`}
        type="button"
        onClick={() => handleSelect(false)}
      >
        NO
      </Button>
    </div>
  );
}
