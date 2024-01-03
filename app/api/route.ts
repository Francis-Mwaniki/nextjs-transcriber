import { NextResponse } from "next/server";
import { AssemblyAI } from 'assemblyai';
import * as dotenv from 'dotenv';
dotenv.config();
export async function POST(req: Request, res: Response) {
     const apiKey = process.env.ASSEMBLY_API_KEY || '';

  const body = await req.json();
// const audioUrl = 'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3';

const client =  new AssemblyAI({
   apiKey: apiKey,
});

const data = {
    audio_url: body.audioUrl,
}

if(!body.audioUrl){
console.log("audio url is required");
  
  return NextResponse.json({
    Error: 'Audio Url is required',
    status: 400
  })
}

const transcript = await client.transcripts.create(data);

 if(transcript.text){
  const sentences = transcript.text.split(', ');
  const text = sentences.join('.\n\n');
  console.log("text", text);

  
  return NextResponse.json({
    transcript: text,
    status: 200
  })
}



return NextResponse.json({
  Error: 'Something went wrong',
  status: 500
})

}