import { Country } from '../../model/country';
import styles from './country.module.scss';

type Props = {
  country: Country;
};

export const CountryCard = ({ country }: Props) => {
  return (
    <li className={styles.countrylist}>
      <div className={styles.countryInfo}>
        <img
          className={styles.countryimage}
          src={country.flags.svg}
          alt={`Bandera de ${country.name.common}`}
        />
        <span className={styles.countrytitle}>{country.name.common}</span>
        <span className={styles.countrydescription}>{country.capital}</span>
        <span className={styles.population}>
          Population: {country.population}
        </span>
        <span className={styles.continents}>{country.continents}</span>
      </div>
    </li>
  );
};
