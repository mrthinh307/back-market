export const errorToastProps = {
  duration: 5000,
  richColors: true,
  style: {
    fontSize: '16px',
    fontFamily: 'var(--font-duplet)',
    color: 'var(--color-primary)',
    backgroundColor: 'var(--color-destructive-secondary)',
    boxShadow: 'var(--shadow-lg)',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    padding: '20px 12px 20px 20px',
    gap: '8px',
  },
};

export const successToastProps = {
  ...errorToastProps,
  style: {
    ...errorToastProps.style,
    backgroundColor: 'var(--color-chart-2)',
  },
};
