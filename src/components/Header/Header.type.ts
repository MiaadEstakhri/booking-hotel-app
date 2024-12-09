export type OptionsType = {
  [key: string]: number;
};

export type OptionItemType = {
  type: string;
  options: OptionsType;
  minLimit: number;
  handleOptions: (type: string, operation: string) => void;
};

export type GuestOptions = {
  Adult: number;
  Children: number;
  Room: number;
};

export type GuestOptionListType = {
  options: GuestOptions;
};
