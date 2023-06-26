import { ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';

export const Loader = () => {
  return (
    <LoaderContainer>
      <ThreeDots color="#3f51b5" height={200} width={200} />
    </LoaderContainer>
  );
};

export const LoaderContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
