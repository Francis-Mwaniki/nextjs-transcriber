"use client";
import { ArrowLeft, Check, Copy, Link } from 'lucide-react';
// Import necessary modules
import { useRouter } from 'next/navigation';
import { useState } from 'react';


type Props = {
  params:{
    text: string;
  }
};

// Create a functional component
const Transcribe = ({ params }: Props) => {
  const [newText, setNewText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();
  const { text } = params;

  const decodedText = decodeURIComponent(text).split('+').join(' ');

 
  const splitText = decodedText.split('. '); // Split by sentences
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
  
  
  // Now, use `paragraphWithBreaks` within your <p> tag to display the paragraph with line breaks after every two sentences.
  

  const copyToClipboard = () => {
    setIsCopied(true);
    const textToCopy = paragraphWithBreaks;
    navigator.clipboard.writeText(textToCopy);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }



  return (
    <div className='flex flex-col justify-center items-center mx-auto gap-y-2 my-3'>
      <h1 className='text-3xl font-bold text-center'>Audio Text</h1>
      <div className='flex flex-row justify-center items-center gap-x-1 my-2'>


    
      {
        isCopied ? (
           <div className='flex flex-row justify-center items-center gap-x-1'>
          <Check className='text-green-500' size={24} />
           <span className='text-green-500 text-sm'>Copied!</span>
           </div>
        ) : (
          <div className='flex flex-row justify-center items-center gap-x-1'>
             <Copy className='text-neutral-800 cursor-pointer' size={24} onClick={() => copyToClipboard()} />
          <span className='text-neutral-800 text-sm'>Copy</span>
          </div>
       
         
        )
      }
      {/* home  */}
      <div className='flex flex-row justify-center items-center gap-x-1'>
        <a className='flex flex-row justify-center items-center gap-x-1' onClick={() => router.push('/')}>
          <ArrowLeft className='text-neutral-800 cursor-pointer' size={24} />
          <span className='text-neutral-800 text-sm'>Home</span>
        </a>
      </div>
      </div>
    <div className='flex flex-col justify-center items-center mx-auto gap-y-2 sm:shadow-none shadow'>
    <div className='text-neutral-800 text-center px-1 sm:px-5 rounded-lg py-2  max-w-[80%] sm:shadow shadow-none' style={{ textAlign: 'justify', whiteSpace: 'pre-wrap' }}>
  {paragraphWithBreaks}
</div>


        </div>
    </div>
  );
}

export default Transcribe;