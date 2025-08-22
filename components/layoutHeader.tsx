interface LayoutHeaderProps {
  pageTitle: string
  className?: string 
}


const LayoutHeader = ({ pageTitle, className }: LayoutHeaderProps) => {
  return (
    <div
      className={`mt-0 flex items-center gap-3 border-gray-300 pb-2 ${className}`}
    >
      <h2 className={`text-3xl font-semibold text-gray-800 ${className}`}>{pageTitle}</h2>
    </div>
  )
}

export default LayoutHeader
