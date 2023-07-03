import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Session, Area } from './interface';

export const currentAreaAtom = atom<number>(0);
export const currentSpecieAtom = atom<number>(0);
export const sessionAtom = atomWithStorage<Session | null>('session', null);
export const areasAtom = atom<Area[] | null>(null);
