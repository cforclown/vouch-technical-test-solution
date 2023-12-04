/* eslint-disable no-console */
import { toast } from 'react-toastify';
import { CallEffect, call } from 'redux-saga/effects';
import { HttpStatusCode } from 'axios';
import { CallAPIException } from './call-api';

type SagaFunction<Args extends any[]> = (...args: Args) => Generator<any, any, any>;

export function* sagaWrapper<Args extends any[]>(
  handler: SagaFunction<Args>,
  ...args: Args
): Generator<CallEffect<any> | any, any, any> {
  try {
    const result = yield call(handler, ...args);
    return result;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
}

type LoadingSetterSagaFunction = SagaFunction<[boolean]>

export function* sagaWrapperWithLoading<Args extends any[]>(
  handler: SagaFunction<Args>,
  loadingSetter: LoadingSetterSagaFunction,
  ...args: Args
): Generator<CallEffect<any> | any, any, any> {
  try {
    yield call(loadingSetter, true);

    const result = yield call(handler, ...args);
    return result;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      if (err instanceof CallAPIException && err.status !== HttpStatusCode.Unauthorized) {
        toast.error(err.message);
      }
    }
  } finally {
    yield call(loadingSetter, false);
  }
}
