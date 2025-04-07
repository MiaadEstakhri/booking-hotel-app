export type OptionsType = {
  [key: string]: number;
};
type HandleOptionsType = (type: string, operation: string) => void;

export type OptionItemType = {
  type: string;
  options: OptionsType;
  minLimit: number;
  handleOptions: HandleOptionsType;
};

export type GuestOptionListType = {
  options: OptionsType;
  handleOptions: HandleOptionsType;
  setIsOpenOption: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DateTypes = Array<{
  startDate: Date;
  endDate: Date;
  key: string;
}>;

export type DateRangeTypes = {
  date: DateTypes;
  setDate: (date: DateTypes) => void;
  setIsOpenDate: (isOpen: boolean) => void;
};
