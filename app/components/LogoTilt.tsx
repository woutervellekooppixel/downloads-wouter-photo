'use client';
import { useEffect, useRef } from 'react';
import VanillaTilt from 'vanilla-tilt';

export default function LogoTilt() {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
      });
    }
  }, []);

  return (
    <div className="relative mt-10" ref={tiltRef}>
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded shadow animate-fade-in">
        Click to Download
      </div>
      <div className="w-32 h-32">
        <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2897.5 442.7" className="w-full h-full">
          <g>
            <path fill="#4d4d4d" d="M21,91.2h40c4.1,0,7.6,1,10.4,2.9,2.8,1.9,4.6,4.6,5.6,7.9l43.6,153.2c1.1,3.8,2,7.9,2.9,12.3s1.7,9.1,2.6,14.1c.9-5,2-9.7,3.1-14.1,1.1-4.4,2.3-8.5,3.6-12.3l50.3-153.2c.9-2.7,2.8-5.2,5.6-7.4,2.8-2.2,6.2-3.4,10.2-3.4h14c4.1,0,7.6,1,10.3,2.9,2.7,1.9,4.6,4.6,5.7,7.9l50,153.2c2.6,7.6,4.8,15.9,6.7,25.2.8-4.6,1.7-9,2.6-13.3s1.8-8.2,2.7-11.9l43.6-153.2c.8-3,2.7-5.5,5.5-7.6,2.8-2.1,6.3-3.2,10.3-3.2h37.4l-79.5,256.2h-43l-56-175c-.7-2.2-1.4-4.7-2.2-7.3-.8-2.6-1.5-5.4-2.2-8.3-.7,3-1.4,5.7-2.2,8.3-.8,2.6-1.5,5-2.2,7.3l-56.5,175h-43L21,91.2Z"/>
          </g>
        </svg>
      </div>
    </div>
  );
}
