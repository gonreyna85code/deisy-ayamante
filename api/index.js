import express from 'express';

const app = express()
const PORT = 8000

app.get('/api/test', (req, res) => {
  res.send('Test route 🎉 ')
})

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
})