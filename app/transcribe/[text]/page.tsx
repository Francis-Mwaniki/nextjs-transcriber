"use client"
import { Button } from '@/components/ui/button';
import { DownloadCloudIcon, Home, MenuIcon, Play, Share, StopCircle, Trash, X } from 'lucide-react';
 import React, { useEffect, useRef, useState } from 'react';
 import { ArrowLeft, Check, Copy, Link } from 'lucide-react';
 import { saveAs } from 'file-saver';
 // Import necessary modules
 import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

 type Props = {
  params:{
    text: string;
  }
};
const LipSync  = ({ params }: Props) => {
  const [playing, setPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isMobile, setisMobile] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [newText, setNewText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();
  const { text } = params;

  useEffect(() => {
    if (text) {
      //localStorage.setItem('transcribedText', data.transcript);
      //localStorage.setItem('audioUrl', cloudinaryUrl);
      setNewText(localStorage.getItem('transcribedText') || '');
      setAudioUrl(localStorage.getItem('audioUrl') || '');
    }
    if(text === undefined) {
      router.push('/')
      localStorage.removeItem('transcribedText')
      localStorage.removeItem('audioUrl')
    }

  }
  , [text, router]);




  // const decodedText = decodeURIComponent(text).split('+').join(' ');

 
  const splitText = newText.split('. '); // Split by sentences
const chunkSize = 2; // Group by pairs

const groupedSentences: string[][] = splitText.reduce((result, sentence, index) => {
  const chunkIndex = Math.floor(index / chunkSize);

  if (!result[chunkIndex]) {
    result[chunkIndex] = []; // Initialize the array for each group
  }

  result[chunkIndex].push(sentence);

  return result;
}, [] as string[][]); // Initialize result as an array

const paragraphWithBreaks = groupedSentences
  .map(pair => pair.join('. '))
  .join('. \n\n');


  console.log(paragraphWithBreaks);
  


  const copyToClipboard = () => {
    setIsCopied(true);
    const textToCopy = paragraphWithBreaks;
    navigator.clipboard.writeText(textToCopy);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }


 
    const wordDuration = 0.35; // Adjust this value based on word duration
    const mobileClasses = 'inset-y-0 left-0 w-full block rounded-lg m-2 sm:hidden';
    const desktopClasses = 'top-0 bottom-0 left-0 fixed h-full w-[20%] px-2 sm:block hidden';

    useEffect(() => {
      if (mobileClasses) {
        /* resize */
        window.addEventListener('resize', () => {
          if (window.innerWidth > 640) {
            setisMobile(false);
          } else {
            setisMobile(true);
          }
        });
      }
    }
    , [mobileClasses]);



    


    
 useEffect(() => {
    if(audioRef.current) {

    
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      const currentTime = audio?.currentTime || 0;
      const index = Math.floor(currentTime / (wordDuration * audio.playbackRate));
      setCurrentWordIndex(index);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
}
  }, [wordDuration]);
  const handlePlay = () => {
    setPlaying(true);
    setCurrentWordIndex(0);
    if (audioRef.current) {
        audioRef.current.currentTime = 0;
      audioRef.current.play();

    }
  };
  const toggle=()=>{
    setisMobile(!isMobile)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const wordDuration = 1; // Adjust this value based on word duration
      const index = Math.floor(currentTime / wordDuration);
      setCurrentWordIndex(index);
    }
  };
  const handleStop = () => {
    setPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
  
  const shareText = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Audio Text',
          text: paragraphWithBreaks,
          url: window.location.href,
        })
        .then(() => {
          toast.success('Shared');
          console.log('Shared');
        })
        .catch((error) => {
          toast.error('Error sharing');
          console.log('Error sharing', error);
        })
    } else {
      toast.error('Share not supported');
      console.log('Share not supported');
    }
  };

  /* computed colors */
  const randomTextColors =()=>{
    //css colors
    const colors = [
      '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
      '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
      '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
      '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
      '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
      '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
      '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
      '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
      '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
      '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
    ] 
    for(let i = 0; i < colors.length; i++) {
      return colors[Math.floor(Math.random() * colors.length)]
    }
  }

  const handleDelete = () => {
    localStorage.removeItem('transcribedText');
    localStorage.removeItem('audioUrl');
    router.push('/')

  }


  const goHome = () => {
    localStorage.removeItem('transcribedText');
    localStorage.removeItem('audioUrl');
    router.push('/')
  }
 
  const handleExportPDF = () => {
   //use file saver
    const textToExport = paragraphWithBreaks;
    const blob = new Blob([textToExport], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'audio-text.txt');
  };

 

  return (
    <div className="p-4  min-h-screen  bg-neutral-100">
        <Button
        onClick={toggle}
        className=' sm:hidden'
        >
            {
                isMobile ? (
                    <>
                   <X size={30} className=' text-white' />
                    </>
                ) : (
                    <>
                     <MenuIcon size={30} className=' text-white' />
                     
                    </>
                )
            }
        </Button>
        <div className={` bg-neutral-900 z-20 ${
            isMobile ? mobileClasses : desktopClasses
        }`}>
            <div className=' sm:m-[80px]  p-4 gap-y-6 justify-center items-center flex-col flex'>

           
           <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Hi FRANC */}
      <div className='flex flex-row justify-center items-center gap-x-1 '>
        <span className='text-neutral-100 text-xs'>Hi, </span>
        <span className='text-neutral-100 text-xs'>Guest!</span>
      </div>
      <Button onClick={handlePlay} className=' bg-neutral-700 cursor-pointer z-10 w-[140px] flex gap-x-1' disabled={playing}>
        <Play size={30} 
         style={{color: `${randomTextColors()}`
        
        }}
        className={`animate-pulse
          text-[${randomTextColors()}]
        `} 
       
        />
        <span className=' text-white text-lg'>
            {
                playing ? ('playing') : ('play')
            }
        </span>
      </Button>
      {
        playing && (
               <Button onClick={handleStop} className=' bg-neutral-700 cursor-pointer z-10 w-[140px] flex gap-x-2'>
        <StopCircle size={30}
        

    
         className={`
          text-red-600
        `}  />
        <span className=' text-white text-lg'>
          stop
        </span>
      </Button> 
        )
      }   


    
{
  isCopied ? (
     <div className='flex flex-row justify-center items-center gap-x-1'>
    <Check className='text-green-500' size={24} />
     <span className='text-green-500 text-sm'>Copied!</span>
     </div>
  ) : (
    <div className='flex flex-row justify-center items-center gap-x-1'>
       <Copy className='text-neutral-100 cursor-pointer' size={24} onClick={() => copyToClipboard()} />
    <span className='text-neutral-100 text-sm'>Copy</span>
    </div>
 
   
  )
}
{/* home  */}
<div className='flex flex-row justify-center items-center gap-x-1'>
  <a className='flex flex-row justify-center items-center gap-x-1' onClick={goHome}>
    <Home className='text-neutral-100 cursor-pointer' size={24} />
    <span className='text-neutral-100 text-sm'>Home</span>
  </a>
