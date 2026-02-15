const express = require('express')
const path = require('path')

const app = express()
const PORT = 3000

const fakeProducts = [
  { id: 1, name: "Keyboard", price: 1200 },
  { id: 2, name: "Mouse", price: 800 },
  { id: 3, name: "Monitor", price: 5000 },
  { id: 4, name: "Headphone", price: 1500 },
  { id: 5, name: "Webcam", price: 2000 },
]

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'))
})
app.post('/login', (req, res) => {
  res.redirect('/login')
})

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'))
})

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'products.html'))
})
app.post('/products', (req, res) => {
  res.redirect('/products')
})

app.get('/api/products', (req, res) => {
  const q = (req.query.q || '').toLowerCase();

  setTimeout(() => {
    const filtered = fakeProducts.filter(p =>
      p.name.toLowerCase().includes(q)
    );
    res.json(filtered);
  }, 800); // จำลอง API delay
})

app.get('/', (req, res) => {
  res.redirect('/login')
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
