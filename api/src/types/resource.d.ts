import { USER_ROLE } from 'utils/constant';

export type UserRole = typeof USER_ROLE[keyof typeof USER_ROLE];
