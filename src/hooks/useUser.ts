'use client'

import { useUser as useAuthUser } from '@/components/AuthProvider'

export function useUser() {
  return useAuthUser()
}
