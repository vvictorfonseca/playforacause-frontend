import { useContext } from 'react';
import UserContext, { IUserContext } from '@/contexts/userContext';

import { useRouter } from 'next/router';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react'

import { Button } from "@chakra-ui/react";

import { IDeleteproductOnCart } from '@/interfaces/cartsInterface';

import { deleteProductOnCart } from '@/services/api';

interface IProps {
  body: IDeleteproductOnCart | any;
  isOpen: boolean,
  content: string;
  setIsOpen: (newState: boolean) => void
}

export default function ModalComponent({ body, isOpen, setIsOpen , content}: IProps) {
  const { setUserInfos } = useContext<IUserContext>(UserContext)

  const router = useRouter()

  function deleteLocalStorage() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('firstName')

    setUserInfos({
      id: 0,
      token: null,
      firstName: null
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{content}</ModalHeader>
        <ModalCloseButton />

        <ModalFooter>
          <Button colorScheme='blackAlpha' mr={3} onClick={() => setIsOpen(false)}>
            Voltar
          </Button>
          <Button onClick={() => {
            if (body !== "") {
              deleteProductOnCart(body)
              setIsOpen(false)
            } else {
              //router.push("/")
              deleteLocalStorage()
              setIsOpen(false)
            }
          }} colorScheme={'red'}
          >Sim
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}