import styled from 'styled-components';

export const Colors = {
    primary: '#ffffff',
    secondary: '#E5E7EB', 
    tertiary: '#10B981',
    darkLight: '#9CA3AF', 
    brand: '#7496a0', 
    green: '#10B981',
    red: '#EF4444'
};

const { primary, secondary, tertiary, darkLight, brand, green, } = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    background-color: ${primary};
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    padding-top: 55%;
    align-items: center;
`;

export const InnerContainer2 = styled.View`
    flex: 1;
    width: 100%;
    padding-top: 50%;
    align-items: center;
`;

export const PageLogo = styled.Image`
    width: 325px;
    height 72px;
    
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding: 10px;
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
    font-size: 13px;
    text-align: left;
    color: ${brand};
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 33px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 33px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${green};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;

    ${(props) => props.google == true && `
        background-color: ${brand};
        flex-direction: row;
        justify-content: center;
    `}
`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 16px;
    ${(props) => props.google == true && `
        padding-horizontal: 25px;
    `}
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin-vertical: 10px;
`;

export const Line2 = styled.View`
    height: 1px;
    width: 100%;
    background-color: #19835a;
    margin-vertical: 10px;
`;

export const Line3 = styled.View`
    height: 1px;
    width: 100%;
    background-color: #19835a;
    margin-vertical: 10px;
    opacity: 0;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const ExtraText = styled.Text`
    justify-content: center; 
    align-content: center;
    color: ${brand};
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center; 
    align-items: center;
`;

export const TextLinkContent = styled.Text`
    color: ${green};
    font-size: 15px;
`;

export const BackgroundImage = styled.Image`
    position: absolute;
    width: 120%;
    height: 120%;
`;

export const GreyedOut = styled.View`
    position: absolute;
    width: 120%;
    height: 120%;
    background-color: black;
    opacity: 0.6;
`;

export const GreyedOut2 = styled.View`
    position: absolute;
    width: 120%;
    height: 120%;
    background-color: black;
    opacity: 0.3;
`;

export const Green = styled.View`
    position: absolute;
    width: 120%;
    height: 120%;
    background-color: ${tertiary}};
`;

