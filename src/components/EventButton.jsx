export function EventButton({ children, event, className }) {
  return (
    <button onClick={event} className={className}>
      {children}
    </button>
  );
}
