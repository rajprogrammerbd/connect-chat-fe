import cogoToast from "cogo-toast";
import { Dispatch } from "redux";

type IType = "info" | "warn" | "success" | "error";

const displayMessage = (message: string, type: IType) => {
    const { hide } = cogoToast[type](message, {
        onClick: () => {
            if (hide) {
                hide();
            }
        },
    });
}

export const resetStoreDispatch = (dispatch: Dispatch) => {
    dispatch({ type: 'user/reset_users' });
}

export default displayMessage;
