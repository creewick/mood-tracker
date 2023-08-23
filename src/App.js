import { useState } from 'react';
import './App.css';
import getColors from './moodColors';
import MoodIcon from './components/MoodIcon';
import MoodSlider from './components/MoodSlider';

export default function App() {
  const [mood, setMood] = useState(0);

  const colors = getColors(mood);

  function getCaption(mood) {
    if (mood < -75) return 'Очень неприятно';
    if (mood < -50) return 'Неприятно';
    if (mood < -25) return 'Немного неприятно';
    if (mood < 25) return 'Нормально';
    if (mood < 50) return 'Немного приятно';
    if (mood < 75) return 'Приятно';
    return 'Очень приятно';
  }

  return (
    <div className="app" style={{background: colors.backgroundPrimary}}>
      <h1>Как Вы чувствуете себя сейчас?</h1>
      <MoodIcon mood={mood} animate={true} width="400px" height="400px" />
      <h1>{getCaption(mood)}</h1>
      <MoodSlider 
        color={colors.secondary}
        mood={mood}
        setMood={setMood}
      />
    </div>
  );
}
