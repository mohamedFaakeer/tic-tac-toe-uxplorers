import { db } from './firebase';
import { collection, doc, setDoc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';

export async function createRoom(player1Name) {
  const roomRef = doc(collection(db, 'rooms'));
  await setDoc(roomRef, {
    roomId: roomRef.id,
    player1: player1Name,
    player2: null,
    boardState: Array(9).fill(null),
    currentTurn: 'X',
    status: 'waiting'
  });
  return roomRef.id;
}

export async function joinRoom(roomId, player2Name) {
  const ref = doc(db, 'rooms', roomId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return false;
  await updateDoc(ref, { player2: player2Name, status: 'playing' });
  return true;
}

export function listenRoom(roomId, callback) {
  const ref = doc(db, 'rooms', roomId);
  return onSnapshot(ref, (snap) => {
    if (snap.exists()) callback(snap.data());
  });
}
