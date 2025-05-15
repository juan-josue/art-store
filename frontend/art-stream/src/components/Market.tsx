"use client";

import { useState, useRef } from "react";

type CardProps = {
  src: string;
  title: string;
  description: string;
};

const Card = ({ src, title, description }: CardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="relative size-full border-gray-500 border-1 rounded-md overflow-hidden"
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        videoRef.current?.pause();
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
        }
      }}
    >
      <video
        ref={videoRef}
        loop
        muted
        className="absolute left-0 top-0 size-full object-cover object-center"
        src={src}
      />
      <div className="absolute inset-0 bg-yellow-300/70 z-0 mix-blend-multiply pointer-events-none" />

      <div className="relative z-10 flex size-full flex-col justify-between p-4">
        <div>
          <h1 className="font-title font-bold uppercase text-xl text-background">
            {title}
          </h1>
          <p className="font-body text-sm text-background mt-4 max-w-64">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

type CardTiltProps = {
  children: React.ReactNode;
  className?: string;
};

const CardTilt = ({ children, className }: CardTiltProps) => {
  const [transformStyle, setTransformStyle] = useState<string>();

  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 10;
    const tiltY = (relativeX - 0.5) * -10;

    const newTransformStyle = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;

    setTransformStyle(newTransformStyle);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      className={`${className} transition-transform duration-100 ease-in-out`}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export default function Market() {
  return (
    <section className="py-64">
      <div className="px-8 md:px-32 mx-auto">
        <CardTilt className="h-96 w-full rounded-md overflow-hidden">
          <Card
            src={"/videos/bg-video-2.mp4"}
            title="Collect What Moves You"
            description="Explore a curated marketplace of original digital art. Buy directly from artists and build your unique collection."
          />
        </CardTilt>

        <div className="grid h-[110vh] mt-8 grid-cols-1 md:grid-cols-2 grid-rows-3 gap-8">
          <CardTilt className="row-span-1 md:col-span-1 md:row-span-2 rounded-md overflow-hidden">
            <Card
              src={"/videos/bg-video-3.mp4"}
              title="Start Your Art Business"
              description="Upload your work, set your prices, and run your own storefront with instant digital delivery."
            />
          </CardTilt>
          <div className="row-span-2 md:col-span-1 grid grid-rows-2 gap-8">
            <CardTilt className="row-span-1 md:col-span-1 rounded-md overflow-hidden">
              <Card
                src={"/videos/bg-video.mp4"}
                title="Streamlined & Sold"
                description="Instant downloads. No shipping drama. Sell to anyone, anywhere."
              />
            </CardTilt>
            <CardTilt className="row-span-1 md:col-span-1 rounded-md overflow-hidden">
              <Card
                src={"/videos/bg-video-4.mp4"}
                title="Built For Artists"
                description="Your art. Your name. Your store. Stay independent and keep your vision intact."
              />
            </CardTilt>
          </div>
        </div>
      </div>
    </section>
  );
}
