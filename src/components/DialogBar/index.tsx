import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import textFinder from '../assets/static-texts';
import { Button } from '@mui/material';
import CustomInput from '../customTextField';

interface IPropsOfState {
    name: string;
    chatID: string;
    isSubmitted: boolean;
}
interface IProps {
    isOpen: boolean;
    closedFn: () => void;
    formSumit: (state: IPropsOfState) => void;
    isNewUser: boolean;
    restore: boolean;
}

class DialogBar extends React.PureComponent<IProps, IPropsOfState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            name: '',
            chatID: '',
            isSubmitted: false
        }
    }

    static getDerivedStateFromProps(props: IProps, state: IPropsOfState) {
        // Update the state using the life-cycle hooks.
        if (props.restore) {
            return {
                ...state,
                isSubmitted: false
            }
        }

        return state;
    }

    changeNameText = (event: any) => {
        const { value } = event.target;

        this.setState({ ...this.state, name: value });
    }

    changeChatId = (event: any) => {
        const { value } = event.target;

        this.setState({ ...this.state, chatID: value });
    }

    formSubmittedLocally = () => {
        this.setState({ ...this.state, isSubmitted: true });
        this.props.formSumit(this.state);
    }

    render() {
        return (
            <>
                <Dialog
                    open={this.props.isOpen}
                    onClose={this.props.closedFn}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {textFinder('labelOfAskingID')}
                    </DialogTitle>
    
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {textFinder('provideAccessID')}
                        </DialogContentText>
    
                        <CustomInput type="text" value={this.state.name} onChange={this.changeNameText} placeholder={textFinder('placeholderForNameInput')}  />
                        {this.props.isNewUser ? null : <CustomInput type="text" value={this.state.chatID} onChange={this.changeChatId} placeholder={textFinder('placeholderForIDInput')} />}
                    </DialogContent>
    
                    <DialogActions>
                        <Button onClick={this.props.closedFn}>Disagree</Button>
                        <Button disabled={this.props.isNewUser ? this.state.name === '' : (this.state.name === '' || this.state.chatID === '')} onClick={this.formSubmittedLocally}>
                            {this.state.isSubmitted ? <CircularProgress /> : textFinder('submit')}
                        </Button>
                    </DialogActions>
    
                </Dialog>
            </>
        );
    }
}

export default DialogBar;
