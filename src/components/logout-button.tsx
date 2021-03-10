import { useAuthActions } from '../hooks/auth-actions';
import { useStateContext } from '../state/store';
import { Grid, Button } from '@material-ui/core';

export default function LogoutButton() {
  const { logout } = useAuthActions();
  const { state } = useStateContext();

  const {
    user: { isAuthenticated },
  } = state;

  return isAuthenticated ? (
    <Grid item>
      <Button variant="contained" color="secondary" onClick={() => logout()}>
        Logout
      </Button>
    </Grid>
  ) : null;
}
