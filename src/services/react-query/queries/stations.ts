import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import { ApiService } from "@service/ApiService";

/**
 *
 * @returns Deals with my request details api
 * Caching handled by react query
 */
export const GetStations = () => {
  const stationsService = ApiService.createInstance();

  return useQuery(["Stations"], async () => {
    const response: AxiosResponse = await stationsService.getStations();
    const activeStations = response.data.filter((item: any) => {
      return item.active === true;
    });

    return activeStations.slice(0, 10);
  });
};

export const GetStationsByProvince = (province: string) => {
  const stationsService = ApiService.createInstance();

  return useQuery([province], async () => {
    const response: AxiosResponse = await stationsService.getStations();
    const activeStations = response.data.filter((item: any) => {
      return item.active === true && item.province.includes(province);
    });

    return activeStations;
  });
};

export const GetStationsExcluding = (provinces: string[]) => {
  const stationsService = ApiService.createInstance();

  return useQuery(["Others"], async () => {
    const response: AxiosResponse = await stationsService.getStations();
    const activeStations = response.data.filter((item: any) => {
      return (
        item.active === true &&
        !provinces.some(province => item.province.includes(province))
      );
    });

    return activeStations;
  });
};
