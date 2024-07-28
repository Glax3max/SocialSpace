import {
    Box,
    Typography,
    useTheme,
    useMediaQuery
} from "@mui/material"
import Font from "./Font.jsx"
const LoginPage = () => {
    const theme = useTheme();
    const isNonMoblileScreens =  useMediaQuery("(min-width: 1000px)") 
    return (<Box>
                <Box 
                     width="100%"
                     backgroundColor={theme.palette.background.alt}
                     p="1rem 6%"
                     textAlign="center"
                >
        <Typography 
                    fontWeight ="bold"
                    color="primary"
                    fontSize="32px"
                > 
                    SocialSpace
                </Typography>
                </Box>
                <Box
                    width={isNonMoblileScreens ? "50%" : "93%"}
                    p="2rem"
                    m = "2rem auto"
                    borderRadius="1.5rem"
                    backgroundColor={theme.palette.background.alt}
                >
                    <Typography fontWeight="500" variant="h5" sx={{mb:"1.5rem"}}>
                        Welcome to Social space
                    </Typography>
                    <Font />
                </Box>
    </Box>)
}

export default LoginPage;