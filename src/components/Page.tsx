import { ReactNode } from 'react';
import { Container } from '@mui/material';

type Props = { title?: string; children: ReactNode };
export default function Page({ children }: Props) {
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      {children}
    </Container>
  );
}
