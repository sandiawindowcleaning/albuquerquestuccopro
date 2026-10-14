import { createContext, useContext } from 'react';
import type { Crumb } from '../lib/schema';

export interface PageInfo {
  path: string;
  crumbs: Crumb[];
}

export const PageContext = createContext<PageInfo>({ path: '/', crumbs: [] });
export const usePage = () => useContext(PageContext);
