import styled from 'styled-components';

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;

  @media screen and (max-width:800px)
  {
    grid-template-columns: repeat(2, 1fr);
    column-gap: 10px;
    row-gap: 30px;
  }

  @media screen and (max-width:400px)
  {
    display:flex;
    flex-direction:column;
    width:100%;
    align-items:center;
    gap:55px    
    
  }


`;

export const Title = styled.h2`
  font-size: 38px;
  margin-bottom: 25px;
  text-align: center;
`;
