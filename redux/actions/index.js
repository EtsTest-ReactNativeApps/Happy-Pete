import { USER_STATE_CHANGE,  CLEAR_DATA} from '../Constants'
import FirebaseConfig from "../../components/config";

export function clearData() {
    return ((dispatch) => {
        dispatch({type: CLEAR_DATA})
    })
}

export function fetchUser() {
    return ((dispatch) => {
        let userId = FirebaseConfig.auth().currentUser.uid
        FirebaseConfig.database().ref("users").child(userId).once("value")
            .then((snapshot) => {
                    dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.val() })
            })
    })
}
