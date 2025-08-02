 // client/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, List, ListItem } from '@mui/material';

function App() {
  const [url, setUrl] = useState('');
  const [validity, setValidity] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [shortUrls, setShortUrls] = useState([]);

  const shortenUrl = async () => {
    if (!url) return alert('Please enter a valid URL');

    try {
      const res = await axios.post('http://localhost:5000/shorten', {
        longUrl: url,
        validity: parseInt(validity),
        customCode: customCode || null,
      });

      setShortUrls(prev => [...prev, res.data.shortUrl]);
      setUrl('');
      setValidity('');
      setCustomCode('');
    } catch (err) {
      alert(err.response?.data?.error || 'Error occurred');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      <TextField fullWidth label="Long URL" value={url} onChange={e => setUrl(e.target.value)} />
      <TextField fullWidth label="Custom Code (Optional)" value={customCode} onChange={e => setCustomCode(e.target.value)} />
      <TextField fullWidth label="Validity (minutes)" value={validity} onChange={e => setValidity(e.target.value)} />
      <Button variant="contained" onClick={shortenUrl}>Shorten</Button>

      <Typography variant="h6" mt={4}>Shortened URLs:</Typography>
      <List>
        {shortUrls.map((u, i) => (
          <ListItem key={i}><a href={u} target="_blank" rel="noreferrer">{u}</a></ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;