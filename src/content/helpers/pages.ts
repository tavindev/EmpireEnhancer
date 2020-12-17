import { getCurrentPath } from './locations'

export const isSteamDepositPage = (path = getCurrentPath()) =>
    /deposit\/steam$/.test(path)

export const isWithdrawPage = (path = getCurrentPath()) =>
    /withdraw\//.test(path)

/**
export const isPlayerProfileStats = path =>
  /players\/.+\/stats\//.test(path || getCurrentPath())

export const isPlayerProfile = path =>
  /players\/.*$/.test(path || getCurrentPath())
**/
