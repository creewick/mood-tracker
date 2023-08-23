import React from 'react';
import getColors from '../moodColors';
import styled from 'styled-components';

const RangeInput = styled.input.attrs(props => ({
    type: 'range'
}))`
    &::-webkit-slider-runnable-track {
        background-color: ${props => props.color};
        width: 100%;
        height: 40px;
        border-radius: 20px;
        padding: 2px;
        border: 0;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 36px;
        width: 36px;
        border-radius: 50%;
        background: #fff;
    }

    & {
        -webkit-appearance: none;
        background: none;
        position: relative;
    }

    &::before {
        content: 'НЕПРИЯТНО';
        
        left: 10px;
    }

    &::after {
        content: 'ПРИЯТНО';
        right: 10px;
    }

    &::before, &::after {
        position: absolute;
        color: #0006;
        font-size: 14px;
        font-weight: 700;
        top: 50px;
    }
`;

export default function MoodSlider(props) {
    const {mood, setMood} = props;
    const colors = getColors(mood);

    return (
        <RangeInput 
            min="-100" max="100" 
            className="moodSlider"
            color={colors.secondary}
            style={{width: '400px'}}
            value={mood} onChange={(e) => setMood(parseInt(e.target.value))} 
        />
    );
}