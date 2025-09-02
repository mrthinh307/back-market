export interface SelectionOption {
  id: string;
  name: string;
  price: string;
  color?: string; 
  isGoodDeal?: boolean;
}

export interface ProductSelectionProps {
  title: string;
  options: SelectionOption[];
  selectedOption: string;
  onSelectionChange: (optionId: string) => void;
  leftImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  leftContent?: React.ReactNode;
  showInfoButton?: boolean;
  infoButtonText?: string;
  infoButtonIcon?: React.ReactNode;
  gridColumns?: 1 | 2; // Number of columns for options grid
  customOptionRenderer?: (option: SelectionOption, isSelected: boolean) => React.ReactNode;
}
