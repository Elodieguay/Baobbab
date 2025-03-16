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
