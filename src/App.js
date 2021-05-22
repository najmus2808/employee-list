import { useState } from 'react'
import {
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import { DeleteIcon } from '@chakra-ui/icons'


function App() {
  //open modal if true
  const [isOpen, setIsOpen] = useState(false)

  //on modal close button set isOpen to false
  const onClose = () => setIsOpen(false)

  //the message to show on modal
  const [modalInfo, setModalInfo] = useState('')

  //all the user data are here
  const [data, setData] = useState([])

  //name from input field
  const [name, setName] = useState('')

  //email from input field
  const [email, setEmail] = useState('')

  //handling add button
  const handleButton = () => {

    //checking is email already exists
    let exists = data.find(item => item.email === email)

    //if email does not exist and email, name are not empty and email conatains '@'
    if (exists === undefined && email && name && email.includes('@')) {
      setData([...data, { name, email }])
      console.log(data)
      setName('');
      setEmail('');
    }

    //if email does not contain '@' show this modal
    if (!email.includes('@')) {
      setModalInfo('Enter a Valid Email')
      setIsOpen(true)
    }

    //if email exists show this modal
    if (exists) {
      setModalInfo('This Email Already Exists!')
      setIsOpen(true)
    }

    // if name email is empty show this modal
    if (!email) {
      setModalInfo('Please Enter Email!')
      setIsOpen(true)
    }

    //if name is empty show this modal
    if (!name) {
      setModalInfo('Please Enter Name!');
      setIsOpen(true)
    }

  }

  //handle delete button
  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData)
  }

  return (
    <div className="App">
      <div className="inputs">
        <Input placeholder="Name" value={name} borderColor="blue.100" onChange={(e) => { setName(e.target.value) }} />
        <Input type="email" placeholder="Email" borderColor="blue.100" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <Button colorScheme="blue" onClick={handleButton}>Add</Button>
      </div>
      <div className="data">
        <Table variant="simple">
          <TableCaption>Employee Informations Holder || Created By Najmus Sakib</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>

            {
              data.map((info, index) => (
                <Tr key={index}>
                  <Td>{info.name}</Td>
                  <Td>{info.email}</Td>
                  <Td><Button colorScheme="red" onClick={() => handleDelete(index)}>Delete <DeleteIcon /> </Button></Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Warnng!!!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalInfo}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default App;
