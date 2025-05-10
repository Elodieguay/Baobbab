export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    SUPERADMIN = 'SUPERADMIN',
}

export enum Status {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    ARCHIVED = 'ARCHIVED',
    DRAFT = 'DRAFT',
    CANCELLED = 'CANCELLED',
}

export enum EntityType {
    USER = 'user',
    ORGANISATION = 'organisation',
}