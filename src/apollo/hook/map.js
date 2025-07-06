import { useQuery } from '@apollo/client';
import { TRUCK_MAP } from 'apollo/query';

export const useTruckMapQuery = () => {
  const { data: { truckMap: { truckMapMarketAreas, allTrucksCount } = {} } = {}, loading } =
    useQuery(TRUCK_MAP, {
      pollInterval: 120000,
      fetchPolicy: 'no-cache',
    });
  return { truckMapMarketAreas, allTrucksCount, loading };
};
