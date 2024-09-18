

// components/CountryCard.tsx
import React from 'react';
import { Country } from '../../interface/conuntry';

interface CountryCardProps {
  country: Country;
  onClick: (country: Country) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onClick }) => {
  return (
    <div className="country-card" onClick={() => onClick(country)}>
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className="country-flag" />
      <h2>{country.name.common}</h2>
      <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> {country.region}</p>
    </div>
  );
};

export default CountryCard;



// // components/CountryCard.tsx
// import { FC } from 'react';
// import { Country } from '../../interface/conuntry';
// import Image from 'next/image';

// interface CountryCardProps {
//   country: Country;
//   onClick: () => void;
// }

// const CountryCard: FC<CountryCardProps> = ({ country, onClick }) => {
//   return (
//     <div className="card" onClick={onClick}>
//       <Image src={country.flags.png} alt={`${country.name.common} flag`} width={200} height={120} />
//       <h2>{country.name.common}</h2>
//       <p>Capital: {country.capital.join(', ')}</p>
//       <p>Population: {country.population.toLocaleString()}</p>
//       <p>Region: {country.region}</p>
//     </div>
//   );
// };

// export default CountryCard;
