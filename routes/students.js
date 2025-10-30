import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, '..', 'data', 'students.json');

// Helper to read JSON file each request (simple demo; not for production).
const readData = () => {
  const raw = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(raw);
};

// Helper to write JSON back (so changes persist while running).
const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// GET /api/students
router.get('/', (req, res) => {
  const students = readData();
  res.json(students);
});

// GET /api/students/:id
router.get('/:id', (req, res) => {
  const students = readData();
  const found = students.find(s => String(s.id) === String(req.params.id));
  if (!found) return res.status(404).json({ error: 'Student not found' });
  res.json(found);
});

// POST /api/students
router.post('/', (req, res) => {
  const students = readData();
  const { name, major, gpa } = req.body || {};
  if (!name || !major) return res.status(400).json({ error: 'name and major are required' });

  const newId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
  const student = { id: newId, name, major, gpa: gpa ?? null };
  students.push(student);
  writeData(students);
  res.status(201).json(student);
});

// PUT /api/students/:id
router.put('/:id', (req, res) => {
  const students = readData();
  const idx = students.findIndex(s => String(s.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Student not found' });

  const { name, major, gpa } = req.body || {};
  students[idx] = { 
    ...students[idx], 
    ...(name !== undefined ? { name } : {}),
    ...(major !== undefined ? { major } : {}),
    ...(gpa !== undefined ? { gpa } : {})
  };
  writeData(students);
  res.json(students[idx]);
});

// DELETE /api/students/:id
router.delete('/:id', (req, res) => {
  const students = readData();
  const idx = students.findIndex(s => String(s.id) === String(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Student not found' });
  const [removed] = students.splice(idx, 1);
  writeData(students);
  res.json({ deleted: removed });
});

export default router;
