export interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  options: Option[];
  selected: Option;
  onChange: (option: Option) => void;
  className?: string;
  labelClassName?: string;
}
