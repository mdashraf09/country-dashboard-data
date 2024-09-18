import { Country } from '../interface/conuntry'

export const sortCountriesByPopulation = (countries: Country[], ascending: boolean = true) => {
  return countries.sort((a, b) => ascending ? a.population - b.population : b.population - a.population);
};

export const filterCountriesByRegion = (countries: Country[], region: string) => {
  return countries.filter(country => country.region === region);
};

export const searchCountries = (countries: Country[], query: string) => {
  return countries.filter(country =>
    country.name.common.toLowerCase().includes(query.toLowerCase()) ||
    country.capital.join(', ').toLowerCase().includes(query.toLowerCase())
  );
};