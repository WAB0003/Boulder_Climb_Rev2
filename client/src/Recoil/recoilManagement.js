import { atom } from 'recoil'

export const currentRoutes = atom({
    key: 'currentRoutes', 
    default: []
});

export const recoilSelectedDot = atom({
    key: 'recoilSelectedDot', 
    default: false
});

export const currentUser = atom({
    key: 'currentUser', 
    default: null
});

export const currentClimbs = atom({
    key: 'currentClimbs', 
    default: []
});

export const currentLikes = atom({
    key: 'currentLikes', 
    default: []
});

