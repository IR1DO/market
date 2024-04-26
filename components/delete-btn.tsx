'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from './ui/use-toast';
import axios from 'axios';

interface Props {
  productId?: number;
  saleId?: number;
}

const DeleteBtn = ({ productId, saleId }: Props) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const deleteProduct = async () => {
    try {
      setError('');
      setIsDeleting(true);

      if (productId) {
        await axios.delete('/api/products/' + productId);
        setSuccessMessage('The product has been deleted successfully.');
      } else if (saleId) {
        await axios.delete('/api/sales/' + saleId);
        setSuccessMessage('The sale has been deleted successfully.');
      }

      router.refresh();
      setIsDeleting(false);
    } catch (error) {
      const err = error as any;
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.response.statusText;
      setError(`${error}. Error message: ${errorMessage}`);
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        description: error,
      });
    } else if (successMessage) {
      toast({
        description: successMessage,
      });
    }
  }, [error, successMessage, toast]);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger
          className='text-red-500 hover:underline'
          disabled={isDeleting}
        >
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product and remove the data from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className='bg-red-500 hover:bg-red-400 dark:text-white'
              disabled={isDeleting}
              onClick={deleteProduct}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteBtn;
