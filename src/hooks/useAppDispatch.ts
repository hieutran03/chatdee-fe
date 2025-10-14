import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/app/redux/store'


export const useAppDispatch = () => useDispatch<AppDispatch>()
export default useAppDispatch