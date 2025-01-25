
'use client'
import { Button, TextInput } from 'flowbite-react';
import React, { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Input from '../components/Input';
import CallendarInput from '../components/CallendarInput';
import { createAuction, updateAuctions } from '../actions/actionOfAuctions';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Auction } from '@/types';


type Props = {
    auction?: Auction
}


export default function FormOfAuctions({ auction }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    // tworzenie formularza zgodnie z (react hook form)
    const { control, handleSubmit, setFocus, reset, formState: { isSubmitting, isValid } } = useForm(
        {
            mode: 'onTouched'
        });
    useEffect(() => {
        if (auction) {
            const { make, model, color, milage, year } = auction;
            reset({ make, model, color, milage, year });
        }

        setFocus('make');

    }, [setFocus, reset, auction]
    )

    async function onSubbmit(data: FieldValues) {
        try {
            let id = '';
            let res;
            if (pathname === '/auctions/create') {
                res = await createAuction(data);
                id = res.id;

            } else {
                if (auction) {
                    res = await updateAuctions(data, auction.id)
                    id = auction.id;

                }
            }


            if (res.error) {
                throw res.error;
            }

            router.push(`/auctions/details/${id}`)

        } catch (error: any) {
            toast.error(error.status + ' ' + error.message)
        }






    }



    return (




        <form className=' flex flex-col mt-1 ' onSubmit={handleSubmit(onSubbmit)}>
         
            <Input label='Marka' name='make' control={control} rules={{ required: 'Marka samochodu jest wymagana ' }} />
            

            <Input label='Model' name='model' control={control} rules={{ required: 'Model samochodu jest wymagany ' }} />
            <div className='grid grid-cols-4  gap-2'>
                <Input label='Kolor' name='color' control={control} rules={{ required: 'Kolor samochodu jest wymagany ' }} />

                <Input label='Rok produkcji' name='year' control={control} type='number' rules={{ required: 'Rok produkcji samochodu jest wymagany ' }} />
                <Input label='Przebieg' name='milage' control={control} type='number' rules={{ required: 'Przebieg samochodu jest wymagany ' }} />

                {pathname === '/auctions/create' &&
                    <>

                        <Input label='Cena wywoławcza' name='reservePrice' control={control} type='number' rules={{ required: 'Musisz podać cene wywoławczą' }} />
                    </>}

            </div>

            {pathname === '/auctions/create' &&
                <>
                    <Input label='Link do zdjęcia' name='imageUrl' control={control} rules={{ required: 'A chciałbyś kupić kota w worku?' }} />

                </>}


            <div className='grid grid-cols-2  gap-2'>

                {pathname === '/auctions/create' &&
                    <>

                        <CallendarInput label='Data zakończenia' name='auctionEnd' control={control} dateFormat={'dd MMMM yyyy h:mm a'} showTimeSelect rules={{ required: 'Musisz podać date zakończenia aukcji' }} />
                    </>}



            </div>



            <div className='flex justify-between'>


                <Button className=' bg-red-400' >Anuluj</Button>


                <Button className=' bg-lime-500' isProcessing={isSubmitting}
                    disabled={!isValid}
                    type='submit'
                >Zatwierdź</Button>

            </div>



        </form>

    )
}
