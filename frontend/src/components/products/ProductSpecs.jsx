// Renders whatever key/value pairs are stored in a product's `specifications`
// JSON — no fixed set of rows, so each product can carry its own spec sheet.
// Values may be text, numbers, booleans, lists, or nested key/value objects.

function SpecValue({ value }) {
  if (Array.isArray(value)) {
    return (
      <ul className="list-disc pl-5 space-y-1">
        {value.map((v, i) => (
          <li key={i}><SpecValue value={v} /></li>
        ))}
      </ul>
    )
  }

  if (value && typeof value === 'object') {
    return (
      <dl className="space-y-1">
        {Object.entries(value).map(([k, v]) => (
          <div key={k} className="flex gap-2">
            <dt className="font-medium text-primary-800">{k}:</dt>
            <dd><SpecValue value={v} /></dd>
          </div>
        ))}
      </dl>
    )
  }

  if (typeof value === 'boolean') return value ? 'Yes' : 'No'

  const text = String(value ?? '')
  if (text.includes('\n')) {
    return (
      <ul className="list-disc pl-5 space-y-1">
        {text.split('\n').filter(Boolean).map((line, i) => <li key={i}>{line}</li>)}
      </ul>
    )
  }
  return text
}

export default function ProductSpecs({ specs }) {
  const entries = Object.entries(specs ?? {})
  if (entries.length === 0) return null

  return (
    <div>
      <h2 className="text-xl font-bold text-primary-800 mb-4">Specifications</h2>
      <div className="bg-white border border-steel-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <tbody>
            {entries.map(([key, value], i) => (
              <tr key={key} className={i % 2 === 0 ? 'bg-white' : 'bg-steel-50'}>
                <th
                  scope="row"
                  className="py-3.5 px-5 text-left font-semibold text-primary-800 w-2/5 sm:w-1/3 border-r border-steel-100 align-top"
                >
                  {key}
                </th>
                <td className="py-3.5 px-5 text-steel-600 leading-relaxed align-top">
                  <SpecValue value={value} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
