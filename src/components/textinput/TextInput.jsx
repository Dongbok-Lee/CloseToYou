import TextInputStyle from './TextInputStyle'

const TextInput = ({ textInputType, textInputSize, textInputPlaceholder }) => {
    return(
        <TextInputStyle textInputType={ textInputType } textInputSize={ textInputSize } placeholder={ textInputPlaceholder }></TextInputStyle>
    );
}

export default TextInput;
