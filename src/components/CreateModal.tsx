import React from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Stack,
} from '@chakra-ui/react';
import { GridEventType } from '../types';
import { convertToDate } from '../utils/timeUtils';

type PropsType = {
  date: string;
  time: string;
  setShowModal: (bool: boolean) => void;
  isOpen: boolean;
  createEvent: (evt: Omit<GridEventType, 'id'>) => void;
  rowHeight: number;
  cellIdx: number;
};
const CreateModal = ({
  date,
  time,
  setShowModal,
  isOpen,
  createEvent,
  cellIdx,
  rowHeight,
}: PropsType) => {
  const [newEventData, setNewEventData] = React.useState({} as Omit<GridEventType, 'id'>);

  // const getTopPosition = () => {
  //   return cellIdx * rowHeight;
  // };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setNewEventData({ ...newEventData, [fieldName]: e.target.value });
  };

  const onCreateEvent = () => {
    const newEvent = {
      start: convertToDate(newEventData.start, date),
      end: convertToDate(newEventData.end, date),
      title: newEventData.title,
      comment: newEventData.comment,
    };
    createEvent(newEvent);
    setShowModal(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setShowModal(false)} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <Input
              placeholder="start"
              size="xs"
              value={newEventData.start}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'start')}
            />
            <Input
              placeholder="end"
              size="xs"
              value={newEventData.end}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'end')}
            />
            <Input
              placeholder="title"
              size="xs"
              value={newEventData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'title')}
            />
            <Input
              placeholder="comment"
              size="xs"
              value={newEventData.comment}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'comment')}
            />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onCreateEvent}>
            Save
          </Button>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateModal;
