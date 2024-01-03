"use client";
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from "sonner"
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
const [audioUrl, setAudioUrl] = React.useState<string | Blob>('')
const [cloudinaryUrl, setCloudinaryUrl] = React.useState<string>('')
const [audioBlob, setAudioBlob] = React.useState<Blob | null>(null)
const [previewUrl, setPreviewUrl] = React.useState<string>('')
const [uploading, setupLoading] = React.useState<boolean>(false)
const [error, setError] = React.useState<string>('')
const [showModal, setShowModal] = React.useState<boolean>(false)
const [isTranscribing,setIsTranscribing] =React.useState<boolean>(false)

const uploadFile = async (file: string | Blob) => {
  setupLoading(true);
  toast.success('Uploading to Cloudinary');
  const cloudName = 'dzvtkbjhc'; // Replace with your Cloudinary cloud name
  const unsignedUploadPreset = 'c5gngmqw'; // Replace with your Cloudinary unsigned upload preset

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  const formData = new FormData();

  formData.append('upload_preset', unsignedUploadPreset);
  formData.append('tags', 'browser_upload');
  formData.append('file', file);

  try {
    toast.success('Almost there...')
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    if (response.ok) {
      toast.success('Finishing up...');
      const data = await response.json();
      const url = data.secure_url;
      console.log('Uploaded to Cloudinary:', url);
      toast.success('Uploaded, click transcribe');
      setCloudinaryUrl(url);
      console.log('cloudinaryUrl', cloudinaryUrl);
      setupLoading(false);
      return url;
    } else {
      setupLoading(false);
      console.error('Failed to upload to Cloudinary:', response.statusText);
      toast.error('Failed to upload to Cloudinary');
      return null;
    }
  } catch (error) {
    setupLoading(false);
    toast.error('Error uploading to Cloudinary');
    console.error('Error uploading to Cloudinary:', error);
    return null;
  }
};

useEffect(() => {
  if (audioUrl) {
    uploadFile(audioUrl);
  }
}
, [audioUrl]);




const transcribeAudio = async () => {
  setIsTranscribing(true);
  try {
    const response = await fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      /* 'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3' */
      body: JSON.stringify({ audioUrl:  cloudinaryUrl })
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


useEffect(() => {
  if (!cloudinaryUrl) {
    console.log('cloudinaryUrl', cloudinaryUrl);
    
    setShowModal(false)
  }
}
, [cloudinaryUrl]);



  return (
    <>
     <div className='min-h-screen  flex justify-center items-center m-auto flex-col gap-y-2'>
        <h1 className='text-4xl font-bold '>Transcribe your audio</h1>
        <p className='text-lg pb-3'>Upload an audio file and we&apos;ll transcribe it for you</p>

        {
          uploading && (
            <div className='flex flex-col gap-y-3 p-3 justify-center items-center'>
              <Loader className='text-neutral-800 animate-spin' size={32} />
              <p className='text-neutral-800'>Uploading to Cloudinary</p>
            </div>
          )
        }


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
              /* check if file exceeds 10mbs */
             
              if(file) {
                if(file?.size > 10000000) {
                  toast.error('File size exceeds 10mb')
                  setShowModal(false)
                  return
                }
                if(!file.type.includes('audio')) {
                  toast.error('File must be an audio file')
                  return
                }
                
                else {
                  const url = URL.createObjectURL(file)
                setPreviewUrl(url)
                setAudioUrl(file)
                setShowModal(false)
                console.log("url", file);

                /*  */

                }
                
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
        previewUrl && (
          <div className='flex flex-col gap-y-3 p-3'>
            <audio controls src={previewUrl}></audio>
            <Button 
            className={` ${uploading ? 'bg-gray-500 cursor-not-allowed' : ''} text-white`}
            disabled={uploading}
            onClick={() => transcribeAudio()}
           
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
               Please wait, this may take a while
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