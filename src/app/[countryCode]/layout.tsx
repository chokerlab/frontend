import ReduxProvider from '@modules/home/store/Provider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  );
} 