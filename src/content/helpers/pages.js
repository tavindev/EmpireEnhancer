import { getCurrentPath } from './locations'

export const isSteamDepositPage = path =>
  /deposit\/steam$/.test(path || getCurrentPath())

/**
export const isPlayerProfileStats = path =>
  /players\/.+\/stats\//.test(path || getCurrentPath())

export const isPlayerProfile = path =>
  /players\/.*$/.test(path || getCurrentPath())
**/
