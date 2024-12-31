"use client"
import { useView } from '@/contextApi/View';
import React from 'react';
import { Button } from './ui/button';

const Space = () => {
  const {viewChange}=useView()
  return (
    <div>
         <h1>Select space Remote or Conference</h1>
         <Button onClick={()=>viewChange("remote")}>Remote</Button>
         <Button onClick={()=>viewChange("conference")}>confernence</Button>
    </div>
  );
}

export default Space;
