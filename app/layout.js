import './globals.css';
import Header from '../components/Header';
import PCBBackground from '../components/PCBBackground';

export const metadata = {
  title: 'E-Bridge — E-Waste Management & 2nd Hand Components',
  description: 'E-Bridge is your one-stop platform for responsible e-waste recycling and buying/selling second-hand electronic components. Join the circular electronics economy.',
  keywords: 'e-waste, recycling, electronic components, second-hand electronics, PCB, circuit board, buy components, sell components',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PCBBackground />
        <Header />
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
