import * as React from 'react';
import { IDialogBarProps } from '../../Types';
import { motion } from 'framer-motion';
import DialogBarLists from '../DialogBarLists';
import { useDispatch } from 'react-redux';
import { set_error } from '../../store';

function DialogBar(props: IDialogBarProps) {
    const { setOpenedBar } = props;
    const dispatch = useDispatch();
    const divRef = React.useRef<HTMLDivElement>(null);
    const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth);

    React.useEffect(() => {
        const resize = function() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        }
    }, []);

    React.useEffect(() => {
        function handleClickOutside(event: any) {
          if (divRef.current && !divRef.current.contains(event.target)) {
            setOpenedBar("");
            dispatch(set_error(null));
          }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [divRef]);
      
    return (
        <>
            <motion.div
                ref={divRef}
                className="absolute maxLg:w-3/5 w-11/12 h-4/5 rounded bg-none"
                initial={{ opacity: 0, boxShadow: "0px 0px 20px 0px #d8d8d8", borderRadius: 15 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div
                    style={{
                        clipPath: "polygon(69% 0, 51% 57%, 37% 100%, 0% 100%, 0 52%, 0% 0%)",
                        backgroundImage: (windowWidth >= 1022) ? "radial-gradient(circle at 50% -20.71%, #ade5ff 0, #7dcefb 25%, #3cb5f2 50%, #009ce9 75%, #0085e0 100%)" : "none",
                        display: (windowWidth >= 1022) ? 'block' : 'none',
                        borderRadius: 15
                    }}
                    className="absolute w-full h-full"
                />

                <div
                    style={{
                        backgroundColor: "honeydew",
                        clipPath: (windowWidth >= 1022) ? "polygon(70% -20px, 52% 53%, 37.1% 100%, 100% 100%, 100% 50%, 100% 0px)" : "none",
                        borderRadius: 15
                    }}
                    className="w-full h-full flex flex-col items-end p-10 justify-center"
                >
                    <DialogBarLists width={windowWidth >= 1022 ? "alternate" : "same"} />
                </div>
            </motion.div>
        </>
    );
}

export default React.memo(DialogBar);
