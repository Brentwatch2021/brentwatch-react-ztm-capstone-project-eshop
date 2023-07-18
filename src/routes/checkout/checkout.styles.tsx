import styled from 'styled-components';

export const CheckoutContainer = styled.div`
  
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:10px

  @media screen and (max-width:400px)
  {
    width:100%
  }
`;

export const CheckoutHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
  @media screen and (max-width:600px)
  {
    width:100%
  }
`;

export const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%;

  &:last-child {
    width: 8%;
  }

  @media screen and (max-width: 600px)
  {
    
    &:last-child {
      width: 0%;
    }
  }
`;

export const Total = styled.span`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;