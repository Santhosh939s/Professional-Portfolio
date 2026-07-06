import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, useScroll } from '@react-three/drei';

export default function SpaceScene() {
  const starsRef = useRef();
  
  const scroll = useScroll();
  
  useFrame((state, delta) => {
    const scrollOffset = scroll.offset; // 0 to 1
    
    // Rotate stars slowly
    if (starsRef.current) {
      starsRef.current.rotation.y -= delta / 10;
      starsRef.current.rotation.x -= delta / 15;
    }
    
    // Animate camera position based on scroll (fly through space)
    state.camera.position.z = 5 - scrollOffset * 20;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ff8c00" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#4400ff" />
      
      <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </>
  );
}


