"use client";

import {UploadDropzone } from "@/lib/uploadthing";
import { XIcon } from "lucide-react";
import Image from "next/image";

type UploadImageProps = {
  onChange: (url: string) => void;
  value: string;
  endpoint: "imageUploader";
};

export default function UploadImage({
  onChange,
  value,
  endpoint,
}: UploadImageProps) {

  if (value) {
    return (
      <div className="w-1/2 p-4 aspect-[9/7] relative">
        <Image fill src={value} alt="image"  className="object-fill w-full h-full" />
        <button className="absolute top-2 right-2 bg-rose-500 p-1 rounded" onClick={() => onChange("")}>
          <XIcon className="size-4 text-white"/>
        </button>
      </div>
    );
  }

  return (
    <main className="p-4">
      <UploadDropzone
        endpoint={endpoint}
        uploadProgressGranularity="all"
        onClientUploadComplete={(res) => {
          onChange(res?.[0]?.ufsUrl);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
        className="[&>svg]:size-20 [&>button]:bg-blue-500 [&>button]:text-white [&>button]:px-4 [&>button]:rounded [&>button]:my-3 [&>button]:hover:scale-110 [&>button]:active:scale-95 transition-all duration-300 [&>button]:!cursor-pointer "
      />
      
    </main>
  );
}
