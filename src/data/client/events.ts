import {HttpClient} from '@/data/client/http-client'
import {QueryOptions} from '@/types'
import {EventsResponse} from '@/types/events'
import {API_ENDPOINTS} from './api-endpoints'

export const eventsClient = {
	paginated: ({search,...params}: QueryOptions) => {
		return HttpClient.get<EventsResponse>(API_ENDPOINTS.EVENTS,{
		  ...params,
		  search,
		})
	  },
}