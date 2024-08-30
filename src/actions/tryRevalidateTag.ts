'use server';
import { revalidateTag } from 'next/cache';

export const tryRevalidateTag = (tag: string) => {
  revalidateTag(tag);
};
