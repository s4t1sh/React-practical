import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/userActions';
import { fetchUsers } from '../api/api';

function* fetchUsersWorker(action) {
  try {
    const response = yield call(fetchUsers, action.payload.since);
    yield put(types.fetchUsersSuccess(response.data));
  } catch (error) {
    yield put(types.fetchUsersFailure(error.message));
  }
}

function* userSaga() {
  yield takeLatest(types.FETCH_USERS_REQUEST, fetchUsersWorker);
}

export default userSaga;
