import * as React from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { Button, FormLabel, Stack } from '@mui/material';
import textFinder from '../assets/static-texts';
import DialogBar from '../DialogBar';
import { WebSocketHook } from 'react-use-websocket/dist/lib/types';

interface IDialogState {
    openDialog: boolean;
    forNewUser: boolean;
    restore: boolean;
}

interface IProps {
    startNewConnection: (name: string) => void;
    canOpen: boolean;
    ws: WebSocketHook<any | null, MessageEvent<any> | null>;
    setDialogLocallyResDefault: () => void;
}

class QuestionBox extends React.PureComponent<IProps, IDialogState> {
    constructor (props: IProps) {
        super(props);

        this.state = {
            openDialog: false,
            forNewUser: false,
            restore: false
        }
    }


    static getDerivedStateFromProps(props: IProps, state: IDialogState) {
        // Update the state using the life-cycle hooks.
        if (!props.canOpen) {
            return state;
        }

        return {
            ...state,
            openDialog: false,
            forNewUser: false,
            restore: true
        }
    }

    openBar = () => {
        this.props.setDialogLocallyResDefault();
        this.setState({ ...this.state, openDialog: true, forNewUser: false });
    }

    openBarForNewUser = () => {
        this.props.setDialogLocallyResDefault();
        this.setState({ ...this.state, openDialog: true, forNewUser: true });
    }

    closeBar = () => {
        this.setState({ ...this.state, openDialog: false });
    }

    formSubmitted = (event: any) => {
        const { name } = event;

        if (this.state.forNewUser) {
            this.props.startNewConnection(name);
        }

    }

    render() {
        return (
            <>
                <Typography variant="h5" gutterBottom>{textFinder('longDescriptionFormText')}</Typography>
                <FormControl sx={{ m: 3, display: 'block' }} component="fieldset" variant="standard">
                    <FormLabel component="legend">{textFinder('questionAboutExistedID')}</FormLabel>
    
                    <Stack spacing={1} mt={1} direction="row">
                        <Button variant="contained" onClick={this.openBar}>{textFinder('existedIdButtonText')}</Button>
                        <Button variant="contained" onClick={this.openBarForNewUser}>{textFinder('startNewChatButtonText')}</Button>
                    </Stack>
                </FormControl>
                <DialogBar restore={this.state.restore} isOpen={this.state.openDialog} closedFn={this.closeBar} formSumit={this.formSubmitted} isNewUser={this.state.forNewUser} />
            </>
        );
    }
}

export default QuestionBox;
