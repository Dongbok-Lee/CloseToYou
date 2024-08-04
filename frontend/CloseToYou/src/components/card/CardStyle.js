import styled from "@emotion/styled";

const CardStyle = styled.div`
  box-sizing: border-box;

  display: flex;

  justify-content: center;
  align-items: center;

  border-radius: 1.25rem;
  border: 3px solid rgba(255, 105, 105, 1);

  width: 8.75rem;
  height: 8.75rem;

  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  -webkit-tap-highlight-color: transparent;

  .card-icon {
    width: 5rem;
    height: 5rem;

    background: url(src/assets/icons/etc/plus-large.svg);

    ${({ cardType }) =>
      cardType === "basic" &&
      `
            background: url(src/assets/icons/etc/closet-card-basic.svg);
        `}
  }

  .card-text {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 800;
  }

  &:focus {
    border: 6px solid rgba(255, 105, 105, 1);

    outline: none;

    ${({ cardType }) =>
      cardType === "basic" &&
      `
            background-color: rgba(255, 105, 105, 1);
        
            outline: none;

            .card-icon {
                background: url(src/assets/icons/etc/closet-card-focus.svg);
            }
        `}

    ${({ cardType }) =>
      cardType === "text" &&
      `
            background-color: rgba(255, 105, 105, 1);

            color: rgba(255, 255, 255, 1);

            outline: none;
        `}
  }
`;

export default CardStyle;
