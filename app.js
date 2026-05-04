'use strict';

const VG = (() => {
  const KEY = {
    USERS: 'vg_users', USER: 'vg_user',
    EXERCISES: 'vg_exercises', ROUTINES: 'vg_routines', SESSIONS: 'vg_sessions',
  };

  const today = () => new Date().toISOString().split('T')[0];
  const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
  const load = k => { try { return JSON.parse(localStorage.getItem(k)); } catch { return null; } };
  const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  const SEED = {
    users: [
      { id: 'admin-1', name: 'Admin Vital', email: 'admin@vitalgym.com', password: 'admin123', role: 'admin', createdAt: '2024-01-01' },
      { id: 'user-1', name: 'Juan Pérez', email: 'juan@vitalgym.com', password: '1234', role: 'user', age: 25, weight: 78, height: 178, level: 'inicial', objective: 'volumen', routineId: 'routine-1', createdAt: '2024-02-15', streak: 5 },
      { id: 'user-2', name: 'Carlos Gómez', email: 'carlos@vitalgym.com', password: '1234', role: 'user', age: 30, weight: 85, height: 182, level: 'intermedio', objective: 'fuerza', routineId: 'routine-2', createdAt: '2024-03-01', streak: 12 },
      { id: 'user-3', name: 'Lucía Martínez', email: 'lucia@vitalgym.com', password: '1234', role: 'user', age: 28, weight: 62, height: 165, level: 'avanzado', objective: 'definicion', routineId: null, createdAt: '2024-03-15', streak: 8 },
    ],
    exercises: [
      { id: 'ex-1', name: 'Press pecho máquina', muscleGroup: 'Pecho', videoUrl: 'https://www.youtube.com/watch?v=TAH8RxOS0VI', equipment: 'Máquina', description: 'Ejercicio básico para el desarrollo del pecho con máquina.' },
      { id: 'ex-2', name: 'Jalón al pecho', muscleGroup: 'Espalda', videoUrl: 'https://www.youtube.com/shorts/TcYwpzaRS1I', equipment: 'Polea', description: 'Trabaja el dorsal ancho jalando desde la polea alta.' },
      { id: 'ex-3', name: 'Sentadilla guiada', muscleGroup: 'Piernas', videoUrl: 'https://www.youtube.com/shorts/a6NWs-YHUfY', equipment: 'Máquina Smith', description: 'Sentadilla con guía Smith ideal para principiantes.' },
      { id: 'ex-4', name: 'Prensa de piernas', muscleGroup: 'Piernas', videoUrl: 'https://www.youtube.com/shorts/8gPJfr-2aRM', equipment: 'Máquina', description: 'Prensa para cuádriceps, glúteos e isquiotibiales.' },
      { id: 'ex-5', name: 'Curl bíceps polea', muscleGroup: 'Bíceps', videoUrl: 'https://www.youtube.com/shorts/6TXJGZY_FTQ', equipment: 'Polea', description: 'Curl de bíceps con polea baja para contracción constante.' },
      { id: 'ex-6', name: 'Tríceps soguita', muscleGroup: 'Tríceps', videoUrl: 'https://www.youtube.com/shorts/vqq2NowgTrk', equipment: 'Polea', description: 'Extensión de tríceps con cuerda en polea alta.' },
      { id: 'ex-7', name: 'Press militar', muscleGroup: 'Hombros', videoUrl: 'https://www.youtube.com/shorts/DdITN8U-kFI', equipment: 'Barra', description: 'Press de hombros con barra para deltoides anterior.' },
      { id: 'ex-8', name: 'Remo sentado polea', muscleGroup: 'Espalda', videoUrl: 'https://www.youtube.com/shorts/I3Wi6GK0QMk', equipment: 'Polea', description: 'Remo en polea baja para espalda media y dorsal.' },
      { id: 'ex-9', name: 'Peck deck', muscleGroup: 'Pecho', videoUrl: 'https://www.youtube.com/shorts/a9vQ_hwIksU', equipment: 'Máquina', description: 'Apertura en máquina para el pecho interno.' },
      { id: 'ex-10', name: 'Curl femoral', muscleGroup: 'Piernas', videoUrl: 'https://www.youtube.com/shorts/ENDnSAkatcw', equipment: 'Máquina', description: 'Curl de femorales tumbado.' },
      { id: 'ex-11', name: 'Extensión de piernas', muscleGroup: 'Piernas', videoUrl: 'https://www.youtube.com/shorts/oQM875T39M4', equipment: 'Máquina', description: 'Extensión de cuádriceps en máquina.' },
      { id: 'ex-12', name: 'Caminadora', muscleGroup: 'Cardio', videoUrl: 'https://www.youtube.com/shorts/4_knzdF1VwQ', equipment: 'Caminadora', description: 'Cardio moderado en caminadora.' },
      { id: 'ex-13', name: 'Curl bíceps mancuerna', muscleGroup: 'Bíceps', videoUrl: 'https://www.youtube.com/shorts/WrpQYs_n_Pw', equipment: 'Mancuernas', description: 'Curl alternado con mancuernas.' },
      { id: 'ex-14', name: 'Tríceps polea', muscleGroup: 'Tríceps', videoUrl: 'https://www.youtube.com/shorts/S1mPrwz8JWI', equipment: 'Polea', description: 'Extensión de tríceps en polea alta.' },
      { id: 'ex-15', name: 'Remo alto polea', muscleGroup: 'Hombros', videoUrl: 'https://www.youtube.com/shorts/Cy7DQiFqoZU', equipment: 'Polea', description: 'Remo al mentón para deltoides y trapecio.' },
      { id: 'ex-16', name: 'Gemelos máquina', muscleGroup: 'Piernas', videoUrl: 'https://www.youtube.com/shorts/goHLe1fninw', equipment: 'Máquina', description: 'Elevaciones de talón en máquina.' },
      { id: 'ex-17', name: 'Estocadas mancuernas', muscleGroup: 'Piernas', videoUrl: 'https://www.youtube.com/shorts/hYOP0SfeERI', equipment: 'Mancuernas', description: 'Zancadas alternadas con mancuernas.' },
      { id: 'ex-18', name: 'Bicicleta estática', muscleGroup: 'Cardio', videoUrl: 'https://www.youtube.com/shorts/LB8SCNImZn8', equipment: 'Bicicleta', description: 'Cardio en bicicleta estática.' },
      { id: 'ex-19', name: 'Elíptico', muscleGroup: 'Cardio', videoUrl: 'https://www.youtube.com/shorts/0-KKJe9l8Zw', equipment: 'Elíptico', description: 'Cardio de bajo impacto en elíptico.' },
      { id: 'ex-20', name: 'Peso muerto', muscleGroup: 'Espalda', videoUrl: 'https://www.youtube.com/watch?v=r4MzxtBKyNE', equipment: 'Barra', description: 'Ejercicio compuesto para espalda baja, glúteos e isquiotibiales.' },
    ],
    routines: [
      {
        id: 'routine-1', name: 'Inicial – Full Body 3 Días', level: 'inicial', objective: 'volumen', gender: 'hombre', createdAt: '2024-01-01',
        days: [
          { id: 'r1d1', name: 'Día 1 – Full Body A', exercises: [
            { exerciseId: 'ex-1', sets: 3, reps: 12, rest: 60 }, { exerciseId: 'ex-2', sets: 3, reps: 12, rest: 60 },
            { exerciseId: 'ex-3', sets: 3, reps: 12, rest: 90 }, { exerciseId: 'ex-4', sets: 3, reps: 15, rest: 90 },
            { exerciseId: 'ex-5', sets: 3, reps: 12, rest: 60 }, { exerciseId: 'ex-6', sets: 3, reps: 12, rest: 60 },
            { exerciseId: 'ex-12', sets: 1, reps: 0, rest: 0, duration: '10 min' },
          ]},
          { id: 'r1d2', name: 'Día 2 – Full Body B', exercises: [
            { exerciseId: 'ex-7', sets: 3, reps: 12, rest: 60 }, { exerciseId: 'ex-8', sets: 3, reps: 12, rest: 60 },
            { exerciseId: 'ex-17', sets: 3, reps: 12, rest: 90 }, { exerciseId: 'ex-11', sets: 3, reps: 15, rest: 60 },
            { exerciseId: 'ex-10', sets: 3, reps: 15, rest: 60 }, { exerciseId: 'ex-18', sets: 1, reps: 0, rest: 0, duration: '12 min' },
          ]},
          { id: 'r1d3', name: 'Día 3 – Full Body C', exercises: [
            { exerciseId: 'ex-9', sets: 3, reps: 12, rest: 60 }, { exerciseId: 'ex-15', sets: 3, reps: 12, rest: 60 },
            { exerciseId: 'ex-3', sets: 3, reps: 12, rest: 90 }, { exerciseId: 'ex-16', sets: 3, reps: 20, rest: 60 },
            { exerciseId: 'ex-13', sets: 3, reps: 12, rest: 60 }, { exerciseId: 'ex-14', sets: 3, reps: 12, rest: 60 },
            { exerciseId: 'ex-19', sets: 1, reps: 0, rest: 0, duration: '10 min' },
          ]},
        ],
      },
      {
        id: 'routine-2', name: 'Intermedio – Push/Pull/Legs 5 Días', level: 'intermedio', objective: 'fuerza', gender: 'hombre', createdAt: '2024-01-15',
        days: [
          { id: 'r2d1', name: 'Día 1 – Pecho y Tríceps', exercises: [
            { exerciseId: 'ex-1', sets: 4, reps: 10, rest: 90 }, { exerciseId: 'ex-9', sets: 3, reps: 12, rest: 60 },
            { exerciseId: 'ex-6', sets: 4, reps: 12, rest: 60 }, { exerciseId: 'ex-14', sets: 3, reps: 12, rest: 60 },
          ]},
          { id: 'r2d2', name: 'Día 2 – Espalda y Bíceps', exercises: [
            { exerciseId: 'ex-2', sets: 4, reps: 10, rest: 90 }, { exerciseId: 'ex-8', sets: 4, reps: 12, rest: 60 },
            { exerciseId: 'ex-20', sets: 3, reps: 8, rest: 120 }, { exerciseId: 'ex-5', sets: 4, reps: 12, rest: 60 },
            { exerciseId: 'ex-13', sets: 3, reps: 12, rest: 60 },
          ]},
          { id: 'r2d3', name: 'Día 3 – Piernas', exercises: [
            { exerciseId: 'ex-3', sets: 4, reps: 10, rest: 120 }, { exerciseId: 'ex-4', sets: 4, reps: 12, rest: 90 },
            { exerciseId: 'ex-11', sets: 3, reps: 15, rest: 60 }, { exerciseId: 'ex-10', sets: 3, reps: 15, rest: 60 },
            { exerciseId: 'ex-16', sets: 4, reps: 20, rest: 60 },
          ]},
          { id: 'r2d4', name: 'Día 4 – Hombros y Trapecio', exercises: [
            { exerciseId: 'ex-7', sets: 4, reps: 10, rest: 90 }, { exerciseId: 'ex-15', sets: 3, reps: 12, rest: 60 },
          ]},
          { id: 'r2d5', name: 'Día 5 – Full Body + Cardio', exercises: [
            { exerciseId: 'ex-1', sets: 3, reps: 12, rest: 60 }, { exerciseId: 'ex-2', sets: 3, reps: 12, rest: 60 },
            { exerciseId: 'ex-3', sets: 3, reps: 12, rest: 90 }, { exerciseId: 'ex-12', sets: 1, reps: 0, rest: 0, duration: '15 min' },
          ]},
        ],
      },
    ],
    sessions: [
      { id: 's-1', userId: 'user-1', routineId: 'routine-1', dayId: 'r1d1', date: '2024-04-29', duration: 52, completed: true },
      { id: 's-2', userId: 'user-1', routineId: 'routine-1', dayId: 'r1d2', date: '2024-05-01', duration: 48, completed: true },
      { id: 's-3', userId: 'user-1', routineId: 'routine-1', dayId: 'r1d3', date: '2024-05-03', duration: 55, completed: true },
      { id: 's-4', userId: 'user-1', routineId: 'routine-1', dayId: 'r1d1', date: '2024-05-06', duration: 50, completed: true },
      { id: 's-5', userId: 'user-1', routineId: 'routine-1', dayId: 'r1d2', date: '2024-05-08', duration: 47, completed: true },
      { id: 's-6', userId: 'user-2', routineId: 'routine-2', dayId: 'r2d1', date: '2024-05-07', duration: 60, completed: true },
      { id: 's-7', userId: 'user-2', routineId: 'routine-2', dayId: 'r2d2', date: '2024-05-08', duration: 65, completed: true },
    ],
  };

  return {
    init() {
      if (!load(KEY.USERS)) save(KEY.USERS, SEED.users);
      if (!load(KEY.EXERCISES)) save(KEY.EXERCISES, SEED.exercises);
      if (!load(KEY.ROUTINES)) save(KEY.ROUTINES, SEED.routines);
      if (!load(KEY.SESSIONS)) save(KEY.SESSIONS, SEED.sessions);
    },

    me() { return load(KEY.USER); },
    isAdmin() { return this.me()?.role === 'admin'; },
    loggedIn() { return !!this.me(); },

    guard(to = 'login.html') { if (!this.loggedIn()) location.href = to; },
    adminGuard(to = 'dashboard-usuario.html') { if (!this.isAdmin()) location.href = to; },

    login(email, pw) {
      const user = (load(KEY.USERS) || []).find(u => u.email === email && u.password === pw);
      if (!user) return { ok: false, err: 'Email o contraseña incorrectos' };
      save(KEY.USER, user);
      return { ok: true, user };
    },
    logout() { localStorage.removeItem(KEY.USER); location.href = 'index.html'; },
    register(data) {
      const users = load(KEY.USERS) || [];
      if (users.find(u => u.email === data.email)) return { ok: false, err: 'El email ya está registrado' };
      const u = { id: uid(), role: 'user', createdAt: today(), streak: 0, ...data };
      users.push(u); save(KEY.USERS, users); save(KEY.USER, u);
      return { ok: true, user: u };
    },

    users() { return load(KEY.USERS) || []; },
    getUser(id) { return this.users().find(u => u.id === id); },
    saveUser(id, patch) {
      const all = this.users(), i = all.findIndex(u => u.id === id);
      if (i < 0) return false;
      all[i] = { ...all[i], ...patch }; save(KEY.USERS, all);
      if (this.me()?.id === id) save(KEY.USER, all[i]);
      return all[i];
    },
    createUser(data) {
      const users = this.users();
      if (users.find(u => u.email === data.email)) return { ok: false, err: 'Email ya registrado' };
      const u = { id: uid(), role: 'user', createdAt: today(), streak: 0, ...data };
      users.push(u); save(KEY.USERS, users); return { ok: true, user: u };
    },
    deleteUser(id) { save(KEY.USERS, this.users().filter(u => u.id !== id)); },

    exercises() { return load(KEY.EXERCISES) || []; },
    getExercise(id) { return this.exercises().find(e => e.id === id); },
    addExercise(data) {
      const all = this.exercises(), e = { id: uid(), ...data };
      all.push(e); save(KEY.EXERCISES, all); return e;
    },
    updateExercise(id, patch) {
      const all = this.exercises(), i = all.findIndex(e => e.id === id);
      if (i < 0) return false; all[i] = { ...all[i], ...patch }; save(KEY.EXERCISES, all); return all[i];
    },
    deleteExercise(id) { save(KEY.EXERCISES, this.exercises().filter(e => e.id !== id)); },

    routines() { return load(KEY.ROUTINES) || []; },
    getRoutine(id) { return this.routines().find(r => r.id === id); },
    addRoutine(data) {
      const all = this.routines(), r = { id: uid(), days: [], createdAt: today(), ...data };
      all.push(r); save(KEY.ROUTINES, all); return r;
    },
    updateRoutine(id, patch) {
      const all = this.routines(), i = all.findIndex(r => r.id === id);
      if (i < 0) return false; all[i] = { ...all[i], ...patch }; save(KEY.ROUTINES, all); return all[i];
    },
    deleteRoutine(id) { save(KEY.ROUTINES, this.routines().filter(r => r.id !== id)); },

    sessions() { return load(KEY.SESSIONS) || []; },
    userSessions(userId) { return this.sessions().filter(s => s.userId === userId); },
    addSession(data) {
      const all = this.sessions(), s = { id: uid(), date: today(), ...data };
      all.push(s); save(KEY.SESSIONS, all); return s;
    },

    youtubeId(url) {
      if (!url) return null;
      const m = url.match(/(?:shorts\/|watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
      return m ? m[1] : null;
    },
    thumbnailUrl(url) {
      const id = this.youtubeId(url);
      return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
    },
    youtubeWatchUrl(url) {
      const id = this.youtubeId(url);
      return id ? `https://www.youtube.com/watch?v=${id}` : null;
    },
    embedUrl(url) {
      const id = this.youtubeId(url);
      return id ? `https://www.youtube.com/embed/${id}?rel=0` : null;
    },
    levelLabel: l => ({inicial:'Inicial',intermedio:'Intermedio',avanzado:'Avanzado'})[l] || l,
    objLabel: o => ({volumen:'Volumen',definicion:'Definición',fuerza:'Fuerza',resistencia:'Resistencia',hipertrofia:'Hipertrofia'})[o] || o,
    fmtDate: d => d ? new Date(d + 'T00:00').toLocaleDateString('es-AR', {day:'2-digit',month:'short',year:'numeric'}) : '',
    muscleGroups: () => ['Pecho','Espalda','Piernas','Hombros','Bíceps','Tríceps','Abdomen','Cardio','Glúteos'],
    objectives: () => ['volumen','fuerza','definicion','resistencia','hipertrofia'],
    levels: () => ['inicial','intermedio','avanzado'],
  };
})();

document.addEventListener('DOMContentLoaded', () => VG.init());
