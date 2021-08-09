import { all }   from "redux-saga/effects";
import sagasAuth from "./auth";
import notesAuth from "./notes";

export default function* rootSaga() {
    yield all([
        sagasAuth(),
        notesAuth()
    ]);
}