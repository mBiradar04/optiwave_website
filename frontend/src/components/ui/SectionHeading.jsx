export default function SectionHeading({ title, subtitle, centered = false }) {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-primary-900">{title}</h2>
      {subtitle && <p className="mt-3 text-gray-500 text-lg">{subtitle}</p>}
    </div>
  )
}