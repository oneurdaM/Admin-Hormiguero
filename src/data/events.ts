import {EventsResponse} from "@/types/events";
import {mapPaginatorData} from "@/utils/data-mappers";
import {useQuery} from "react-query";
import {API_ENDPOINTS} from "./client/api-endpoints";
import {eventsClient} from "./client/events";


export const useEventsQuery = (options?: Partial<any>) => {
	const { data, isLoading, error } = useQuery<EventsResponse, Error>(
	  [API_ENDPOINTS.EVENTS, options],
	  () => eventsClient.paginated(options),
	  {
		keepPreviousData: true,
	  }
	)
	console.log('Events getting', data);
  
	return {
	  events: data?.data,
	  loading: isLoading,
	  paginatorInfo: mapPaginatorData(data as any),
	  error,
	}
  }