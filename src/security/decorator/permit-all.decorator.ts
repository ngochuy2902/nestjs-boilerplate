import { SetMetadata } from '@nestjs/common';

export const PERMIT_ALL_KEY = 'permitAll';
export const PermitAll = () => SetMetadata(PERMIT_ALL_KEY, true);
