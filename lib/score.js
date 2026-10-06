import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

export async function saveScore(userId, result) {
  const ref = doc(db, 'users', userId);
  const snap = await getDoc(ref);
  const data = snap.exists() ? snap.data() : { wins: 0, losses: 0, streak: 0, lastLogin: null };
  if (result === 'win') data.wins = (data.wins || 0) + 1;
  if (result === 'loss') data.losses = (data.losses || 0) + 1;
  const today = new Date().toISOString().split('T')[0];
  if (data.lastLogin !== today) data.streak = (data.streak || 0) + 1;
  data.lastLogin = today;
  await setDoc(ref, data, { merge: true });
  return data;
}

export async function getLeaderboard() {
  const q = query(collection(db, 'users'), orderBy('wins', 'desc'), orderBy('streak', 'desc'), limit(10));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
