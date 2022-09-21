import { Button } from "../../../shared/button"
import { ContentContainer, NotFoundContainer, SecondaryText } from "./style"
import notFoundImage from "../../../assets/images/404.png"
import { rootPath } from "../../../logic/paths";
import { useNavigate } from "react-router-dom";

export const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <NotFoundContainer>
            <ContentContainer>
                <SecondaryText fSize='50px' fFamily='TTNormsProExtraBold' fSizeMobile='30px'>
                    Oops!
                </SecondaryText>
                <img height='200px' src={notFoundImage} alt='404 image' />
                <SecondaryText fSize='20px' fFamily='TTNormsProRegular'>
                    Page not found. This page does not exist.
                </SecondaryText>
                <Button
                    bRadius='20px'
                    btnType="filledButtonNM"
                    onClick={() => {
                        navigate(rootPath)
                    }}
                    customColor='#1199fa'
                    customBgColor="#1199fa80"
                >
                    Go Back To Pool</Button>
            </ContentContainer>
        </NotFoundContainer>
    )
}
