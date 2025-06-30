import { createTheme, styled, TextField } from '@mui/material';

export const InputField = styled(TextField)({
    
    '& label': {
        color: '#087A8Ebf',
    },
    '& label.Mui-focused': {
        color: '#087A8E',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#087A8E40',
        },
        '&:hover fieldset': {
            borderColor: '#087A8E',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#087A8E',
        },
    },
});

const Theme = createTheme({
    components: {
        MuiButton: {
            variants: [
                {
                    props: (props) => props.variant === 'PrimaryBtn',
                    style: {
                        background: '#087A8E',
                        color: 'white',
                        borderRadius:'25px',
                        width: '100%',
                        padding:'10px 0 10px 0',
                        margin: '5px 0 5px 0'
                    }
                },
                {
                    props: (props) => props.variant === 'SecendaryBtn',
                    style: {
                        border: '2px solid #087A8E',
                        color: '#087A8E',
                        borderRadius:'25px',
                        width: '100%',
                        padding:'10px 0 10px 0',
                        margin: '5px 0 5px 0',
                    }
                },
            ]
        },
    }
})

export default Theme;