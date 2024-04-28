import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@frontend.suprasy.com/ui';
import { useModalStore } from '@web/store/modalStore';
import React, { useEffect, useState } from 'react';

const CartModal: React.FC = () => {
  const { modal, clearModalPath } = useModalStore((state) => state);
  const modalName = modal.modal;
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (modalName === 'cart') {
      setModalOpen(true);
    }
  }, [modalName]);

  const closeModal = () => {
    setModalOpen(false);
    clearModalPath();
  };

  return (
    <Sheet
      open={modalOpen}
      onOpenChange={(data) => {
        if (!data) {
          closeModal();
        }
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4"></div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartModal;
