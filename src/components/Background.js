import React from 'react';

export default function Background({ image, fade }) {
  const style = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: -1,
    opacity: fade ? 1 : 0,
    transition: 'opacity 1s ease-in-out',
  };

  return <div style={style}></div>;
}