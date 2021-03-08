import React from 'react';
import { Grid } from '@material-ui/core';

export const MainLayout: React.FC = ({ children }) => {
  return (
    <Grid container spacing={0} justify="center" direction="row">
      <Grid item>
        <Grid container direction="column" justify="center" spacing={2}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};
