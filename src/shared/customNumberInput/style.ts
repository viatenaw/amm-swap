import styled from "styled-components";

export const Label = styled.label<any>`
   
    display: flex;
    gap: ${(props: any) => props.isMatic ? "16px" : "12px"};
    border: 1px solid ${(props: any) => props.theme.gray};
    border-radius: 5px;
    background: ${(props: any) => props.theme.white};
    padding: 12px;
    cursor: text;
    justify-content: ${(props: any) => props.isMatic ? "flex-start" : "space-between"};

    :focus-within {
        border: 1px solid ${(props: any) => props.theme.black};
    }
    >input {
        outline: none;
        border: none;
        background: transparent;
        ::-webkit-input-placeholder {
            text-align: center;
        }
        text-align: center;
        font-family: TTNormsProExtraBold;
    }
    .maxOutButton{
        color: ${(props: any) => props.theme.primaryText}
    }
    .maxOutButton:hover{
        cursor: pointer;
    }

    .askingPrice{
        outline: none;
        border: none;
        background: transparent;
        ::-webkit-input-placeholder {
            text-align: left;
        }
        text-align: left;
        font-family: TTNormsProExtraBold;
    }

    /* display: flex;
    gap: ${(props: any) => props.isMatic ? "16px" : "12px"};
    border: 1px solid ${(props: any) => props.theme.gray};
    border-radius: 5px;
    background: ${(props: any) => props.theme.white};
    padding: 12px;
    cursor: text;
    justify-content: ${(props: any) => props.isMatic ? "" : "space-between"};

    .askingPrice{
        outline: none;
        border: none;
        background: transparent;
        ::-webkit-input-placeholder {
            text-align: left;
        }
        text-align: left;
        font-family: TTNormsProExtraBold;
    }

    :focus-within {
        border: 1px solid ${(props: any) => props.theme.black};
    }
   
  

   
    */
`

export const Image = styled.img`
    height: 20px;
    width: 20px;
`