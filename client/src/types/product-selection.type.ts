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

export interface BannerProps {
  title: string;
  description: string;
  buttonText: string;
  buttonOnClick?: () => void;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  className?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface ProductFeaturesProps {
  features: FeatureItem[];
  className?: string;
}
