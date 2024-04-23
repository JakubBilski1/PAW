import React, {Dispatch} from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Półprzezroczyste tło */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  min-width: 20%;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px
`;

const Button = styled.button`
  background-color: #007bff; /* Niebieski kolor tła */
  color: #fff; /* Biały kolor tekstu */
  border: none;
  border-radius: 5px;
  padding: 10px 20px; /* Wielkość przycisku */
  margin-right: 10px; /* Odstęp między przyciskami */
  cursor: pointer;
  transition: background-color 0.3s ease; /* Animacja zmiany koloru tła */

  &:hover {
    background-color: #0056b3; /* Ciemniejszy odcień niebieskiego po najechaniu myszką */
  }

  &:last-child {
    margin-right: 0; /* Nie ma odstępu po ostatnim przycisku */
  }
`;

type ModalProps = {
    setShowModal: Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}

function Modal({ setShowModal, children }: ModalProps) {
  return (
    <div>
      <ModalBackground>
          <ModalContent>
            {children}
            <Button onClick={() => setShowModal(false)}>Close</Button>
          </ModalContent>
        </ModalBackground>
    </div>
  )
}

export default Modal
