import { useLocation } from 'react-router-dom';

export const useUrlParams = () => new URLSearchParams(useLocation().search);
