import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// Firebase web config — público por definição (vai no bundle entregue ao browser).
// Mantido aqui como fallback para builds sem as variáveis VITE_FIREBASE_*:
// o build do Cloudflare Workers não as tem, e sem isso getAuth() lança
// auth/invalid-api-key e o app inteiro deixa de montar (página em branco).
const FALLBACK_CONFIG = {
  apiKey: 'AIzaSyC-vaKmU_Sx5VzoTQbnAb2ToohlezkhW8s',
  authDomain: 'rclr-website.firebaseapp.com',
  projectId: 'rclr-website',
  storageBucket: 'rclr-website.firebasestorage.app',
  messagingSenderId: '348113281248',
  appId: '1:348113281248:web:ad7c6bb4f7aa6b5f21f085',
}

const env = import.meta.env

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || FALLBACK_CONFIG.apiKey,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || FALLBACK_CONFIG.authDomain,
  projectId: env.VITE_FIREBASE_PROJECT_ID || FALLBACK_CONFIG.projectId,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || FALLBACK_CONFIG.storageBucket,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || FALLBACK_CONFIG.messagingSenderId,
  appId: env.VITE_FIREBASE_APP_ID || FALLBACK_CONFIG.appId,
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const ADMIN_EMAILS = ['rafael@rclr.com.br', 'larissa@rclr.com.br']
