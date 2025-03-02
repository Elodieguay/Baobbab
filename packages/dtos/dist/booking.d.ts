export interface CreateABooking {
    courseId: string;
    scheduleId: string;
    title: string;
    schedule: {
        day: string;
        hours: string;
    };
}
