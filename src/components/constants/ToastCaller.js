import { toast } from 'react-toastify';
export const notifySuccess = (text) => toast.success(text);
export const notifyError = (text) => toast.error(text);
export const notifyWarn = (text) => toast.warn(text);
export const notifyInfo = (text) => toast.info(text);



