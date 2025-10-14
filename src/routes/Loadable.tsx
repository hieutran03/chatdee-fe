import { ComponentType, LazyExoticComponent, Suspense } from 'react'
import LoadingScreen from '@/components/LoadingScreen'


export default function Loadable<T extends object>(Component: LazyExoticComponent<ComponentType<T>>){
return (props: T) => (
<Suspense fallback={<LoadingScreen/>}>
<Component {...props} />
</Suspense>
)
}