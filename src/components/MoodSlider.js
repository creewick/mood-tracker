import React from 'react';
import getColors from '../functions/moodColors';
import RangeInput from './RangeInput';

export default function MoodSlider(props) {
    const {mood, setMood} = props;
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
        <div>
            <h1>{getCaption(mood)}</h1>
            <RangeInput 
                min="-100" max="100"
                color={colors.secondary}
                value={mood} 
                onChange={(e) => setMood(parseInt(e.target.value))} 
            />
        </div>
        
    );
}