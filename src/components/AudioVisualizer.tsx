import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

export function AudioVisualizer({ size = 'md', color = '#7a5af8', type = 'bars' }: { size?: 'sm' | 'md' | 'lg'; color?: string; type?: 'bars' | 'circle' | 'wave' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isPlaying = useStore(s => s.isPlaying);
  const animRef = useRef<number>(0);
  const barsRef = useRef<number[]>([]);

  const dims = size === 'sm' ? { w: 80, h: 40 } : size === 'md' ? { w: 200, h: 80 } : { w: 300, h: 120 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const barCount = type === 'circle' ? 64 : 32;
    if (barsRef.current.length === 0) {
      barsRef.current = Array.from({ length: barCount }, () => Math.random() * 0.3);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (type === 'bars') {
        const barWidth = canvas.width / barCount;
        const gap = 2;
        barsRef.current.forEach((_val, i) => {
          if (isPlaying) {
            barsRef.current[i] += (Math.random() - 0.5) * 0.15;
            barsRef.current[i] = Math.max(0.05, Math.min(1, barsRef.current[i]));
          } else {
            barsRef.current[i] *= 0.95;
            barsRef.current[i] = Math.max(0.05, barsRef.current[i]);
          }
          const h = barsRef.current[i] * canvas.height;
          const gradient = ctx.createLinearGradient(0, canvas.height - h, 0, canvas.height);
          gradient.addColorStop(0, color);
          gradient.addColorStop(1, color + '40');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.roundRect(i * barWidth + gap / 2, canvas.height - h, barWidth - gap, h, 2);
          ctx.fill();
        });
      } else if (type === 'wave') {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        barsRef.current.forEach((_val, i) => {
          if (isPlaying) {
            barsRef.current[i] += (Math.random() - 0.5) * 0.1;
            barsRef.current[i] = Math.max(0.1, Math.min(1, barsRef.current[i]));
          } else {
            barsRef.current[i] = 0.5 + Math.sin(i * 0.2) * 0.02;
          }
          const x = (i / barCount) * canvas.width;
          const y = canvas.height / 2 + (barsRef.current[i] - 0.5) * canvas.height * 0.8;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
      } else if (type === 'circle') {
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const radius = Math.min(cx, cy) * 0.5;
        barsRef.current.forEach((_val, i) => {
          if (isPlaying) {
            barsRef.current[i] += (Math.random() - 0.5) * 0.12;
            barsRef.current[i] = Math.max(0.1, Math.min(1, barsRef.current[i]));
          } else {
            barsRef.current[i] *= 0.97;
            barsRef.current[i] = Math.max(0.1, barsRef.current[i]);
          }
          const angle = (i / barCount) * Math.PI * 2;
          const barH = barsRef.current[i] * radius * 0.8;
          const x1 = cx + Math.cos(angle) * radius;
          const y1 = cy + Math.sin(angle) * radius;
          const x2 = cx + Math.cos(angle) * (radius + barH);
          const y2 = cy + Math.sin(angle) * (radius + barH);
          ctx.beginPath();
          ctx.strokeStyle = color + Math.floor(barsRef.current[i] * 255).toString(16).padStart(2, '0');
          ctx.lineWidth = 3;
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        });
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, color, type, dims]);

  return <canvas ref={canvasRef} width={dims.w} height={dims.h} className="opacity-90" />;
}
