import React from 'react';

function OrbitingRingsLoader() {
  return (
    <div className="relative w-16 h-16">
      <div className="absolute rounded-full border-4 border-purple-500 border-t-transparent animate-spin duration-1500"></div>
      <div className="absolute rounded-full border-4 border-pink-500 border-l-transparent animate-spin duration-1500 delay-500"></div>
      <div className="absolute rounded-full border-4 border-cyan-500 border-r-transparent animate-spin duration-1500 delay-1000"></div>
    </div>
  );
}

export default OrbitingRingsLoader;