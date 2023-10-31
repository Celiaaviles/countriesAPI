export type Country = {
  flags: {
    svg: string;
  };
  name: {
    common: string;
  };
  flag: string;
  capital: string[] | string;
  population: number;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  continents: string[] | string;
};
