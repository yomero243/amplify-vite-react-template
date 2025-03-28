import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, useFrame } from '@react-three/drei'
import type { Schema } from "../../amplify/data/resource"
import { useRef } from 'react'
import * as THREE from 'three'

interface TodoTreeProps {
  todos: Array<Schema["Todo"]["type"]>
}

function TodoNode({ todo, position, index }: { todo: Schema["Todo"]["type"], position: [number, number, number], index: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const textRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + index) * 0.2
    }
    if (textRef.current) {
      textRef.current.rotation.y = -state.camera.rotation.y
    }
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#ff6b6b"
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>
      <group ref={textRef}>
        <Text
          position={[0, 1, 0]}
          fontSize={0.2}
          color="black"
          anchorX="center"
          anchorY="middle"
          maxWidth={2}
        >
          {todo.content}
        </Text>
      </group>
    </group>
  )
}

export function TodoTree({ todos }: TodoTreeProps) {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <color attach="background" args={['#f0f0f0']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        {todos.map((todo, index) => (
          <TodoNode
            key={todo.id}
            todo={todo}
            index={index}
            position={[
              Math.cos(index * (2 * Math.PI / todos.length)) * 5,
              Math.sin(index * (2 * Math.PI / todos.length)) * 5,
              0
            ]}
          />
        ))}
        <OrbitControls 
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={20}
        />
      </Canvas>
    </div>
  )
} 