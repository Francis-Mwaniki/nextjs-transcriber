"use client"


import { Button } from '@/components/ui/button';
import { MenuIcon, Play, StopCircle, X } from 'lucide-react';
 import React, { useEffect, useRef, useState } from 'react';

const LipSync = () => {
  const [playing, setPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isMobile, setisMobile] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const transcript = "During the COVID lockdown, this headline went viral. Nearly half of men say they do most of the homeschooling. 3% of women agree. I bring this up not to debate who's right, but because it's a great example of something called egocentric bias. Most people think they do most of the work. For example, researchers have asked authors of multiard papers what percentage of the work they personally did, and when they add up those percentages, the sum is, on average, 140%. When couples are asked to estimate how much of the housework they do, the combined total is almost always over 100%. Now, you might think this is because people want to appear more helpful than they actually are, but that's not it. When couples are asked what fraction of the fights they start or how much of the mess is theirs, the total is again over 100. People think they do more of the work, but they also think they cause more of the problems. So why is this? I think it's simply because you experience and remember vividly all of what you do, but not all of what everyone else does. So naturally, you overestimate your own contributions and underestimate others. I think this bias leads us to underestimate the influence of other things on our lives, like the role luck plays in our success. Take hockey players, for example. If you ask a professional hockey player how they managed to reach the NHL, they might mention their hard work, determination, great coaches, their parents willingness to get up at 05:00 a.m. And so on. But they probably won't acknowledge how lucky they were to be born in January. And yet, in many years, 40% of hockey players selected into top tier leagues are born in the first quarter of the year, compared to just 10% in the fourth quarter. An early birthday can make you up to four times as likely to be a pro hockey player. And the reason for this disparity is presumably because the cutoff date for kids hockey leagues is January 1. Those born in the first part of the year are a little older, and so, on average, bigger and faster than kids in their league born late in the year. Now, as they grow up, this difference should eventually shrink to nothing. But it doesn't, because the young kids who show the most promise are given more time on the ice and enter more tournaments where they receive better coaching and improve their skills. And these advantages compound year after year. So by the time you get to the pros, birthdays are heavily skewed towards the start of the year. But does any professional hockey player feel thankful for their birthday? Probably not. And we are all like that, largely oblivious to the fortunate events that support our success. Probably the most significant bit of luck many of us enjoy is being born into a prosperous country. Around half the variance in income received by people around the world is explained by their country of residence and that country's income distribution. If you were born in Burundi, for example, which has the world's lowest gross national income per capita of just $730 a year, it doesn't matter how smart or hardworking you are, you're unlikely to earn much as an adult. Now, many people get offended if you point out how big a role chance plays in their success. And I get it. If we are just a product of our circumstances, then our hard work and our talent seem to count for nothing. People think it has to be either skill or luck that explains success. But the truth is, you need both. Take these eight track and field world records. All the athletes who achieved these records are obviously world class, extremely dedicated and talented. And yet, when they achieved their world records, seven out of eight had a tailwind. Now, these athletes all had the ability to win a gold medal. But to set the world record required a bit of luck as well. The importance of luck increases the greater the number of applicants applying for just a few spaces. Consider the most recent class of NASA astronauts. From over 18,300 applicants in 2017, only eleven were selected and went on to graduate from the astronaut training program. Now we can make a toy model of the selection process. Let's assume that astronauts are selected mostly based on skill, experience and hard work, but also, say 5% as a result of luck. Fortunate circumstances. For each applicant, I randomly generated a skill score out of 100. And I also randomly generated a luck score out of 100. Then I added those numbers together, weighted in the 95 to five ratio to get an overall score. This score represents the selector's judgments, meaning the top eleven, by this metric, would become astronauts. And I repeated this simulation a thousand times, representing a thousand different astronaut selections. And what I found was the astronauts who were picked were very lucky. They had an average luck score of 94.7. So how many of these selected astronauts would have been in the top eleven? Based on skill alone, the answer was, on average, only 1.6. That means, even with luck accounting for just 5% of the outcome, nine or maybe ten of the eleven applicants selected would have been different if luck played no role at all. When competition is fierce, being talented and hardworking is important. But it's not enough to guarantee success. You also need to catch a break. Largely, I think we're unaware of our good luck, because by definition, it's not something we did. Like the housework done by your significant other, it goes unappreciated. And here's the crazy thing. Downplaying the importance of chance events may actually improve your probability of success. Because if you perceive an outcome to be uncertain, you're less likely to invest effort in it, which further decreases your chances of success. So it's a useful delusion to believe you are in full control of your destiny. I mean, if I had known how bad I was when I started YouTube, or how much work it would take, I might have given up right then. Welcome to Veritasium, an online science video blog. Now, there may be another benefit to overlooking your lucky breaks. Which is it makes it easier to justify your place in society. If you have a lot of wealth or power, you can just chalk it up to your own intelligence, effort, and perseverance. It makes it easier to accept inequality. In one experiment, participants were put in groups of three in small rooms to discuss a complex moral problem, and one person in each group was randomly designated the team leader. Half an hour later, the experimenter came by with four cookies for each team. So who got the extra cookie? In each case, it went to the team leader. Even though they had no special aptitude, they didn't have extra responsibilities, and they'd gotten their position through chance alone. Once you have achieved a certain status, it seems natural to feel like you deserve it and all the other good things that come your way. Now, this is just an anecdote, but whenever I've been upgraded to fly a business class, I've always observed the worst behavior in my fellow privileged passengers. They just act so entitled and uncurteous, and research has found evidence for this as well. In another experiment, participants were asked to think of a good thing that happened to them recently. And then one group was asked to list their own personal qualities or actions that made that good thing happen. Another group was asked to list external factors beyond their control that led to the event, and a control group was simply asked to list reasons why the good thing happened. Now, for completing this task, participants were told they would be paid a dollar, but at the end, they were offered the option to donate some or all of the money to a charity. Results showed those who listed their own personal attributes contributed 25% less than those who listed external factors beyond their control. Now think of what all this means for people in our society, specifically for people in positions of power, like business leaders and politicians. Now, undoubtedly, most of them are talented and hardworking but they have also been luckier than most. And like most of us, they don't realize just how lucky they are, and this gives them a distorted view of reality. They're kind of living in a form of survivor bias. All these leaders have worked hard and ultimately succeeded. So to them, the world appears fair in their experience. It rewards hard work. But what they don't have is the experience of all the people who have worked hard and failed. So what are they to make of people less successful than themselves? Well, the natural conclusion is that they must just be less talented or less hardworking, and this perspective makes them less inclined to be generous, to give back. And they are the ones who set the rules for how society operates. And this is particularly unfortunate, since one of the main ways many of us are lucky is in our country of residence. But what is a country except for the things put there by people who came before, the roads and the schools, public transport, emergency services, clean air and water, everything like that? It seems a cruel trick of our psychology that successful people, without any malice, will credit their success largely to their own hard work and ingenuity, and therefore contribute less to maintaining the very circumstances that made that success possible in the first place. The good news is that acknowledging our fortunate circumstances not only brings us more in line with reality, it also makes us more likable. In a study where people had to read the transcript of a fictional 60 minutes interview with a biotech entrepreneur, experimenters tried changing just the last paragraph, where the interviewee is talking about the reasons for their company's success. In one version, the entrepreneur personally takes credit for the success they've had, but in the other, he says, luck played a significant role. Now, people who read the luck version of the transcript judged the entrepreneur as kinder and thought they'd be more likely to be close friends with him than those who read the other version of the transcript. And raising our awareness of fortunate events can also make us happier because it allows us to feel gratitude. Personally, I am grateful to Michael Stevens of VSOs, who on October 7, 2012 posted the video how much does a shadow weigh? Which shouts out my slow motion slinky drop video. And within three days my subscribers had increased by a third, and within a month they had doubled, leading me to quit my part time job and work exclusively on YouTube videos. And I'm grateful to the writer of the free newspaper they give out on the trains in Sydney who didn't quite understand electricity, leading me to post this picture of their article to my instagram with a caption, what's wrong with this picture? And I'm lucky that the first person to answer correctly was a beautiful woman who became my future wife. Yep, that is how I met your mother. Now, initially, I wanted to make this video just to say our circumstances and psychology conspire to make us oblivious to our own luck. And this leads successful people to view the world as fair and those less successful than them as less talented or less hardworking. And this is before you factor in any discrimination or prejudice. But it also became apparent to me that I should talk about what to do if you want to be successful in such a world. And I think the best advice is paradoxical. First, you must believe that you are in complete control of your destiny and that your success comes down only to your own talent and hard work. But second, you've got to know that's not true for you or anyone else. So you have to remember, if you do achieve success, that luck played a significant role. And given your good fortune, you should do what you can to increase the luck of others. Hey. So I had an idea for what I could do to increase the luck of others. And that is to give away 100 snatoms kits to people who couldn't otherwise afford them. So, if you didn't know, snatms is a product that I invented and kickstarted five years ago. It's a molecular modeling kit where all the atoms snap together magnetically. Now, I made it because I really wanted to tackle the misconception that bonds store energy. They don't. It takes energy to break them. And you can feel that with snatoms. Recently, I completely retooled snatoms. So there are small holes where the magnets are. This allows them to touch directly, increasing the bonding strength so you can form bigger, more stable molecules. I call these snatms x. And yes, they are backwards compatible with original snatums. So here's my idea for the next month, you can buy snatoms for 10% off using the code giveluck. And for each one sold, I will give a kit to someone who can't afford one, up to a limit of 100. So I'll put links and more details in the description. And I really want to thank you for watching and thank you for all my good luck.."; // Your transcript here
  const words = transcript.split(' ');
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
        src="https://res.cloudinary.com/dzvtkbjhc/video/upload/v1704312132/b3ogv9ydbgwqqfqruniq.mp3"
        onTimeUpdate={handleTimeUpdate}
      />
      <Button onClick={handlePlay} className=' bg-neutral-700 cursor-pointer z-10 w-[140px]' disabled={playing}>
        <Play size={30} className=' text-white' />
        <span className=' text-white text-lg'>
            {
                playing ? ('playing') : ('play')
            }
        </span>
      </Button>
      {
        playing && (
               <Button onClick={handleStop} className=' bg-neutral-700 cursor-pointer z-10 w-[140px]'>
        <StopCircle size={30} className=' text-white' />
        <span className=' text-white text-lg'>
          stop
        </span>
      </Button> 
        )
      }   
     
        </div>
     </div>

      <div className="mt-4 sm:absolute sm:w-[80%] w-[100%] sm:left-[20%] px-2 sm:overflow-hidden bg-neutral-50 rounded-lg">
        <div className=' overflow-y-auto sm:max-h-[500px] max-h-[90%] bg-neutral-200 max-w-[100%]  m-auto sm:p-3 p-3  rounded-lg'>
        {words.map((word, index) => (
          <span
            key={index}
            className={`inline-block ${
              index === currentWordIndex ? 'bg-yellow-300' : ''
            }`}
          >
            <div className='text-neutral-800 text-center px-1 sm:px-1  max-w-[80%] ' style={{ textAlign: 'justify', whiteSpace: 'pre-wrap' }}
            >{word}</div>
            
          </span>
        ))}
          </div>
      </div>
    </div>
  );
};

export default LipSync;
