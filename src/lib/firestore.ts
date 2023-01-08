import { type DocumentData, type CollectionReference, collection } from 'firebase/firestore';
import { firestore } from './firebase';
import type { Formula } from './types';

const createCollection = <T = DocumentData>(collectionName: string) => {
	return collection(firestore, collectionName) as CollectionReference<T>;
};

export const formulaeCol = createCollection<Formula>('formulae');
