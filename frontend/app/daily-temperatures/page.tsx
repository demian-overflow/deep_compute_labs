import DailyTempsVisualizer from '../components/DailyTempsVisualizer'
import Link from 'next/link'

export default function Page() {
  return (
    <main style={{padding:24,fontFamily:'Inter, system-ui, sans-serif'}}>
      <h1>Array Algorithm Visualizations</h1>
      <p style={{color:'#444'}}>Simple interactive demo: Daily Temperatures (stack-based)</p>

      <div style={{marginTop:20,background:'#fff',padding:16,border:'1px solid #eee',borderRadius:8}}>
        <DailyTempsVisualizer />
      </div>

      <div style={{marginTop:18}}>
        <Link href="/">← Back</Link>
      </div>
    </main>
  )
}
