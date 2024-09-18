




// components/CountryModal.tsx
import React from 'react';
import { Country } from '../../interface/conuntry';

interface CountryModalProps {
  country: Country | null;
  onClose: () => void;
}

const CountryModal: React.FC<CountryModalProps> = ({ country, onClose }) => {
  if (!country) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>{country.name.common}</h2>
        <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className="country-flag" />
        <p><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> {country.region}</p>
        <p><strong>Currencies:</strong> {Object.values(country.currencies || {}).map(c => c.name).join(', ')}</p>
        <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}</p>
        <p><strong>Timezones:</strong> {country.timezones.join(', ')}</p>
      </div>
    </div>
  );
};

export default CountryModal;




// // components/CountryDetail.tsx
// import { FC } from 'react';
// import { Country } from '../../interface/conuntry';

// interface CountryDetailProps {
//   country: Country;
//   onClose: () => void;
// }

// const CountryDetail: FC<CountryDetailProps> = ({ country, onClose }) => {
//   return (
//     <div className="detail">
//       <button onClick={onClose}>Close</button>
//       <h2>{country.name.common}</h2>
//       <p>Capital: {country.capital.join(', ')}</p>
//       <p>Population: {country.population.toLocaleString()}</p>
//       <p>Region: {country.region}</p>
//       <p>Currencies: {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
//       <p>Languages: {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
//       <p>Timezones: {country.timezones ? country.timezones.join(', ') : 'N/A'}</p>
//     </div>
//   );
// };

// export default CountryDetail;
