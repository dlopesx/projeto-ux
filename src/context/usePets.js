import { useContext } from 'react'
import { PetsContext } from './PetsContext'

export function usePets() {
  return useContext(PetsContext)
}
