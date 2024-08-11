import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


export default function TaskForm() {

  const [task, setTask] = useState({
    title: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();

  const params = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send TASK to backend
    setLoading(true);

    if(editing){
      const result = await fetch(`http://localhost:4000/tasks/${params.id}`, {
        method: 'PUT',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(task)
      });
      const data = await result.json();
      console.log(data);
    }
    else{
      const res = await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {'Content-Type': 'application/json'}
      })

      const data = await res.json();
    }

    setLoading(false);

    // Go directly to Task List
    navigate('/');
  }

  const handleChange = (event) => setTask({...task, [event.target.name]: event.target.value});

  const loadTask = async (id) => {
    const result = await fetch(`http://localhost:4000/task/${id}`);
    const data = await result.json();
    setTask({title: data.title, description: data.description});
    setEditing(true);
  }

  useEffect(() => {
    if(params.id) loadTask(params.id);
  }, [params.id]);

  return (
    <Grid container alignItems='center' justifyContent='center' direction='column'>
      <Grid item xs={3}>
        <Card sx={{mt: 5}} style={{backgroundColor: '#1e272e', padding: '1rem'}}>
          <Typography variant='5' textAlign='center' color='white'>
            {editing ? 'Edit Task' : 'Create Task'}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                name='title'
                value={task.title}
                variant='filled' 
                label='Write your title' 
                sx={{display:'block', margin: '0.5rem 0'}}
                onChange={handleChange}
                inputProps={{style: {color:'white'}}}
                InputLabelProps={{style: {color:'white'}}}
                />
              <TextField
                name='description'
                value={task.description}
                variant='filled' 
                label='Write your description' 
                multiline rows={4} 
                sx={{display:'block', margin: '0.5rem 0'}}
                onChange={handleChange}
                inputProps={{style: {color:'white'}}}
                InputLabelProps={{style: {color:'white'}}}
                />
              <Button variant="contained" color="primary" type='submit' disabled={!task.title||!task.description}>
                {loading ? <CircularProgress color='inherit' size={24}/> : 'Save'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
