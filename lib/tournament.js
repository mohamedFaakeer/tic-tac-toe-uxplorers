import { db } from './firebase';
import { collection, doc, setDoc, getDoc, updateDoc, getDocs, query, where, orderBy } from 'firebase/firestore';

export async function createTournament(name, bracketSize) {
  const ref = doc(collection(db, 'tournaments'));
  await setDoc(ref, {
    id: ref.id,
    name,
    bracketSize,
    status: 'open',
    players: [],
    winner: null,
    round: 1,
    createdAt: new Date().toISOString()
  });
  return ref.id;
}

export async function joinTournament(tournamentId, userName) {
  const ref = doc(db, 'tournaments', tournamentId);
  const snap = await getDoc(ref);
  if (!snap.exists || snap.data().status !== 'open') return false;
  const data = snap.data();
  if (data.players.length >= data.bracketSize) return false;
  await updateDoc(ref, { players: [...data.players, userName] });
  return true;
}

export async function getTournaments() {
  const q = query(collection(db, 'tournaments'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
