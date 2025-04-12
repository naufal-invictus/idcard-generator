export function Card({ children, className = "" }) {
    return (
      <div className={`rounded-lg shadow-lg overflow-hidden ${className}`}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ children, className = "" }) {
    return (
      <div className={`p-4 ${className}`}>
        {children}
      </div>
    );
  }
  export default Card;
