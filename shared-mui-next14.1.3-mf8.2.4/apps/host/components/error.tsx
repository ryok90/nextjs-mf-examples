import { Alert } from '@mui/material';

export default function Error() {
  return (
    <Alert severity="error">
      <p>Error from custom React component</p>
    </Alert>
  );
}
