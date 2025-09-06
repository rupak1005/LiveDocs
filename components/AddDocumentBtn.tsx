'use client';

import { createDocument } from '@/lib/actions/room.actions';
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();

  const addDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email });

      if(room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button 
      type="submit" 
      onClick={addDocumentHandler} 
      variant="default"
      className="flex gap-2"
    >
      <Image 
        src="/assets/icons/add.svg" 
        alt="add" 
        width={20} 
        height={20}
        className="filter brightness-0 invert"
      />
      <span className="hidden sm:block">Start a blank document</span>
    </Button>
  )
}

export default AddDocumentBtn