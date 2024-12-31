"use client"
import React from 'react';
import { Button } from './ui/button';
import { useView } from '@/contextApi/View';

const Landing = () => {
    const {viewChange}=useView();
  return (
    <div>
        Landing
        <Button onClick={()=>viewChange("space")}>Get Started</Button>
    </div>
  );
}

export default Landing;
