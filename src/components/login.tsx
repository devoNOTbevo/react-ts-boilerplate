import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Link,
} from '@material-ui/core';
import { useAuthActions } from '../hooks/auth-actions';
import { useStateContext } from '../state/store';
export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuthActions();
  console.log('rendering');

  if (isLoading()) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  return (
    <Paper variant="elevation" elevation={2} className="login-background">
      <Grid item>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField
              type="email"
              placeholder="Email"
              fullWidth
              name="username"
              variant="outlined"
              required
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              placeholder="Password"
              fullWidth
              name="password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="button-block"
              onClick={() => login(email, password)}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Link href="#" variant="body2">
          Forgot Password?
        </Link>
      </Grid>
    </Paper>
  );
}
