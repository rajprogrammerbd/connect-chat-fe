import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import textFinder from '../assets/static-texts';
import { Button } from '@mui/material';
import CustomInput from '../customTextField';

interface IProps {
    isOpen: boolean;
    closedFn: () => void;
    formSumit: () => void;
}

interface IPropsOfState {
    name: string;
    chatID: string;
}

function DialogBar(props: IProps) {
    const { isOpen, closedFn, formSumit } = props;

    const [state, setState] = React.useState<IPropsOfState>({
        name: '',
        chatID: ''
    });

    const changeNameText = (event: any) => {
        const { value } = event.target;

        setState({ ...state, name: value });
    }

    const changeChatId = (event: any) => {
        const { value } = event.target;

        setState({ ...state, chatID: value });
    }

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={closedFn}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {textFinder('labelOfAskingID')}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {textFinder('noteOfAdminPermission')}
                    </DialogContentText>

                    <CustomInput type="text" value={state.chatID} onChange={changeChatId} placeholder={textFinder('placeholderForNameInput')}  />
                    <CustomInput type="text" value={state.name} onChange={changeNameText} placeholder={textFinder('placeholderForIDInput')} />
                </DialogContent>

                <DialogActions>
                    <Button onClick={closedFn}>Disagree</Button>
                    <Button onClick={formSumit}>
                        {textFinder('submit')}
                    </Button>
                </DialogActions>

            </Dialog>
        </>
    );
}

export default React.memo(DialogBar);
