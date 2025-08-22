'use client';
import { useEffect } from 'react';
import { makeServer } from '@/mirage/server';

export default function InitServer() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      makeServer();
      console.log('✅ MirageJS Mock API started');
    }
  }, []);

  return null;
}
