import {Button,Modal,Box} from '@mui/material'

export default function CustomModal({open, handleOpen, buttonText, handleClose, children, btnSx}){
    return(
        <>
            <Button
                variant='contained'
                color='success'
                sx={[{marginBottom: 2}, {...btnSx}]}
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
                        gap: 3,
                        width: '50%',
                        bgcolor: 'background.paper',
                        flexWrap: 'wrap'
                    }}
                >
                    {children}
                </Box>
            </Modal>
        </>
    )
}