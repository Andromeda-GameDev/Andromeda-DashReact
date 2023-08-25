import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
`;
export const ModalWrapper = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  max-width: 30rem;
  width: 100%;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  transition: all 0.3s ease-in-out;
`;
export const Header = styled.div`
  background-color: #f7fafc;
  padding: 1rem;
  border-bottom: 1px solid #edf2f7;
`;
export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
`;
export const Content = styled.div`
  padding: 1rem;
`;
export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
`;
export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.3rem;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;
