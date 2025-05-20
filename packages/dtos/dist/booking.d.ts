export interface CreateABooking {
    id?: string;
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