</div>

{/* share text */}
<Button className='flex flex-row justify-center items-center gap-x-1'
onClick={() => {
  shareText
}
}
>
  <Share className='text-neutral-100 cursor-pointer' size={24} />
  <span className='text-neutral-100 text-sm'>Share</span>
</Button>
<Button onClick={handleExportPDF} className='bg-neutral-700 cursor-pointer z-10 w-[140px]  flex gap-x-2  '>
        <DownloadCloudIcon size={30}
         className={`
          text-white
        `}  />
        <span className=' text-white text-lg'>
          Export <span className=' text-xs'>(txt)</span>
        </span>
      </Button>
<Button onClick={handleDelete} className=' bg-neutral-700 cursor-pointer z-10 w-[140px] flex gap-x-2'>
        <Trash size={30}
        

    
         className={`
          text-red-600
        `}  />
        <span className=' text-white text-lg'>
          Delete
        </span>
      </Button> 
</div>
     
     
     </div>

      <div className="mt-4  sm:absolute sm:w-[80%] w-[100%] sm:left-[20%] px-2 sm:overflow-hidden sm:bg-white rounded-lg">
    
        <div id="textToExport" className=' overflow-y-auto sm:max-h-[500px] max-h-[90%] bg-neutral-100 max-w-[100%]  m-auto sm:p-3 p-3  rounded-lg '>
          <h1 className='text-3xl font-bold text-center my-2'>Audio Text</h1>
        <div className='flex flex-col justify-center items-center mx-auto gap-y-2 sm:shadow-none shadow'>
        <div className='text-neutral-800 text-center px-1 sm:px-5 rounded-lg py-2  sm:max-w-[80%] sm:shadow shadow-none' style={{ textAlign: 'justify', whiteSpace: 'pre-wrap' }}>
      {paragraphWithBreaks}
    </div>
    
    

    </div>
          </div>
           {/* francis mwaniki  copyright*/}
        
        <div className='flex flex-row justify-center items-center gap-x-1 bg-neutral-100 py-2'>
          <span className='text-neutral-700 text-sm'>Made with ❤️ by</span>
          <a href='https://www.francismwaniki.tech' target='_blank' className='text-neutral-700 text-sm'>Francis Mwaniki</a>
          <span className='text-neutral-700 text-sm'>|</span>
          <a href='https://www.github.com/Francis-Mwaniki' target='_blank' className='text-neutral-700 text-sm'>Github</a>
           </div>
      </div>
       
      
    </div>
  );
};

export default LipSync;
