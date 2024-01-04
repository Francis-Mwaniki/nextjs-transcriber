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
import { Check, Copy, Edit, Edit3, Loader } from 'lucide-react';

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
const [showCookiesOnFirstVisit, setShowCookiesOnFirstVisit] = React.useState<boolean>(true)
const [isOverflowVisible, setIsOverflowVisible] = React.useState<boolean>(true)
const [isCopied, setIsCopied] = React.useState<boolean>(false)

const uploadFile = async (file: string | Blob) => {
  
  setupLoading(true);
  toast.success('Uploading started...');
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
      console.error('Failed to upload:', response.statusText);
      toast.error('Failed to upload');
      return null;
    }
  } catch (error) {
    setupLoading(false);
    toast.error('Error uploading ');
    console.error('Error uploading :', error);
    return null;
  }
};

useEffect(() => {
  if (audioUrl) {
    uploadFile(audioUrl);
  }
}
, [audioUrl]);



const handleCopyToClipboard = () => {
  const url = 'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3';
  navigator.clipboard.writeText(url);
  setIsCopied(true);
  toast.success('Copied to clipboard');
};

const toggleOverflow = () => {
  setIsOverflowVisible(true);
};

const transcribeAudio = async () => {
  setIsTranscribing(true);
  try {
    const response = await fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      /*  'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3' */ 
      body: JSON.stringify({ audioUrl: cloudinaryUrl })
    });

    if (response.ok) {
      const data = await response.json();
      setTranscribedText(data.transcript);
      localStorage.setItem('transcribedText', data.transcript);
      localStorage.setItem('audioUrl', cloudinaryUrl);
      setIsTranscribing(false);
      //trim to 30 words
      const encodedUrl = encodeURIComponent(data.transcript.slice(0, 30));
      console.log("encodedUrl", encodedUrl);
      
         router.push(`/transcribe/${encodedUrl}`)
    
    } else {
      setIsTranscribing(false);
      console.log(response);
    }
  } catch (error) {
    setIsTranscribing(false);
    console.error('Error:', error);
  }
};

/* TESTING  */

const testingTranscribeAudio = async () => {
  setIsTranscribing(true);
  try {
    const response = await fetch('/api/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      /*  'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3' */ 
      body: JSON.stringify({ audioUrl: 'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3' })
    });

    if (response.ok) {
      const data = await response.json();
      setTranscribedText(data.transcript);
      localStorage.setItem('transcribedText', data.transcript);
      localStorage.setItem('audioUrl', 'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3');
      setIsTranscribing(false);
      //trim to 30 words
      const encodedUrl = encodeURIComponent(data.transcript.slice(0, 30));
      console.log("encodedUrl", encodedUrl);
      
         router.push(`/transcribe/${encodedUrl}`)
    
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


// useEffect(() => {
//   if(showCookiesOnFirstVisit){
//    setTimeout(() => {
//       setShowCookiesOnFirstVisit(false)
//     }
//     , 10000);
//   }
// }
// , [showCookiesOnFirstVisit]);

  return (
    <div  className='min-h-screen flex justify-center items-center  overflow-hidden flex-col gap-y-2'>
      {
        showCookiesOnFirstVisit && (
          <div className='flex flex-col gap-y-2 p-3 
          bottom-0 right-0   bg-neutral-50
          filter drop-shadow-lg
          shadow-lg
          fixed z-50
           max-w-[400px] mx-auto
           max-h-[200px]
           my-auto
            backdrop-blur-lg
            rounded-md
            smooth
          '
        
          >
            <p className='text-neutral-800  text-sm text-start'>
              We use cookies to ensure you get the best experience on our website
            </p>
            <p className='text-neutral-800   text-sm text-start'>
              We do not store any of your data
            </p>
            <div className='flex flex-row gap-x-2 w-full'>
            <Button onClick={() => setShowCookiesOnFirstVisit(false)} className='bg-neutral-700 text-white flex justify-center items-center justify-self-center w-full'>
              <Check size={24} className='text-white' />
              <span className='text-white'>Got it</span>
            </Button>
            
            </div>

          </div>

        )
      }
     <div className='  flex justify-center items-center  flex-col gap-y-2'>
        <h1 className='text-4xl font-bold  flex flex-row'>Transcribe your audio
         <span className='text-gray-500 sm:block hidden'> ...</span>
        </h1>
        <p className='sm:text-lg text-sm pb-3'>Upload an audio file and we&apos;ll transcribe it for you</p>

        {/* for testing use this https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3 to transcribe */}

        <div  className=' text-sm text-gray-500 flex justify-center items-center sm:flex-row flex-col gap-y-4 my-3 gap-x-2'>
          <span className=''>For testing purposes, you can use this</span>
           {/* copy  */}
           <span
    className='cursor-pointer text-blue-500 w-50 inline-flex justify-center items-center gap-x-1 flex-row'
    onClick={handleCopyToClipboard}
  >
    {/* Apply overflow styles to control text display */}
    <span
      className={`inline-block  overflow-hidden${isOverflowVisible ? ' w-[150px] py-1 bg-gray-300 rounded overflow-x-auto' : ''}`}
      style={{ maxWidth: '100%', whiteSpace: 'nowrap' }}
      onClick={toggleOverflow}
    >
      https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3
      
    </span>
    <Copy size={16} className='text-blue-500' />
  </span>

        </div>

        {
          uploading && (
            <div className='flex flex-col gap-y-3 p-3 justify-center items-center'>
              <Loader className='text-neutral-800 animate-spin' size={32} />
              <p className='text-neutral-800'>
                Please wait, We&apos;re converting your audio!
              </p>
            </div>
          )
        }


    <Dialog >
    <DialogTrigger>
      <a  className='bg-neutral-950  p-3 rounded-md flex justify-center items-center gap-x-2'
      onClick={() => setShowModal(true)}>
         <Edit3 size={24} className='text-white' />
          <span className='text-white'>Upload audio</span>
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
                /* not less 500kbs */
                if(file?.size < 500000) {
                  toast.error('File size must be greater than 500kb')
                  setShowModal(false)
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
     {
      /* Testing only */
      
        isCopied && (
          <div className='flex flex-col gap-y-3 p-3'>
            <audio controls src="https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3"></audio>
            <Button 
            className={` ${uploading ? 'bg-gray-500 cursor-not-allowed' : ''} text-white`}
            disabled={uploading}
            onClick={() => testingTranscribeAudio()}
           
            >
              {
                isTranscribing ? (
                  <Loader className='text-neutral-100 animate-spin' size={32} />
                ) : (
                  'simulate transcribe'
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
         
        >
          <DrawerContent className='flex flex-col justify-center items-center mx-auto gap-y-2'>
            <DrawerHeader>
              <DrawerTitle>Transcribing</DrawerTitle>
              <DrawerDescription>
               Please wait, this may take a while
              </DrawerDescription>
              <DrawerDescription>
               You can close this window and continue with other tasks
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
             <Loader className='text-neutral-800 animate-spin' size={32} />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>


        )
     }

   

<div className='flex flex-row justify-center items-center gap-x-1  py-2 mt-10'>
          <span className='text-gray-500 text-sm'>Made with ❤️ by</span>
          <a href='https://www.francismwaniki.tech' target='_blank' className='text-gray-500 text-sm'>Francis Mwaniki</a>
          <span className='text-gray-500 text-sm'>|</span>
          <a href='https://www.github.com/Francis-Mwaniki' target='_blank' className='text-gray-500 text-sm'>Github</a>
           </div>
    </div>
    
  )
}

export default Home