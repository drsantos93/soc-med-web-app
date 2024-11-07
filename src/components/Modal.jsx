import {Button,Modal,Box} from '@mui/material'

export default function CustomModal({open, handleOpen, buttonText, handleClose, children}){
    return(
        <>
            <Button
                variant='contained'
                color='success'
                sx={{marginBottom: 2}}
                onClick={handleOpen}
            >
                {buttonText}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        marginTop: 10,
                        gap: 5,
                        width: '50%',
                        bgcolor: 'background.paper'
                    }}
                >
                    {children}
                </Box>
            </Modal>
        </>
    )
}