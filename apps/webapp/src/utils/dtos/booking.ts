export interface CreateABooking {
    courseId: string;
    scheduleId: string;
    title: string;
    schedule: {
        day: string;
        hours: string;
    };
}

export interface UserBooking {
    id: string;
    title: string;
    schedule: {
        day: string;
        hours: string;
    };
}

export interface BookingResponse {
    id: string;
    title: string;
    schedule: {
        day: string;
        hours: string;
    };
    courses: {
        id: string;
        address: string;
        city: string;
        duration: string;
        organisation: string;
        reminder: string;
    };
}

export interface BookingWithSchedulesResponse {
    id: string;
    title: string;
    schedule: {
        id: string;
        day: string;
        hours: string;
    };
    availableSchedules: {
        id: string;
        day: string;
        hours: string;
    }[];
    courses: {
        id: string;
        address: string;
        city: string;
        duration: string;
        organisation: string;
        reminder: string;
    };
}
