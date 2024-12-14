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

export type DateRangeTypes = {
  date: {
    startDate: Date;
    endDate: Date;
    key: string;
  }[];
  setDate: (
    newDates: { startDate: Date; endDate: Date; key: string }[]
  ) => void;
  setIsOpenDate: React.Dispatch<React.SetStateAction<boolean>>;
};
