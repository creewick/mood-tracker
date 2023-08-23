import { useState } from 'react';
import './Log.css';
import getColors from '../functions/moodColors';
import MoodIcon from '../components/MoodIcon';
import MoodSlider from '../components/MoodSlider';

export default function App() {
  const [mood, setMood] = useState(0);

  const colors = getColors(mood);

  document.getElementById('themeColor').setAttribute('content', colors.backgroundPrimary);

  return (
    <div className="app" style={{background: colors.backgroundPrimary}}>
      <h1>Как Вы чувствуете себя сейчас?</h1>
      <MoodIcon mood={mood} animate={true} size="360px" />
      <MoodSlider 
        color={colors.secondary}
        mood={mood}
        setMood={setMood}
      />
    </div>
  );
}
