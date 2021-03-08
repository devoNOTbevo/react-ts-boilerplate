import { useAuthState } from 'react-firebase-hooks/auth';
import { useService } from 'react-service-container';
import { useStateContext } from '../state/store';
import HttpService from '../providers/http-service-provider';
import { HttpRequestConfig } from '../types/service-interfaces';

export function useHttpActions() {
  const { state } = useStateContext();
  const httpService = useService(HttpService);
  const token = state.user.authToken || '';

  // returning partially applied functions allows us to hook up
  // the already-instantiated services with current state
  // via custom hooks
  const get = (url: string, request: HttpRequestConfig = {}) =>
    httpService.get({ ...request, url })(token);
  const patch = (url: string, request: HttpRequestConfig = {}) =>
    httpService.patch({ ...request, url })(token);
  const put = (url: string, request: HttpRequestConfig = {}) =>
    httpService.put({ ...request, url })(token);
  const post = (url: string, request: HttpRequestConfig = {}) =>
    httpService.post({ ...request, url })(token);
  const destroy = (url: string, request: HttpRequestConfig = {}) =>
    httpService.destroy({ ...request, url })(token);

  return {
    get,
    patch,
    put,
    post,
    destroy,
  };
}
