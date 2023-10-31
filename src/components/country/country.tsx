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
        <p className={styles.countrydescription}>{country.capital}</p>
        <span className={styles.ubication}>{country.continents}</span>
        <span className={styles.ubication}>
          Population: {country.population}
        </span>
      </div>
    </li>
  );
};
