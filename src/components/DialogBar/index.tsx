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
    value: string;
}

function DialogBar(props: IProps) {
    const { isOpen, closedFn, formSumit } = props;

    const [state, setState] = React.useState<IPropsOfState>({
        value: ''
    });

    const changeText = (event: any) => {
        const { value } = event.target;

        setState({ ...state, value });
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

                    <CustomInput type="text" value={state.value} onChange={changeText} placeholder={textFinder('placeholderForIDInput')} />
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
