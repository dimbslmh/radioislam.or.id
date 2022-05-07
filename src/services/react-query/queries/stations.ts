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
    return response.data;
  });
};
