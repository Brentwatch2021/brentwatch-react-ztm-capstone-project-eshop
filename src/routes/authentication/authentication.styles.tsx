import styled from 'styled-components'


export const MainSignInContainer = styled.div`
        display: flex;
        flex-direction: row;   
        justify-content: space-around;
        margin: 30px auto;

        @media screen and (max-width:800px)
        {
                display:grid;
                justify-items: center;
                grid-template-columns: 1fr
        }
`;

