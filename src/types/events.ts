export interface IEvent {
	id: number;
	title: string;
	synopsis: string;
	company: string;
	dramaturgy: string;
	director: string;
	public: boolean;
	video?: string;
	schedules: [],
	thumbnailUrl: string;
}

export interface EventsResponse {
	data: IEvent[]
	total: number
	totalPages: number
	currentPage: number
	perPage: number
  }