import MainLayout from '../(main)/layout';

export default function CustomizeLayout({ children }: { children: React.ReactNode }) {
  // 复用 (main) 的布局（含Nav、Footer等），并加渐变背景
  return (
    <MainLayout>
      <div style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #f7f7fa 100%)', minHeight: '100vh', width: '100%' }}>
        <div className="py-12 flex flex-col items-center">
          {children}
        </div>
      </div>
    </MainLayout>
  );
} 