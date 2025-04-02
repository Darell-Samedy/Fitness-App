import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, TextField, InputAdornment, IconButton, CircularProgress, Alert } from '@mui/material';
import { Search } from '@mui/icons-material';
import Header from '../../components/Header';

const ExerciseLibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('https://api.api-ninjas.com/v1/allexercises', {
          headers: {
            'X-Api-Key': 'ZQjxTu9Qfk3NdoKzHSJdOQ==CJa3UHvvTtwlPQus', // Replace with your actual API key
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setExercises(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchExercises();
  }, []);

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box m="20px">
      <Header title="Exercise Library" subtitle="Explore Various Exercises" />
      <Box maxWidth={600} mx="auto" mb={3}>
        <TextField
          fullWidth
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={3}>
          {filteredExercises.map((exercise, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={3} sx={{ borderRadius: '12px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {exercise.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {exercise.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ExerciseLibraryPage;
