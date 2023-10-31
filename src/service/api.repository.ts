import { Country } from '../model/country';

export class ApiCountriesRepository {
  urlBase: string;
  constructor(urlBase: string) {
    this.urlBase = urlBase;
  }

  async getAll(): Promise<Country[]> {
    const responseGetAll = await fetch(this.urlBase, {
      method: 'GET',
    });
    if (!responseGetAll.ok)
      throw new Error(
        `Error ${responseGetAll.status}: ${responseGetAll.statusText}`
      );
    const dataGetAll = await responseGetAll.json();
    return dataGetAll;
  }
}
