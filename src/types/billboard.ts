export interface BillboardResponse {
    billboards: any
    fetchingBillboards: boolean
    paginatorInfo: {
        total: number
        currentPage: number
        totalPages: number
        perPage: number
    }
    error: string
}

export interface Billboard {
    id: number
    company: string
    director: string
    dramaturgy: string
    genderList: string
    thumbnailUrl: string
    public: boolean
    synopsis: string
    title: string
    type: string
    video: string
    duration: number
    price: number
}
export interface EventsSpacesResponse {
    eventsSpaces: any
    error: string
}
export interface EventsSpaces {
    id: number
    spaceId: number
    eventId: number
    startDate: string
    endDate: string
    createdAt: string
    space: Space
    event: Billboard
    title: string
    type: string
    video: string
}
export interface EventsSelected {
    id: number
    spaceId: number
    eventId: number
    startDate: string
    endDate: string
    createdAt: string
    space: Space
    event: Billboard
}

export interface Space {
    id: number
    dimensions: number
    capacity: number
    price: number
    name: string
    location: string
    image: string
    active: boolean
}
export interface SeatResponse {
    seatsResponse: any
    error: any
}
export interface Seat {
    id: number
    name: string
    createdAt: string
    is_available: boolean
    eventSpacesId: number
    is_selected: boolean
}

export interface Details {
    eventSpaces: EventsSpaces
    quantity: number
    subtotal: number 
}