'use client'
import { useEffect, useState } from "react";
import { Country } from "../interface/conuntry";
import CountryCard from "./components/CountryCard";
import CountryModal from "./components/CountryDetail";
import ThemeToggle from "./components/ThemeToggle";

export default function Home() {
  const [originalData, setOriginalData] = useState<Country[]>([])
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortCriteria, setSortCriteria] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();
        console.log("data", data);
        setOriginalData(data)
        setCountries(data);
      } catch (err) {
        setError('Failed to fetch countries');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [])

  // const sortCountriesByPopulation = (order: 'asc' | 'desc') => {
  //   const sortedCountries = [...countries].sort((a, b) => {
  //     const popA = a.population || 0;
  //     const popB = b.population || 0;
  //     return order === 'asc' ? popA - popB : popB - popA;
  //   });
  //   setCountries(sortedCountries);
  //   setSortOrder(order);
  // };

  const sortCountries = (criteria: string) => {
    setSortCriteria(criteria);
    const [field, order] = criteria.split('-');

    const sortedCountries = [...countries].sort((a, b) => {
      if (field === 'population') {
        const popA = a.population || 0;
        const popB = b.population || 0;
        return order === 'asc' ? popA - popB : popB - popA;
      }
      return 0;
    });

    setCountries(sortedCountries);
  };

  const filterCountriesByRegion = (region: string) => {
    setSelectedRegion(region);
    if (region === '') {
      setCountries(originalData);
    } else {
      console.log("region", region);
      const filteredCountries = originalData.filter(country => country.region === region);
      console.log("filteredData", filteredCountries)
      setCountries(filteredCountries);
    }
  };

  const searchCountry = (e: any) => {
    let searchVal = e.target.value;
    console.log("searchVal", searchVal);
    setCountries(originalData.filter(country => country.name.common.toLowerCase().includes(searchVal.toLowerCase())));
  }

  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
  };

  const closeModal = () => {
    setSelectedCountry(null);
  };
  return (
    <div className="container">
    <h1>Country Data Dashboard</h1>
    <ThemeToggle />
    <div className="controls">
      <input
        type="text"
        //value={searchQuery}
        onChange={(e) => searchCountry(e)}
        placeholder="Search country"
        className="input"
      />
      <select 
        value={selectedRegion} 
        onChange={(e) => filterCountriesByRegion(e.target.value)}
        className="input"
      >
        <option value="">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
      <select 
        value={sortCriteria} 
        onChange={(e) => sortCountries(e.target.value)}
        className="input"
      >
        <option value="">-- Sort by --</option>
        <option value="population-asc">Population (Ascending)</option>
        <option value="population-desc">Population (Descending)</option>
      </select>
    </div>
    <div className="country-grid">
      {countries.map(country => (
        <CountryCard 
          key={country.cca2} 
          country={country} 
          onClick={handleCountryClick}
        />
      ))}
    </div>
    <CountryModal country={selectedCountry} onClose={closeModal} />
  </div>
  );
}
