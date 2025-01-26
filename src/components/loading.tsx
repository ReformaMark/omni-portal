import React from 'react';
import { Loader } from 'lucide-react';

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="animate-spin w-16 h-16 text-blue-500" />
    </div>
  );
}

export default Loading;