import { Modal } from '@/shared/components/Modal';
import type { Dispatch } from 'react';
import { Assistantinfo } from './AssistantInfo';
type AssistantModalProps = {
  openAssistant: boolean;
  setOpenAssistant: Dispatch<React.SetStateAction<boolean>>;
};

export const AssistantModal = ({
  openAssistant,
  setOpenAssistant,
}: AssistantModalProps) => {
  return (
    <Modal title=" " open={openAssistant} onOpenChange={setOpenAssistant}>
      <Assistantinfo />
    </Modal>
  );
};
