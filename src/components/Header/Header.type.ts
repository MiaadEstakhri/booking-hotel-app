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
};
