import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import studentsRouter from './routes/students.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/', (req, res) => {
  res.json({ ok: true, service: 'student-api', version: '1.0.0' });
});

// Routes
app.use('/api/students', studentsRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 student-api listening on http://localhost:${PORT}`);
});
