import React from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon, CheckIcon } from '@chakra-ui/icons';
import { GridEventType } from '../types';
import useForm from '../utils/useForm';

type PropsType = {
  event: GridEventType;
  setShowModal: (bool: boolean) => void;
  isOpen: boolean;
  updateEvent: (evt: GridEventType) => void;
  deleteEvent: (id: number) => void;
};

const EditModal = ({ event, setShowModal, isOpen, updateEvent, deleteEvent }: PropsType) => {
  const { updateFormProp, formData } = useForm(event);

  const handleUpdate = () => {
    updateEvent(formData);
    setShowModal(false);
  };

  const handleDelete = () => {
    deleteEvent(formData.id);
    setShowModal(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setShowModal(false)} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Stack direction="row" spacing={4}>
            <IconButton aria-label="Search database" icon={<DeleteIcon />} onClick={handleDelete} />
            <IconButton aria-label="Search database" icon={<CheckIcon />} onClick={handleUpdate} />
          </Stack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <Input
              placeholder="start"
              size="xs"
              value={formData.start}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateFormProp('start', e.target.value)
              }
            />
            <Input
              placeholder="end"
              size="xs"
              value={formData.end}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateFormProp('end', e.target.value)
              }
            />
            <Input
              placeholder="title"
              size="xs"
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateFormProp('title', e.target.value)
              }
            />
            <Input
              placeholder="comment"
              size="xs"
              value={formData.comment}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateFormProp('comment', e.target.value)
              }
            />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
