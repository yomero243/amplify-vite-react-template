declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: JSX.IntrinsicElements['div'] & { position?: [number, number, number] }
      mesh: JSX.IntrinsicElements['div'] & { position?: [number, number, number] }
      sphereGeometry: JSX.IntrinsicElements['div'] & { args?: [number, number, number] }
      meshStandardMaterial: JSX.IntrinsicElements['div'] & { color?: string }
      ambientLight: JSX.IntrinsicElements['div'] & { intensity?: number }
      pointLight: JSX.IntrinsicElements['div'] & { position?: [number, number, number] }
    }
  }
} 