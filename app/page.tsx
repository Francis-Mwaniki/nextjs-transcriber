"use client";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import { Input } from '@/components/ui/input';
import { Loader } from 'lucide-react';

type Props = {}

const Home = (props: Props) => {
  const router = useRouter();
const [transcribedText, setTranscribedText] = React.useState<string>('')
const [audioUrl, setAudioUrl] = React.useState<string>('')
const [loading, setLoading] = React.useState<boolean>(false)
const [error, setError] = React.useState<string>('')
const [showModal, setShowModal] = React.useState<boolean>(false)
const [isTranscribing,setIsTranscribing] =React.useState<boolean>(false)

const transcribeAudio = async () => {
  setIsTranscribing(true);
  try {
    const response = await fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ audioUrl: 'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3' })
    });

    if (response.ok) {
      const data = await response.json();
      setTranscribedText(data.transcript);
      setIsTranscribing(false);
         router.push(`/transcribe/${data.transcript}`);
    
    } else {
      setIsTranscribing(false);
      console.log(response);
    }
  } catch (error) {
    setIsTranscribing(false);
    console.error('Error:', error);
  }
};

  return (
    <>
     <div className='min-h-screen  flex justify-center items-center m-auto flex-col gap-y-2'>
        <h1 className='text-4xl font-bold '>Transcribe your audio</h1>
        <p className='text-lg pb-3'>Upload an audio file and we&apos;ll transcribe it for you</p>


    <Dialog >
    <DialogTrigger>
      <a  className='bg-neutral-950 text-white p-3 rounded-md'
      onClick={() => setShowModal(true)}>
        Upload Audio
      </a>
    </DialogTrigger>
    {
  showModal && (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          Choose a file
        </DialogTitle>
        <DialogDescription>
        <div className='flex flex-col'>
            <Input type='file' accept='audio/*' 
            onChange={(e) => {
              e.preventDefault()
             
              const file = e.target.files?.[0]
              if(file) {
                const url = URL.createObjectURL(file)
                setAudioUrl(url)
                setShowModal(false)
                console.log("url", url);
                
              }
            }}
            />
            </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
     )
    }
  </Dialog>
 


     {
       audioUrl && (
          <div className='flex flex-col gap-y-3 p-3'>
            <audio controls src={audioUrl}></audio>
            <Button onClick={() => transcribeAudio()}
           
            >
              {
                isTranscribing ? (
                  <Loader className='text-neutral-100 animate-spin' size={32} />
                ) : (
                  'Transcribe'
                )
              }
            </Button>
          </div>
       )
     }
     </div>

     {
        isTranscribing && (
          <Drawer
          open={isTranscribing}
          onClose={() => setIsTranscribing(false)}
        >
          <DrawerContent className='flex flex-col justify-center items-center mx-auto gap-y-2'>
            <DrawerHeader>
              <DrawerTitle>Transcribing</DrawerTitle>
              <DrawerDescription>
                Please wait while we transcribe your audio
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
             <Loader className='text-neutral-800 animate-spin' size={32} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>


        )
     }

   

    
    </>
    
  )
}

export default Home